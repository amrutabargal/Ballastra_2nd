import pool from '../config/db.js'; 

export const createNexus = async({ name, type, icon, description, created_by, is_public })=> {
  const q = `INSERT INTO nexus (name, type, icon, description, created_by, is_public)
             VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`;
  const values = [name, type, icon, description, created_by, is_public ?? false];
  const { rows } = await pool.query(q, values);
  return rows[0];
}

export const getNexusById = async(id)=> {
  const { rows } = await pool.query('SELECT * FROM nexus WHERE id=$1', [id]);
  return rows[0];
}

export const getMyNexus = async(userId)=> {
  const q = `
    SELECT n.*
    FROM nexus n
    JOIN nexus_members m ON m.nexus_id = n.id
    WHERE m.user_id = $1
    ORDER BY n.created_at DESC
  `;
  const { rows } = await pool.query(q, [userId]);
  return rows;
}

export const getPublicNexus = async()=> {
  const { rows } = await pool.query('SELECT * FROM nexus WHERE is_public=true ORDER BY created_at DESC');
  return rows;
}

export const updateNexus = async(id, fields = {})=> {
  // build set clause dynamically
  const keys = Object.keys(fields);
  if (!keys.length) return getNexusById(id);
  const set = keys.map((k, i) => `${k} = $${i+1}`).join(', ');
  const vals = keys.map(k => fields[k]);
  vals.push(id);
  const q = `UPDATE nexus SET ${set}, updated_at = now() WHERE id = $${vals.length} RETURNING *`;
  const { rows } = await pool.query(q, vals);
  return rows[0];
}

export const deleteNexus = async(id) =>{
  await pool.query('DELETE FROM nexus WHERE id=$1', [id]);
  return;
}

export const addMember = async(nexusId, userId, role='owner')=> {
  const q = `INSERT INTO nexus_members (nexus_id, user_id, role) VALUES ($1,$2,$3) RETURNING *`;
  const { rows } = await pool.query(q, [nexusId, userId, role]);
  return rows[0];
}

