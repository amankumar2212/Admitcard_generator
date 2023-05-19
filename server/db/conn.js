const mysql = require('mysql');
const express = require('express');


const connection = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "",
    database: "nodemysql"
});

connection.connect((err) => {
    if (err) throw (err);
    console.log("MySQL connection is established");
});

module.exports = connection;

