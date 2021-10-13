import { IonIcon, IonItemOption, IonItemOptions, IonSelect, IonSelectOption } from '@ionic/react';
import { notifications, repeat, trash } from 'ionicons/icons';
import { useContext } from 'react';
import { authentication, db } from '../../firebase';
import { Context } from '../context/ContextComponent';

const SlideOptions = ({ id, dayDate, weekDate, type, repeatValue, text, time, actualWeekDate }) => {
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
    db
      .collection('users')
      .doc(authentication.currentUser.uid)
      .collection(time)
      .doc(getDocName(weekDate))
      .collection('objectives')
      .doc(id);

  const repObjRef =
    authentication.currentUser &&
    db
      .collection('users')
      .doc(authentication.currentUser.uid)
      .collection('repeatedObjectives')
      .doc(id);

  const onRemoveObjective = () => {
    if (repeatValue == 'never' || repeatValue == undefined) {
      objRef.delete();
    } else {
      repObjRef.update({
        exceptionDate: actualWeekDate.toString(),
      });
    }
    setRemoved(removed + 1);
  };

  const onChangeRepeatTime = newRepeatValue => {
    console.log('CHANGED SELECTOR: ', newRepeatValue);
    var newRepeatTime = '';

    if (newRepeatValue == 'never') {
      objRef.update({
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

      if (newRepeatValue) {
        objRef.update({
          repeatValue: newRepeatValue,
        });

        repObjRef.set({
          repeatValue: newRepeatValue,
          repeatTime: newRepeatTime,
          isDone: false,
          text,
        //   date: dayDate.toString(),
          date: weekDate.toString(),
        });

        setRemoved(removed + 1);
      }
    }
  };

  return (
    <IonItemOptions side="end">
      <IonItemOption color="danger" onClick={() => onRemoveObjective()}>
        <IonIcon icon={trash} size={2} style={{ fontSize: 20, paddingLeft: 5, paddingRight: 5 }} />
      </IonItemOption>

      {console.log('TYPE:', type)}

      {type != 'week' && (
        <>
          <IonItemOption>
            {console.log(repeatValue)}
            <IonSelect
              //value={repeatValue != undefined && repeatValue} //POR QUE CUANDO ESTA ACTIVADO AL HACER ONIONCHANGE Y CAMBIARSE EL VALUE SE EJECUTA OTRO ONIONCHANGE PERO AHORA UNDEFINED?
              selectedText=""
              placeholder={null}
              onIonChange={e => {
                onChangeRepeatTime(e.detail.value);
                console.log(e.detail);
              }}
              interface="action-sheet"
            >
              <IonSelectOption value="never">Never {repeatValue == 'never' && '✓'}</IonSelectOption>

              <IonSelectOption value="week">
                Every Week {repeatValue == 'week' && '✓'}
              </IonSelectOption>

              <IonSelectOption value="month">
                Every Month {repeatValue == 'month' && '✓'}
              </IonSelectOption>

              <IonSelectOption value="year">
                Every Year {repeatValue == 'year' && '✓'}
              </IonSelectOption>
            </IonSelect>
            <IonIcon icon={repeat} style={{ fontSize: 20, paddingLeft: 5, paddingRight: 5 }} />
          </IonItemOption>

          <IonItemOption color="warning">
            <IonSelect
              value=""
              selectedText=""
              placeholder={null}
              onIonChange={e => console.log(e.detail)}
              interface="action-sheet"
            >
              <IonSelectOption value="notify">Notify Me ✓</IonSelectOption>
              <IonSelectOption value="silenced">Silenced</IonSelectOption>
            </IonSelect>
            <IonIcon
              icon={notifications}
              style={{ fontSize: 20, paddingLeft: 5, paddingRight: 5, color: 'white' }}
            />
          </IonItemOption>
        </>
      )}
    </IonItemOptions>
  );
};

export default SlideOptions;
