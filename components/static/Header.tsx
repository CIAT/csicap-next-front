'use client';

import { FC, useState } from "react";
import Link from 'next/link';
import styles from "./static.module.css";

interface HeaderProps {
  showHeader: boolean;
}

const Header: FC<HeaderProps> = ({ showHeader }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // Función para cambiar la ruta según el estado de showHeader
  const getLink = (path: string) => (showHeader ? path : `/embed${path}`);

  return (
    <header className={styles.headerStyle}>
      {showHeader && (
        <div className={styles.logoStyle}>
          <Link href="/" className="h-full w-full">
            <img src="/logo.png" alt="alliance-logo" />
          </Link>
        </div>
      )}
      <div className={styles.hamburger} onClick={toggleMenu}>
        <img src="/menu.png" alt="menu" />
        <span className={styles.hamburgerIcon}></span>
      </div>
      <nav className={`${styles.nav_style} ${isMenuOpen ? styles.navOpen : ""}`}>
        <ul>
          <li className={styles.header_nav_item}>
            <Link href={getLink("/events")} onClick={closeMenu}>Eventos</Link>
          </li>
          <li className={styles.header_nav_item}>
            <Link href={getLink("/assistance")} onClick={closeMenu}>Asistentes</Link>
          </li>
          <li className={styles.header_nav_item}>
            <Link href={getLink("/registered")} onClick={closeMenu}>Productores</Link>
          </li>
          <li className={styles.header_nav_item}>
            <Link href={getLink("/tecnicos")} onClick={closeMenu}>Profesionales</Link>
          </li>
          <li className={styles.header_nav_item}>
            <Link href={getLink("/calendario")} onClick={closeMenu}>Calendario</Link>
          </li>
          <li className={styles.header_nav_item}>
            <Link href={getLink("/reports")} onClick={closeMenu}>Reportes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;