# Random Users

This API application is random users. It's give a randomly user. This API working for randomly user, all user, limited user, save user, updpate user, multiple update, and delete.


## API


Main API : [https://radom-user.onrender.com/api/v1/](https://radom-user.onrender.com/api/v1/)

### End Point

 **GET/user/random** A random user
  * Get a random user from the all users


 **GET/user/all** A list of random users
  * Get all users
  * Send query to max=number, Get limit users

 **POST /user/save** Save a random user
  * Save a user in the random users
  * Send a JSON on body
    * id: is required, type number
    * name: is required, type string
    * gender: is required, type string
    * contact: is required, type string
    * address: is required, type string
    * photoUrl: is required, type string


 **PATCH/user/update** Update a random user
  * Send id on body
  * Id type number
  * Content-Type: json

 **PATCH/user/bulk-update** Update a random user

  * Send json on body
  * JSON is array of object
  * Object include id type number 
