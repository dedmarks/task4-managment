import { db } from "../db.js";

export const getUsers = (req, res) => {
    const q = "SELECT * FROM users"
    db.query(q,(err,data) => {
        if(err) return res.json(err)
        return res.json(data)
    })
}


export const deleteUsers = (req, res) => {
    console.log(req.body.check)
    db.query("DELETE FROM users WHERE (id) IN (?)",
    [req.body.check],(err,results) => {
    if(err) return console.log(err)
    else console.log('sended');
});
}

export const blockUsers = (req, res) => {
    console.log(req.body.check)

    const userid = req.body.check;
    const q = "UPDATE users SET status = 'blocked' WHERE (id) IN (?)"

    db.query(q,[userid], (err,data) => {
        if(err) return res.json(err)
        return res.json("Users status updated")
    })
}

export const unblockUsers = (req, res) => {
    console.log(req.body.check)

    const userid = req.body.check;
    const q = "UPDATE users SET status = 'active' WHERE (id) IN (?)"

    db.query(q,[userid], (err,data) => {
        if(err) return res.json(err)
        return res.json("Users status updated")
    })
}