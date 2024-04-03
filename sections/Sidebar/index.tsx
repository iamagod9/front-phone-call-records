'use client';

import { VscSettingsGear } from "react-icons/vsc";
import { VscSignOut } from "react-icons/vsc";
import { VscMic } from "react-icons/vsc";
import { VscPerson } from "react-icons/vsc";
import { useRouter } from 'next/router';
import styles from './Sidebar.module.scss'
import Link from 'next/link'
import classNames from 'classnames';

const Sidebar = () => {
  const router = useRouter()

  return (
    <section className={classNames(styles.wrapper, styles.poppins_regular)}>
      <ul className={styles.list}>
        <div>
        <Link href='/admin/users'><li className={styles.item}><div className={classNames(styles.item_icons, router.asPath.includes('/admin/users') && styles.active)}><VscPerson size={30} />Пользователи</div></li></Link>
        <Link href='/admin/settings'><li className={styles.item}><div className={classNames(styles.item_icons, router.asPath === '/admin/settings' && styles.active)}><VscSettingsGear size={30}/>Настройки</div></li></Link>
        <Link href='/admin/records'><li className={styles.item}><div className={classNames(styles.item_icons, router.asPath === '/admin/records' && styles.active)}><VscMic size={30}/>Записи</div></li></Link>
        </div>
        <div>
        <Link href='/login' onClick={() => localStorage.removeItem('token')}><li className={styles.item}><div className={classNames(styles.item_icons, styles.bottom_element, router.asPath === '/login' && styles.active)}><VscSignOut size={30}/>Выход</div></li></Link>
        </div>
      </ul>
    </section>
  )
} 

export default Sidebar