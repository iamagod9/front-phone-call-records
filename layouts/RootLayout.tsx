import Sidebar from "../sections/Sidebar"
import styles from "./RootLayout.module.scss"

const RootLayout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <Sidebar/>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
} 

export default RootLayout