import {
  IonDatetime,
  IonIcon,
  IonItemOption,
  IonItemOptions,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { notifications, repeat, trash } from 'ionicons/icons';
import { useContext, useState } from 'react';
import { authentication, db } from '../../firebase';
import { Context } from '../context/ContextComponent';
import useGlobalState from "../hooks/useGlobalState";
import useGoogleCalendar from '../hooks/useGoogleCalendar';

const SlideOptions = ({
  id,
  dayDate,
  weekDate,
  type,
  text,
  time,
  actualWeekDate,
  repeatValue,
  notifTime,
  repObjRef,
  n
}) => {
  const { updateEvent, isEnabled, deleteEvent } = useGoogleCalendar();
  const { objectives, setObjectives, setRemoved, removed } = useGlobalState();


  function convertToUnix(month, day, year, time) {
    return (new Date(month + '/' + day + '/' + year + ' ' + time).getTime() / 1000).toFixed(0);
  }

  function getDocName(DATE) {
    if (time == 'weeks') return DATE.toString();
    if (time == 'Months') return `${DATE.year}-${DATE.month}`;
    if (time == 'Years') return DATE.year.toString();
    if (time == 'Five Years') return `${DATE.year}-${DATE.year + 5}`;
    if (time == 'Ten Years') return `${DATE.year}-${DATE.year + 10}`;
  }

  const objRef =
    authentication.currentUser &&
    weekDate &&
    id &&
    db
      .collection('users')
      .doc(authentication.currentUser.uid)
      .collection(time)
      .doc(getDocName(weekDate))
      .collection('objectives')
      .doc(id);

  const onRemoveObjective = () => {
    isEnabled() && deleteEvent(id);

    if (actualWeekDate == undefined) {
      objRef.delete();
    } else {
      repObjRef.update({
        exceptionDate: actualWeekDate.toString(),
      });
    }
    setRemoved(prevRemoved => prevRemoved + 1);

  };

  const onChangeRepeatTime = newRepeatValue => {
    var newRepeatTime = '';
    isEnabled() && updateEvent({
      id,
      date: dayDate,
      text,
      repeatTime: newRepeatValue,
      notifTime
    });

    if (newRepeatValue == 'never') {
      objRef &&
        objRef?.update({
          repeatValue: 'never',
        });

      repObjRef.delete();

      // setRemoved(removed + 1);
      setObjectives(prevObjectives => {
        const newObjectives = [...prevObjectives];
        newObjectives[n].repeatValue = newRepeatValue;;
        return newObjectives;
      })

    } else {
      if (newRepeatValue == 'week') {
        newRepeatTime = type;
      }
      if (newRepeatValue == 'month') {
        newRepeatTime = `${dayDate.day}`;
      }
      if (newRepeatValue == 'year') {
        newRepeatTime = `${dayDate.day}/${dayDate.month}`;
      }
      if (newRepeatValue == '5 years') {
        newRepeatTime = {
          date: `${dayDate.day}/${dayDate.month}`,
          year: dayDate.year,
        };
      }

      if (newRepeatValue) {
        objRef &&
          objRef?.update({
            repeatValue: newRepeatValue,
          });

        repObjRef.set({
          repeatValue: newRepeatValue,
          repeatTime: newRepeatTime,
          isDone: false,
          text,
          date: weekDate.toString(),
        });

        // setRemoved(prevRemoved => prevRemoved + 1);
        setObjectives(prevObjectives => {
          const newObjectives = [...prevObjectives];
          newObjectives[n].repeatValue = newRepeatValue;;
          return newObjectives;
        })
      }
    }
  };

  const onChangeNotifTime = async newNotifTime => {

    console.log("newNotifTime: ", newNotifTime);

    isEnabled() && updateEvent({
      id,
      date: dayDate,
      text,
      notifTime: newNotifTime,
      repeatTime: repeatValue,
    });

    await objRef.update({
      notifTime: newNotifTime,
    });

    // setRemoved(removed + 1);
    // actualizar el estado con el nuevo notifTime
    console.log("objective n: ", n);
    console.log("all objectives: ", objectives);
    setObjectives(prevObjectives => {
      const newObjectives = [...prevObjectives];
      newObjectives[n].notifTime = newNotifTime;
      return newObjectives;
    })


    const data = await {
      notifTime: convertToUnix(dayDate.month, dayDate.day, dayDate.year, newNotifTime),
      email: authentication.currentUser.email,
      message: text,
      time: newNotifTime,
    };

    await fetch('/api/mail', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    

  };

  return (
    <IonItemOptions side="end">
      {type != 'week' && time == 'weeks' && (
        <>
          <IonItemOption color="warning">
            {/* NOTIFY */}
            <IonDatetime
              pickerFormat="HH:mm"
              value={notifTime && notifTime}
              onIonChange={e => onChangeNotifTime(e.detail.value)}
              displayFormat={'HH:mm'}
              displayTimezone="local"
            />
            <IonIcon
              icon={notifications}
              style={{ fontSize: 20, paddingLeft: 5, paddingRight: 5, color: 'white' }}
            />
          </IonItemOption>

          <IonItemOption>
            {/* REPEAT */}
            <IonSelect
              //value={repeatValue != undefined && repeatValue} //POR QUE CUANDO ESTA ACTIVADO AL HACER onIonInput Y CAMBIARSE EL VALUE SE EJECUTA OTRO onIonInput PERO AHORA UNDEFINED?
              selectedText=""
              placeholder={null}
              onIonChange={e => {
                onChangeRepeatTime(e.detail.value);
              }}
              interface="action-sheet"
            >
              <IonSelectOption value="never">Never {repeatValue == 'never' && '✓'}</IonSelectOption>

              <IonSelectOption value="5 years">
                Five Years {repeatValue == '5 years' && '✓'}
              </IonSelectOption>

              <IonSelectOption value="year">
                Every Year {repeatValue == 'year' && '✓'}
              </IonSelectOption>

              <IonSelectOption value="month">
                Every Month {repeatValue == 'month' && '✓'}
              </IonSelectOption>

              <IonSelectOption value="week">
                Every Week {repeatValue == 'week' && '✓'}
              </IonSelectOption>
            </IonSelect>
            <IonIcon icon={repeat} style={{ fontSize: 20, paddingLeft: 5, paddingRight: 5 }} />
          </IonItemOption>
        </>
      )}

      <IonItemOption color="danger" onClick={() => onRemoveObjective()}>
        {/* DELETE */}
        <IonIcon icon={trash} size={2} style={{ fontSize: 20, paddingLeft: 5, paddingRight: 5 }} />
      </IonItemOption>
    </IonItemOptions>
  );
};

export default SlideOptions;
