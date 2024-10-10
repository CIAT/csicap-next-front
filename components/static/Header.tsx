'use client';

import { useState } from "react";
import Link from 'next/link';
import styles from "./static.module.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={styles.headerStyle}>
      <div className={styles.logoStyle}>
        <Link href="/" className="h-full w-full">
          <img src="/logo.png" alt="alliance-logo" />
        </Link>
      </div>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <img src="/menu.png" alt="menu" />
        <span className={styles.hamburgerIcon}></span>
      </div>
      <nav className={`${styles.nav_style} ${isMenuOpen ? styles.navOpen : ""}`}>
        <ul>
          <li className={styles.header_nav_item}>
            <Link href="/events" onClick={closeMenu}>Eventos</Link>
          </li>
          <li className={styles.header_nav_item}>
            <Link href="/assistance" onClick={closeMenu}>Asistentes</Link>
          </li>
          <li className={styles.header_nav_item}>
            <Link href="/registered" onClick={closeMenu}>Registrados</Link>
          </li>
          <li className={styles.header_nav_item}>
            <Link href="/tecnicos" onClick={closeMenu}>Técnicos</Link>

          </li>
          <li className={styles.header_nav_item}>
            <Link href="/data/calendario" onClick={closeMenu}>Calendario</Link>
          </li>
           <li className={styles.header_nav_item}>
            <Link href="/reports" onClick={closeMenu}>Reportes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
