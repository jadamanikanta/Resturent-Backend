"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantsByProximityRange = exports.getRestaurantsByProximity = exports.getAllRestaurants = exports.getRestaurantById = exports.createRestaurant = void 0;
const Restaurant_model_1 = __importDefault(require("../models/Restaurant.model"));
const createRestaurant = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, latitude, longitude, averageRating, noOfRatings } = data;
        const location = {
            type: 'Point',
            coordinates: [longitude, latitude],
        };
        const existingRestaurant = yield Restaurant_model_1.default.findOne({
            name,
            'location.coordinates': [longitude, latitude],
            is_deleted: false,
        });
        if (!existingRestaurant) {
            const restaurantData = {
                name,
                description,
                location,
                averageRating,
                noOfRatings,
            };
            const newRestaurant = yield Restaurant_model_1.default.create(restaurantData);
            return { message: 'success', restaurant: newRestaurant };
        }
        else {
            return { message: 'Restaurant already exists at this location' };
        }
    }
    catch (err) {
        return { message: err.message };
    }
});
exports.createRestaurant = createRestaurant;
const getRestaurantById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurant = yield Restaurant_model_1.default.findById(id);
        if (restaurant && !restaurant.is_deleted) {
            return { message: 'success', restaurant };
        }
        else {
            return { message: 'Restaurant not found or is deleted' };
        }
    }
    catch (err) {
        return { message: err.message };
    }
});
exports.getRestaurantById = getRestaurantById;
const getAllRestaurants = (filters_1, ...args_1) => __awaiter(void 0, [filters_1, ...args_1], void 0, function* (filters, page = 1, limit = 10) {
    try {
        const query = Object.assign({ is_deleted: false }, filters);
        const skip = (page - 1) * limit;
        const restaurants = yield Restaurant_model_1.default.find(query)
            .skip(skip)
            .limit(limit)
            .lean();
        const total = yield Restaurant_model_1.default.countDocuments(query);
        return {
            message: 'success',
            restaurants,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                totalRestaurants: total,
            },
        };
    }
    catch (err) {
        return { message: err.message };
    }
});
exports.getAllRestaurants = getAllRestaurants;
const getRestaurantsByProximity = (latitude, longitude, radius) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield Restaurant_model_1.default.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[longitude, latitude], radius / 6378137],
                },
            },
            is_deleted: false,
        }).lean();
        return { message: 'success', restaurants };
    }
    catch (err) {
        return { message: err.message };
    }
});
exports.getRestaurantsByProximity = getRestaurantsByProximity;
const getRestaurantsByProximityRange = (latitude, longitude, minimumDistance, maximumDistance) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const restaurants = yield Restaurant_model_1.default.find({
            location: {
                $geoWithin: {
                    $centerSphere: [[longitude, latitude], (maximumDistance - minimumDistance) / 6378137],
                },
            },
            is_deleted: false,
        }).lean();
        return { message: 'success', restaurants };
    }
    catch (err) {
        return { message: err.message };
    }
});
exports.getRestaurantsByProximityRange = getRestaurantsByProximityRange;
