import styled from 'styled-components';

const Container = styled.div`
  * {
    margin: 0;
  }
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;
  padding: 10px;
  height: 40px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 40px;
`;

const StyledFooter = styled.footer`
  color: white;
  background-color: #2b2a2a;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  padding: 16px;
`;

const StyledHr = styled.hr`
  margin: 10px;
`;

const Box = styled.div`
  margin-right: 10px;
  display: inline-block;
  width: 5px;
  height: 20px;
  background-color: #2b2a2a;
`;

const TravelerTable = styled.table`
  width: 80%;
  border-collapse: collapse;
  margin: 20px auto;
  font-family: 'Segoe UI', sans-serif;
  font-size: 14px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);

  th,
  td {
    border: 1px solid #ddd;
    padding: 12px 15px;
    text-align: center;
  }

  th {
    background-color: #4caf50;
    color: white;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tr:hover {
    background-color: #f1f1f1;
    cursor: pointer;
  }
`;

const Profile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
`;

const Section = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
`;

const Timeline = styled.div`
  display: flex;
  flex-direction: column;
`;

const LineEndMarker = styled.div`
  width: 10px;
  height: 2px;
  background-color: black;
  transform: translate(-40%, 0);
`;

const Circle = styled.div`
  border-radius: 5px;
  width: 10px;
  height: 10px;
  transform: translate(-42%, 80%);
  border: 2px solid black;
`;

const VerticalLine = styled.div`
  background-color: black;
  height: inherit;
  width: 2px;
  margin-right: 10px;
`;

const WaypointContainer = styled.div`
  display: flex;
  > ${VerticalLine} > ${Circle} {
    background-color: #e59401;
  }
`;

const EdgeContainer = styled.div`
  display: flex;
  > ${VerticalLine} > ${Circle} {
    background-color: #4caf50;
  }
`;

const WaypointInfo = styled.div`
  padding: 16px;
`;

const EdgeInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

const Timestamp = styled.div`
  margin-right: 10px;
`;

