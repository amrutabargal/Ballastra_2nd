import { 
  createNexus as createNexusModel,
  getMyNexus as getMyNexusModel,
  getPublicNexus as getPublicNexusModel,
  getNexusById as getNexusByIdModel,
  updateNexus as updateNexusModel,
  deleteNexus as deleteNexusModel,
  addMember
} from "../models/nexusModel.js";


export const createNexus = async(req, res, next)=> {
  try {
    const { name, type, icon, description, is_public } = req.body;
    const createdBy = req.user.id;

    const nexus = await createNexusModel({
      name,
      type,
      icon,
      description,
      created_by: createdBy,
      is_public
    });

    await addMember(nexus.id, createdBy, 'owner');

    res.status(201).json({ success: true, data: nexus });

  } catch (err) { next(err); }
};


export const getMyNexus = async(req, res, next)=> {
  try {
    const list = await getMyNexusModel(req.user.id);
    res.json({ success: true, data: list });
  } catch (err) { next(err); }
};


export const getPublicNexus = async(req, res, next)=> {
  try {
    const list = await getPublicNexusModel();
    res.json({ success: true, data: list });
  } catch (err) { next(err); }
};


export const getNexusById = async(req, res, next)=> {
  try {
    const { id } = req.params;
    const nexus = await getNexusByIdModel(id);

    if (!nexus)
      return res.status(404).json({ success:false, message:'Nexus not found' });

    res.json({ success:true, data: nexus });

  } catch (err) { next(err); }
};


export const updateNexus = async(req, res, next)=> {
  try {
    const updated = await updateNexusModel(req.params.id, req.body);
    res.json({ success:true, data: updated });
  } catch (err) { next(err); }
};


export const deleteNexus = async(req, res, next)=> {
  try {
    await deleteNexusModel(req.params.id);
    res.json({ success:true, message:'Deleted' });
  } catch (err) { next(err); }
};

export async function searchNexusHandler(req, res, next) {
  try {
    const q = String(req.query.q || '').trim();
    if (!q) return res.json({ success:true, data: [] });
    const sql = `SELECT id, name, description FROM nexus WHERE name ILIKE $1 OR description ILIKE $1 LIMIT 50`;
    const { rows } = await pool.query(sql, [`%${q}%`]);
    res.json({ success:true, data: rows });
  } catch (err) { next(err); }
}

export async function updateAppearanceHandler(req, res, next) {
  try {
    const { nexusId } = req.params;
    const appearance = req.body; // store JSON with theme/blur/categories
    const updated = await nexusModel.updateNexus(nexusId, { appearance });
    await activityModel.logActivity({ nexus_id: nexusId, user_id: req.user.id, action: 'nexus_appearance_updated', meta: { appearance } });
    res.json({ success:true, data: updated });
  } catch (err) { next(err); }
}

// upload icon handler (uses multer middleware same as iconRoutes)
// assume file is in req.file
export async function uploadNexusIconHandler(req, res, next) {
  try {
    if (!req.file) return res.status(400).json({ success:false, message:'No file' });
    const filename = req.file.filename;
    const { nexusId } = req.params;
    const updated = await nexusModel.updateNexus(nexusId, { icon: `/uploads/icons/${filename}` });
    await activityModel.logActivity({ nexus_id: nexusId, user_id: req.user.id, action: 'nexus_icon_uploaded', meta: { icon: updated.icon } });
    res.json({ success:true, data: updated });
  } catch (err) { next(err); }
}
