
| Object key | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `number` | **Required**. user id |


##### Example:

    {
      "id": 20,
    }


#### Update multiple users
```http
 PATCH/user/bulk-update
```

Send a array on json

| Object key | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `number` | **Required**. user id |

##### Example:

    [
      {
      "id": 19,
      "name": "Jahid Hasan",
      },
      {
      "id": 20,
      "contact": "example@gmail.com",
      },
    ]


#### Delete a random user
```http
 DELETE/user/delete
```

| Object key | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `number` | **Required**. user id |


##### Example:

    {
      "id": 20,
    }

