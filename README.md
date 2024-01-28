# Library Management System-Api

This is a Library Management System Api.

## Table of Contents

- [Toolbox](#toolbox)
- [Database Setup](#Database-Setup)
- [Setting Up the Environment](#setting-up-the-environment)
- [Endpoints ](#endpoints)
- [Author](#Author)
- [About](#about)

## Toolbox

- Typescript
- Express
- PostgreSQL

## Database Setup

**_PS_**: make sure you have a PostgreSQL server installed in your system. If not, refer to the PostgreSQL documentation on [www.postgresql.org](www.postgresql.org) to install the server.
<br></br>

The server application is configured to run with a Postgresql database running with the following settings:

- Host: localhost
- Port: 5432
- Database user: "postgres"
- Database name: "lib_mng_sys"
- Test database name: "lib_mng_sys_test"
- Create the database for devolpment and testing by followint the steps below.

## Setting Up the Environment

1. Install the requirements and dependancies

   ```sh
   $ npm install
   ```

2. Create the database <br>

   - In the Windows Command Prompt, run the command:

   ```sh
   $ psql -U userName
   ```

   - Enter your password when prompted.

   ```sh
   $ Your_Passowrd
   ```

   - Create a PostgreSQL user:

   ```sh
   $ CREATE USER postgres WITH PASSWORD '123456';
   ```

   - Run the following commands to create the main database used for `development` and the testing one:

   ```sh
   $ CREATE DATABASE lib_mng_sys WITH ENCODING 'UTF8';
   $ CREATE DATABASE lib_mng_sys_test WITH ENCODING 'UTF8';
   ```

   - Grant all database privileges to user in both databases:

   ```sh
   $ GRANT ALL PRIVILEGES ON DATABASE lib_mng_sys TO postgres;

   $ GRANT ALL PRIVILEGES ON DATABASE lib_mng_sys_test TO postgres;
   ```

   - Connect to development database `lib_mng_sys` using the command:

   ```sh
   $ \c lib_mng_sys
   ```

   - Terminate the process using the following command:

   ```sh
   $ \q
   ```

## Run Scripts

- Rename `.env.example` file to `.env`
- Write your PostgreSQL userName and password in `.env`

- Build the project

  ```sh
  $ npm run build
  ```

- install db-migrate npm package globally

  ```sh
  $ npm install -g db-migrate
  ```

- Migrate Database

  ```sh
  $ npm run migrate-dev-up
  ```

- Run the project

  - Host: localhost
  - Port: 3000

  ```sh
  $ npm run start
  ```

- Run tests <br>
  **_PS_**: Testing database will not be dropped after runnint the tests.

  ```sh
  $ npm run test
  ```

- To drop the `dev` or `test` database (For whatever the reason is).

  ```sh
  $ npm run drop-dev-db

  or

  $ npm run drop-test-db

  ```

---

## Endpoints

- Full API Documentation:
  [Go to the Documentation Page](https://documenter.getpostman.com/view/14046968/2s9YyqihQv#1cab5ea7-1cdd-4b37-9f95-e855ebc3e947)

| HTTP Method | Endpoint                                    | Description                                      | Access |
| ----------- | ------------------------------------------- | ------------------------------------------------ | ------ |
| POST        | `/books`                                    | Add a new book.                                  | User   |
| GET         | `/books/all`                                | Retrieve all books.                              | Public |
| GET         | `/books/show/:id`                           | Get details of a specific book by its ID.        | Public |
| DELETE      | `/books/delete/:id`                         | Delete a specific book.                          | User   |
| POST        | `/borrowers`                                | Register a new borrower.                         | User   |
| GET         | `/borrowers/all`                            | Retrieve all borrowers.                          | User   |
| GET         | `/borrowers/show/:id`                       | Get details of a specific borrower.              | User   |
| PATCH       | `/borrowers/update/:id`                     | Update details of a specific borrower.           | User   |
| DELETE      | `/borrowers/delete/:id`                     | Delete a specific borrower.                      | User   |
| POST        | `/borrowings`                               | Create a new borrowing record.                   | User   |
| GET         | `/borrowings/all`                           | View all borrowing records.                      | User   |
| GET         | `/borrowings/show/:id`                      | Get details of a specific borrowing record.      | User   |
| GET         | `/borrowings/export/overdue`                | Get spreadsheet.                                 | User   |
| PATCH       | `/borrowings/update/return/:id`             | Mark a book as returned in the borrowing record. | User   |
| POST        | `/users`                                    | Create a new user .                              | Public |
| POST        | `/users/authenticate`                       | Authenticate a user and return a token.          | Public |
| GET         | `/dashboard/most-borrowed-books`            | Get a list of most borrowed books.               | User   |
| GET         | `/dashboard/borrowers-with-most-borrowings` | Get borrowers with the most borrowings.          | User   |
| GET         | `/dashboard/overdue-books`                  | List books that are overdue.                     | User   |
| GET         | `/dashboard/recent-borrowings`              | List recent borrowings.                          | User   |

## Author

- Mostafa M. Abbas- (https://github.com/MostafaAbbas-git)

## About

Back-end Engineer Technical Assessment | Bosta
1/2024
