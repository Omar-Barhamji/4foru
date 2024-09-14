const Order = require("../models/orderModel");
const ApiError = require("../utils/apiError");
exports.getAllOrders = async (category) => {
  try {
    if (category) {
      return await Order.find({ category });
    }
    return await Order.find();
  } catch (error) {
    throw error;
  }
};
exports.getOrderById = async (id) => {
  try {
    const order = await Order.findById(id);
    if (!order) {
      throw new ApiError("order not found!", 404);
    }
    return order;
  } catch (error) {
    throw error;
  }
};
exports.createOrder = async (orderData) => {
  try {
    const order = await Order.create(orderData);
    return order;
  } catch (error) {
    throw error;
  }
};

exports.updateOrder = async (orderId, userId, orderData) => {
  try {
    const order = await this.getorderById(orderId);
    if (order.user.toString() != userId.toString())
      throw new ApiError("Unauthorized", 401);
    const updatedOrder = await Order.findByIdAndUpdate(orderId, orderData, {
      new: true,
      runValidators: true,
    });
    return updatedOrder;
  } catch (error) {
    throw error;
  }
};

exports.deleteOrder = async (orderId, user) => {
  try {
    const order = await this.getorderById(orderId);
    if (order.user.toString() != user._id.toString()) {
      if (userId.role != "admin") throw new ApiError("Unauthorized", 401);
    }
    await Order.findByIdAndDelete(orderId);
  } catch (error) {
    throw error;
  }
};
