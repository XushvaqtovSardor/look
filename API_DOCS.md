# API Documentation

## Base URL
```
http://localhost:3000
```

## Endpoints

### Users

#### Create User
```
POST /users
Content-Type: application/json

{
  "fullname": "John Doe",
  "phone": "+998901234567"
}
```

#### Get All Users
```
GET /users/all
```

#### Get User By ID
```
GET /users/:id
```

### Foods

#### Create Food
```
POST /foods
Content-Type: application/json

{
  "food_name": "Cola",
  "food_img": "/uploads/cola.jpeg"
}
```

#### Get All Foods
```
GET /foods/all
```

#### Get Food By ID
```
GET /foods/:id
```

### Orders

#### Create Order
```
POST /orders
Content-Type: application/json

{
  "userId": 1,
  "foodId": 1,
  "count": 2
}
```

#### Get User Orders
```
GET /orders/user/:userId
```

### Static Files

#### Access Uploaded Images
```
GET /uploads/:filename
Example: http://localhost:3000/uploads/cola.jpeg
```

## Database Setup (Neon)

1. Create account at https://neon.tech
2. Create new project
3. Copy connection details
4. Create .env file:
```
DB_HOST=your-neon-host.neon.tech
DB_PORT=5432
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
PORT=3000
```

## Railway Deployment

1. Install Railway CLI or use dashboard
2. Create new project
3. Add PostgreSQL database or connect Neon
4. Set environment variables
5. Deploy:
```bash
railway up
```

## Initial Food Data

After deployment, create foods:
```bash
POST /foods
[
  {"food_name": "Cola", "food_img": "/uploads/cola.jpeg"},
  {"food_name": "Fanta", "food_img": "/uploads/fanta.jpeg"},
  {"food_name": "Burger Cheese", "food_img": "/uploads/burger_cheese.jpeg"},
  {"food_name": "Chicken Togora", "food_img": "/uploads/chicken_togora.jpeg"},
  {"food_name": "Chicken Wings", "food_img": "/uploads/chicken_wings.jpeg"},
  {"food_name": "Combo", "food_img": "/uploads/combo.jpeg"},
  {"food_name": "Spinner", "food_img": "/uploads/spinner.jpeg"}
]
```
