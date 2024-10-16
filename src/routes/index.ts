import { Router } from "express"
import { authenticateUser } from "../middleware/auth"
import CreatingRestaurant from "./restaurant.route"




const Routers = Router()


Routers.use('/Restaurant-details',CreatingRestaurant)






export default Routers