import express from 'express';
import {
 createProduct,
 getProducts,
 updateProduct
 
} from "../controllers/productController.js";

const router = express.Router();

// Route to create a new product
router.post('/add', createProduct);

// Route to get all products
router.get('/', getProducts);

// Route to update a product by ID
router.put('/update/:id', updateProduct);



export default router;