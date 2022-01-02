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
import { convertToUnix } from '../../constants/helpers';
import { authentication, db } from '../../firebase';
import { Context } from '../context/ContextComponent';

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
}) => {
  const { setRemoved, removed } = useContext(Context);

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
    if (actualWeekDate == undefined) {
      objRef.delete();
    } else {
      repObjRef.update({
        exceptionDate: actualWeekDate.toString(),
      });
    }
    setRemoved(removed + 1);
  };

  const onChangeRepeatTime = newRepeatValue => {
    var newRepeatTime = '';

    if (newRepeatValue == 'never') {
      objRef &&
        objRef?.update({
          repeatValue: 'never',
        });

      repObjRef.delete();

      setRemoved(removed + 1);
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

        setRemoved(removed + 1);
      }
    }
  };

  const onChangeNotifTime = async newNotifTime => {
    await objRef.update({
      notifTime: newNotifTime,
    });

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
    <IonItemOptions side="end" onIonSwipe={e => console.log("swipe", e)}>
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
