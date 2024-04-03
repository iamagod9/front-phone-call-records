import { useState, useEffect } from 'react'
import { BACKEND_URL } from '../constants/requests';
import LoginPage from './login';

// import Token from '../components/token';

const index = () => {
  
  // const [users, setUsers] = useState([])
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch(`${BACKEND_URL}/users/`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           // 'Authorization': `Bearer ${TOKEN}`
  //         }
  //       });

  //       if (!response.ok) {
  //         throw new Error('Ошибка получения данных');
  //       }

  //       const data = await response.json();
  //       const userData = data.data

  //       setUsers(userData)

  //     } catch (error) {
  //       console.error('Ошибка:', error.message);
  //     }
  //   };

  //   fetchUsers();
  // }, []);


  return (
      <div>
        <h1>Main page</h1>
      
      {/* <ul>
      {Array.isArray(users) && users.map(user => (
      <li key={user.id}>
        {user.id}
        {user.login}
      </li>
        ))}
      </ul> */}
      {/* <Token/> */}
      </div>
  )
}

export default index