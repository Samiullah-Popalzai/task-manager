const {Pool} = require("pg");

const pool = new Pool(
    {
        host: "localhost",
        port : 5432,
        database : "task_manager_container",
        user : "task_manager_user",
        password : "task_manager_password"
    }
);


module.exports = pool;