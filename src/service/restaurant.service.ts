import RestaurantModel from '../models/Restaurant.model';



export const createRestaurant = async (data: any) => {
  try {
    const { name, description, latitude, longitude, averageRating, noOfRatings } = data;

   
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude], 
    };

   
    const existingRestaurant = await RestaurantModel.findOne({
      name,
      'location.coordinates': [longitude, latitude], 
      is_deleted: false,
    });

    if (!existingRestaurant) {
      
      const restaurantData = {
        name,
        description,
        location, 
        averageRating,
        noOfRatings,
      };

     
      const newRestaurant = await RestaurantModel.create(restaurantData);

      return { message: 'success', restaurant: newRestaurant };
    } else {
      return { message: 'Restaurant already exists at this location' };
    }
  } catch (err: any) {
    return { message: err.message };
  }
};

  


export const getRestaurantById = async (id: string) => {
    try {
      const restaurant = await RestaurantModel.findById(id);
      if (restaurant && !restaurant.is_deleted) {
        return { message: 'success', restaurant };
      } else {
        return { message: 'Restaurant not found or is deleted' };
      }
    } catch (err: any) {
      return { message: err.message };
    }
};
  
 
export const getAllRestaurants = async (filters: any, page: number = 1, limit: number = 10) => {
    try {
      const query = { is_deleted: false, ...filters };
      const skip = (page - 1) * limit;
  
      
      const restaurants = await RestaurantModel.find(query)
        .skip(skip)
        .limit(limit)
        .lean();
  
      
      const total = await RestaurantModel.countDocuments(query);
  
      return {
        message: 'success',
        restaurants,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalRestaurants: total,
        },
      };
    } catch (err: any) {
      return { message: err.message };
    }
};
  
  
export const getRestaurantsByProximity = async (latitude: number, longitude: number, radius: number) => {
    try {
      const restaurants = await RestaurantModel.find({
        location: {
          $geoWithin: {
            $centerSphere: [[longitude, latitude], radius / 6378137], 
          },
        },
        is_deleted: false,
      }).lean();
  
      return { message: 'success', restaurants };
    } catch (err: any) {
      return { message: err.message };
    }
};

export const getRestaurantsByProximityRange  = async (latitude: number, longitude: number, minimumDistance : number,maximumDistance  :number) => {
  try {
    const restaurants = await RestaurantModel.find({
      location: {
        $geoWithin: {
          $centerSphere: [[longitude, latitude], (maximumDistance - minimumDistance) / 6378137], 
        },
      },
      is_deleted: false,
    }).lean();

    return { message: 'success', restaurants };
  } catch (err: any) {
    return { message: err.message };
  }
};










