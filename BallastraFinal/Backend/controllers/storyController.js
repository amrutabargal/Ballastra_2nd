import * as storyModel from "../models/storyModel.js";

/**
 * Create story (media URLs already uploaded to S3)
 */
export async function createStory(req, res, next) {
  try {
    const { items } = req.body; 
    // items = [{ media_url, media_type }]

    const story = await storyModel.createStory(req.user.id);

    for (const item of items) {
      await storyModel.addStoryItem(
        story.id,
        item.media_url,
        item.media_type
      );
    }

    res.status(201).json({ success:true, data: story });
  } catch (err) { next(err); }
}

/**
 * View all active stories
 */
export async function listStories(req, res, next) {
  try {
    const rows = await storyModel.getActiveStories();
    res.json({ success:true, data: rows });
  } catch (err) { next(err); }
}

/**
 * View my stories
 */
export async function myStories(req, res, next) {
  try {
    const rows = await storyModel.getMyStories(req.user.id);
    res.json({ success:true, data: rows });
  } catch (err) { next(err); }
}

/**
 * Delete story
 */
export async function deleteStory(req, res, next) {
  try {
    await storyModel.deleteStory(req.params.storyId, req.user.id);
    res.json({ success:true, message:"Story deleted" });
  } catch (err) { next(err); }
}
