import request from "supertest";
import app from "../src/app.js"; 
import { AppDataSource } from "../src/data-source.js";

beforeAll(async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
});

afterAll(async () => {
  if (AppDataSource.isInitialized) {
    await AppDataSource.destroy();
  }
});

describe("API de Cócteles - Ciclo Completo", () => {
  
  let cocktailId: string;
  const uniqueName = `Test Cocktail ${Date.now()}`;

  // --- 1. CREACIÓN
  it("POST /api/cocktails - Debe crear un nuevo cóctel", async () => {
    const response = await request(app).post("/api/cocktails").send({
      name: uniqueName,
      description: "Un cóctel de prueba automatizada",
      imageUrl: "https://example.com/img.jpg",
      ingredients: ["Jest", "Node.js"],
      instructions: "Mezclar y probar."
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.data.name).toBe(uniqueName);
    
    cocktailId = response.body.data.id;
  });

  // --- 2. VALIDACIÓN
  it("POST /api/cocktails - No debe permitir nombres duplicados", async () => {
    const response = await request(app).post("/api/cocktails").send({
      name: uniqueName,
      description: "Duplicado",
      imageUrl: "...",
      ingredients: [],
      instructions: "..."
    });

    expect(response.statusCode).toBe(409);
    expect(response.body.message).toMatch(/Ya existe un cóctel/);
  });

  // --- 3. LISTADO
  it("GET /api/cocktails - Debe listar con paginación", async () => {
    const response = await request(app).get("/api/cocktails?limit=5");
    
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.pagination).toBeDefined();
  });

  // --- 4. DETALLE
  it("GET /api/cocktails/:id - Debe obtener el detalle del cóctel", async () => {
    const response = await request(app).get(`/api/cocktails/${cocktailId}`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.data.id).toBe(cocktailId);
  });

  it("GET /api/cocktails/:id - Debe dar 404 si no existe", async () => {
    const fakeId = "00000000-0000-0000-0000-000000000000";
    const response = await request(app).get(`/api/cocktails/${fakeId}`);
    
    expect(response.statusCode).toBe(404);
  });

  // --- 5. ACTUALIZACIÓN
  it("PUT /api/cocktails/:id - Debe actualizar el cóctel", async () => {
    const response = await request(app).put(`/api/cocktails/${cocktailId}`).send({
      description: "Descripción actualizada por Jest",
      ingredients: ["Jest", "Updated"]
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.data.description).toBe("Descripción actualizada por Jest");
    expect(response.body.data.name).toBe(uniqueName);
  });

  // --- 6. ELIMINADO LÓGICO 
  it("DELETE /api/cocktails/:id - Debe enviar a la papelera (Soft Delete)", async () => {
    const response = await request(app).delete(`/api/cocktails/${cocktailId}`);
    expect(response.statusCode).toBe(204); // No Content
  });

  it("GET /api/cocktails/:id - Ya no debe encontrarse en la lista principal", async () => {
    const response = await request(app).get(`/api/cocktails/${cocktailId}`);
    expect(response.statusCode).toBe(404); // El getOne filtra los eliminados por defecto
  });

  // --- 7. PAPELERA
  it("GET /api/cocktails/deleted - Debe aparecer en la papelera", async () => {
    const response = await request(app).get("/api/cocktails/deleted");
    
    expect(response.statusCode).toBe(200);
    const found = response.body.data.find((c: any) => c.id === cocktailId);
    expect(found).toBeDefined();
    expect(found.deletedAt).not.toBeNull();
  });

  // --- 8. RESTAURAR 
  it("PATCH /api/cocktails/:id/restore - Debe restaurar el cóctel", async () => {
    const response = await request(app).patch(`/api/cocktails/${cocktailId}/restore`);
    
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toContain("restaurado");
  });

  it("GET /api/cocktails/:id - Debe existir nuevamente", async () => {
    const response = await request(app).get(`/api/cocktails/${cocktailId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.id).toBe(cocktailId);
  });

});