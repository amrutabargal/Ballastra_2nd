import * as iconModel from "../models/iconModel.js";

export async function listIcons(req, res, next) {
  try {
    const icons = await iconModel.listIcons();
    res.json({ success: true, data: icons });
  } catch (err) {
    next(err);
  }
}

export async function uploadIcon(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const filename = req.file.filename;
    const display_name = req.body.displayName || null;
    const uploaded_by = req.user.id;

    const icon = await iconModel.createIcon(filename, display_name, uploaded_by);

    res.status(201).json({ success: true, data: icon });
  } catch (err) {
    next(err);
  }
}
