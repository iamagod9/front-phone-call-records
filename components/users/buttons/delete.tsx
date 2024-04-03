import { HiOutlineTrash } from 'react-icons/hi'
import { BACKEND_URL } from '../../../constants/requests';
import { useRouter } from 'next/navigation';
import styles from './delete.module.scss'

export default function ButDeleteUser({id, login}) {
  const router = useRouter()
  async function deleteUser() {
    const confirmed = confirm(`Вы уверены, что хотите удалить пользователя ${login}?`)

    if (confirmed) {
      const response = await fetch(BACKEND_URL + `/users/${id}`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if(response.ok) {
        router.refresh()
      }
    }
  }

return (
    <div>
        <HiOutlineTrash className={styles.delete} onClick={deleteUser}/>
    </div>
);
}