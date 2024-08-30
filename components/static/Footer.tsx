// components/Footer.tsx
import Link from "next/link";
import styles from "./static.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerStyle}>
      <div className={styles.footer_img}>
        <img
          src="/logo_alianza.webp"
          alt="alliance-logo"
        />
      </div>
      <div className={styles.footer_img}>
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
          src="/colombia-agro-logo.webp"
          alt="CAS-logo"
        />
      </div>
    </footer>
  );
};

export default Footer;
