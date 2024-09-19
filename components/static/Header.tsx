// components/Header.tsx
import { color } from 'chart.js/helpers';
import Link from 'next/link';
import styles from "./static.module.css";

const Header = () => {
  return (
    <header className={styles.headerStyle}>
      <div className={styles.logoStyle}>
        <Link href="/">
          <img
            src="/logo.png"
            alt="alliance-logo"
          />
        </Link>
      </div>
      <div className={styles.nav_style}>
        <ul>
          {/* <li className={styles.header_nav_item}>
            <Link href="/">
              Home
            </Link>
          </li> */}
          <li className={styles.header_nav_item}>
            <Link href="/events">
              Events
            </Link>
          </li>
          <li className={styles.header_nav_item}>
            <Link href="/assistance">
              Assistance
            </Link>
          </li>
          {/* <li className={styles.header_nav_item}>
            <Link href="/beneficiarios">
              Beneficiarios
            </Link>
          </li> */}
          <li className={styles.header_nav_item}>
            <Link href="/tecnicos">
              Tecnicos
            </Link>
          </li>
          <li className={styles.header_nav_item}>
            <Link href="/data/calendario">
              Calendario
            </Link>
          </li>
          {/* <li className={styles.header_nav_item}>
            <Link href="/data">
              Data
            </Link>
          </li>
          <li className={styles.header_nav_item}>
            <Link href="/reports">
              Reports
            </Link>
          </li> */}
        </ul>
      </div>
    </header>
  );
};

export default Header;
