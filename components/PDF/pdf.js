import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Crear estilos
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

// Definir los nombres de los encabezados
const headers_name = {
  main_event_objective: "Objetivo",
  event_type: "Tipo de taller o capacitación",
  event_justification: "Justificación",
  guest_type: "Tipo de invitados",
  invited_participants_number: "No. Invitados",
  main_occupation_without_other: "Tipo de asistentes",
  participant_count: "No. Asistentes",
  female_participants: "No. Hombres",
  male_participants: "No. Mujeres",
  other_participants: "No. Otros",
  organizing_institutions: "Actores involucrados",
  component: "Componente",
  axis: "Eje",
  gcf_activities: "Actividad GCF",
  event_agenda: "Agenda",
  event_invitation: "Convocatoria: Evidencia",
  attendance_list: "Lista de asistencia",
  conclusion: "Resultados: Recomendaciones - Pasos a seguir",
  photo_register: "Registro fotográfico",
  link: "Evidencias",
};

// Crear el componente PDF
const PDFFile = ({ data }) => (
    <Document>
      <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text style={styles.header}>{data.main_event_objective}</Text>
            <Text style={styles.text}>{data.event_type}</Text>
          </View>
      </Page>
    </Document>
  );

export default PDFFile;