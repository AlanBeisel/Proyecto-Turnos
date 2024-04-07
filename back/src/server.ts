import express from "express";
import router from "./routes";

const server = express();
const morgan =require("morgan")
const cors= require("cors")



server.use(morgan('dev'))
server.use(cors())
server.use(express.json())
server.use(router)

export default server;