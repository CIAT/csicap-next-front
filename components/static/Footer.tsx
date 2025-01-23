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
          <div className={styles.partner_container}>
              <div className={styles.partner_title}>
                  Socios
              </div>
              <div>
                  AGROSAVIA ASABAMA ASOCAÑA ASOHOFRUCOL
              </div>
              <div>
                  AUGURA CENICAFÉ CENICAÑA CIMMYT
              </div>
              <div>
                  CIPAV FEDEARROZ FEDEGAN FEDEPANELA
              </div>
              <div>
                  FEDEPAPA FENALCE
              </div>
          </div>
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
      <div className={styles.footer_img_variant}>
        <img
          src="/Alliance_Logo_Refresh-SP_white.png"
          alt="alliance-logo"
        />
      </div>
    </footer>
  );
};

export default Footer;
