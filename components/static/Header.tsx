"use client";

import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import styles from "./static.module.css";

interface HeaderProps {
  showHeader: boolean;
}

const Header: FC<HeaderProps> = ({ showHeader }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Determine the current pathname
  const pathname = usePathname();
  const isHomePage = pathname === "/"; // Check if the current page is the home page

  // Detect if the device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setActiveDropdown(null); // Close any dropdown when toggling the menu
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleDropdown = (dropdown: string) => {
    if (isMobile) {
      setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
    }
  };

  const handleMouseEnter = (dropdown: string) => {
    if (!isMobile) {
      setActiveDropdown(dropdown);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setActiveDropdown(null);
    }
  };

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
      <nav
        className={`${styles.nav_style} ${isMenuOpen ? styles.navOpen : ""}`}
      >
        <ul>
          {/* Conditionally render Monitoreo only if not on the home page */}
          {!isHomePage && (
            <li
              className={styles.header_nav_item}
              onMouseEnter={() => handleMouseEnter("Seguimiento de eventos")}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleDropdown("Seguimiento de eventos")}
            >
              Seguimiento de eventos
              {activeDropdown === "Seguimiento de eventos" && (
                <ul className={styles.dropdownMenu}>
                  <li>
                    <Link href={getLink("/calendar")} onClick={closeMenu}>
                      Calendario
                    </Link>
                  </li>
                  <li>
                    <Link href={getLink("/events")} onClick={closeMenu}>
                      Eventos
                    </Link>
                  </li>
                  <li>
                    <Link href={getLink("/trained")} onClick={closeMenu}>
                      Capacitados
                    </Link>
                  </li>
                  <li>
                    <Link href={getLink("/reports")} onClick={closeMenu}>
                      Reportes
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          {/* Conditionally render Registro only if not on the home page */}
          {!isHomePage && (
            <li
              className={styles.header_nav_item}
              onMouseEnter={() => handleMouseEnter("registro")}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleDropdown("registro")}
            >
              Registro de beneficiarios
              {activeDropdown === "registro" && (
                <ul className={styles.dropdownMenu}>
                  <li>
                    <Link href={getLink("/producers")} onClick={closeMenu}>
                      Productores
                    </Link>
                  </li>
                  <li>
                    <Link href={getLink("/professionals")} onClick={closeMenu}>
                      Profesionales
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
