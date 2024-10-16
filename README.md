
# SPARKS - BACKEND 

1.open the project file and launch the terminal. Enter the following command:"npm install"

2.This command will install all the project dependencies and modules.

3.In the dbconfig.ts file, I've included MongoDB connection details. Replace the connection URL, username, and password with your own details in the .env file.

5.After successfully installing the npm packages, run the following command: "npm run dev"

6.If the server starts successfully, you will see the following message:
     Server is running on port 3000
     MongoDB Connected

7.API Endpoints:

Task 1: Create a restaurant: POST http://localhost:3000/api/restaurants/Restaurant-details/
       Get all restaurant details: GET http://localhost:3000/api/restaurants/Restaurant-details/
       
Task 2:
       Get restaurant details within a radius: GET http://localhost:3000/api/restaurants/Restaurant-details/proximity
Task 3:
       Get restaurants within a specific proximity range: GET http://localhost:3000/api/restaurants/Restaurant-details/proximity/distance


