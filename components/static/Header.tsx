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
  const isHomePage = pathname === "/" || pathname === "/contact" || pathname === "/about";
  const isMonitoringPage = pathname.includes("monitoring");
  const isEvaluationPage = pathname.includes("evaluation");

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
            {(isHomePage) && (
                <>
                  <li
                      className={styles.header_nav_item}
                      onMouseEnter={() => handleMouseEnter("contact")}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleDropdown("contact")}
                  >
                    <Link href={getLink("/monitoring/calendar")} onClick={closeMenu}>
                      Monitoreo
                    </Link>
                  </li>
                  <li
                      className={styles.header_nav_item}
                      onMouseEnter={() => handleMouseEnter("about")}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => handleDropdown("about")}
                  >
                    <Link href={getLink("/evaluation/impact")} onClick={closeMenu}>
                      Evaluación de impacto
                    </Link>
                  </li>
                </>
            )}
            {/* Render 'Seguimiento de eventos' and 'Registro' only if the URL contains 'monitoring' */}
            {(isMonitoringPage) && (
                <>
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
                            <Link href={getLink("/monitoring/calendar")} onClick={closeMenu}>
                              Programa
                            </Link>
                          </li>
                          <li>
                            <Link href={getLink("/monitoring/events")} onClick={closeMenu}>
                              Resumen
                            </Link>
                          </li>
                          <li>
                            <Link href={getLink("/monitoring/trained")} onClick={closeMenu}>
                              Capacitados
                            </Link>
                          </li>
                          <li>
                            <Link href={getLink("/monitoring/reports")} onClick={closeMenu}>
                              Reportes
                            </Link>
                          </li>
                        </ul>
                    )}
                  </li>

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
                            <Link href={getLink("/monitoring/producers")} onClick={closeMenu}>
                              Familias registradas
                            </Link>
                          </li>
                          <li>
                            <Link href={getLink("/monitoring/professionals")} onClick={closeMenu}>
                              Profesionales
                            </Link>
                          </li>
                        </ul>
                    )}
                  </li>
                </>
            )}

            {/* Render 'Indicadores' only if the URL contains 'evaluation' */}
            {isEvaluationPage && (
                <li
                    className={styles.header_nav_item}
                    onMouseEnter={() => handleMouseEnter("Indicadores")}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleDropdown("Indicadores")}
                >
                  Indicadores
                  {activeDropdown === "Indicadores" && (
                      <ul className={styles.dropdownMenu}>
                        <li>
                          <Link href={getLink("/evaluation/impact")} onClick={closeMenu}>
                            Impacto
                          </Link>
                        </li>
                        <li>
                          <Link href={getLink("/evaluation/outcomes")} onClick={closeMenu}>
                            Resultados
                          </Link>
                        </li>
                        <li>
                          <Link href={getLink("/evaluation/performance")} onClick={closeMenu}>
                            Ejecución
                          </Link>
                        </li>
                      </ul>
                  )}
                </li>
            )}
            <li
                className={styles.header_nav_item}
                onMouseEnter={() => handleMouseEnter("contact")}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleDropdown("contact")}
            >
              <Link href={getLink("/contact")} onClick={closeMenu}>
                Contacto
              </Link>
            </li>
            <li
                className={styles.header_nav_item}
                onMouseEnter={() => handleMouseEnter("about")}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleDropdown("about")}
            >
              <Link href={getLink("/about")} onClick={closeMenu}>
                Acerca
              </Link>
            </li>
          </ul>
        </nav>
      </header>
  );
};

export default Header;