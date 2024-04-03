import { useState } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { BACKEND_URL } from '../../../constants/requests';
import styles from './edit.module.scss';
import ModalEditUsers from '../modals/modal';

export default function ButEditUser({ id, login }) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userData, setUserData] = useState(null);

    async function editUser() {
        try {
            const response = await fetch(BACKEND_URL + `/users/login/${login}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const res = await response.json();
            const data = res.data

            setUserData(data)
            setIsModalOpen(true);

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <HiPencilAlt onClick={editUser} className={styles.edit}/>
            <ModalEditUsers id={id} userData={userData} setUserData={setUserData} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </div>
    );
}
