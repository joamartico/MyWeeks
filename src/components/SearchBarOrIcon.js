import React, { useContext, useState } from 'react';
import { search } from 'ionicons/icons';
import { IonButton, IonButtons, IonIcon, IonSearchbar, isPlatform } from '@ionic/react';
import { Context } from '../Context';

const SearchBarOrIcon = () => {
  const { showSearchBar, setShowSearchBar, searchText, setSearchText } = useContext(Context);

  return (
    <>
      {showSearchBar ? (
        <IonSearchbar
          onIonChange={e => setSearchText(e.detail.value)}
          showCancelButton={isPlatform('mobile') ? 'always' : 'never'}
          showClearButton="never"
          mode="ios"
          onIonCancel={() => setShowSearchBar(false)}
          style={{
            maxWidth: 600,
            marginLeft: 'auto',
            marginBottom: '-15px',

            // alignSelf: 'center',
            // width: '100%',
            // position: 'absolute',
            // zIndex: 999999999999999,
            // left: 0,
            // right: 0,
            // top: 0,
          }}
        />
      ) : (
        <IonButtons
          slot="end"
          onClick={() => {
            setShowSearchBar(true);
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
