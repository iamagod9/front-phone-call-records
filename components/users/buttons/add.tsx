import { CiCirclePlus } from "react-icons/ci";
import styles from './add.module.scss'
import Link from "next/link";

export default function ButAddUser() {

return (
    <div>
        <Link href="/admin/users/create"><button className={styles.button}><CiCirclePlus size={45}/></button></Link>
    </div>
);
}