# Sequelize Back-end with TypeScript
This project is a back-end application built with Node.js, TypeScript, Express, and Sequelize ORM. The application demonstrates basic CRUD operations, image upload functionality, and a database schema setup with migrations and seeders.

# Getting Started
## Requirements
```
Node.js (>= 14.x)
npm (>= 6.x)
MySQL database
```

git clone https://github.com/your-repo/sequelize-back-typescript.git

cd sequelize-back-typescript

# Install dependence
``npm install``

# Configuration
### Database Configuration
Configure your database settings in the
config/config.json file. Ensure that the correct database credentials 
and settings are provided for each environment 
(development, test, production).

Example config/config.json:

```json
    {
      "development": {
        "username": "root",
        "password": null,
        "database": "tsStudyDbSequelize",
        "host": "127.0.0.1",
        "dialect": "mysql"
      },
      "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "mysql"
      },
      "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host": "127.0.0.1",
        "dialect": "mysql"
      }
    }
```

# Database Setup
### Migrations
To run migrations and set up the database schema, use the following command:
```shell
npm run db:migrate
```

# Seeders
To seed the database with initial data, use the following command:

```shell
npm run db:seed:all
```

# Running the Application
Start the development server:

```shell
npm start
```
# API Endpoints
### UserModel Endpoints
* Create UserModel
    * POST /api/users
    * Request Body: { "name": "John Doe", "email": "john@example.com" }
* Get UserModel
    * GET /api/users/:id
    * Response: UserModel data
* PUT /api/users/:id
    * Request Body: { "name": "John Doe", "email": "john@example.com" }
    * Response: Updated user data
* Upload Image
    * POST /api/images/upload
    * Form Data: image (file), userId (string)
    * Response: Uploaded image data
* Get Images
    * GET /api/images
    * Response: List of images

# Migrations and Seeders
## Creating Migrations
To create a new migration, use the following command:
```shell
npx sequelize-cli migration:generate --name migration-name
```

# Creating Seeders
To create a new seeder, use the following command:
```shell
npx sequelize-cli seed:generate --name seeder-name
```

# Example .sequelizerc File
To customize the path of your Sequelize configuration, 
you can create a .sequelizerc file in the root directory:

```js
const path = require('path');

module.exports = {
  'config': path.resolve('config', 'config.json'),
  'migrations-path': path.resolve('sequelize', 'migrations'),
  'seeders-path': path.resolve('sequelize', 'seeders'),
  'models-path': path.resolve('models')
};
```

# Additional Configuration
* Ensure the .sequelizerc file is properly set up to define the paths for models, migrations, and seeders.
* Define environment variables as needed, or use a .env file for configuration.
