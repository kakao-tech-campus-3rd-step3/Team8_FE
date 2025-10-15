import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFTemplate from './PDFTemplate';
import { schedules, travelers } from './data/example';

export default function PDFSave() {
  return (
    <PDFDownloadLink
      document={<PDFTemplate travelers={travelers} schedules={schedules} />}
      fileName="예시계획.pdf"
    >
      {({ loading }) => (loading ? '문서를 생성중입니다...' : 'PDF 다운로드')}
    </PDFDownloadLink>
  );
}
