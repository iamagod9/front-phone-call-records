import React from 'react';
import Select from 'react-select';
import styles from './gender.module.scss';

interface GenderDropDownProps {
  onGenderChange: (selectedGender: string) => void;
}

const DropdownGender: React.FC<GenderDropDownProps> = ({ onGenderChange }) => {

  const handleGenderChange = (selectedOption: any) => {
    onGenderChange(selectedOption.value);
  };

const genderList = [
  { value: 'Муж', label: 'Муж' },
  { value: 'Жен', label: 'Жен' }
]

  return (
    <Select
      placeholder="Выберите пол"
      className={styles.select_edit}
      options={genderList}
      onChange={handleGenderChange}
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

export default DropdownGender;