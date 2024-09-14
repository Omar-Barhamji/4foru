const Order = require("../models/orderModel");
const User = require("../models/user");
const ApiError = require("../utils/apiError");

exports.getAllUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    throw error;
  }
};

exports.getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select("firstName lastName email");

    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  } catch (error) {
    throw error;
  }
};

exports.createUser = async (userData) => {
  try {
    return await User.create(userData);
  } catch (error) {
    throw error;
  }
};

exports.updateUser = async (appUser, userId, userData) => {
  try {
    const user = await this.getUserById(userId);
    if (user._id.toString() != appUser._id.toString()) {
      if (appUser.role != "admin" || appUser.role != "mod")
        throw new ApiError("Unauthorized", 401);
    }
    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
      runValidators: true,
    });
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

exports.deleteUser = async (appUser, userId) => {
  try {
    const user = await this.getUserById(userId);
    if (user._id.toString() != appUser._id.toString()) {
      if (appUser.role != "admin" || appUser.role != "mod")
        throw new ApiError("Unauthorized", 401);
    }
    await User.findByIdAndDelete(userId);
  } catch (error) {
    throw error;
  }
};
exports.getOrders = async (userId) => {
  try {
    return await Order.find({ user: userId });
  } catch (error) {
    throw error;
  }
};
