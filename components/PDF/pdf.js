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