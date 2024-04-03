import styles from './create.module.scss'
import RootLayout from '../../../../layouts/RootLayout'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import GenderDropDown from '../../../../components/users/dropDowns/gender'
import RoleDropDown from '../../../../components/users/dropDowns/role'
import { useRouter } from 'next/router'
import React from 'react'
import { BACKEND_URL } from '../../../../constants/requests'
import ProtectedRoute from '../../../../components/protectedRoute'

type FormFields = {
  login: string
  email: string
  gender: string
  role: number
  telephone: number
  position: string
  description: string
  password: string
  confirmPassword: string
}
 
export default function CreateUser() {
  const router = useRouter()

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormFields>()

  const onSubmit = async (data: FormFields) => {
    try {
      delete data.confirmPassword;
      data.telephone = Number(data.telephone)

      console.log(JSON.stringify(data))
  
      const response = await fetch(`${BACKEND_URL}/users/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error('Ошибка при создании пользователя');
      }
  
      router.push('/admin/users');
      alert('Пользователь успешно создан');
      reset(); // Сброс значений формы
    } catch (error) {
      console.error('Ошибка:', error.message);
    }
  };
  
  const handleChange = (selected: string) => {
    console.log('Selected:', selected);
  };

  const handleCancelClick = () => {
    router.push('/admin/users');
  };

  const password = React.useRef({})
  password.current = watch("password", "")
 
  return (
    <ProtectedRoute>
      <RootLayout>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.wrapper}>

            <h1 className={styles.title}>Создание пользователя</h1>

            <div>
              <p className={styles.title_row}>Имя пользователя</p>
              <input
              className={styles.row}
              {...register('login', {
                pattern: {
                  value: /^[а-яА-ЯёЁ\s]{3,}$/
                  ,
                  message: "Некорректное имя пользователя"
              },
                required: "Поле обязательно к заполнению"
              })}
              type="login"
              placeholder="Введите ФИО"/>
              {errors.login && (<p className={styles.error}>{errors.login.message}</p>)}
            </div>

            <div>
              <p className={styles.title_row}>Адрес электронной почты</p>
              <input 
                className={styles.row} 
                {...register('email', {
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Некорректный email"
                  },
                  required: "Поле обязательно к заполнению"
                })} 
                type="email" 
                placeholder="E-mail"/>
              {errors.email && <p className={styles.error}>{errors.email.message}</p>}
            </div>
            
            <div className={styles.dropdown}>
              <div className={styles.dropdown_wrapper}>
                <p className={styles.title_row}>Пол</p>
                <GenderDropDown onGenderChange={handleChange} register={register}/>
              </div>

              <div className={styles.dropdown_wrapper}>
                <p className={styles.title_row}>Роль</p>
                <RoleDropDown onRoleChange={handleChange} register={register}/>
              </div>
            </div>

            <div>
              <p className={styles.title_row}>Номер телефона</p>
              <input 
                className={styles.row} 
                {...register('telephone', {
                  pattern: {
                      value: /^[78]\d{10}$/,
                      message: "Некорректный номер телефона"
                    },
                  required: "Поле обязательно к заполнению"
                })} 
                type="text" 
                placeholder="Укажите номер телефона без +"/>
              {errors.telephone && <p className={styles.error}>{errors.telephone.message}</p>}
            </div>
            
            <div>
              <p className={styles.title_row}>Должность</p>
              <input 
                className={styles.row} 
                {...register('position', {
                  pattern: {
                    value: /^[а-яА-ЯёЁ\s]{3,}$/,
                    message: "Недопустимые символы"
                  },
                  required: "Поле обязательно к заполнению"
                })} 
                type="text" 
                placeholder="Укажите должность"/>
              {errors.position && <p className={styles.error}>{errors.position.message}</p>}
            </div>

            <div>
              <p className={styles.title_row}>Описание</p>
              <input 
                className={styles.row} 
                {...register('description', {
                  required: "Поле обязательно к заполнению"
                })} 
                type="text" 
                placeholder="Оставьте комментарии"/>
              {errors.description && <p className={styles.error}>{errors.description.message}</p>}
            </div>


            <div>
              <p className={styles.title_row}>Пароль</p>
              <input 
                className={styles.row} 
                {...register('password', {
                  minLength: {
                    value: 8,
                    message: "Пароль должен быть больше 8 символов"
                  },
                  required: "Поле обязательно к заполнению"
                })} 
                type="password" 
                placeholder="Не меньше 8 символов"
                />
              {errors.password && <p className={styles.error}>{errors.password.message}</p>}
            </div>
            
            <div>
              <p className={styles.title_row}>Повторите пароль</p>
              <input 
                className={styles.row} 
                {...register('confirmPassword', {
                  required: "Поле обязательно к заполнению",
                  validate: value => value === password.current || "Пароли не совпадают"
                })} 
                type="password" 
                placeholder="Введите указанный пароль повторно" />
              {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
            </div>

            <div className={styles.wrapper_buttons}>
              <button 
                className={classNames(styles.button, styles.button_cancel)} 
                type="button"
                onClick={handleCancelClick}
                >Отмена
              </button>

              <button 
                className={styles.button} 
                type="submit"
                >Создать
              </button>
            </div>
          </div>
        </form>
      </RootLayout>
    </ProtectedRoute>
  )
}

