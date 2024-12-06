"use client";

import * as React from "react";

// 1. import `NextUIProvider` component
import { Link, NextUIProvider } from "@nextui-org/react";
import styles from "./home.module.css";
import { ChevronRight } from "lucide-react";

export default function Home() {
  // State to track which card is expanded
  const [expandedCard, setExpandedCard] = React.useState(null);

  // Function to toggle the expanded state of a specific card
  const toggleReadMore = (cardId: any) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const cardsData = [
    {
      id: 1,
      title: "Monitoreo",
      description: `El Monitoreo es un proceso continuo de recolección y análisis de información rutinaria sobre indicadores específicos, con el fin de evaluar el progreso de las actividades relacionadas a unas metas específicas.`,
      additionalText: `En esta sección podrás consultar información detallada sobre las actividades del proyecto CSICAP y su avance en tiempo real. Accede a un calendario interactivo que muestra las actividades distribuidas por municipio, cultivo y eje, con la posibilidad de aplicar filtros según tus necesidades. Además, encontrarás estadísticas de los eventos registrados, información sobre los asistentes y reportes consolidados por evento, lo que te permitirá realizar un seguimiento completo del progreso y los beneficiarios en diferentes niveles.`,
    },
    {
      id: 2,
      title: "Evaluación",
      description: `La Evaluación determina la relevancia y pertinencia del proyecto por medio del logro de los objetivos que inicialmente se plantearon. De esta manera, se intenta establecer el grado de atribución y causalidad de las intervenciones.`,
      additionalText: `En esta sección podrás consultar la evolución de los indicadores clave del proyecto, que reflejan el impacto en áreas como la adopción de prácticas agroambientales, el fortalecimiento de capacidades, la mejora en la productividad de los cultivos, y la sostenibilidad económica y ambiental. A través de visualizaciones claras, podrás seguir el progreso de estos objetivos y el impacto en los beneficiarios, basados en la información recopilada durante el proyecto.`,
    },
  ];

  return (
    <NextUIProvider>
      <div className={styles.page}>
        {cardsData.map((card) => (
          <div
            key={card.id}
            className={styles.cardDiv}
            style={{
              height: expandedCard === card.id ? "50vh" : "40vh", // Taller height for expanded cards
            }}
          >
            <div className={styles.card}>
              <div className={styles.imageDiv}>
                <img
                  className={styles.image}
                  src="/monitoreo.png"
                  alt="No image"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "100%",
                }}
              >
                <div style={{ width: "90%" }}>
                  <h1 className={styles.cardTitle}>{card.title}</h1>
                  <p className={styles.cardDescription}>
                    {card.description}
                    {expandedCard === card.id && (
                      <span> {card.additionalText}</span>
                    )}
                    <button
                      onClick={() => toggleReadMore(card.id)}
                      style={{
                        marginLeft: "8px",
                        background: "none",
                        border: "none",
                        color: "rgb(14, 110, 140)",
                        textDecoration: "underline",
                        cursor: "pointer",
                        fontStyle: "italic",
                      }}
                    >
                      {expandedCard === card.id ? "Leer menos" : "Leer más"}
                    </button>
                  </p>
                </div>
                <div className={styles.buttonDiv}>
                  <button
                    className={styles.button}
                    onClick={() => (window.location.href = "/calendar")}
                  >
                    <ChevronRight size={90} color="#ffffff" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </NextUIProvider>
  );
}
g