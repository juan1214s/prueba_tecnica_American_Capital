import * as taskService from "../service/taskService.js";
import dayjs from "dayjs";

export const getTasks = async (req, res) => {
  try {
    const { page, limit, is_completed, search } = req.query;

    const tasks = await taskService.getAllTasks({
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      is_completed: is_completed !== undefined ? is_completed === "true" : undefined,
      search,
    });

    const formattedTasks = tasks.map(task => ({
      ...task,
      created_at: task.created_at ? dayjs(task.created_at).format("YYYY-MM-DD") : null,
      due_date: task.due_date ? dayjs(task.due_date).format("YYYY-MM-DD") : null,
    }));

    res.json(formattedTasks);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener tareas", error: err.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

    const formattedTask = {
      ...task,
      created_at: task.created_at ? dayjs(task.created_at).format("YYYY-MM-DD") : null,
      due_date: task.due_date ? dayjs(task.due_date).format("YYYY-MM-DD") : null,
    };

    res.json(formattedTask);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener tarea", error: err.message });
  }
};


export const createTask = async (req, res) => {
  try {
    const { title, description, due_date } = req.body;

    if (!title || title.trim().length < 3) {
      return res.status(400).json({
        message: "El título es obligatorio y debe tener al menos 3 caracteres",
      });
    }

    const newTask = await taskService.createTask({ title, description, due_date });

    // 🧠 Formatear fechas en la respuesta
    newTask.created_at = newTask.created_at ? dayjs(newTask.created_at).format("YYYY-MM-DD") : null;
    newTask.due_date = newTask.due_date ? dayjs(newTask.due_date).format("YYYY-MM-DD") : null;

    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: "Error al crear tarea", error: err.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body);
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

    task.created_at = task.created_at ? dayjs(task.created_at).format("YYYY-MM-DD") : null;
    task.due_date = task.due_date ? dayjs(task.due_date).format("YYYY-MM-DD") : null;

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Error al actualizar tarea", error: err.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar tarea", error: err.message });
  }
};
