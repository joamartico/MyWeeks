import React, { useState, createContext } from 'react';
import { isPlatform } from '@ionic/react';

export const Context = createContext();

const ContextComponent = props => {
  const [property, setProperty] = useState('Atomic Mass');
  const [searchText, setSearchText] = useState(undefined);
  const [showSearchBar, setShowSearchBar] = useState(!isPlatform('mobile')); // mobile => false, compu => true

  return (
    <Context.Provider
      value={{
        showSearchBar,
        setShowSearchBar,
        property,
        setProperty,
        searchText,
        setSearchText,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default ContextComponent;
