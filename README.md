# WorkWise API

This is an e-commerce API built using Node.js, Express, and Sequelize for PostgreSQL. The API allows users to register, log in, add/edit/delete products, search products, and manage a shopping cart.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL (v12 or later)
- npm (v6 or later)

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Jatin-Lalit/workwise.git
   cd workwise

   ```

2. **npm install**

3. **Create a .env file in the root directory with the following keys:**
   PORT=3000
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=your_db_name
   JWT_SECRET=your_jwt_secret

4. **Update config.json in the config folder with your database credentials**

5. **Run the server:**

# API Documentation

## Authentication

Register
URL: /api/auth/register
Method: POST
Description: Register a new user.
Request Body
{
"name": "John Doe",
"email": "john.doe@example.com",
"password": "password123",
"role": "buyer" // or "seller"
}

## Login

URL: /api/auth/login
Method: POST
Description: Log in a user.
Request Body
{
"email": "john.doe@example.com",
"password": "password123"
}

## Add Product

URL: /api/products/add
Method: POST
Description: Add a new product (seller only).
Headers:
Authorization: Bearer jwt_token_here
Request Body
{
"name": "Product Name",
"category": "Category",
"description": "Product Description",
"price": 100,
"discount": 10
}

## Edit Product

URL: /api/products/edit/:productId
Method: PUT
Description: Edit an existing product (seller only).
Headers:
Authorization: Bearer jwt_token_here
Request Body
{
"name": "Updated Product Name",
"category": "Updated Category",
"description": "Updated Description",
"price": 120,
"discount": 15
}

## Delete Product

URL: /api/products/delete/:productId
Method: DELETE
Description: Delete a product (seller only).
Headers:
Authorization: Bearer jwt_token_here

## Search Products

URL: /api/products/search
Method: GET
Description: Search for products by name or category.
Query Parameters:
name (optional)
category (optional)

## Get All Products

URL: /api/products/all
Method: GET
Description: Get all products.

## Add to Cart

URL: /api/cart/add
Method: POST
Description: Add a product to the cart.
Headers:
Authorization: Bearer jwt_token_here
Request Body
{
"productId": 1,
"quantity": 2
}

## Remove from Cart

URL: /api/cart/remove/:cartId
Method: DELETE
Description: Remove a product from the cart.
Headers:
Authorization: Bearer jwt_token_here

## View Cart

URL: /api/cart/view
Method: GET
Description: View the contents of the cart.
Headers:
Authorization: Bearer jwt_token_here
