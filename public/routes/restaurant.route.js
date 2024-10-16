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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurant_service_1 = require("../service/restaurant.service");
const CreatingRestaurant = (0, express_1.Router)();
CreatingRestaurant.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, restaurant_service_1.createRestaurant)(req === null || req === void 0 ? void 0 : req.body);
        res.send(response);
    }
    catch (err) {
        res.send(err === null || err === void 0 ? void 0 : err.message);
    }
}));
CreatingRestaurant.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const response = yield (0, restaurant_service_1.getRestaurantById)(id);
        res.json(response);
    }
    catch (err) {
        res.json({ message: err.message });
    }
}));
CreatingRestaurant.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _a = req.query, { page = 1, limit = 10 } = _a, filters = __rest(_a, ["page", "limit"]);
        const response = yield (0, restaurant_service_1.getAllRestaurants)(filters, Number(page), Number(limit));
        res.json(response);
    }
    catch (err) {
        res.json({ message: err.message });
    }
}));
CreatingRestaurant.post('/proximity', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { latitude, longitude, radius } = req.body;
        const response = yield (0, restaurant_service_1.getRestaurantsByProximity)(latitude, longitude, radius);
        res.json(response);
    }
    catch (err) {
        res.json({ message: err.message });
    }
}));
CreatingRestaurant.post('/proximity/distance', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { latitude, longitude, minimumDistance, maximumDistance } = req.body;
        const response = yield (0, restaurant_service_1.getRestaurantsByProximityRange)(latitude, longitude, minimumDistance, maximumDistance);
        res.json(response);
    }
    catch (err) {
        res.json({ message: err.message });
    }
}));
exports.default = CreatingRestaurant;
