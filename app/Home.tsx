"use client";

import styles from "./home.module.css";

export default function Home() {

    return (
        <div className={styles.container}>
            <div className={`${styles.spacing} ${styles.landing}`}>
                <div className={`${styles.spacing} ${styles.text} ${styles.title}`}>
                    Plataforma de monitoreo, evaluación, aprendizaje y evaluación de impacto del proyecto Colombia Agroalimentaria Sostenible
                </div>
                <div className={`${styles.spacing} ${styles.text}`}>
                    La Plataforma de Monitoreo y Evaluación es una herramienta diseñada para recopilar, gestionar y analizar indicadores clave del proyecto de manera eficiente y segura.
                    <br/>
                    Este sistema ofrece tableros interactivos que resumen el avance de los indicadores, proporcionando información en tiempo real para facilitar la toma de decisiones y mejorar la implementación del proyecto.
                </div>
                <div>
                    <button className={`${styles.spacing} ${styles.button}`}>
                        Conocer más
                    </button>
                </div>
            </div>
        </div>
    );
}