import express, { Request, Response } from "express";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";
import FindProductUseCase from "../../../usecase/product/find/find.product.usecase";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import UpdateProductUseCase from "../../../usecase/product/update/update.product.usecase";
import ProductRepository from "../../product/repository/sequelize/product.repository";

export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
  const useCase = new CreateProductUseCase(new ProductRepository());

  try {
    const productDto = {
      name: req.body.name,
      price: req.body.price,
    };

    const output = await useCase.execute(productDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

productRoute.get("/", async (req: Request, res: Response) => {
  const useCase = new ListProductUseCase(new ProductRepository());

  try {
    const output = await useCase.execute({});
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

productRoute.get("/:id", async (req: Request, res: Response) => {
  const useCase = new FindProductUseCase(new ProductRepository());

  const findProductDto = {
    id: req.params.id
  }

  try {
    const output = await useCase.execute(findProductDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

productRoute.put("/:id", async (req: Request, res: Response) => {
  const useCase = new UpdateProductUseCase(new ProductRepository());

  const updateProductDto = {
    id: req.params.id,
    name: req.body.name,
    price: req.body.price
  }

  try {
    const output = await useCase.execute(updateProductDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});