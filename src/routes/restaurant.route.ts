import { Router,Request,Response } from "express";
import { createRestaurant, getAllRestaurants, getRestaurantById, getRestaurantsByProximity, getRestaurantsByProximityRange } from "../service/restaurant.service";



const CreatingRestaurant = Router()


CreatingRestaurant.post('/', async (req:Request,res:Response) => {
  try  {
      const response = await createRestaurant(req?.body)
      res.send(response)
  }
  catch (err:any) {
      res.send(err?.message)
  }
})

CreatingRestaurant.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getRestaurantById(id);
    res.json(response);
  } catch (err: any) {
    res.json({ message: err.message });
  }
});

CreatingRestaurant.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;
    const response = await getAllRestaurants(filters, Number(page), Number(limit));
    res.json(response);
  } catch (err: any) {
    res.json({ message: err.message });
  }
});


CreatingRestaurant.post('/proximity', async (req, res) => {
  try {
    const { latitude, longitude, radius } = req.body;
    const response = await getRestaurantsByProximity(latitude, longitude, radius);
    res.json(response);
  } catch (err: any) {
    res.json({ message: err.message });
  }
});

CreatingRestaurant.post('/proximity/distance', async (req, res) => {
  try {
    const { latitude, longitude, minimumDistance,maximumDistance } = req.body;
    const response = await getRestaurantsByProximityRange(latitude, longitude, minimumDistance,maximumDistance);
    res.json(response);
  } catch (err: any) {
    res.json({ message: err.message });
  }
});







export default CreatingRestaurant