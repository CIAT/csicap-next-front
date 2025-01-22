import {NextPage} from "next";
import styles from "./about.module.css";

const AboutPage: NextPage = ({}) => {
    return(
        <div className={styles.container}>
            <div className={styles.about_container}>
                <div className={`${styles.text} ${styles.title}`}>
                    Acerca de Colombia Agroalimentaria Sostenible
                </div>
                <div className={styles.text}>
                    Lorem ipsum odor amet, consectetuer adipiscing elit. Dictum etiam dolor porttitor ligula nulla
                    porttitor metus sapien. Tempus velit fringilla sem; sodales tempus quam varius viverra orci. Aenean
                    nullam accumsan vitae lacinia taciti tempus. Arcu vehicula habitant dolor suspendisse viverra
                    senectus massa. Parturient aliquam platea risus; interdum maximus scelerisque consectetur
                    suspendisse. Ipsum nisi purus, ipsum risus neque a ac nostra. Cubilia inceptos scelerisque habitant
                    amet ex arcu, efficitur eget. Hendrerit nam ac quam mus dis arcu finibus. Aenean massa quisque mi
                    per fusce felis feugiat massa.
                    <br/>
                    <br/>
                    Egestas rhoncus proin turpis pretium mattis viverra. Convallis praesent placerat vivamus suscipit
                    dapibus mauris enim a. Varius dis vitae ut integer; sagittis ipsum quam donec? Interdum enim
                    vulputate sit velit rhoncus. Ligula augue convallis eu velit pretium sollicitudin velit. Quis dis
                    mus dolor penatibus varius mi vivamus. Etiam viverra odio eleifend gravida gravida at curabitur
                    quam. Ultricies lectus gravida est cursus habitant. Feugiat metus aenean sem neque mauris interdum
                    pellentesque per. Felis dictum imperdiet non, lacus pharetra dictum!
                </div>
            </div>
            <div className={styles.credits_container}>
                <div className={`${styles.text} ${styles.title}`}>
                    Créditos
                </div>
                <div className={`${styles.text} ${styles.credits}`}>
                    Andrade, R.; Benavides, G.; Buritica, A.; Dcroz, S.; Gonzalez, C.; Guerrero, S.; Nasner, H.; Orozco,
                    E.; Ossa, L.M.; Pedreros, R.; Rivera, T.; Tovar, C. Plataforma de monitoreo, evaluación, aprendizaje
                    y evaluación de impacto del proyecto Colombia Agroalimentaria Sostenible. Versión 1.0. Alliance
                    Bioversity International and International Center for Tropical Agriculture (CIAT), 2024.
                </div>
                <div className={`${styles.text} ${styles.note}`}>
                    <div className={styles.important}>*</div> Autores en orden alfabético
                </div>
            </div>
        </div>
    );
}

export default AboutPage;