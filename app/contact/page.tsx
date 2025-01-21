"use client"

import { NextPage } from "next";
import { PageCustomProps } from "@/interfaces/Components/PageCustomProps";
import { useState } from "react";

const ContactPage: NextPage<PageCustomProps> = ({ customStyles }) => {
    const styles = customStyles || require("./contact.module.css");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(false);
        setError(null);

        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Error al enviar el formulario. Inténtalo nuevamente.");
            }

            setSuccess(true);
            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            });
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className={`${styles.container}`}>
                <div className={styles.title}>Contáctate</div>
                <div className={styles.title}>con</div>
                <div className={styles.title}>nosotros</div>
                <div className={styles.body}>
                    Este es un proyecto de resiliencia para familias colombianas del
                    sector agropecuario.
                </div>
                <div className={styles.body}>Puedes dejarnos tu mensaje a continuación:</div>
            </div>
            <form
                className={`${styles.container} ${styles.message_container} ${styles.shadow}`}
                onSubmit={handleSubmit}
            >
                <div className={styles.message_title}>Mensaje:</div>
                <div className={styles.labels_container}>
                    <input
                        required
                        className={styles.label}
                        placeholder="Nombre"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                    <input
                        required
                        className={styles.label}
                        placeholder="Correo electrónico"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.labels_container}>
                    <input
                        required
                        className={styles.label}
                        placeholder="Teléfono"
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />

                    <input
                        required
                        className={styles.label}
                        placeholder="Asunto"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.message_label_container}>
                    <input
                        required
                        className={`${styles.label} ${styles.message_label}`}
                        placeholder="Mensaje"
                        type="text"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.button_container}>
                    <button className={`${styles.button} ${styles.shadow}`} type="submit" disabled={loading}>
                        {loading ? "Enviando..." : "Enviar"}
                    </button>
                </div>
                {success && <p className={styles.successMessage}>¡Mensaje enviado correctamente!</p>}
                {error && <p className={styles.errorMessage}>{error}</p>}
            </form>
        </div>
    );
};

export default ContactPage;