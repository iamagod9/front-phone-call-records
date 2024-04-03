import { useEffect, useState } from 'react';
import RootLayout from '../../../layouts/RootLayout';
import styles from './users.module.scss'
import classNames from 'classnames';
import { BACKEND_URL } from '../../../constants/requests';
import ButDeleteUser from '../../../components/users/buttons/delete';
import ButEditUser from '../../../components/users/buttons/edit';
import ButAddUser from '../../../components/users/buttons/add';
import ProtectedRoute from '../../../components/protectedRoute';

const Users = () => {
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/users/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Ошибка получения данных');
        }

        const data = await response.json();
        const userData = data.data

        setUsers(userData)

      } catch (error) {
        console.error('Ошибка:', error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <ProtectedRoute>
      <RootLayout>
        <div className={styles.wrapper}>
          <div className={styles.title_wrapper}><h1 className={styles.h_title}>Всего пользователей: {users.length}</h1><ButAddUser/></div>
          <div>
            <table className={styles.table}>
              <thead>
                  <tr className={styles.row}>
                      <th></th>
                      <th className={classNames(styles.item, styles.title)}>ID</th>
                      <th className={classNames(styles.item, styles.title)}>Логин</th>
                      <th className={classNames(styles.item, styles.title)}>Email</th>
                      <th className={classNames(styles.item, styles.title)}>Пол</th>
                      <th className={classNames(styles.item, styles.title)}>Роль</th>
                      <th className={classNames(styles.item, styles.title)}>Описание</th>
                      <th className={classNames(styles.item, styles.title)}>Телефон</th>
                      <th className={classNames(styles.item, styles.title)}>Должность</th>
                  </tr>
              </thead>
              <tbody>
                {Array.isArray(users) && users.map(user => (
                  <tr className={styles.row} key={user.id}>
                    <td><div className={styles.checkbox}><ButDeleteUser login={user.login} id={user.id}/><ButEditUser login={user.login} id={user.id}/></div></td>
                    <td className={styles.item}>{user.id}</td>
                    <td className={styles.item}>{user.login}</td>
                    <td className={styles.item}>{user.email}</td>
                    <td className={styles.item}>{user.gender}</td>
                    <td className={styles.item}>{user.role.name}</td>
                    <td className={styles.item}>{user.description}</td>
                    <td className={styles.item}>{user.telephone}</td>
                    <td className={styles.item}>{user.position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </RootLayout>
    </ProtectedRoute>
  )
} 

export default Users