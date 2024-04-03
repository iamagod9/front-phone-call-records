import Link from 'next/link';

import styles from './404.module.scss';

const NotFoundPage = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, there is nothing to see here</p>
        <p>
          Use the search box or the links below to explore our amazing
          application
        </p>
        <input
          type='search'
          className={styles.searchBox} 
          placeholder='Just a dummy search box...'
        />
        <div className={styles.links}>
          <Link href='/' className={styles.link}>
            Homepage
          </Link>
          <Link href='/latest' className={styles.link}>
            Latest Products
          </Link>
          <Link href='/contact' className={styles.link}>
            Contact US
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;