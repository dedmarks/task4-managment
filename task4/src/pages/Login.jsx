import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { login } from '../apiCalls';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const Login = () => {
    const {currentUser} = useSelector(state => state.user);

    const dispatch = useDispatch();

    var currentdate = new Date(); 
    var datetime = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + currentdate.getDate() + " "  
                + (currentdate.getHours() + 2) + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
        LastLoginTime: datetime,
    })
    
    const [err, setErr] = useState(null)
                
    const handleChange = e => {
        setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        login(dispatch, inputs)
        if (currentUser == null){
            setErr("user is blocked")
        }
    }
  return (
    <div className="auth">
        <h1>Login</h1>
        <form>
            <input required type="text" placeholder="username" name="username" onChange={handleChange}/>
            <input required type="password" placeholder="password" name="password" onChange={handleChange}/>
            <button onClick={handleSubmit}>Login</button>
            {err &&<p>{err}</p>}
            <span>Don't have an account yet?<Link to="/register">Register</Link></span>
        </form>
    </div>
  )
}

export default Login