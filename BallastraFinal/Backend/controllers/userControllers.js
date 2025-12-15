import { findUserById, updateProfile } from "../models/userModel.js";

export const getProfile = async (req, res) => {
    try {
        const user = await findUserById(req.user.id);

        if (!user) return res.status(404).json({ message: "User not found" });

        res.json({ user });

    } catch (err) {
        console.error("Profile Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

export const editProfile = async (req, res) => {
    try {
        const { name, avatar_url } = req.body;

        const updated = await updateProfile(req.user.id, name, avatar_url);

        res.json({
            message: "Profile updated",
            user: updated
        });

    } catch (err) {
        console.error("Update Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
