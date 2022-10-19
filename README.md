# Random Users

This API application is random users. It's give a randomly user. This API working for randomly user, all user, limited user, save user, updpate user, multiple update, and delete.


## API Reference

Main API : [https://radom-user.onrender.com/api/v1/](https://radom-user.onrender.com/api/v1/)


#### Get random user

```http
 GET/user/random
```
#### Get all random users

```http
 GET/user/all
 GET/user/all?max=number
```
#### Save a random user
```http
 POST/user/save
```

| Object key | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `number` | **Required**. user id |
| `name` | `string` | **Required**. user user |
| `gender` | `string` | **Required**. user gender |
| `contact` | `any` | **Required**. user contact info |
| `address` | `string` | **Required**. user address info |
| `photoUrl` | `string` | **Required**. user photo url |

#### Update a random user
```http
 PATCH/user/save
```

| Object key | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `number` | **Required**. user id |


#### Update multiple users
```http
 PATCH/user/bulk-update
```

Send a array on json

| Object key | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `number` | **Required**. user id |


Thank you! ❤️❤️
