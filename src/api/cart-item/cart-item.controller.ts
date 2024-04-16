import { NextFunction, Request, Response } from "express";
import productService from "../product/product.service";
import cartItemService from './cart-item.service';
import { CartItem } from "./cart-item.entity";
import { NotFoundError } from "../../errors/not-found";
import { TypedRequest } from "../../utils/typed-requests";
import { CreateCartItemDTO } from "./cart-item.dto";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { ValidationError } from "../../errors/validation";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await cartItemService.list();
    res.json(items);
  } catch(err) {
    next(err);
  }
}
// Perchè meglio unknown di any?
/* Fare cosi è un po scomodo
 * 
 * req: Request<unknown, unknown, {productId: string, quantity: number}>
 *
 * usiamo piuttosto typed-requests.ts 
 */
export const add = async (req: TypedRequest<CreateCartItemDTO>, res: Response, next: NextFunction) => {
  try {

    const { productId, quantity } = req.body;

    //controllare che il prodotto esista
    const product = await productService.getById(productId);
    if (!product) {
      throw new NotFoundError();
    }

    const newItem: CartItem = {
      product: productId,
      quantity
    }

    const saved = await cartItemService.add(newItem);

    res.json(saved);
  } catch(err) {
    next(err);
  }
}

export const updateQuantity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { quantity } = req.body;
    const { id } = req.params;

    const updated = await cartItemService.update(id, { quantity });
    
    res.json(updated);
  } catch(err) {
    next(err);
  }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
  
}