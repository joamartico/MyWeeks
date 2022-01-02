import React from 'react';
import { COLORS } from '../../constants/theme';
import styled from 'styled-components';
import { Title } from '../../constants/styledComponents';
import { IonHeader, IonIcon } from '@ionic/react';

const months = [
  'January',
  'February',
  'March',
  'Arpil',
  'May',
  'june',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const WeekHeader = ({ children, date, onClickNext, onClickPrevious, time, withSegment }) => {
  const fromDayNumber = date.day;
  const fromDayMonthNumber = date.month;
  const fromDayMonth = months[fromDayMonthNumber - 1];

  const toDayNumber = date.add({ days: 6 }).day;
  const toDayMonthNumber = date.add({ days: 6 }).month;
  const toDayMonth = months[toDayMonthNumber - 1];

  return (
    <Header withSegment={withSegment}>
      {children && <Wrapper>{children}</Wrapper>}

      <Wrapper>
        <div onClick={onClickPrevious}>
          <IonIcon name="chevron-back" style={{ fontSize: 35, color: COLORS.bg }} />
        </div>

        <Title>
          {time == 'weeks' &&
            `${fromDayMonth} ${fromDayNumber} - ${
              toDayNumber < 7 ? `${toDayMonth} ` : ''
            }${toDayNumber}`}
          {time == 'Months' && fromDayMonth}
          {time == 'Years' && date.year}
          {time == 'Five Years' && `${date.year} - ${date.add({ years: 5 }).year}`}
          {time == 'Ten Years' && `${date.year} - ${date.add({ years: 10 }).year}`}
        </Title>

        <div onClick={onClickNext}>
          <IonIcon name="chevron-forward" style={{ fontSize: 35, color: COLORS.bg }} />
        </div>
      </Wrapper>
    </Header>
  );
};

export default WeekHeader;

const Header = styled(IonHeader)`

  height: ${({withSegment}) => withSegment ? "146px" : "73px"};
  border-bottom: 1px solid #6666;
  flex-direction: row;
  /* background-color: #fff; */
  background: #fffc;
  backdrop-filter: blur(16px);
  z-index: 1000;
  justify-content: center;
  align-items: center;
  width: '100%';
  flex-direction: column;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  height: 70px;
  width: 100%;
  max-width: 700px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

// const styles = StyleSheet.create({
// 	header: {
// 		position: "absolute",
// 		left: 0,
// 		right: 0,
// 		top: 0,
// 		borderBottomColor: "#6666",
// 		borderBottomWidth: 1,
// 		flexDirection: "row",
// 		backgroundColor: "#fff",
// 		zIndex: 1000,
// 		justifyContent: "space-evenly",
// 		alignItems: "center",
// 		width: "100%",
// 	},

// 	title: {
// 		fontSize: 24,
// 		fontWeight: "bold",
// 		color: COLORS.primary,
// 		alignItems: "center",
// 	},
// });
