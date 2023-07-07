import { Prisma, PrismaClient } from "@prisma/client";
import { getFileSize, getVvidFromCode, isVideoFile } from "../utils";
const fs = require("fs");
import express, { query } from "express";
const path = require("path");
var cors = require("cors");
const prisma = new PrismaClient();

const router = express.Router();



export default router;
