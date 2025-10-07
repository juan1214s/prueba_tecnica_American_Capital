import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST, 
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

// función que intenta conectar y reintenta si falla
export async function conectarDB(retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      await pool.connect();
      console.log("📡 Conectado a PostgreSQL correctamente");
      return;
    } catch (err) {
      console.log(`❌ Error al conectar (intento ${i + 1}):`, err.message);
      await new Promise(res => setTimeout(res, 3000));
    }
  }
  console.error("🚨 No se pudo conectar a la base de datos después de varios intentos");
  process.exit(1);
}