const JourneyPlanner = () => {
  return (
    <Container>
      <StyledHeader>
        <div>
          <h1>
            <span style={{ color: '#e59401' }}>J</span>ourney{' '}
            <span style={{ color: '#31B443' }}>P</span>lanner
          </h1>
          <p style={{ fontSize: '12px' }}>안선우님 외 4명의 여행 계획</p>
        </div>
        <img
          style={{ width: '100px' }}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/640px-QR_code_for_mobile_English_Wikipedia.svg.png"
          alt="QR_Code"
        />
      </StyledHeader>

      <Content>
        <h2>
          <Box />
          기본 정보
        </h2>
        <StyledHr />
        <Section>
          <h3>여행 이름</h3>
          <p>친구들과 함께하는 일본 여행</p>
        </Section>
        <Section>
          <h3>여행 설명</h3>
          <p>도쿄, 교토, 오사카, 오키나와를 경유하는 flex 일본 힐링 여행</p>
        </Section>
        <Section>
          <h3>여행자</h3>
          <TravelerTable>
            <tbody>
              <tr>
                <th>이름</th>
                <th>연락처</th>
                <th>이메일</th>
              </tr>
              <tr>
                <td>
                  <Profile>
                    <img
                      src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAFoAhwMBIgACEQEDEQH/xAAbAAACAwEBAQAAAAAAAAAAAAADBAIFBgAHAf/EADkQAAIBAwIEAwUHBAAHAAAAAAECAwAEERIhBTFBURMiYQYycYGRFCNCobHR8BVSwfEHM0NEcpLh/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAJBEAAgIBBAICAwEAAAAAAAAAAAECESEDBBIxE0FRYSIycRT/2gAMAwEAAhEDEQA/AMJ/T8Nu4zRk4eit5txTAYG2RFh84OS3em7YsYirKFzyrxlftkYFI7OAtRv6fExAGcU3HFnltTCwHGVaosnBXnh1srgqpyKaSONR5It/Wm1gbkNzX14HQ4Kkn0ocr7YCoeTPICoSO5POn47V5F3icEdMV9Nk3iBTER6mmtWCHkrjAxGc5zQ2shqFXMloIgNTA/CjW3DpbyYRW0bzSf2xrkgfzrVR3HwFNGeaxDe+SR0FLrYmNyQowK2l37L8VtkaWSxlMajLaSrY+QJNVC24BKshz61o9eUcNAsFEbcFmJUDUMUpNYu6CMnKryNaw8NBTWUUD1NfGtYkQfexqT88VD3rKpsxU3D5fC0BiPWgR8P8PJkVW9a2UlpE4P38ec1W3lksallnTVncUo7x2GTONaAZC4x2rqddWDYYDHcV1b/6JC5Megl1Eqqk4GTVvb2qbGaVV+ear4RCXzjY42HWn42VWDoi/SuKTlWATRY2lvbPH4hdmAPICmmEKKFihkbvmlILuXSU8uD2qUs8hAIODyyDWP53kfJDSkkOIYArnqx5UB/tkIAYKQTzzQHLMoZ5znGNqGs0I8viM7dzRT6ZPItCXWEsblFOd1FDmCaSRclmApJXjGSedDkMRcHxcfOhQphzLGMRSyxwwQmSWRgqgnmxOK9N4fZWvCLIW0OlSBmVlG7t3NeXezskMftHw6UyEgXCAjpucf5r1G6tGnaRdRXAr09hCNOXsqLsVuJ7KG5N4ZjHIECFvFIUDPbOM564zXnHtORLfS3lqpELthwM+Rv2PP45HStD7R8GvreB7u0upZYEH3sXIqP7tuY/T4cswnFZ7bIW3FxnZlbqOx7ist9q6lqKRtHwtOM20/T9CCzFkGS5FRWZTJoELrn8RozXLNKxSEwqzZWMnVpB6ZrphdMpUKnm6kcq51VnKBumDwosSrqXm/equdimdeSKsvss6j/mR465paaNQMtMGGd8CrbTArWkQqc8x6V9orrESFIOehxzrqqkFH2B3GkhcFt96dSUaG0sTkbkdKGqQyLlyRuORpiKO3XUras536VngLPviSwrpAJA5n0qcU8z6Vb3mHlyK9A9mDwbi3CI7a6sRK1sNJY+8AdxgjBxWosLawsbbRw61iijHpkn4k7muuOzc0mpYKUbPLeD8Kv+JymK1tjIwxk/hX1J5CtZZf8ADqPxFe/4jgnnFbpt/wCx/atQOIJpEaFI9zttj8qFLcyAeUox7g8q6NPZQj+2R8EfLP2V4DYoNNjHK3902ZCfkdvyqxjgs7ZcQW0EQ6COJV/SqqK5unYKWXJO3IfLnVg7sFXxWUY5jnXVGEY9IqiTxWsw0vDE2Dka0B3+lTLMDh+vXvSb30YGAvzoX9UiDaGJ7d8U8AFMnh3AIIIO1eY+0KJY8au4Io/IsvlC9ARkD5Zr0J5Vd8oOvevOOPz/AGjjN26gYeYgnPQeUH6CuHfVxX9JmJ+PLIRpTAHU7VIvKMgnGN6FqVBk5wds550ZrfTD4rK4jk3QspGfrXmqNmZAAFSxKjYnekpSigKiAZIGD0o88aARoclSMeU8u+aA8YyxdsZJ2B55FO0AtcmJj92MgHHlGa6ulZYT93jIAH6fsa6tPx+AsXwjgMHCAEcjnG/anvs8E8LIzOH6OG3Bxzpa1toYP+p5gN8DmD3709FptyrRuukY/DnNQ7vABbRJbXS8N4wlIADLkEHnsRW69keKz3kDQ3Nx480GNb5wWU8j/j6VifFQgNpABznB58udO8K4s3DLwTACRWBDAc8bftz/AINdDV8epl4Ki0memMIJE1NGuo9etI3OlQywzGIfEY/Osnee1sUcZZCWY8lNJWPtFFdtmS4XxQ3mQ8x+9el54PCN0r9m/soDbxB3lLyMN2ZulAv7tF8rMPmedZC/9sorZSiZZh6iqO/9qhdWeuGXyu2GYbH13+VN60UNacnbNXxDiekHE+Mc9LbCq2045GM/fgDqOdZO3uUvkZy6sgP92d/U1Pxo0UI0mhVzkKewzXJqbl3hEeRI2M3tOoiZbYkykYDHkPXesjcfaTLhjkFi2rO5Of8AX1qIlEUi5PiL+P6UQ6gplVtPlwGPL55/m9c0tSWp2Yzm2w7TMJMLEVDbMT0+FGurh2VUEp0JnSNRKjJ/n1pVJwISHx5hjlgg9aC8mp9cykIBvjkR8KmpE5YaS7VWMbk5JJ5bChyDXIxZdh+HucVAsWXRqGogn4j+fpQpXKjGScnJwOX/AMpcQItG76lSPIGMgc/TeuqSs8qMqacd2O1dVqP0MVSQ4OCM4zt/iprK7RhTkad1z23OPjSNu2lSR7oXbA/naiW0s7uDnCsoIDDlv37/AL1TQ/ofg8QppKhccydjy2OKkknjHSrMZFJLhugz+lBjcxLiNtOHIzjO55U2JZFDKFOZHwu2w61LdCBSWokYM8rMpBJVSc9v0oKcNtneSWZWLPnUCvLfn37VYqkWXwqORyGPX+GpJNHIwUL5cbau1LytdDoqrbgMAJ8fDqdgVzkYycH9aOOFwywPbSeRNACFT136Z9Pzpq2QrJmUaQ4wo5gb9PrTHhNgNgZ5kt0HYfSm9ZspSa6K2bhuiFBalgQwxp/FiouqeFJG5bVkHGNx3x+dWgbRlFJ1PuCBsB1FA0OxYFRnVhl04+Gfy5UubqyGVcBCssSqXdSS2+5HxFWaSyEKixaww33HbpTMqYbUuAxboOpNLoWEDeKwLg+XH50udsKCLjQWPmLe8B2+dDlkWM6XVcY05xk18ALeGV8jFfeU/lQpYlSQKHJ1cmxVDo6a5UjToZ/wtgd6VklCRxmXG64x1AH+6lKFQ50+pC9aUknjZiBHqYbjPT+ZqkBGedihRUYIp3xnNdQ2kLkto26jVjNdVY9jpCYkcoMKCyk7ZpqCSTw0Y+TIyRnlVNbMRIME++3Xpy2YlpQSceXr61rqRGWkF84YxENkZ36HtvTjThLYmUA4Xv+dU4JF2ACcFhUIGJbcn3DWDgItP6oRMkarhW33GNRPLNcbqdozqI3zkdRvVTkmRSTk6h+tPwf9x/5D9abgqHxLSK51FZFUGIZG5oUnFxFcKrHGATjHTrSkwCv5RjGOXzqu4gThjk5xzqVpqToaiaGLiMUm4QZUHTvRJLstCZkQgEDO/XrVBwbewkJ3Oo71oV9wfKs5rg2T0SsrgXBZmXST1718njj8Ufe6SOp67UFfLq07efpS9yxKyZJO/erbxgQQMPHGH2I3waG02hW1sQegx1pcgeGDjfJ3qNuSc5J51CWLGSlwGU6mbblQJijP4kYxsc1K594UhMSJWwTzraKsdBXkMZ1tgjsRtXUCcnU25rq1j0Fn//Z"
                      alt="profile Image"
                    />
                    안선우
                  </Profile>
                </td>
                <td>+81-33-443-1234</td>
                <td>sunja@nate.net</td>
              </tr>
              <tr>
                <td>
                  <Profile>
                    <img
                      src="data:image/jpeg;base64,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"
                      alt="profile Image"
                    />
                    안선우
                  </Profile>
                </td>
                <td>+82-10-1234-4731</td>
                <td>parkcs@nate.net</td>
              </tr>
              <tr>
                <td>
                  <Profile>
                    <img
                      src="data:image/jpeg;base64,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"
                      alt="profile Image"
                    />
                    안선우
                  </Profile>
                </td>
                <td>+82-10-1004-9541</td>
                <td>kimy@naver.com</td>
              </tr>
              <tr>
                <td>
                  <Profile>
                    <img
                      src="data:image/jpeg;base64,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"
                      alt="profile Image"
                    />
                    안선우
                  </Profile>
                </td>
                <td>+82-10-1134-8451</td>
                <td>younghee@gmail.com</td>
              </tr>
              <tr>
                <td>
                  <Profile>
                    <img
                      src="data:image/jpeg;base64,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"
                      alt="profile Image"
                    />
                    안선우
                  </Profile>
                </td>
                <td>+82-10-5234-4361</td>
                <td>chulsu@hello.com</td>
              </tr>
            </tbody>
          </TravelerTable>
        </Section>
        <h2>
          <Box />
          일정 정보
        </h2>

        <Timeline>
          <LineEndMarker />

          <WaypointContainer>
            <VerticalLine>
              <Circle />
            </VerticalLine>
            <Timestamp>10:22~11:23</Timestamp>
            <StyledHr />
            <WaypointInfo>
              <h2>인천</h2>
              <div>272 Gonghang-ro, Jung-gu, Incheon</div>
              <div>1 터미널 집합, OO에어 카운터 수속 후 15번 게이트에서 탑승</div>
              <h3>메모</h3>
              <div>여권 챙기기</div>
            </WaypointInfo>
          </WaypointContainer>

          <EdgeContainer>
            <VerticalLine>
              <Circle />
            </VerticalLine>
            <EdgeInfo>
              <h4>항공기 이동</h4>
              <div>11:30분 출발, 비행편 링크: https://abcdefg.com</div>
            </EdgeInfo>
          </EdgeContainer>

          <WaypointContainer>
            <VerticalLine>
              <Circle />
            </VerticalLine>
            <Timestamp>10:22~11:23</Timestamp>
            <StyledHr />
            <WaypointInfo>
              <h2>LA</h2>
              <div>272 Gonghang-ro, Jung-gu, Incheon</div>
              <div>1 터미널 집합, OO에어 카운터 수속 후 15번 게이트에서 탑승</div>
              <h3>메모</h3>
              <div>여권 챙기기</div>
            </WaypointInfo>
          </WaypointContainer>

          <EdgeContainer>
            <VerticalLine>
              <Circle />
            </VerticalLine>
            <EdgeInfo>
              <h4>차량 이동</h4>
              <div>여행사 픽업 에정, 차량번호 452VFH</div>
            </EdgeInfo>
          </EdgeContainer>

          <WaypointContainer>
            <VerticalLine>
              <Circle />
            </VerticalLine>
            <Timestamp>13:25~14:25</Timestamp>
            <StyledHr />
            <WaypointInfo>
              <h2>호텔</h2>
              <div>272 Hotel-ro, 42-21 street, USA</div>
              <div>호캉스 즐기기</div>
              <h3>메모</h3>
              <div>호캉스 제대로 즐기기</div>
            </WaypointInfo>
          </WaypointContainer>

          <EdgeContainer>
            <VerticalLine>
              <Circle />
            </VerticalLine>
            <EdgeInfo>
              <h4>택시 이동</h4>
              <div>우버 예약, 예상 금액 50 USD</div>
            </EdgeInfo>
          </EdgeContainer>

          <WaypointContainer>
            <VerticalLine>
              <Circle />
            </VerticalLine>
            <Timestamp>20:22~20:23</Timestamp>
            <StyledHr />
            <WaypointInfo>
              <h2>한국</h2>
              <div>272 Gonghang-ro, Jung-gu, Incheon</div>
              <div>1 터미널 해산</div>
              <h3>메모</h3>
              <div>집 조심히 들어가기</div>
            </WaypointInfo>
          </WaypointContainer>

          <LineEndMarker />
        </Timeline>

        <StyledHr />
        <h2>
          <Box />
          추가 메모
        </h2>
        <h3>준비물</h3>
        <ul>
          <li>정신</li>
          <li>개념</li>
          <li>여권</li>
          <li>칫솔</li>
          <li>돈</li>
          <li>가방</li>
        </ul>
        <StyledHr />
      </Content>

      <StyledFooter>Journey Planner exported PDF</StyledFooter>
    </Container>
  );
};

export default JourneyPlanner;
