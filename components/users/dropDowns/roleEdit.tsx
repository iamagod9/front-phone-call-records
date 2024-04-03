import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import styles from './gender.module.scss';
import { BACKEND_URL } from '../../../constants/requests';

interface RoleDropDownProps {
  onRoleChange: (selectedRole: string) => void;
}

const DropdownRole: React.FC<RoleDropDownProps> = ({ onRoleChange }) => {
  const [roles, setRoles] = useState([]);
  const [value, setValue] = useState('');

  const handleRoleChange = (selectedOption: any) => {
    setValue(selectedOption.value);
    onRoleChange(selectedOption.value);
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/roles/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Ошибка получения данных');
        }

        const { data } = await response.json();
        const userData = data;

        setRoles(userData.map(role => ({ value: role.id, label: role.name })));

      } catch (error) {
        console.error('Ошибка:', error.message);
      }
    };
    fetchRoles();
  }, []);

  return (
    <Select
      placeholder="Выберите роль"
      className={styles.select_edit}
      options={roles}
      onChange={handleRoleChange}
      styles={{
        control: (base) => ({
          ...base,
          margin: '0 0 0 15px',
          borderRadius: '10px',
          background: '#f9fafb',
          '&:hover': {
            outline: '1px solid rgb(98, 154, 219)',
          },
        }),
      }}
    />
  );
};

export default DropdownRole;