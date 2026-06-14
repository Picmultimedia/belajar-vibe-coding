import { Elysia, t } from 'elysia';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

export const userRoutes = new Elysia({ prefix: '/users' })
  // Get all users
  .get('/', async () => {
    return await db.select().from(users);
  })

  // Get user by ID
  .get('/:id', async ({ params: { id }, set }) => {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      set.status = 400;
      return { message: 'Invalid ID format' };
    }
    const result = await db.select().from(users).where(eq(users.id, numericId));
    if (result.length === 0) {
      set.status = 404;
      return { message: 'User not found' };
    }
    return result[0];
  })

  // Create user
  .post('/', async ({ body, set }) => {
    try {
      const result = await db.insert(users).values(body);
      const insertId = result[0].insertId;
      return { id: insertId, ...body };
    } catch (err: any) {
      console.error('Insert error:', err);
      const isDuplicate = err.code === 'ER_DUP_ENTRY' || 
                          err.errno === 1062 ||
                          err.cause?.code === 'ER_DUP_ENTRY' ||
                          err.cause?.errno === 1062 ||
                          err.message?.includes('Duplicate entry') ||
                          err.message?.includes('ER_DUP_ENTRY');

      if (isDuplicate) {
        set.status = 409;
        return { message: 'Email already exists' };
      }
      set.status = 500;
      return { message: 'Internal Server Error', error: err.message };
    }
  }, {
    body: t.Object({
      name: t.String(),
      email: t.String(),
    })
  })

  // Update user
  .put('/:id', async ({ params: { id }, body, set }) => {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      set.status = 400;
      return { message: 'Invalid ID format' };
    }

    try {
      const result = await db.update(users)
        .set(body)
        .where(eq(users.id, numericId));

      if (result[0].affectedRows === 0) {
        set.status = 404;
        return { message: 'User not found' };
      }

      return { message: 'User updated successfully' };
    } catch (err: any) {
      const isDuplicate = err.code === 'ER_DUP_ENTRY' || 
                          err.errno === 1062 ||
                          err.cause?.code === 'ER_DUP_ENTRY' ||
                          err.cause?.errno === 1062 ||
                          err.message?.includes('Duplicate entry') ||
                          err.message?.includes('ER_DUP_ENTRY');

      if (isDuplicate) {
        set.status = 409;
        return { message: 'Email already exists' };
      }
      set.status = 500;
      return { message: 'Internal Server Error', error: err.message };
    }
  }, {
    body: t.Object({
      name: t.Optional(t.String()),
      email: t.Optional(t.String()),
    })
  })

  // Delete user
  .delete('/:id', async ({ params: { id }, set }) => {
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      set.status = 400;
      return { message: 'Invalid ID format' };
    }

    const result = await db.delete(users).where(eq(users.id, numericId));
    if (result[0].affectedRows === 0) {
      set.status = 404;
      return { message: 'User not found' };
    }

    return { message: 'User deleted successfully' };
  });
