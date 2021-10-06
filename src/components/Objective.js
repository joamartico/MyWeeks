import React, { useContext, useRef, useEffect } from 'react';
// import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { InputObjective } from '../../constants/styledComponents';
import { authentication, db } from '../../firebase';
import { Context } from '../context/ContextComponent';
import styled from 'styled-components';
import { COLORS } from '../../constants/theme';

const Objective = ({ isDone, id, n, text, date, time }) => {
  const { objectives, setObjectives } = useContext(Context);

  function getDocName() {
    if (time == 'weeks') return date.toString();
    if (time == 'Months') return `${date.year}-${date.month}`;
    if (time == 'Years') return date.year.toString();
    if (time == 'Five Years') return `${date.year}-${date.year + 5}`;
    if (time == 'Ten Years') return `${date.year}-${date.year + 10}`;
  }

  const timeRef =
    authentication.currentUser &&
    db.collection('users').doc(authentication.currentUser.uid).collection(time).doc(getDocName());

  const onChangeObjective = (text, id, n) => {
    console.log(text, id, n);

    objectives.sort((a, b) => a.n - b.n);
    const newObjectives = objectives.slice();
    newObjectives[n].text = text;
    setObjectives(newObjectives);
    timeRef.collection('objectives').doc(id).update({ text: text });
  };

  const onChangeCheckBox = (isChecked, id, n) => {
    objectives.sort((a, b) => a.n - b.n);
    const newObjectives = objectives.slice();
    newObjectives[n].done = !isChecked;
    setObjectives(newObjectives);
    timeRef.collection('objectives').doc(id).update({ done: !isChecked });
  };

  const inputRef = useRef(null);

  // useEffect(() => {
  // 	inputRef.current.focus()
  // 	inputRef.current.autofocus = true
  // 	console.log(inputRef);
  // }, [])

  return (
    <ObjectiveBody>
      {/* <BouncyCheckbox
				text=""
				onClick={() => onChangeCheckBox(isDone, id, n)}
				isChecked={isDone}
				borderColor={COLORS.secondary}
				fillColor={COLORS.secondary}
				style={{
					marginRight: -10,
					marginLeft: 0,
				}}
			/> */}
      {/* <ScrollView horizontal={true} style={{width:"90vw", height: 25}} showsHorizontalScrollIndicator={false}>

			<InputObjective
				placeholder="Type here..."
				value={text}
				onChangeText={(text) => onChangeObjective(text, id, n)}
				// autoFocus={true} // POR QUE NO FUNCIONA
				// ref={inputRef}
				focus={true}
			/>
			</ScrollView> */}
    </ObjectiveBody>
  );
};

export default Objective;

const ObjectiveBody = styled.div`
  flex-direction: row;
  width: 100%;
  height: 30;
  margin-bottom: 2px;
  border-bottom-width: 1px;
  border-bottom-color: lightgray;
`;
