import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFTemplate from './PDFTemplate';
import { schedules, travelers } from './data/example';
import styled from 'styled-components';
import { colorSystem } from '@/styles/colorSystem';

export default function PDFSave({ title }: { title: string }) {
  return (
    <PDFDownloadLink
      document={<PDFTemplate travelers={travelers} schedules={schedules} />}
      fileName={`${title}-JourneyPlanner.pdf`}
      style={{ textDecoration: 'none' }}
    >
      {({ loading }) =>
        loading ? (
          <ExportButton disabled>PDF 생성중...</ExportButton>
        ) : (
          <ExportButton>PDF 다운로드</ExportButton>
        )
      }
    </PDFDownloadLink>
  );
}

const ExportButton = styled.button`
  flex: 1;
  padding: 16px;
  border-radius: 8px;
  border: none;
  background-color: ${colorSystem.primary_yellow._500};
  transition: all 0.25s;
  cursor: pointer;
`;
