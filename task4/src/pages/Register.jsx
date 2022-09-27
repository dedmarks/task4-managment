import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router'

const Register = () => {
    const id = Math.floor(100000 + Math.random() * 900000)

    var currentdate = new Date(); 
    var datetime = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

    const [inputs, setInputs] = useState({
        id: id,
        username: "",
        email: "",
        LastLoginTime: datetime,
        RegistrationTime: datetime,
        status: "active",
        password: "",
    })

    const [err, setErr] = useState(null)

    const navigate = useNavigate()
                
    const handleChange = e => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try{
        await axios.post("http://localhost:3001/api/auth/register", inputs)
        navigate("/login")
        }catch(err){
            setErr(err.res.data)
        }
    }

  return (
    <div className="auth">
        <h1>Register</h1>
        <form>
            <input required type="text" placeholder="username" name="username" onChange={handleChange}/>
            <input required type="email" placeholder="email" name="email" onChange={handleChange}/>
            <input required type="password" placeholder="password" name="password" onChange={handleChange}/>
            <button onClick={handleSubmit}>Register</button>
            {err &&<p>{err}</p>}
            <span>Do you have an account?<Link to="/login">Log in</Link></span>
        </form>
    </div>
  )
}

export default Register