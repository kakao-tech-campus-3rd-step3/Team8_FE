import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFTemplate from './PDfTemplate';

export default function PDFSave() {
  return (
    <PDFDownloadLink document={<PDFTemplate />} fileName="example.pdf">
      {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
    </PDFDownloadLink>
  );
}
