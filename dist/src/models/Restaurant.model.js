"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const restaurantSchema = new mongoose.Schema({
    name: { type: String },
    description: { type: String },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    averageRating: { type: Number },
    noOfRatings: { type: Number },
    is_deleted: { type: Boolean, default: false }
}, { timestamps: true });
restaurantSchema.index({ 'location': '2dsphere' });
const RestaurentModal = mongoose.model('restaurants', restaurantSchema);
exports.default = RestaurentModal;
