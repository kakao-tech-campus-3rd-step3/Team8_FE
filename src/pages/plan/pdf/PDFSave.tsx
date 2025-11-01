import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFTemplate from './PDFTemplate';
import { schedules, travelers } from './data/example';
import styled from 'styled-components';
import { colorSystem } from '@/styles/colorSystem';
import { useParams } from 'react-router-dom';
import { useFetchPlanDetail } from '../hooks/useFetchPlanDetail';

export default function PDFSave() {
  const id = useParams().id ?? '-1';
  const { data, isError } = useFetchPlanDetail(id);

  if (isError) return null;

  return (
    <PDFDownloadLink
      document={<PDFTemplate data={data!} />}
      fileName={`${data!.title}-JourneyPlanner.pdf`}
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
