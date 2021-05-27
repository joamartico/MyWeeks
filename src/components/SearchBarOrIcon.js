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
          // clearIcon="close-circle"
          showClearButton="always"
          mode="ios"
          onIonCancel={() => setShowSearchBar(false)}
          style={{
            maxWidth: 600,
            marginLeft: 'auto',
            marginBottom: '-10px',
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
