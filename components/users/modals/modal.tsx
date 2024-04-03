import { useState } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { BACKEND_URL } from '../../../constants/requests';
import { useRouter } from 'next/navigation';
import { IoCheckboxOutline } from "react-icons/io5";
import { LuXSquare } from "react-icons/lu";
import styles from './modal.module.scss';
import Link from 'next/link';
import DropdownRole from '../dropDowns/roleEdit';
import DropdownGender from '../dropDowns/genderEdit';

export default function ModalEditUsers({ id, isModalOpen, setIsModalOpen, userData, setUserData }) {

  const [editableField, setEditableField] = useState(null);
  const [changePassword, setChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [originalUserData, setOriginalUserData] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);

  const router = useRouter()

  function handleEditField(field) {
      setEditableField(field);
      setIsEditing(true);
  }

  function handleCancel() {
      setUserData(null);
      setEditableField(null);
      setIsModalOpen(false);
      setChangePassword(false);
      setIsEditing(false);
  }

  function handleModalClick(e) {
      if (e.target.classList.contains('modal')) {
          handleCancel();
      }
  }

  function handleChangePassword() {
      setChangePassword(!changePassword);
  }

  function handleConfirmEditable() {
      setEditableField(null);
      setIsEditing(false);
  }

  function handleCancelEditable(field) {
      setUserData({ ...userData, [field]: originalUserData[field] });
      setEditableField(null);
      setIsEditing(false);
  }
  
  const handleChangeGenderValue = (selected: string) => {
      setSelectedGender(selected);
      setUserData({ ...userData, gender: selected});
    };

    const handleChangeRoleValue = (selected: string) => {
      setSelectedRole(selected);
      setUserData({ ...userData, role: selected});
    };

  console.log(userData)

  async function updateData() {
      
      if (newPassword) {
          userData.password = newPassword;
      }

      if (changePassword) {
          if (newPassword !== confirmPassword) {
              setErrors('Пароли не совпадают');
              return;
          }
  
          if (newPassword.length < 8) {
              setErrors('Пароль должен содержать не менее 8 символов');
              return;
          }
      }
      
      try {
          const response = await fetch(BACKEND_URL + `/users/${id}`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({
                  login: userData.login,
                  email: userData.email,
                  gender: userData.gender,
                  telephone: userData.telephone,
                  role: userData.role,
                  position: userData.position,
                  password: userData.password,
                  description: userData.description
              })
          });

          if (!response.ok) {
              throw new Error('Failed to fetch user data');
          }
      } catch (error) {
          console.error(error);
      }
      router.refresh()
      setIsModalOpen(false);
  }

