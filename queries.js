// connecting to the posgres databased from nodejs using node-postgres to create a pool of conection
// pool of connection helps us to avoid opening and closing pgadmin4 client each time we make a query
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "ngi",
  host: "localhost",
  database: "api",
  password: "gordon",
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// Getting a single user by id
const getElementById = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

// Creating a new user in the table
const createUser = (request, response) => {
  const { name, email } = request.body;

  pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    [name, email],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID:${results.insertID}`);
    }
  );
};

// updating a user in the database
const updateUser = (request, response) => {
  const id = parseInt(request.params.id);
  const { name, email } = request.body;

  pool.query(
    "UPDATE users SET name = $1, email=$2 where id=$3",
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID:${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query("DELETE FROM users where id=$1", [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User Deleted with ID:${id}`);
  });
};
module.exports = {
  getUsers,
  getElementById,
  createUser,
  updateUser,
  deleteUser,
};
