import { pool } from "../db/dbconnection.js";

export const getAllTasks = async ({ page = 1, limit = 10, is_completed, search }) => {
  let query = "SELECT * FROM tasks WHERE 1=1";
  const values = [];
  let i = 1;

  if (is_completed !== undefined) {
    query += ` AND is_completed = $${i++}`;
    values.push(is_completed);
  }

  if (search) {
    query += ` AND (title ILIKE $${i} OR description ILIKE $${i})`;
    values.push(`%${search}%`);
    i++;
  }

  query += ` ORDER BY created_at DESC LIMIT $${i++} OFFSET $${i}`;
  values.push(limit, (page - 1) * limit);

  const { rows } = await pool.query(query, values);
  return rows;
};

// ✅ Obtener una tarea por ID
export const getTaskById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
  return rows[0];
};

// ✅ Crear una nueva tarea
export const createTask = async ({ title, description, due_date }) => {
  const { rows } = await pool.query(
    `INSERT INTO tasks (title, description, due_date)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [title, description, due_date]
  );
  return rows[0];
};

// ✅ Actualizar una tarea por ID
export const updateTask = async (id, data) => {
  const fields = [];
  const values = [];
  let i = 1;

  for (const [key, value] of Object.entries(data)) {
    fields.push(`${key} = $${i++}`);
    values.push(value);
  }

  values.push(id);
  const query = `UPDATE tasks SET ${fields.join(", ")} WHERE id = $${i} RETURNING *`;
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// ✅ Eliminar una tarea por ID
export const deleteTask = async (id) => {
  await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
};
