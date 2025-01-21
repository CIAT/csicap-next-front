import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Método no permitido" });
    }

    const { name, email, phone, subject, message } = req.body;

    // Validar los datos
    if (!name || !email || !message) {
        return res.status(400).json({ message: "Faltan datos obligatorios." });
    }

    // Configurar el transporte de nodemailer
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        // Configurar los detalles del correo
        await transporter.sendMail({
            from: `"${name}" <${email}>`,
            to: "destinatario@correo.com",
            subject: subject || "Sin asunto",
            text: `Teléfono: ${phone || "No especificado"}\n\n${message}`,
        });

        return res.status(200).json({ message: "Correo enviado correctamente." });
    } catch (error) {
        console.error("Error al enviar el correo:", error);
        return res.status(500).json({ message: "Error al enviar el correo." });
    }
}
