import { loginFailure, loginStart, loginSucces } from "./userSlice"
import axios from "axios";


export const login = async (dispatch,user) => {
    dispatch(loginStart());
    try{
        const res = await axios.post("http://localhost:3001/api/auth/login", user)
        dispatch(loginSucces(res.data))
    }catch(err){
        dispatch(loginFailure())
    }
}