
# Eyeglass Management (Server)

Welcome to the Eyeglass Sales and User Authentication System! This application provides a platform for managing eyeglass sales and user authentication processes efficiently.

## Project Overview

Eyeglass Sales and User Authentication System is a web-based application developed to streamline the process of managing eyeglass sales and user authentication. It offers a range of features including user registration, login, eyeglass management, sales tracking, and more.

### Live URL

You can access the live version of the application at [Live Site](https://eye-glass-management-v2-client.vercel.app/).
[Live Server](https://eye-glass-management-v2-server.vercel.app/).

## Features

- **User Registration:** Allow users to register with the system by providing basic information.
- **User Authentication:** Secure user authentication system for accessing the application.
- **Eyeglass Management:** Add, update, delete, and retrieve eyeglass products with detailed specifications.
- **Sales Tracking:** Track eyeglass sales with information such as product ID, quantity, buyer details, and sale date.
- **Bulk Operations:** Perform bulk deletion of eyeglass products for efficient management.
- **Weekly Sales Report:** Retrieve weekly sales report based on specified date.

## Technology Stack

- **Backend Framework:** Node.js with Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **API Documentation:** Postman Collection

## Getting Started

To set up the application locally, follow these steps:

1. **Clone the Repository:**


```bash
git clone https://github.com/rashedrk/eyeglass-management-server.git
```

2. **Install dependencies**
```bash
cd eyeglass-management-server
npm install

```
3. **Set Environment Variables**
Create a .env file in the root directory and add the following variables:
```bash
PORT=5000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
```
4. **Run the Application**
```bash
npm start
```

5. **Access the Application:**
Open your web browser and navigate to `http://localhost:5000` to access the application.

## API Documentation

For detailed API documentation and request examples, refer to the [Postman Collection](https://documenter.getpostman.com/view/24260220/2sA3JNaLZu).

## Feedback and Contributions

We welcome your feedback and contributions to enhance the Eyeglass Sales and User Authentication System. Feel free to open issues, submit pull requests, or reach out to us with your suggestions.

## License

This project is licensed under the [MIT License](LICENSE).

