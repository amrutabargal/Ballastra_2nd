// Backend/controllers/orbitController.js
import * as orbitModel from "../models/orbitModel.js";

/**
 * POST /orbit/follow
 * body: { targetId }
 */
export async function followHandler(req, res, next) {
  try {
    const userId = req.user.id;
    const { targetId } = req.body;
    if (!targetId) return res.status(400).json({ success:false, message: "targetId required" });
    if (userId === targetId) return res.status(400).json({ success:false, message: "Cannot follow yourself" });

    const result = await orbitModel.follow(userId, targetId);
    return res.status(201).json({ success:true, data: result });
  } catch (err) { next(err); }
}

/**
 * POST /orbit/unfollow
 * body: { targetId }
 */
export async function unfollowHandler(req, res, next) {
  try {
    const userId = req.user.id;
    const { targetId } = req.body;
    if (!targetId) return res.status(400).json({ success:false, message: "targetId required" });

    const result = await orbitModel.unfollow(userId, targetId);
    return res.json({ success:true, data: result });
  } catch (err) { next(err); }
}

/**
 * GET /orbit/orbits  -> people who follow me
 */
export async function listOrbitsHandler(req, res, next) {
  try {
    const userId = req.user.id;
    const limit = Number(req.query.limit || 100);
    const offset = Number(req.query.offset || 0);
    const rows = await orbitModel.getOrbits(userId, limit, offset);
    return res.json({ success:true, data: rows });
  } catch (err) { next(err); }
}

/**
 * GET /orbit/obitors  -> people I follow
 */
export async function listObitorsHandler(req, res, next) {
  try {
    const userId = req.user.id;
    const limit = Number(req.query.limit || 100);
    const offset = Number(req.query.offset || 0);
    const rows = await orbitModel.getObitors(userId, limit, offset);
    return res.json({ success:true, data: rows });
  } catch (err) { next(err); }
}

/**
 * GET /orbit/mutual -> mutual follows (eligible to message)
 */
export async function listMutualHandler(req, res, next) {
  try {
    const userId = req.user.id;
    const limit = Number(req.query.limit || 100);
    const offset = Number(req.query.offset || 0);
    const rows = await orbitModel.getMutuals(userId, limit, offset);
    return res.json({ success:true, data: rows });
  } catch (err) { next(err); }
}
