"use client";

import styles from "./home.module.css";

export default function Home() {
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    return (
        <div className={styles.big_container}>
            <div className={styles.landing_container}>
                <div className={`${styles.spacing} ${styles.landing}`}>
                    <div className={`${styles.spacing} ${styles.text} ${styles.title}`}>
                        Plataforma de monitoreo, evaluación, aprendizaje y evaluación de impacto del proyecto Colombia
                        Agroalimentaria Sostenible
                    </div>
                    <div className={`${styles.spacing} ${styles.text}`}>
                        La Plataforma de Monitoreo y Evaluación es una herramienta diseñada para recopilar, gestionar y
                        analizar indicadores clave del proyecto de manera eficiente y segura.
                        <br/>
                        Este sistema ofrece tableros interactivos que resumen el avance de los indicadores,
                        proporcionando información en tiempo real para facilitar la toma de decisiones y mejorar la
                        implementación del proyecto.
                    </div>
                    <div>
                        <button
                            className={`${styles.shadow} ${styles.spacing} ${styles.button}`}
                            onClick={() => scrollToSection('information_section')}
                        >
                            Conocer más
                        </button>
                    </div>
                </div>
            </div>
            <div id={"information_section"} className={styles.second_container}>
                <div className={`${styles.spacing} ${styles.second_title}`}>
                    Resultados esperados:
                </div>
                <div className={`${styles.spacing} ${styles.card_container}`}>
                    <div className={`${styles.spacing} ${styles.card}`}>
                        <div className={`${styles.shadow} ${styles.chart_icon}`}>
                            <img src="/chart_icon.png" alt="alliance-logo"/>
                        </div>
                        <div className={`${styles.spacing} ${styles.text}`}>
                            Lorem ipsum odor amet, consectetuer adipiscing elit. Urna at sit gravida fames tristique
                            duis
                            dictumst tempor malesuada. Mattis sociosqu ac libero erat, lobortis laoreet mus dictum.
                            Hac
                            gravida malesuada per purus; nisl sed. Metus venenatis sodales feugiat lectus libero
                            potenti
                            feugiat nullam.
                        </div>
                        <button
                            className={`${styles.shadow} ${styles.spacing}  ${styles.button} ${styles.card_button}`}>
                            Monitoreo
                        </button>
                    </div>
                    <div className={`${styles.spacing} ${styles.card}`}>
                        <div className={`${styles.shadow} ${styles.chart_icon}`}>
                            <img src="/list_icon.png" alt="alliance-logo"/>
                        </div>
                        <div className={`${styles.spacing} ${styles.text}`}>
                            Lorem ipsum odor amet, consectetuer adipiscing elit. Urna at sit gravida fames tristique
                            duis
                            dictumst tempor malesuada. Mattis sociosqu ac libero erat, lobortis laoreet mus dictum.
                            Hac
                            gravida malesuada per purus; nisl sed. Metus venenatis sodales feugiat lectus libero
                            potenti
                            feugiat nullam.
                        </div>
                        <button className={`${styles.shadow} ${styles.spacing} ${styles.button} ${styles.card_button}`}>
                            Evaluación de impacto
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.second_container}>
                <div className={styles.second_title}>
                Socios clave
                </div>
                <div className={styles.img_container}>
                    <img src="/LOGOS%20-%203%20LÍNEAS.png" alt="alliance-logo"/>
                </div>
            </div>
        </div>
    );
}