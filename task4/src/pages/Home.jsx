import React ,{useEffect, useState} from 'react'
import TableElement from '../TableElement'
import axios from 'axios'
import { Checkbox } from '../Checkbox'
import { useDispatch } from 'react-redux'
import { logout } from '../userSlice'

const Home = () => {
    const [userList, setUserList] = useState([])
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [isCheck, setIsCheck] = useState([]);

    

    const handleSelectAll = e => {
        setIsCheckAll(!isCheckAll);
        setIsCheck(userList.map(li => li.id));
        if (isCheckAll) {
          setIsCheck([]);
        }
      };

      const dispatch = useDispatch()

      const handleDelete = async () => {
        window.location.reload()
        try{
            await axios.post("http://localhost:3001/api/users/deleteusers", {check: isCheck})
           }catch(err){
               console.log(err) 
           }
      }

      const handleLogout = () => {
        dispatch(logout())
      }

      const handleBlock = async () => {
        window.location.reload()
        try{
            await axios.post("http://localhost:3001/api/users/blockusers", {check: isCheck})
           }catch(err){
               console.log(err) 
           }
      }

      const handleUnblock = async () => {
        window.location.reload()
        try{
            await axios.post("http://localhost:3001/api/users/unblockusers", {check: isCheck})
           }catch(err){
               console.log(err) 
           }
      }
    

    useEffect(() => {
        const getUsers = async () => {
          try{
           const res = await axios.get("http://localhost:3001/api/users/getUsers")
           setUserList(res.data)
          }catch(err){
              console.log(err) 
          }
        };
       getUsers()
      }, [])

  return (
    <div className="home">
        <div className="actions">
            <button onClick={handleBlock}>Block</button>
            <svg onClick={handleUnblock} className="icon" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-unlock" viewBox="0 0 16 16">
                <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"/>
            </svg>
            <svg onClick={handleDelete} className="icon" xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
            </svg>
            <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="tableLabel">
        <Checkbox type="checkbox"
                name="selectAll"
                id="selectAll"
                handleClick={handleSelectAll}
                isChecked={isCheckAll}/>
            <h3 className="id">Id</h3>
            <h3 className="username">Username</h3>
            <h3 className="username">Email</h3>
            <h3 className="time">LastLoginTime</h3>
            <h3 className="time">RegistrationTime</h3>
            <h3 className="id">Status</h3>
        </div>
        {userList.map(user =>(
            <TableElement user={user} isCheck={isCheck} setIsCheck={setIsCheck} usersList={userList}/>
          ))}
    </div>
  )
}

export default Home