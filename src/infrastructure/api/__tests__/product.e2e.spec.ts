import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
      price: 2,
    });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Product 1");
    expect(response.body.price).toBe(2);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "john",
    });

    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
      price: 2,
    });

    expect(response.status).toBe(200);

    const response2 = await request(app).post("/product").send({
      name: "Product 2",
      price: 4,
    });

    expect(response2.status).toBe(200);

    const listResponse = await request(app).get("/product").send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);

    const product = listResponse.body.products[0];
    expect(product.name).toBe("Product 1");
    expect(product.price).toBe(2);

    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("Product 2");
    expect(product2.price).toBe(4);
  });

  it("should find a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
      price: 2,
    });

    expect(response.status).toBe(200);

    const findResponse = await request(app)
      .get(`/product/${response.body.id}`)
      .send();

    expect(findResponse.status).toBe(200);
    expect(findResponse.body.id).toEqual(expect.any(String));
    expect(findResponse.body.name).toBe("Product 1");
    expect(findResponse.body.price).toBe(2);
  });
  
  it("should not find a product", async () => {
    const findResponse = await request(app)
      .get(`/product/123456`)
      .send();

    expect(findResponse.status).toBe(500);
  });

  it("should update a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
      price: 2,
    });

    expect(response.status).toBe(200);

    const updateResponse = await request(app)
      .put(`/product/${response.body.id}`)
      .send({
        id: response.body.id,
        name: "Product Updated",
        price: 4
      });

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body.name).toBe("Product Updated");
    expect(updateResponse.body.price).toBe(4);
  });
});
