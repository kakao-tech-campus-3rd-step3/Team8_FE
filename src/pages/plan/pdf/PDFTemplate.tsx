import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import type { TravelerType } from '@/api/types/traveler';
import type { PlanDetailType } from '@/api/types/planDetail';
import type { planCanvasType } from '@/api/types/planCanvasType';
import type { WaypointData } from '../flow/canvasComponents/Waypoint';
import type { RouteData } from '../flow/canvasComponents/Route';

Font.register({
  family: 'Pretendard Variable',
  fonts: [
    { src: '/fonts/pretendard/static/Pretendard-Regular.otf' },
    { src: '/fonts/pretendard/static/Pretendard-Bold.otf', fontWeight: 'bold' },
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
  timestamp2: {
    fontSize: 11,
    position: 'absolute',
    left: 40,
    top: 32,
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
  planData: PlanDetailType;
  canvasData: planCanvasType;
};

export default function PDFTemplate({ planData, canvasData }: PDFTemplateProps) {
  const [qrDataUrl, setQrDataUrl] = useState('');

  useEffect(() => {
    QRCode.toDataURL(window.location.href, { width: 150 })
      .then((url) => setQrDataUrl(url))
      .catch((err) => console.error(err));
  }, []);

  const getTitleCaption = (): string => {
    if (planData.travelers.length === 1) {
      return `${planData.travelers[0].name}님의 여행 계획`;
    } else {
      return `${planData.travelers.find((traveler) => traveler.role === 'OWNER')?.name}님 외 ${
        planData.travelers.length - 1
      }명의 여행 계획`;
    }
  };

  const schedules = useMemo(() => {
    if (!canvasData?.waypoints?.length) return [];

    const sortedWaypoints = [...canvasData.waypoints].sort(
      (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    );

    const result: (WaypointData | RouteData)[] = [];

    sortedWaypoints.forEach((wp, index) => {
      result.push(wp);

      const next = sortedWaypoints[index + 1];
      if (next) {
        const route = canvasData.routes.find(
          (r) => r.fromWaypointId === wp.id && r.toWaypointId === next.id
        );
        if (route) {
          result.push(route);
        }
      }
    });

    return result;
  }, [canvasData]);

  function isRouteData(schedule: WaypointData | RouteData): schedule is RouteData {
    return 'fromWaypointId' in schedule;
  }

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
            <Text style={styles.headerSubtitle}>{getTitleCaption()}</Text>
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
            <Text style={styles.infoSectionP}>{planData?.title}</Text>
          </View>
          <View style={styles.infoSection}>
            <Text style={styles.infoSectionH3}>여행 설명</Text>
            <Text style={styles.infoSectionP}>{planData?.description}</Text>
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
                  <Text style={styles.tableHeaderCell}>MBTI</Text>
                </View>
              </View>
              {/* Table Body */}
              {planData?.travelers.map((traveler: TravelerType, index: number) => (
                <View
                  key={index}
                  style={[
                    styles.tableRow,
                    { backgroundColor: index % 2 === 1 ? '#f9f9f9' : 'white' },
                  ]}
                >
                  <View style={styles.tableCol}>
                    <View style={styles.profileCell}>
                      {/* 프로필 구현 전까지 주석 처리 */}
                      {/* <Image style={styles.profileImage} src={traveler.img} /> */}
                      <Text style={styles.tableCell}>{traveler.name}</Text>
                    </View>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{traveler.contact}</Text>
                  </View>
                  <View style={[styles.tableCol, { borderRight: 0 }]}>
                    <Text style={styles.tableCell}>{traveler.mbtiType}</Text>
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
            {schedules.map((schedule: WaypointData | RouteData, index: number) =>
              isRouteData(schedule) ? (
                <View key={index} style={styles.edge}>
                  <View style={styles.verticalLine}>
                    <View style={[styles.circle, styles.edgeCircle]} />
                  </View>
                  <View style={styles.edgeContent}>
                    <Text style={styles.edgeText}>이동 수단: {schedule.vehicleCategory}</Text>
                    <Text style={styles.edgeTitle}>{schedule.title}</Text>
                    <Text style={styles.edgeText}>{schedule.description}</Text>
                    <Text style={styles.edgeText}>{schedule.duration} 분 소요</Text>
                  </View>
                </View>
              ) : (
                <View key={index} style={styles.waypoint}>
                  <View style={styles.verticalLine}>
                    <View style={[styles.circle, styles.waypointCircle]} />
                  </View>
                  <Text style={styles.timestamp}>
                    {(() => {
                      const localTime = new Date(
                        new Date(schedule.startTime).getTime() + 9 * 60 * 60 * 1000
                      ); // +9시간
                      const weekday = localTime
                        .toLocaleDateString('ko-KR', { weekday: 'short' })
                        .replace('요일', '');
                      const date = localTime.getDate();
                      return `${weekday}/${date}`;
                    })()}
                  </Text>
                  <Text style={styles.timestamp2}>
                    {(() => {
                      const localTime = new Date(
                        new Date(schedule.startTime).getTime() + 9 * 60 * 60 * 1000
                      ); // +9시간
                      return localTime.toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                      });
                    })()}
                  </Text>
                  <View style={styles.waypointContent}>
                    <Text style={styles.waypointTitle}>{schedule.name}</Text>
                    <Text style={styles.waypointText}>{schedule.address}</Text>
                    <Text style={styles.waypointText}>{schedule.description}</Text>
                    {/* <Text style={styles.memoTitle}>메모</Text>
                    <Text style={styles.memoText}>{schedule.memoID}</Text> */}
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
          {canvasData.memos.map((memo) => (
            <>
              <Text style={styles.infoSectionH3}>{memo.title}</Text>
              <View style={styles.list}>
                <Text style={styles.listItem}>• {memo.content}</Text>
              </View>
            </>
          ))}
          {/* <Text style={styles.infoSectionH3}>준비물</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>• 정신</Text>
            <Text style={styles.listItem}>• 개념</Text>
            <Text style={styles.listItem}>• 여권</Text>
            <Text style={styles.listItem}>• 칫솔</Text>
            <Text style={styles.listItem}>• 돈</Text>
            <Text style={styles.listItem}>• 가방</Text>
          </View> */}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>Journey Planner exported PDF</Text>
      </Page>
    </Document>
  );
}
