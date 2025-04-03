import {useState, useEffect, SetStateAction, Dispatch} from "react";
import styles from "./CookiesBanner.module.css";

interface CookieBannerProps {
    onShowTerms: () => void;
    showTerms: boolean;
    setAcceptedTerms: Dispatch<SetStateAction<boolean>>;
}

const CookieBanner: React.FC<CookieBannerProps> = ({ onShowTerms, showTerms, setAcceptedTerms }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const cookiesAccepted = localStorage.getItem("cookiesAccepted");
        if (!cookiesAccepted) {
            setIsVisible(true);
        }
    }, []);

    const acceptCookies = (choice: boolean) => {
        localStorage.setItem("cookiesAccepted", `${choice}`);

        if (showTerms) {
            onShowTerms();
        }

        if (choice) {
            setAcceptedTerms(true);
        }

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
            <div className={styles.buttons_container}>
                <button onClick={() => acceptCookies(true)} className={styles.cookieButton}>
                    Aceptar
                </button>
                <button onClick={() => acceptCookies(false)} className={styles.cookieButton}>
                    Rechazar
                </button>
            </div>
        </div>
    );
};

export default CookieBanner;
