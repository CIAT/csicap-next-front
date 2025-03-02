import { useState, useEffect } from "react";
import styles from "./CookiesBanner.module.css";

interface CookieBannerProps {
    onShowTerms: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onShowTerms }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const cookiesAccepted = localStorage.getItem("cookiesAccepted");
        if (!cookiesAccepted) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookiesAccepted", "true");
        onShowTerms();
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className={styles.cookieBanner}>
      <span className={styles.cookieText}>
        Nuestro sitio usa cookies para darte la mejor experiencia, al visitar melia.agroalimentariasostenible.co aceptas su uso.{" "}
          Conoce nuestros{" "}
          <button onClick={onShowTerms} className={styles.cookieLink}>
          términos y condiciones
        </button>
      </span>
            <button onClick={acceptCookies} className={styles.cookieButton}>
                Cerrar
            </button>
        </div>
    );
};

export default CookieBanner;
