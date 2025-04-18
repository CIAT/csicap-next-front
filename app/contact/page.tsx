import {NextPage} from "next";
import styles from "./contact.module.css";

const ContactPage: NextPage = ({}) => {
    return(
        <div className={styles.contact}>
            <div className={`${styles.background_text} ${styles.image_container}`}>
                <div className={styles.container}>
                    <div className={styles.title}>
                        Contáctate
                    </div>
                    <div className={styles.title}>
                        con
                    </div>
                    <div className={styles.title}>
                        nosotros
                    </div>
                    <div className={styles.body}>
                        Este es un proyecto de resiliencia para familias colombianas del sector agropecuario.
                    </div>
                    <div className={styles.body}>
                        Puedes dejarnos tu mensaje a continuación:
                    </div>
                </div>
            </div>
            <div className={`${styles.background_contact} ${styles.image_container}`}>
                <form className={`${styles.container} ${styles.message_container}`}
                      action={`https://formspree.io/f/${process.env.EMAIL_CONTACT}`}
                      method="POST"
                >
                    <div className={styles.message_title}>
                        Mensaje:
                    </div>
                    <div className={styles.labels_container}>
                        <input className={styles.label} placeholder={"Nombre"} type="text" id="Nombre" name="Nombre"/>

                        <input className={styles.label} placeholder={"Correo electrónico"} type="text"
                               id="Correo electrónico" name="Correo electrónico"/>
                    </div>
                    <div className={styles.labels_container}>
                        <input className={styles.label} placeholder={"Teléfono"} type="text" id="Teléfono"
                               name="Teléfono"/>

                        <input className={styles.label} placeholder={"Asunto"} type="text" id="Asunto" name="Asunto"/>
                    </div>
                    <div className={styles.message_label_container}>
                        <input className={`${styles.label} ${styles.message_label}`} placeholder={"Mensaje"} type="text"
                               id="Mensaje" name="Mensaje"/>
                    </div>

                    <div className={styles.button_container}>
                        <input className={styles.button} type="submit" value="Enviar"/>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ContactPage;