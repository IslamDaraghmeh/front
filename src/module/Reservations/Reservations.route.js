import { Router } from "express";
import * as contactRoute from './controller/Reservations.conroller.js'
import { auth } from './../../middleware/auth.js';
import { endpoint } from "./Reservation.endpoint.js";
endpoint
const contactRouter=Router()
contactRouter.post('/add',auth(endpoint.add), contactRoute.AddContact)
contactRouter.get('/all',contactRoute.ShowAll)
export default contactRouter

