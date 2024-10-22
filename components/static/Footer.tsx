// components/Footer.tsx
import Link from "next/link";
import styles from "./static.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerStyle}>
      <div className={styles.footer_img}>
        <img
          src="/Logo_Colombia_+_Ministerio_Blanco.png"
          alt="CAS-logo"
        />
      </div>
      <div className={styles.footer_text}>
        <p>© 2024 MyWebsite. All rights reserved.</p>
        <nav>
          <ul className={styles.footerNavStyle}>
            <li className={styles.footerNavItemStyle}>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li className={styles.footerNavItemStyle}>
              <Link href="/terms">Terms of Service</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.footer_img}>
        <img
          src="/Alliance_Logo_Refresh-SP_white.png"
          alt="alliance-logo"
        />
      </div>
    </footer>
  );
};

export default Footer;
