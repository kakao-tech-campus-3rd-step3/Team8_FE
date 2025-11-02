import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import type { Schedule, Traveler } from './types/PDFDataType';
import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

Font.register({
  family: 'Pretendard Variable',
  fonts: [
    { src: '/public/fonts/pretendard/static/Pretendard-Regular.otf' },
    { src: '/public/fonts/pretendard/static/Pretendard-Bold.otf', fontWeight: 'bold' },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Pretendard Variable', // Default font
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 10,
    height: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
  },
  qrCode: {
    width: 80,
    height: 80,
  },
  content: {
    flexDirection: 'column',
    padding: 40,
    paddingTop: 10,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitleBox: {
    marginRight: 10,
    width: 5,
    height: 20,
    backgroundColor: '#2b2a2a',
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  hr: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 5,
  },
  infoSectionH3: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 10,
  },
  infoSectionP: {
    fontSize: 12,
  },
  // Table styles
  travelerTable: {
    width: '90%',
    border: '1px solid #ddd',
    marginHorizontal: 'auto',
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#4caf50',
  },
  tableHeaderCell: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  tableCol: {
    flex: 1,
    borderRight: '1px solid #ddd',
    padding: 8,
    textAlign: 'center',
    justifyContent: 'center',
  },
  tableCell: {
    fontSize: 11,
  },
  profileCell: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  // Timeline styles
  timeline: {
    marginTop: 10,
  },
  lineEndMarker: {
    width: 10,
    height: 2,
    backgroundColor: 'black',
    marginLeft: -4.5, // Aligns with the circle
  },
  waypoint: {
    flexDirection: 'row',
  },
  edge: {
    flexDirection: 'row',
    minHeight: 50, // Give space for the edge line
  },
  verticalLine: {
    width: 1,
    backgroundColor: 'black',
    marginRight: 30,
    position: 'relative',
  },
  circle: {
    position: 'absolute',
    top: 16,
    left: -5,
    width: 12,
    height: 12,
    borderRadius: 4,
    border: '1.25px solid black',
  },
  waypointCircle: {
    backgroundColor: '#e59401',
  },
  edgeCircle: {
    backgroundColor: '#4caf50',
  },
  timestamp: {
    fontSize: 11,
    position: 'absolute',
    left: 40,
    top: 16,
  },
  waypointContent: {
    flex: 1,
    marginLeft: 80, // Space for timestamp
    paddingTop: 10,
    paddingBottom: 10,

    borderLeftWidth: 0.5, // 선의 굵기
    borderLeftColor: 'black', // 선의 색상
    paddingLeft: 10, // 선과 내부 텍스트 사이의 간격
  },
  edgeContent: {
    flex: 1,
    paddingLeft: 40,
    paddingTop: 20,
    paddingBottom: 20,
  },
  waypointTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  edgeTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  waypointText: {
    fontSize: 10,
    marginBottom: 2,
  },
  edgeText: {
    fontSize: 10,
    marginBottom: 2,
  },
  memoTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 5,
  },
  memoText: {
    fontSize: 10,
  },
  // Additional Memo List
  list: {
    marginTop: 5,
    paddingLeft: 10,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 3,
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2b2a2a',
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 16,
  },
});

type PDFTemplateProps = {
  travelers: Traveler[];
  schedules: Schedule[];
};

