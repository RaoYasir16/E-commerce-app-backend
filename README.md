E-Commerce App (Node.js + MongoDB)
This is a complete backend for an e-commerce application built with Node.js, Express.js, and MongoDB. It supports role-based functionality for Admins and Users, email verification, JWT-based authentication, dynamic product/category management, and a live chat feature for Admin and User communication.

🔐 Authentication & Authorization

User Registration with email verification via a URL.

Email must be verified before login is allowed.

JWT (JSON Web Token) is issued on successful login.

Role-Based Access Control:

Admin: Can manage categories, products, orders, view carts, and use the live chat feature to communicate with users.

User: Can browse products, manage cart, place orders, and use the live chat feature to communicate with the Admin.

👤 Admin Features

Add, view, update, and delete Categories.

Add, view, update, and delete Products (with image upload).

When a Category is deleted, all its related Products are also deleted.

When a Product is deleted, its associated image is also removed from the server.

View all Orders placed by users.

View all items added to carts by users.

Live Chat: Admin can communicate in real-time with users via WebSocket for immediate support or inquiries.

🛒 User Features

View all available Products.

Add products to cart.

Checkout and place orders.

After placing an order, the products are removed from the user's cart and added to the orders collection.

Delete individual cart items.

Live Chat: Users can communicate with Admin in real-time via WebSocket to ask questions or resolve issues during their shopping experience.
