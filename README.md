# Microservices
A simple stateless microservice in Nodejs, with two major functionalities - Authentication and Image Thumbnail Generation 

## Setup

The API requires [Node.js](https://nodejs.org/en/download/)

To get up and running: 

**1.** Clone the repo.
```
git clone https://github.com/sugam45/Microservices.git
```

**2.**  ```cd``` into repo. Use the same directory name(below) if you do not change it.
```
cd Microservices
```

**3.**  Setup the application by installing its dependencies with
```
npm install
```

**4.**  The app gets up and running on port 3000 with ```npm start```.

**5.**  **Important** Edit the ```env``` variables in _nodemon.json_ file and set ```jwtSecret``` to any secret phrase you want.

**4.** Make sure to also add your Mongo Atlas Admin Username to a _nodemon.json_ file and change the ```moongoose.connect``` address in _app.js:11_ to your needs.

```
{
    "env": {
        "MONGO_ATLAS_PW": "ATLAS_PW",
        "JWT_KEY": "KEY"
    }
}
```
 

## Testing the API routes.

Since this is mostly an API with post requests, testing will be done with [Postman](https://www.getpostman.com/)

### Authentication
This is a mock authentication so you can pass in any username or password to login.
 1. Set the request to **POST** and the url to _/api/user/signup_. 
 2. In the **Body** for the Postman request, select **raw** with **JSON** format.
 3. You will be setting 2 keys (for email and password). Set the ```email``` key to any name. Set ```password``` to any password.
 4. Hit ```Send```. You will get a result in this format:
 ```
 {
    "message": "Signup sucessful"
}
 ```
 5. The email id and password(after getting hashed by [bcrypt](https://www.npmjs.com/package/bcrypt)) will be stored in an online **MongoDB** database.
 6. For login Set the request to **POST** and the url to _/api/user/login_. 
 7. In the **Body** for the Postman request, select **raw** with **JSON** format.
 8. You will be setting 2 keys (for email and password). Set the ```email``` and ```password``` to the previously assigned values.
 9. Hit ```Send```. You will get a result in this format:
 ```
 {
    "message": "Auth successful",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdDEuY29tIiwidXNlcklkIjoiNWVjZDEwNWM5MDBhYmQ4Y2I0MTAzMDFmIiwiaWF0IjoxNTkwNDk3Mzc4LCJleHAiOjE1OTA1MDA5Nzh9.OdQcXpdZcWKIZ6xrERpGwULExS2oi2RwxqO7itW6scw"
}
 ```


 ### Image Thumbnail Generation
This request resizes to an image to 50x50 pixels, and returns the resulting thumbnail as well as the originol image.
 1. Set the request to **POST** and the url to _/api/products_.
 2. Since this is a secure route, for testing, you will have to set the token in the ```Header```. Set key as ```Authorization``` and value as token you received from **Authentication**.
 3. In the ```Body```, select **form-data** format and set the key as ```productImage``` with **File** and browse to the image you want to genrate a thumbnail of.
 4. The Image will be then converted to a thumbnail of size 50x50 pixels with a sample result as below:
 ```
{
    "message": "Uploaded Image successfully",
    "createdProduct": {
        "productImage": "uploads/pexels.jpeg"
    }
}
```

## Built With

 * [Node.js](https://nodejs.org)
 * [Express](https://expressjs.com/)
