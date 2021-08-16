const Pool = require("pg").Pool;

const pool = new Pool({
  user: "baboulass",
  password: "97wanted",
  database: "todos",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
