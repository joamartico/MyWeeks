import { useContext } from 'react';
import styled from 'styled-components';
import { Card, Subtitle } from '../components/styledComponents';
import { Context } from '../context/ContextComponent';
import AddButton from './AddButton';
import Objective from './Objective';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Days = ({ repeatedObjectives, date, nowDate, weekRef }) => {
  const { objectives, newDocId } = useContext(Context);

  const shouldDisplayObjective = (objective, day, dayDate) => {
    if (date.toString() != objective.date && date.toString() != objective.exceptionDate) {
      if (
        objective.repeatTime.date == `${dayDate.day}/${dayDate.month}` &&
        (dayDate.year - objective.repeatTime.year) % 5 === 0
      ) {
        return true;
      }
      if (objective.repeatTime == `${dayDate.day}/${dayDate.month}`) {
        return true;
      }
      if (objective.repeatTime == day) {
        return true;
      }
      if (objective.repeatTime == dayDate.day) {
        return true;
      }
    }
  };

  function dayDate(daysAfterMonday) {
    const day = date.add({ days: daysAfterMonday }).day;
    const month = date.add({ days: daysAfterMonday }).month;
    return `${day}/${month}`;
  }

  return (
    <>
      {days.map((day, index) => (
        <Card key={index}>
          <Subtitle>
            {`${day} ${dayDate(index)}`}
            {dayDate(index) == `${nowDate.day}/${nowDate.month}` && <TodayText>Today 🎉</TodayText>}
          </Subtitle>

          {objectives
            ?.filter(objective => objective.type === day)
            .map((objective) => (
              <Objective
                key={objective.id || newDocId}
                n={objective.n}
                order={objective.order}
                text={objective.text}
                id={objective.id ? objective.id : newDocId}
                isDone={objective.done}
                time="weeks"
                type={objective.type}
                weekDate={date}
                dayDate={date.add({ days: index })}
                repeatValue={objective.repeatValue}
                notifTime={objective.notifTime}
              />
            ))}
          {repeatedObjectives
            ?.filter(objective => objective.type != 'week')
            .map(objective => {
              if (shouldDisplayObjective(objective, day, date.add({ days: index }))) {
                return (
                  <Objective
                    key={objective.id}
                    n={objective.n}
                    text={objective.text}
                    id={objective.id ? objective.id : newDocId}
                    isDone={objective.done}
                    time="weeks"
                    actualWeekDate={date}
                    weekDate={objective.date}
                    dayDate={date.add({ days: index })}
                    repeatTime={objective.repeatTime}
                    repeatValue={objective.repeatValue}
                    notifTime={objective.notifTime}
                  />
                );
              }
            })}

          <AddButton weekRef={weekRef} type={day} />
        </Card>
      ))}
    </>
  );
};

export default Days;

const TodayText = styled.span`
  margin-left: auto;
  font-weight: bold;
  font-style: 12px !important;
`;
