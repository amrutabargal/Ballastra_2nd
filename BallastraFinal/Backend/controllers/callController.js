import {
    createCall,
    updateCallStatus,
    getCallById,
    listCalls,
    saveSDP,
    addIceCandidate
} from "../models/callModel.js";

// Start a call
export async function startCall(req, res, next) {
    try {
        const { receiver_id, call_type } = req.body;

        const call = await createCall({
            caller_id: req.user.id,
            receiver_id,
            call_type
        });

        res.json({ success: true, data: call });
    } catch (err) { next(err); }
}

// Accept call
export async function acceptCall(req, res, next) {
    try {
        const { call_id } = req.body;
        const call = await updateCallStatus(call_id, "accepted");
        res.json({ success: true, data: call });
    } catch(err){ next(err) }
}

// End call
export async function endCall(req, res, next) {
    try {
        const { call_id } = req.body;
        const call = await updateCallStatus(call_id, "ended");
        res.json({ success: true, data: call });
    } catch(err){ next(err) }
}

// Missed call
export async function missedCall(req, res, next) {
    try {
        const { call_id } = req.body;
        const call = await updateCallStatus(call_id, "missed");
        res.json({ success: true, data: call });
    } catch(err){ next(err) }
}

// Get call history
export async function getHistory(req, res, next) {
    try {
        const calls = await listCalls(req.user.id);
        res.json({ success: true, data: calls });
    } catch(err){ next(err) }
}

// Save WebRTC SDP
export async function saveSDPController(req, res) {
    const { call_id, offer, answer } = req.body;
    const session = await saveSDP(call_id, offer, answer);
    res.json({ success: true, data: session });
}

// Save ICE candidate
export async function addIce(req, res) {
    const { session_id, candidate } = req.body;
    const session = await addIceCandidate(session_id, candidate);
    res.json({ success: true, data: session });
}
