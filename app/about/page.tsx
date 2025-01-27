import {NextPage} from "next";
import styles from "./about.module.css";

const AboutPage: NextPage = ({}) => {
    return(
        <div className={styles.container}>
            <div className={styles.about_container}>
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