import './config/db.js';
import express from 'express';
import dotenv from 'dotenv';
import './config/db.js';
import path from 'path';
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import nexusRoutes from "./routes/nexusRoutes.js";
//import iconRoutes from "./routes/iconRoutes.js";
//import inviteRoutes from"./routes/inviteRoutes.js";
import membersRoutes from './routes/membersRoutes.js';
import spacesRoutes from './routes/spacesRoutes.js';
import discussionRoutes from './routes/discussionRoutes.js';
import pulseRoutes from './routes/pulseRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import orbitRoutes from "./routes/orbitRoutes.js";
import callRoutes from "./routes/callRoutes.js";



dotenv.config();
const app = express();


app.use(express.json());


// serve uploads
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
app.use('/auth', authRoutes);
app.use("/user", userRoutes);
app.use('/api/nexus', nexusRoutes);
//app.use('/api/nexus/icons', iconRoutes);  // note: iconRoutes has GET '/' - becomes /api/nexus/icons/
//app.use('/api/invite', inviteRoutes);
app.use('/api/members', membersRoutes);
app.use('/api/spaces', spacesRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/pulses', pulseRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/activity', activityRoutes);
app.use("/api/orbit", orbitRoutes);
app.use("/api/call", callRoutes);

//const PORT = process.env.PORT || ;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.listen(3000, "0.0.0.0", () => {
  console.log("Server running on port 3000");
});
