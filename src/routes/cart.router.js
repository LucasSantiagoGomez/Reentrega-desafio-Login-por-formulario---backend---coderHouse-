import { Router } from "express";
import CartManager from "../dao/dbManagers/carts.js";

const manager = new CartManager();

const router = Router();

// Creates a cart
router.post("/", async (req, res) => {
  const cart = req.body;
  if (!cart) {
    return res
      .status(400)
      .send({ status: "Error", error: "Cart could not be added" });
  }

  const newCart = await manager.addCart(cart);
  return res.send({
    status: "OK",
    message: "Cart added successfully",
    payload: newCart,
  });
});

// Adds a product to a cart
router.post("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  const { quantity } = req.body;

  const newProduct = await manager.addProduct(cartId, productId, quantity);

  if (!newProduct) {
    return res
      .status(404)
      .send({ status: "Error", error: "Product could not be found" });
  }
  return res.send({
    status: "OK",
    message: "Product successfully added to the cart",
    payload: newProduct,
  });
});

// Adds multiple products to a cart
router.post("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const products = req.body;

  const updatedCart = await manager.addProducts(cartId, products);
  if (!updatedCart)
    return res.status(400).send({ status: "error", error: "error" });

  return res.send({ status: "sucess", message: "cart updated" });
});

// Gets all carts
router.get("/", async (req, res) => {
  const carts = await manager.getCarts();
  return res.send({ status: "success", payload: carts });
});

// Gets a cart by id
router.get("/:cid", async (req, res) => {
  const cartId = req.params.cid;
  const cart = await manager.getCartById(cartId);

  if (!cart) {
    return res.status(404).send({
      status: "Error",
      error: "cart was not found",
    });
  }
  return res.send({ status: "OK", message: "Cart found", payload: cart });
});

// Deletes an specific product from a cart
router.delete("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  const updatedCart = await manager.deleteProduct(cartId, productId);

  if (!updatedCart)
    return res
      .send(404)
      .send({ status: "error", error: "product was not found" });

  return res.send({ status: "sucess", message: "product deleted from cart" });
});

// Deletes all products from a cart
router.delete("/:cid", async (req, res) => {
  const cartId = req.params.cid;

  const updatedCart = await manager.deleteAllProducts(cartId);

  if (!updatedCart)
    return res.status(404).send({ status: "error", error: "cart not found" });

  return res.send({
    status: "sucess",
    message: "deleted all products from cart",
  });
});

// Updates a product's quantity inside a cart
router.put("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;
  const { quantity } = req.body;

  const updatedCart = await manager.updateProductQuantity(
    cartId,
    productId,
    quantity
  );

  if (!updatedCart)
    return res.status(400).send({ status: "error", error: "error" });

  return res.send({ status: "sucess", message: "cart updated" });
});

export default router;
