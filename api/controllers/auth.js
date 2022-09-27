import { db } from "../db.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = (req, res) => {
    const q = "SELECT * FROM users WHERE email = ? OR username = ?"
    db.query(q, [req.body.email, req.body.name], (err,data) => {
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("User already exist!")

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const q = "INSERT INTO users (`id`, `username`, `email`, `LastLoginTime`, `RegistrationTime`, `status`, `password`) VALUES (?)"
        const values =[
            req.body.id,
            req.body.username,
            req.body.email,
            req.body.LastLoginTime,
            req.body.RegistrationTime,
            req.body.status,
            hash
        ]

        db.query(q, [values], (err, data) => {
            if(err) return res.json(err);
            return res.status(200).json("User created")
        })
    })
}

export const login = (req, res) => {
    const q = "SELECT * FROM users WHERE username = ?"
    // const q1 = "UPDATE users SET LastLoginTime = ? WHERE (username) = ?"

    // db.query(q1, [req.body.LastLoginTime, req.body.username], (err, data) =>{
    //     if(err) return res.json(err)
    // })

    db.query(q, [req.body.username, req.body.LastLoginTime], (err,data) => {
        if(err) return res.json(err)
        if(data.length === 0) return res.status(409).json("User not found")

        console.log(data[0].id)

        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password,
            data[0].password
          );
      
          if (!isPasswordCorrect)
            return res.status(400).json("Wrong username or password!");
      
          const token = jwt.sign({ id: data[0].id }, "jwtkey");
          const { password, ...other } = data[0];

      
          res.cookie("access_token", token, {
              httpOnly: true,
            })
            .status(200)
            .json(other);
        });
}

export const logout = (req, res) => {
    
}