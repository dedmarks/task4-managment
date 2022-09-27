import mysql from "mysql"

export const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "Wladcymuch!11",
    database: "task4",
});