// Backend/controllers/discussionController.js
import * as discussionModel from '../models/discussionModel.js';
import * as reactionModel from '../models/reactionModel.js';

export async function createDiscussion(req, res, next) {
  try {
    const { spaceId } = req.params;
    const payload = { space_id: spaceId, user_id: req.user.id, title: req.body.title, body: req.body.body, attachments: req.body.attachments || [] };
    const post = await discussionModel.createDiscussion(payload);
    res.status(201).json({ success:true, data: post });
  } catch (err) { next(err); }
}

export async function getDiscussions(req, res, next) {
  try {
    const { spaceId } = req.params;
    const rows = await discussionModel.getDiscussionsBySpace(spaceId);
    res.json({ success:true, data: rows });
  } catch (err) { next(err); }
}

export async function react(req, res, next) {
  try {
    const { postId } = req.params;
    const { type } = req.body;
    await reactionModel.reactToDiscussion(postId, req.user.id, type || 'like');
    const stats = await reactionModel.getReactionsForDiscussion(postId);
    res.json({ success:true, data: stats });
  } catch (err) { next(err); }
}
