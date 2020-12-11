import express from 'express';
import { GalleryItem } from '../db/schema';
import createDummyData from '../db/dummy-data';
import mongooseCrudify from 'mongoose-crudify';

const router = express.Router();

/**
 * Use default mongoose-crudify to add List, Create, Read, Update, and Delete operations for gallery items
 */
router.use('/galleryItems', mongooseCrudify({
    Model: GalleryItem
}));

/**
 * When making a GET request to "/api/init", clear the database and re-add the starting data.
 * 
 * For testing purposes!
 */
router.get('/init', async (req, res) => {
    await createDummyData();
    res.redirect('/api/galleryItems');
});

export default router;