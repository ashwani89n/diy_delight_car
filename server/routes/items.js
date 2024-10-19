import express from 'express'
import path from 'path'
import ItemsController from '../controllers/items.js'

import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const itemsRoutes = express.Router()

itemsRoutes.get('/cars', ItemsController.getItems)
itemsRoutes.get('/cars/:id', ItemsController.getItemById)

itemsRoutes.get('/exteriors', ItemsController.getExteriors)
itemsRoutes.get('/exteriors/:id', ItemsController.getExteriorById)

itemsRoutes.get('/interiors', ItemsController.getInteriors)
itemsRoutes.get('/interiors/:id', ItemsController.getInteriorById)

itemsRoutes.get('/roofs', ItemsController.getRoofs)
itemsRoutes.get('/roofs/:id', ItemsController.getRoofById)

itemsRoutes.get('/wheels', ItemsController.getWheels)
itemsRoutes.get('/wheels/:id', ItemsController.getWheelById)

itemsRoutes.post('/cars', ItemsController.createItem);

itemsRoutes.delete('/cars/:id', ItemsController.deleteItem);

itemsRoutes.patch('/cars/:id', ItemsController.updateItem);

export default itemsRoutes;  