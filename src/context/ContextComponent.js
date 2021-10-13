import React, { useState, createContext, useEffect } from 'react';

export const Context = createContext();

const ContextComponent = props => {
  const [objectives, setObjectives] = useState([]);
  const [removed, setRemoved] = useState(0)

  return (
    <Context.Provider
      value={{
        objectives,
        setObjectives,
        removed,
        setRemoved,
        
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextComponent;
