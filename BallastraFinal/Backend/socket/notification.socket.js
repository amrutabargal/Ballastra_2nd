export const sendNotificationSocket = (io, userId, notification) => {
    io.to(userId).emit("new_notification", notification);
  };
  