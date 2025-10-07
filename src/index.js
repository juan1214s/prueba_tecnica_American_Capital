import app from "./app.js";
import { conectarDB } from "./db/dbconnection.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  await conectarDB(); 

  app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("🚨 Error al iniciar el servidor:", err);
  process.exit(1);
});
