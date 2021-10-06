import React, { useState, createContext, useEffect } from 'react';

export const Context = createContext();

const ContextComponent = props => {
  const [objectives, setObjectives] = useState([]);
  const [actualRoute, setActualRoute] = useState();

  return (
    <Context.Provider
      value={{
        objectives,
        setObjectives,
        actualRoute,
        setActualRoute,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextComponent;
