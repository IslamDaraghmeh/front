import { Router } from "express";
import { auth } from './../../middleware/auth.js';
import { endpoint } from "./basic.endpoint.js";
import { fileValidation, myMulter } from './../../services/multer.js';
