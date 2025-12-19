import * as notificationService from "../services/notificationService.js";
import * as notificationModel from "../models/notificationModel.js";

export const getMyNotifications = async (req, res) => {
  const data = await notificationService.fetchNotifications(req.user.id);
  res.json(data);
};

export const readOne = async (req, res) => {
  await notificationModel.markAsRead(req.params.id, req.user.id);
  res.json({ message: "Notification read" });
};

export const readAll = async (req, res) => {
  await notificationModel.markAllRead(req.user.id);
  res.json({ message: "All notifications read" });
};
