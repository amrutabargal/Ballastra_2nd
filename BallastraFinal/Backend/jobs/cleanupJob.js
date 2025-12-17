import cron from 'node-cron';
import pool from '../config/db.js';

export const startCleanupJob = () => {
  cron.schedule('0 * * * *', async () => {
    try {
      await pool.query(`
        DELETE FROM users
        WHERE is_verified = false
        AND created_at < NOW() - INTERVAL '24 hours'
      `);
      console.log('Unverified users cleanup done');
    } catch (err) {
      console.error('Cleanup job failed:', err);
    }
  });
};
