import { useRouter } from 'next/router'
import { BACKEND_URL } from '../../constants/requests'
import { jwtDecode } from 'jwt-decode'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import styles from './login.module.scss'

export default function LoginPage() {
  const [error, setError] = useState('')
  const router = useRouter()

  type FormFields = {
    email: string
    password: string
  }

  const { register, handleSubmit } = useForm<FormFields>()

  const onSubmit = async (data: FormFields) => {
    try {
      const response = await fetch(BACKEND_URL + '/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.status === 200) {
        const { token } = await response.json()
        const decode = jwtDecode(token)
        const jsonParse = JSON.parse(JSON.stringify(decode))
        const role = jsonParse.data.role.name

        localStorage.setItem('token', token)

        if (role === 'admin') {
          router.push('/admin/dashboard')
        } else {
          router.push('/')
        }
      } else {
        setError('Неверный логин или пароль')
      }
    } catch (error) {
      console.error(error)
      setError('Произошла ошибка при попытке входа')
    }
  }

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form_field}>
          <h1 className={styles.title}>Добро пожаловать в Сервис телефонных звонков!</h1>
          <p>Логин</p>
          <input
            className={styles.row}
            type="email"
            placeholder="Введите адрес электронной почты"
            {...register('email', { required: true })}
          />
          <p>Пароль</p>
          <input
            className={styles.row}
            type="password"
            placeholder="Введите пароль"
            {...register('password', { required: true })}
          />
          {error && <div className={styles.error}>{error}</div>}
          <button className={styles.button} type="submit">Войти</button>
        </div>
      </form>
    </div>
  )
}
