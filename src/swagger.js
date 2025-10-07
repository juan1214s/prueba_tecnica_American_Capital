import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "📋 API de Tareas",
      version: "1.0.0",
      description: "Documentación de la API para gestionar tareas con Node.js, Express y PostgreSQL",
    },
    servers: [
      {
        url: "http://localhost:3200",
      },
    ],
  },
  apis: ["./src/routes/*.js"], 
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
export const swaggerUiMiddleware = swaggerUi;
