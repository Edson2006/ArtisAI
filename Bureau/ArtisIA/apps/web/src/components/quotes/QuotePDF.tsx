import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { Quote } from "@/types/quote";
import { CompanyData } from "@/utils/firebase/firestore";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#334155",
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
    height: 80, // Fixed height for alignment
  },
  logoContainer: {
    width: 100,
    height: 80,
    justifyContent: "flex-start",
  },
  logo: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
  companyInfo: {
    flexDirection: "column",
    alignItems: "flex-end",
    width: "50%",
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 20,
    marginTop: 10,
  },
  metaGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 4,
  },
  clientInfo: {
    width: "45%",
  },
  quoteMeta: {
    width: "45%",
    alignItems: "flex-end",
  },
  label: {
    fontSize: 8,
    color: "#64748b",
    marginBottom: 4,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  value: {
    fontSize: 10,
    marginBottom: 2,
    lineHeight: 1.4,
  },
  table: {
    width: "100%",
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#0f172a",
    color: "white",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  colDesc: { width: "50%" },
  colQty: { width: "10%", textAlign: "center" },
  colPrice: { width: "20%", textAlign: "right" },
  colTotal: { width: "20%", textAlign: "right" },
  
  totalSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  totalBox: {
    width: 250,
    padding: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  totalLabel: {
    color: "#64748b",
  },
  totalValue: {
    fontWeight: "bold",
    color: "#0f172a",
  },
  grandTotalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: "#2563eb",
  },
  grandTotalLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0f172a",
  },
  grandTotalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563eb",
  },
  
  signatureSection: {
    marginTop: 40,
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 4,
    padding: 10,
    height: 80,
    width: "40%",
    alignSelf: "flex-end",
  },
  signatureLabel: {
    fontSize: 8,
    color: "#64748b",
    marginBottom: 4,
  },

  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 10,
  },
  legalText: {
    fontSize: 8,
    color: "#94a3b8",
    lineHeight: 1.4,
  },
});

interface QuotePDFProps {
  quote: Quote;
  company: CompanyData;
}

export const QuotePDF = ({ quote, company }: QuotePDFProps) => {
  const isMicroEnterprise = quote.taxRate === 0;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            {company.logoUrl && (
              // eslint-disable-next-line jsx-a11y/alt-text
              <Image src={company.logoUrl} style={styles.logo} />
            )}
          </View>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{company.name}</Text>
            <Text style={styles.value}>{company.address}</Text>
            <Text style={styles.value}>{company.phone}</Text>
            <Text style={styles.value}>{company.email}</Text>
            <Text style={styles.value}>SIRET: {company.siret}</Text>
            {company.tvaNumber && <Text style={styles.value}>TVA: {company.tvaNumber}</Text>}
          </View>
        </View>

        <Text style={styles.title}>DEVIS N° {quote.number}</Text>

        {/* Meta Info */}
        <View style={styles.metaGrid}>
          <View style={styles.clientInfo}>
            <Text style={styles.label}>CLIENT</Text>
            <Text style={[styles.value, { fontWeight: "bold" }]}>{quote.clientName}</Text>
            <Text style={styles.value}>{quote.clientAddress}</Text>
            <Text style={styles.value}>{quote.clientEmail}</Text>
          </View>
          <View style={styles.quoteMeta}>
            <Text style={styles.label}>INFORMATIONS</Text>
            <Text style={styles.value}>
              Date : {format(new Date(quote.createdAt), "d MMMM yyyy", { locale: fr })}
            </Text>
            <Text style={styles.value}>
              Validité : {format(new Date(new Date(quote.createdAt).setDate(new Date(quote.createdAt).getDate() + 30)), "d MMMM yyyy", { locale: fr })}
            </Text>
          </View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.label, styles.colDesc, { color: "white" }]}>DESCRIPTION</Text>
            <Text style={[styles.label, styles.colQty, { color: "white" }]}>QTÉ</Text>
            <Text style={[styles.label, styles.colPrice, { color: "white" }]}>PRIX UNIT.</Text>
            <Text style={[styles.label, styles.colTotal, { color: "white" }]}>TOTAL HT</Text>
          </View>
          {quote.items.map((item, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.colDesc}>{item.description}</Text>
              <Text style={styles.colQty}>{item.quantity}</Text>
              <Text style={styles.colPrice}>{item.unitPrice.toFixed(2)} €</Text>
              <Text style={styles.colTotal}>{item.total.toFixed(2)} €</Text>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalSection}>
          <View style={styles.totalBox}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total HT</Text>
              <Text style={styles.totalValue}>{quote.subtotal.toFixed(2)} €</Text>
            </View>
            
            {!isMicroEnterprise && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>TVA ({quote.taxRate}%)</Text>
                <Text style={styles.totalValue}>{quote.taxAmount.toFixed(2)} €</Text>
              </View>
            )}

            <View style={styles.grandTotalRow}>
              <Text style={styles.grandTotalLabel}>NET À PAYER</Text>
              <Text style={styles.grandTotalValue}>{quote.total.toFixed(2)} €</Text>
            </View>
          </View>
        </View>

        {/* Signature */}
        <View style={styles.signatureSection}>
          <Text style={styles.signatureLabel}>Bon pour accord (Date et Signature)</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.legalText}>
            {company.legalForm} {company.name} - SIRET {company.siret}
          </Text>
          {isMicroEnterprise ? (
            <Text style={[styles.legalText, { marginTop: 4 }]}>
              TVA non applicable, art. 293 B du CGI
            </Text>
          ) : (
            <Text style={[styles.legalText, { marginTop: 4 }]}>
              N° TVA Intracommunautaire : {company.tvaNumber}
            </Text>
          )}
        </View>
      </Page>
    </Document>
  );
};
