# belajar-vibe-coding

Backend REST API menggunakan **Elysia.js** + **Drizzle ORM** + **MySQL**, berjalan di runtime **Bun**.

## Tech Stack

| Teknologi | Versi |
|-----------|-------|
| Runtime   | [Bun](https://bun.sh) |
| Framework | [Elysia.js](https://elysiajs.com) |
| ORM       | [Drizzle ORM](https://orm.drizzle.team) |
| Database  | MySQL 8.0 |

## Prasyarat

- [Bun](https://bun.sh) terinstal
- MySQL 8.0 berjalan (bisa via Docker atau lokal)

## Quick Start

### 1. Clone & Install Dependencies

```bash
bun install
```

### 2. Setup Environment

```bash
cp .env.example .env
```

Edit `.env` sesuai konfigurasi database Anda:

```env
PORT=3000
DATABASE_URL=mysql://root:rootpassword@localhost:3306/belajar_vibe_coding
```

### 3. Jalankan MySQL via Docker

```bash
docker compose up -d
```

### 4. Push Schema ke Database

```bash
bun run db:push
```

### 5. Jalankan Server (Development)

```bash
bun run dev
```

Server akan berjalan di `http://localhost:3000` dengan hot-reload.

## API Endpoints

### Health Check

```
GET /
```

Response: `{ "status": "ok", "message": "Elysia is running" }`

### Users CRUD

| Method | Endpoint     | Deskripsi          |
|--------|--------------|--------------------|
| GET    | /users       | Ambil semua user   |
| GET    | /users/:id   | Ambil user by ID   |
| POST   | /users       | Buat user baru     |
| PUT    | /users/:id   | Update user by ID  |
| DELETE | /users/:id   | Hapus user by ID   |

#### Contoh POST /users

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

## Scripts

| Script          | Perintah              | Deskripsi                        |
|-----------------|-----------------------|----------------------------------|
| `dev`           | `bun run dev`         | Jalankan server dengan hot-reload |
| `db:generate`   | `bun run db:generate` | Generate file migrasi SQL        |
| `db:push`       | `bun run db:push`     | Push schema langsung ke database |
| `db:migrate`    | `bun run db:migrate`  | Jalankan migrasi                 |

## Struktur Proyek

```
.
├── src/
│   ├── db/
│   │   ├── index.ts      # Koneksi database (Drizzle + mysql2)
│   │   └── schema.ts     # Definisi tabel (users)
│   ├── routes/
│   │   └── users.ts      # Route handler CRUD users
│   └── index.ts          # Entry point server Elysia
├── drizzle.config.ts     # Konfigurasi Drizzle Kit
├── docker-compose.yml    # MySQL via Docker
├── .env.example          # Template environment variables
└── package.json
```
