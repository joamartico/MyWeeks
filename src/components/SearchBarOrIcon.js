import React, { useContext, useState, useEffect, useRef } from 'react';
import { search } from 'ionicons/icons';
import { IonButton, IonButtons, IonIcon, IonSearchbar, isPlatform } from '@ionic/react';
import { Context } from '../Context';

const SearchBarOrIcon = () => {
  const { showSearchBar, setShowSearchBar, searchText, setSearchText } = useContext(Context);
  const [lastSearchText, setLastSearchText] = useState('');
  const ref = useRef();

  return (
    <>
      {/* {showSearchBar ? ( */}
        <IonSearchbar
          ref={ref}
          onIonChange={e => {
            setSearchText(e.detail.value);
            // setLastSearchText(e.detail.value);
            // text = e.detail.value;
          }}
          showCancelButton={isPlatform('mobile') ? 'always' : 'never'}
          // clearIcon="close-circle"
          // onIonFocus={e => e.detail?.value != '' && setSearchText(e.detail?.value)}
          // onFocus={(e) => console.log(e.detail)}
          showClearButton="always"
          mode="ios"
          onIonCancel={() => setShowSearchBar(false)}
          style={{
            maxWidth: 600,
            marginLeft: 'auto',
            marginBottom: '-10px',
            display: showSearchBar ? "flex" : "none"
          }}
        />
      {/* ) : ( */}
      { showSearchBar == false && (
        <IonButtons
          slot="end"
          onClick={() => {
            setShowSearchBar(true);
            // setTimeout(() => {
              ref.current.setFocus()
            // }, 1000);
          }}
        >
          <IonButton>
            <IonIcon icon={search} />
          </IonButton>
        </IonButtons>
      )}
    </>
  );
};

export default SearchBarOrIcon;
