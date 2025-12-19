import * as notificationModel from "../models/notificationModel.js";

export const notifyUser = async (payload) => {
  return await notificationModel.createNotification(payload);
};

export const fetchNotifications = async (userId) => {
  return await notificationModel.getUserNotifications(userId);
};