export default function PDFTemplate({ travelers, schedules }: PDFTemplateProps) {
  const [qrDataUrl, setQrDataUrl] = useState('');

  useEffect(() => {
    QRCode.toDataURL(window.location.href, { width: 150 })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>
              <Text style={{ color: '#e59401' }}>J</Text>ourney{' '}
              <Text style={{ color: '#31B443' }}>P</Text>lanner
            </Text>
            <Text style={styles.headerSubtitle}>안선우님 외 4명의 여행 계획</Text>
          </View>
          <Image style={styles.qrCode} src={qrDataUrl} />
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Basic Info Section */}
          <View style={styles.sectionTitleContainer}>
            <View style={styles.sectionTitleBox} />
            <Text style={styles.sectionTitleText}>기본 정보</Text>
          </View>
          <View style={styles.hr} />

          <View style={styles.infoSection}>
            <Text style={styles.infoSectionH3}>여행 이름</Text>
            <Text style={styles.infoSectionP}>친구들과 함께하는 일본 여행</Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.infoSectionH3}>여행 설명</Text>
            <Text style={styles.infoSectionP}>
              도쿄, 교토, 오사카, 오키나와를 경유하는 flex 일본 힐링 여행
            </Text>
          </View>
          <View style={[styles.infoSection, { alignItems: 'flex-start', marginTop: 10 }]}>
            <Text style={styles.infoSectionH3}>여행자</Text>
            <View style={styles.travelerTable}>
              {/* Table Header */}
              <View style={[styles.tableRow, styles.tableHeader]}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableHeaderCell}>이름</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableHeaderCell}>연락처</Text>
                </View>
                <View style={[styles.tableCol, { borderRight: 0 }]}>
                  <Text style={styles.tableHeaderCell}>이메일</Text>
                </View>
              </View>
              {/* Table Body */}
              {travelers.map((traveler: Traveler, index: number) => (
                <View
                  key={index}
                  style={[
                    styles.tableRow,
                    { backgroundColor: index % 2 === 1 ? '#f9f9f9' : 'white' },
                  ]}
                >
                  <View style={styles.tableCol}>
                    <View style={styles.profileCell}>
                      <Image style={styles.profileImage} src={traveler.img} />
                      <Text style={styles.tableCell}>{traveler.name}</Text>
                    </View>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{traveler.phone}</Text>
                  </View>
                  <View style={[styles.tableCol, { borderRight: 0 }]}>
                    <Text style={styles.tableCell}>{traveler.email}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={{ marginTop: 20 }} />

          {/* Schedule Info Section */}
          <View style={styles.sectionTitleContainer}>
            <View style={styles.sectionTitleBox} />
            <Text style={styles.sectionTitleText}>일정 정보</Text>
          </View>

          <View style={styles.timeline}>
            <View style={styles.lineEndMarker} />
            {schedules.map((schedule: Schedule, index: number) =>
              schedule.type === 'waypoint' ? (
                <View key={index} style={styles.waypoint}>
                  <View style={styles.verticalLine}>
                    <View style={[styles.circle, styles.waypointCircle]} />
                  </View>
                  <Text style={styles.timestamp}>{schedule.time}</Text>
                  <View style={styles.waypointContent}>
                    <Text style={styles.waypointTitle}>{schedule.title}</Text>
                    <Text style={styles.waypointText}>{schedule.address}</Text>
                    <Text style={styles.waypointText}>{schedule.description}</Text>
                    <Text style={styles.memoTitle}>메모</Text>
                    <Text style={styles.memoText}>{schedule.memo}</Text>
                  </View>
                </View>
              ) : (
                <View key={index} style={styles.edge}>
                  <View style={styles.verticalLine}>
                    <View style={[styles.circle, styles.edgeCircle]} />
                  </View>
                  <View style={styles.edgeContent}>
                    <Text style={styles.edgeTitle}>{schedule.title}</Text>
                    <Text style={styles.edgeText}>{schedule.description}</Text>
                  </View>
                </View>
              )
            )}
            <View style={styles.lineEndMarker} />
          </View>

          <View style={styles.hr} />

          {/* Additional Memo Section */}
          <View style={styles.sectionTitleContainer}>
            <View style={styles.sectionTitleBox} />
            <Text style={styles.sectionTitleText}>추가 메모</Text>
          </View>
          <Text style={styles.infoSectionH3}>준비물</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• 정신</Text>
            <Text style={styles.listItem}>• 개념</Text>
            <Text style={styles.listItem}>• 여권</Text>
            <Text style={styles.listItem}>• 칫솔</Text>
            <Text style={styles.listItem}>• 돈</Text>
            <Text style={styles.listItem}>• 가방</Text>
          </View>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Journey Planner exported PDF</Text>
      </Page>
    </Document>
  );
}
