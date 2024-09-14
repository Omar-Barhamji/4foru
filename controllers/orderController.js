const orderService = require("../services/orderService");
const commentService = require("../services/commentService");
const userService = require("../services/userService");

exports.getAllOrders = async (req, res, next) => {
  const category = req.query.category || null;
  try {
    const posts = await orderService.getAllOrders(category);
    return res
      .status(200)
      .send({ status: "success", result: orders.length, data: orders });
  } catch (error) {
    next(error);
  }
};

exports.createOrder = async (req, res, next) => {
  const id = req.user._id;
  const orderData = { ...req.body, user: id };
  try {
    const order = await orderService.createOrder(orderData);
    return res.status(201).send({ status: "success", data: order });
  } catch (error) {
    next(error);
  }
};

exports.updateOrder = async (req, res, next) => {
  const orderId = req.params.orderId;
  const userId = req.user._id;

  try {
    const order = await orderService.updateOrder(orderId, userId, req.body);
    return res.status(200).send({ status: "success", data: order });
  } catch (error) {
    next(error);
  }
};

exports.deleteOrder = async (req, res, next) => {
  const orderId = req.params.orderId;
  const user = req.user;

  try {
    await orderService.deleteOrder(orderId, user);
    return res.status(204).send("Deleted!");
  } catch (error) {
    next(error);
  }
};


