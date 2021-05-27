import React, { useState, createContext } from 'react';
import { isPlatform } from '@ionic/react';

export const Context = createContext();

const ContextComponent = props => {
  const [property, setProperty] = useState(['Atomic Mass']);
  const [propertiesMaxVal, setPropertiesMaxVal] = useState(300);
  const [searchText, setSearchText] = useState(undefined);
  const [showSearchBar, setShowSearchBar] = useState(!isPlatform('mobile')); // mobile => false, compu => true
  const [elementModal, setElementModal] = useState(null);

  return (
    <Context.Provider
      value={{
        showSearchBar,
        setShowSearchBar,
        property,
        setProperty,
        propertiesMaxVal,
        setPropertiesMaxVal,
        searchText,
        setSearchText,
        elementModal,
        setElementModal,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextComponent;
