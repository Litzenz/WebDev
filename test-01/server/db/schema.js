import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const galleryItemSchema = new Schema({
    favouriting: {type: Boolean, required: false},
    title: { type: String, required: true },
    created: { type: Date, required: true },
    imageUrl: { type: String, required: true },
    thumbnailUrl: { type: String, required: true }
});

export const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);