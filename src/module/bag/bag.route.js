import { Router } from "express";
import * as bagRouter from './controller/bag.controller.js'
import { auth } from "../../middleware/auth.js";
import { endpoints } from "./bag.endpoint.js";
const Bagrouter = Router()
Bagrouter.post('/add', auth(endpoints.add), bagRouter.AddToBag)
Bagrouter.patch('/addCart', auth(endpoints.add), bagRouter.addToCartFromLocalstorage)
// Bagrouter.delete('/delet/:itemId/:id' , auth(endpoints.delet), bagRouter.deletFrombag)
Bagrouter.delete('/delete', auth(endpoints.delet), bagRouter.deletFrombag)

Bagrouter.delete('/deleteItem', auth(endpoints.delet), bagRouter.deleteItemFromCart)

// Bagrouter.get('/all/:madeby', auth(endpoints.show), bagRouter.showAll)
Bagrouter.get('/get', auth(endpoints.show), bagRouter.getCart)

// Bagrouter.patch('/decrease/:itemId/:id', auth(endpoints.add), bagRouter.decreaseRequestTimes)
// Bagrouter.get('/total/:id', auth(endpoints.add), bagRouter.Total)
// Bagrouter.get('/:id', bagRouter.getUserCart)

export default Bagrouter