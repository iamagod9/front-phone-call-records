import Select from 'react-select'
import styles from './gender.module.scss'

interface GenderDropDownProps {
  onGenderChange: (selectedRole: string) => void;
  register: any;
}

const GenderDropDown: React.FC<GenderDropDownProps> = ({ onGenderChange, register }) => {

  const handleGenderChange = (selectedOption: any) => {
    onGenderChange(selectedOption.value);
    register('gender', { value: selectedOption.value, required: true });
  };

  const genderList = [
    { value: 'Муж', label: 'Мужчина' },
    { value: 'Жен', label: 'Женщина' }
  ]

  return (
    <Select
      className={styles.select}
      placeholder="Выберите пол"
      isClearable
      options={genderList}
      instanceId={'gender'}
      onChange = {handleGenderChange}
      required
      styles={{
        control: (base) => ({
          ...base,
          padding: '5px',
          borderRadius: '10px',
          background: '#f9fafb',
          '&:hover': {
            outline: '1px solid rgb(98, 154, 219)',
          },
        }),
      }}
    />
  );
}
export default GenderDropDown
