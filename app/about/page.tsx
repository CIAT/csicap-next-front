import {NextPage} from "next";
import styles from "./about.module.css";

const AboutPage: NextPage = ({}) => {
    return(
        <div className={styles.container}>
            <div className={styles.about_container}>
                <div className={`${styles.text} ${styles.title}`}>
                    Plataforma de Monitoreo y Evaluación
                </div>
                <div className={styles.text}>
                    La Plataforma de Monitoreo y Evaluación es una herramienta creada para recopilar, gestionar y
                    analizar indicadores clave del proyecto de manera eficiente y segura. Este sistema, diseñado por el
                    Eje 7 “Monitoreo y Evaluación de Impacto” bajo el liderazgo del equipo de Prospección, Economía
                    Aplicada y Evaluación de Impacto (FAE, por sus siglas en inglés) de la Alianza Bioversity
                    International y el CIAT, recibió retroalimentación de los componentes y socios para garantizar su
                    funcionalidad y relevancia.
                    <br/>
                    <br/>
                    La plataforma ofrece <b>tableros interactivos</b> que presentan información en tiempo real sobre el
                    avance de los indicadores, facilitando la toma de decisiones y mejorando la implementación del proyecto.
                </div>
                <div className={`${styles.text} ${styles.title}`}>
                    Estructura de la Plataforma
                </div>
                <div className={styles.text}>
                    La plataforma se divide en dos secciones principales:
                    <div className={`${styles.text} ${styles.second_title}`}>
                        1. Monitoreo:
                    </div>
                    <ul className={styles.list}>
                        <li className={styles.text}>
                            Conecta a los agricultores con las actividades del proyecto y permite registrar
                            continuamente a los
                            beneficiarios y su progreso.
                        </li>
                        <li className={styles.text}>
                            Proporciona datos sobre los eventos realizados, así como el seguimiento de los avances
                            registrados.
                        </li>
                    </ul>
                    <div className={`${styles.text} ${styles.second_title}`}>
                        2. Evaluación de Impacto:
                    </div>
                    <ul className={styles.list}>
                        <li className={styles.text}>
                            Refleja los indicadores y metas del proyecto.
                        </li>
                        <li className={styles.text}>
                            A medida que se desarrollan las intervenciones, proyectará el avance de estos
                            indicadores
                            con base
                            en los datos disponibles.
                        </li>
                    </ul>
                </div>
                <div className={`${styles.text} ${styles.title}`}>
                    Recolección y Gestión de Datos
                </div>
                <div className={styles.text}>
                    La información presentada en la plataforma se construye a partir de los datos recopilados por
                    agricultores, profesionales y socios en las diferentes cadenas productivas del país. Este proceso
                    utiliza herramientas como la aplicación ODK para la colecta de datos y FormShare para su manejo y
                    almacenamiento.
                </div>
                <div className={`${styles.text} ${styles.title}`}>
                    Sobre FAE
                </div>
                <div className={styles.text}>
                    El equipo FAE forma parte del Área de Desempeño, Innovación y Análisis Estratégico para el Impacto
                    (PISA4Impact, por sus siglas en inglés), un grupo multidisciplinario compuesto por economistas,
                    sociólogos y expertos en datos. Este equipo realiza investigaciones socioeconómicas orientadas por
                    la demanda y análisis de políticas de impacto, con un enfoque especial en la sostenibilidad
                    agroalimentaria y su contribución a los Objetivos de Desarrollo Sostenible (ODS).
                    <br/>
                    <br/>
                    Entre sus áreas de trabajo destacan los mercados y la nutrición, los recursos genéticos, la
                    agricultura y la ganadería, el cambio climático y las políticas agroalimentarias. Su objetivo es
                    generar evidencia basada en investigación para apoyar la movilización de recursos, la rendición de
                    cuentas y el progreso hacia los ODS.
                </div>
            </div>
            <div className={styles.credits_container}>
                <div className={`${styles.text} ${styles.title}`}>
                    Créditos
                </div>
                <div className={styles.text}>
                    Gracias a todos nuestros colegas en la Alianza Bioversity-CIAT, Ministerio de Agricultura y
                    Desarrollo Rural, y socios del proyecto por su compromiso y adecuado uso de la aplicación ODK que
                    permite la colecta de la información. Las imágenes y los datos de la Plataforma de monitoreo,
                    evaluación, aprendizaje y evaluación de impacto se pueden utilizar siempre que se proporcione el
                    enlace
                    <a
                        className={styles.link}
                        target="_blank"
                        href={"https://melia.agroalimentariasostenible.co/"}
                    > Colombia Agroalimentaria Sostenible
                    </a> junto con la siguiente citación:
                </div>
                <div className={`${styles.text} ${styles.credits}`}>
                    Andrade, R.; Benavides, G.; Buritica, A.; Dcroz, S.; Gonzalez, C.; Guerrero, S.; Nasner, H.; Orozco,
                    E.; Ossa, L.M.; Pedreros, R.; Rivera, T.; Tovar, C. Plataforma de monitoreo, evaluación, aprendizaje
                    y evaluación de impacto del proyecto Colombia Agroalimentaria Sostenible. Versión 1.0. Alliance
                    Bioversity International and International Center for Tropical Agriculture (CIAT), 2024.
                </div>
                <div className={`${styles.text} ${styles.note}`}>
                    <a className={styles.important}>*</a> Autores en orden alfabético
                </div>
            </div>
        </div>
    );
}

export default AboutPage;