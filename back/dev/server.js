"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const server = (0, express_1.default)();
const morgan = require("morgan");
const cors = require("cors");
server.use(morgan('dev'));
server.use(cors());
server.use(express_1.default.json());
server.use(routes_1.default);
exports.default = server;