return (
  <div>
    {isModalOpen && (
      <div className="modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content">
              <h2 className={styles.title}>Редактирование пользователя</h2>

              <div className={styles.row}>
                  <p className={styles.row_name}>Логин:</p>
                  <div className={styles.wrapper_row_value}>
                  {editableField === 'login' && isEditing ? (
                      <>
                          <input className={styles.change_row} type="text" value={userData.login} onChange={(e) => setUserData({ ...userData, login: e.target.value })} />
                          <div className={styles.icon_change}>
                              <IoCheckboxOutline onClick={handleConfirmEditable} className={styles.icon_save_edit} />
                              <LuXSquare onClick={() => handleCancelEditable('login')} className={styles.icon_cancel_edit} />
                          </div>
                      </>
                  ) : (
                      <>
                          <span className={styles.row_value}>{userData.login}</span>
                          <HiPencilAlt onClick={() => handleEditField('login')} className={styles.icon}/>
                      </>
                  )}
                  </div>
              </div>

              <div className={styles.row}>
                  <p className={styles.row_name}>Email:</p>
                  <div className={styles.wrapper_row_value}>
                  {editableField === 'email' && isEditing ? (
                      <>
                          <input className={styles.change_row} type="text" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                          <div className={styles.icon_change}>
                              <IoCheckboxOutline  onClick={handleConfirmEditable} className={styles.icon_save_edit} />
                              <LuXSquare  onClick={() => handleCancelEditable('email')} className={styles.icon_cancel_edit} />
                          </div>
                      </>
                  ) : (
                      <>
                          <span className={styles.row_value}>{userData.email}</span>
                          <HiPencilAlt onClick={() => handleEditField('email')} className={styles.icon}/>
                      </>
                  )}
                  </div>
              </div>

              <div className={styles.row}>
                  <p className={styles.row_name}>Пол:</p>
                  <div className={styles.wrapper_row_value}>
                  {editableField === 'gender' ? (
                      <>
                          <div className={styles.wrapper_dropdown}>
                              <DropdownGender onGenderChange={handleChangeGenderValue} />
                          </div>
                          <div className={styles.icon_change}>
                              <IoCheckboxOutline  onClick={handleConfirmEditable} className={styles.icon_save_edit} />
                              <LuXSquare  onClick={() => handleCancelEditable('gender')} className={styles.icon_cancel_edit} />
                          </div>
                      </>
                  ) : (
                      <>
                          <span className={styles.row_value}>{userData.gender}</span>
                          <HiPencilAlt onClick={() => handleEditField('gender')} className={styles.icon}/>
                      </>
                  )}
                  </div>
              </div>

              <div className={styles.row}>
                  <p className={styles.row_name}>Телефон:</p>
                  <div className={styles.wrapper_row_value}>
                  {editableField === 'telephone' ? (
                      <>
                          <input className={styles.change_row} type="text" value={userData.telephone} onChange={(e) => setUserData({ ...userData, telephone: e.target.value })} />
                          <div className={styles.icon_change}>
                              <IoCheckboxOutline  onClick={handleConfirmEditable} className={styles.icon_save_edit} />
                              <LuXSquare  onClick={() => handleCancelEditable('telephone')} className={styles.icon_cancel_edit} />
                          </div>
                      </>
                  ) : (
                      <>
                          <span className={styles.row_value}>{userData.telephone}</span>
                          <HiPencilAlt onClick={() => handleEditField('telephone')} className={styles.icon}/>
                      </>
                  )}
                  </div>
              </div>

              <div className={styles.row}>
                  <p className={styles.row_name}>Описание:</p>
                  <div className={styles.wrapper_row_value}>
                  {editableField === 'description' ? (
                      <>
                          <input className={styles.change_row} type="text" value={userData.description} onChange={(e) => setUserData({ ...userData, description: e.target.value })} />
                          <div className={styles.icon_change}>
                              <IoCheckboxOutline  onClick={handleConfirmEditable} className={styles.icon_save_edit} />
                              <LuXSquare  onClick={() => handleCancelEditable('description')} className={styles.icon_cancel_edit} />
                          </div>
                      </> 
                  ) : (
                      <>
                          <span className={styles.row_value}>{userData.description}</span>
                          <HiPencilAlt onClick={() => handleEditField('description')} className={styles.icon}/>
                      </>
                  )}
                  </div>
              </div>

              <div className={styles.row}>
                  <p className={styles.row_name}>Роль:</p>
                  <div className={styles.wrapper_row_value}>
                  {editableField === 'role' ? (
                      <>
                          <div className={styles.wrapper_dropdown}>
                              <DropdownRole onRoleChange={handleChangeRoleValue}/>
                          </div>
                          <div className={styles.icon_change}>
                              <IoCheckboxOutline  onClick={handleConfirmEditable} className={styles.icon_save_edit} />
                              <LuXSquare  onClick={() => handleCancelEditable('role')} className={styles.icon_cancel_edit} />
                          </div>
                      </>
                  ) : (
                      <>
                          <span className={styles.row_value}>{userData.role.name}</span>
                          <HiPencilAlt onClick={() => handleEditField('role')} className={styles.icon}/>
                      </>
                  )}
                  </div>
              </div>

              <div className={styles.row}>
                  <p className={styles.row_name}>Должность:</p>
                  <div className={styles.wrapper_row_value}>
                  {editableField === 'position' ? (
                      <>
                          <input className={styles.change_row} type="text" value={userData.position} onChange={(e) => setUserData({ ...userData, position: e.target.value })} />
                          <div className={styles.icon_change}>
                              <IoCheckboxOutline  onClick={handleConfirmEditable} className={styles.icon_save_edit} />
                              <LuXSquare  onClick={() => handleCancelEditable('position')} className={styles.icon_cancel_edit} />
                          </div>
                      </>
                  ) : (
                      <>
                          <span className={styles.row_value}>{userData.position}</span>
                          <HiPencilAlt onClick={() => handleEditField('position')} className={styles.icon}/>
                      </>
                  )}
                  </div>
              </div>

              <Link className={changePassword ? `${styles['link']} ${styles.active}` : styles['link']} href="" onClick={handleChangePassword}>Изменить пароль </Link>
              {changePassword && (
                  <div className={styles.change_password}>
                      <p className={styles.row_name}>Новый пароль</p>
                      <input
                          className={styles.password_field}
                          type="password"
                          placeholder="Новый пароль"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <p className={styles.row_name}>Повторите пароль</p>
                      <input
                          className={styles.password_field}
                          type="password"
                          placeholder="Подтвердите пароль"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <p className={styles.error}>{errors}</p>
                  </div>
              )}
              
              <div className={styles.buttons}>
                  <button className={styles.button_cancel} onClick={handleCancel}>Закрыть</button>
                  <button type='submit' className={styles.button_save} onClick={updateData}>Сохранить</button>
              </div>
          </div>
      </div>
  )}
  
    <style jsx>{`
      .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
      }
      .modal-content {
          display: flex;
          border: 1px solid rgb(224, 215, 215);
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
          border-radius: 10px;
          padding: 30px;
          width: 40%;
          flex-direction: column;
          background-color: white;
      }
    `}</style>
  </div>
  )
}