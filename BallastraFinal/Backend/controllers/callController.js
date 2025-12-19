import {
    createCall,
    updateCallStatus,
    getCallById,
    listCalls
  } from "../models/callModel.js";
  
  /**
   * 1️⃣ Start a call (DM or Voice Channel)
   * REST = metadata only
   */
  export async function startCall(req, res, next) {
    try {
      const {
        receiver_id = null,   // for DM calls
        channel_id = null,    // for voice channel calls
        call_type             // voice | video
      } = req.body;
  
      const call = await createCall({
        caller_id: req.user.id,
        receiver_id,
        channel_id,
        call_type,
        status: "ringing"
      });
  
      res.status(201).json({ success: true, data: call });
    } catch (err) {
      next(err);
    }
  }
  
  /**
   * 2️⃣ Accept call
   */
  export async function acceptCall(req, res, next) {
    try {
      const { call_id } = req.body;
  
      const call = await updateCallStatus(call_id, "accepted");
      res.json({ success: true, data: call });
    } catch (err) {
      next(err);
    }
  }
  
  /**
   * 3️⃣ End call
   */
  export async function endCall(req, res, next) {
    try {
      const { call_id } = req.body;
  
      const call = await updateCallStatus(call_id, "ended");
      res.json({ success: true, data: call });
    } catch (err) {
      next(err);
    }
  }
  
  /**
   * 4️⃣ Missed call
   */
  export async function missedCall(req, res, next) {
    try {
      const { call_id } = req.body;
  
      const call = await updateCallStatus(call_id, "missed");
      res.json({ success: true, data: call });
    } catch (err) {
      next(err);
    }
  }
  
  /**
   * 5️⃣ Get call history (DM + voice channel)
   */
  export async function getHistory(req, res, next) {
    try {
      const calls = await listCalls(req.user.id);
      res.json({ success: true, data: calls });
    } catch (err) {
      next(err);
    }
  }
  