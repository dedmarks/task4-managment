import React from 'react'
import { Checkbox } from './Checkbox';

const TableElement = ({user, setIsCheck, isCheck}) => {
    
    const handleClick = e => {
      const { id, checked } = e.target;
      setIsCheck([...isCheck, id]);
      if (!checked) {
        setIsCheck(isCheck.filter(item => item !== id));
      }
    };  
  return (
     <div className="tableLabel">
            <Checkbox type="checkbox"
                id={user.id}
                handleClick={handleClick}/>
            <h3 className="id">{user.id}</h3>
            <h3 className="username">{user.username}</h3>
            <h3 className="username">{user.email}</h3>
            <h3 className="time">{user.LastLoginTime.replace('T', ' ')}</h3>
            <h3 className="time">{user.RegistrationTime.replace('T', ' ')}</h3>
            <h3 className="id">{user.status}</h3>
        </div>
  )
}

export default TableElement