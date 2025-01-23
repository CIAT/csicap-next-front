"use client";

import { useState } from "react";
import styles from "./home.module.css";

export default function Home() {
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const cards = [
        {
            icon: "/chart_icon.png",
            alt: "chart-icon",
            mainText: "El Monitoreo es un proceso continuo de recolección y análisis de información rutinaria sobre indicadores específicos, con el fin de evaluar el progreso de las actividades relacionadas a unas metas específicas. ",
            additionalText: "En esta sección podrás consultar información detallada sobre las actividades del proyecto CSICAP y su avance en tiempo real. Accede a un calendario interactivo que muestra las actividades distribuidas por municipio, cultivo y eje, con la posibilidad de aplicar filtros según tus necesidades. Además, encontrarás estadísticas de los eventos registrados, información sobre los asistentes y reportes consolidados por evento, lo que te permitirá realizar un seguimiento completo del progreso y los beneficiarios en diferentes niveles. ",
            buttonText: "Monitoreo",
            buttonLink: "/monitoring/calendar",
        },
        {
            icon: "/list_icon.png",
            alt: "list-icon",
            mainText: "La Evaluación determina la relevancia y pertinencia del proyecto por medio del logro de los objetivos que inicialmente se plantearon. De esta manera, se intenta establecer el grado de atribución y causalidad de las intervenciones. ",
            additionalText: "En esta sección podrás consultar la evolución de los indicadores clave del proyecto, que reflejan el impacto en áreas como la adopción de prácticas agroambientales, el fortalecimiento de capacidades, la mejora en la productividad de los cultivos, y la sostenibilidad económica y ambiental. A través de visualizaciones claras, podrás seguir el progreso de estos objetivos y el impacto en los beneficiarios, basados en la información recopilada durante el proyecto. ",
            buttonText: "Evaluación de impacto",
            buttonLink: "/evaluation/impact",
        },
    ];

    const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

    const toggleExpand = (index: number) => {
        setExpandedIndexes((prev) =>
            prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
        );
    };

    return (
        <div className={styles.big_container}>
            <div className={styles.landing_container}>
                <div className={`${styles.spacing} ${styles.landing}`}>
                    <div className={`${styles.spacing} ${styles.text} ${styles.title}`}>
                        Plataforma de monitoreo, evaluación, aprendizaje y evaluación de impacto del proyecto Colombia Agroalimentaria Sostenible
                    </div>
                    <div className={`${styles.spacing} ${styles.text}`}>
                        La Plataforma de Monitoreo y Evaluación es una herramienta diseñada para recopilar, gestionar y analizar indicadores clave del proyecto de manera eficiente y segura.
                        <br />
                        Este sistema ofrece tableros interactivos que resumen el avance de los indicadores, proporcionando información en tiempo real para facilitar la toma de decisiones y mejorar la implementación del proyecto.
                    </div>
                    <div>
                        <button
                            className={`${styles.shadow} ${styles.spacing} ${styles.button}`}
                            onClick={() => scrollToSection("information_section")}
                        >
                            Conocer más
                        </button>
                    </div>
                </div>
            </div>
            <div id="information_section" className={styles.second_container}>
                <div className={`${styles.spacing} ${styles.second_title}`}>Resultados esperados:</div>
                <div className={`${styles.spacing} ${styles.card_container}`}>
                    {cards.map((card, index) => (
                        <div key={index} className={`${styles.spacing} ${styles.card}`}>
                            <div className={`${styles.shadow} ${styles.chart_icon}`}>
                                <img src={card.icon} alt={card.alt} />
                            </div>
                            <div className={`${styles.spacing} ${styles.text} ${styles.text_left}`}>
                                {card.mainText}
                                {expandedIndexes.includes(index) && (
                                    <>
                                        <br />
                                        {card.additionalText}
                                    </>
                                )}
                                <button
                                    className={`${styles.expand_button}`}
                                    onClick={() => toggleExpand(index)}
                                >
                                    {expandedIndexes.includes(index) ? "Ver menos" : "Ver más"}
                                </button>
                            </div>
                            <button
                                className={`${styles.shadow} ${styles.spacing} ${styles.button} ${styles.card_button}`}
                                onClick={() => (window.location.href = card.buttonLink)}
                            >
                                {card.buttonText}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.second_container}>
                <div className={styles.second_title}>Socios clave</div>
                <div className={styles.img_container}>
                    <img src="/LOGOS%20-%203%20LÍNEAS.png" alt="alliance-logo" />
                </div>
            </div>
        </div>
    );
}