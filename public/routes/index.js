"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurant_route_1 = __importDefault(require("./restaurant.route"));
const Routers = (0, express_1.Router)();
Routers.use('/Restaurant-details', restaurant_route_1.default);
exports.default = Routers;
