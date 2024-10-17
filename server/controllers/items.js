import { pool } from '../config/database.js'

const getItems = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM CustomItem');
        res.status(200).json(results.rows)

    }
    catch (error) {
        res.status(409).json( { error: error.message } )
      }
};
const getExteriors = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM exteriors');
        res.status(200).json(results.rows)

    }
    catch (error) {
        res.status(409).json( { error: error.message } )
      }
};

const getExteriorById = async (req, res) => {
    const { id } = req.params; 
    try {
        const results = await pool.query('SELECT * FROM exteriors WHERE id = $1', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(results.rows[0]); 
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const getInteriors = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM interiors');
        res.status(200).json(results.rows)

    }
    catch (error) {
        res.status(409).json( { error: error.message } )
      }
};

const getInteriorById = async (req, res) => {
    const { id } = req.params; 
    try {
        const results = await pool.query('SELECT * FROM interiors WHERE id = $1', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(results.rows[0]); 
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const getRoofs = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM roofs');
        res.status(200).json(results.rows)

    }
    catch (error) {
        res.status(409).json( { error: error.message } )
      }
};

const getRoofById = async (req, res) => {
    const { id } = req.params; 
    try {
        const results = await pool.query('SELECT * FROM roofs WHERE id = $1', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(results.rows[0]); 
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const getWheels = async (req, res) => {
    try{
        const results = await pool.query('SELECT * FROM wheels');
        res.status(200).json(results.rows)

    }
    catch (error) {
        res.status(409).json( { error: error.message } )
      }
};

const getWheelById = async (req, res) => {
    const { id } = req.params; 
    try {
        const results = await pool.query('SELECT * FROM wheels WHERE id = $1', [id]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(results.rows[0]); 
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const createItem = async (req, res) => {
    try {
        const { name, pricepoint, audience, image, description, submittedby, submittedon } = req.body
        const results = await pool.query(`
            INSERT INTO gifts (name, pricepoint, audience, image, description, submittedby, submittedon)
            VALUES($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [name, pricepoint, audience, image, description, submittedby, submittedon]
        )
  
        res.status(201).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
  }

  const updateItem = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const { name, pricepoint, audience, image, description, submittedby, submittedon } = req.body
        const results = await pool.query(`
            UPDATE gifts SET name = $1, pricepoint = $2, audience = $3, image = $4, description = $5, submittedby = $6, submittedon= $7 WHERE id = $8`,
            [name, pricepoint, audience, image, description, submittedby, submittedon, id]
        )
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
  }

  const deleteItem   = async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const results = await pool.query('DELETE FROM gifts WHERE id = $1', [id])
        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
  }

  
const ItemsController = {
    getItems,
    getExteriors,
    getExteriorById,
    getInteriors,
    getInteriorById,
    getRoofs,
    getRoofById,
    getWheels,
    getWheelById,
    createItem,   
    updateItem,  
    deleteItem,           
  }
  
  export default ItemsController;