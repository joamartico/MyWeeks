import React, { useContext, useState } from 'react';
import { search } from 'ionicons/icons';
import { IonButton, IonButtons, IonIcon, IonSearchbar, isPlatform } from '@ionic/react';
import { Context } from '../Context';

const SearchBarOrIcon = () => {
  const { showSearchBar, setShowSearchBar } = useContext(Context);

  return (
    <>
      {showSearchBar ? (
        <IonSearchbar
          showCancelButton={isPlatform('mobile') ? 'always' : 'never'}
          mode="ios"
          onIonCancel={() => setShowSearchBar(false)}
          style={{
            maxWidth: 600,
            marginLeft: 'auto',

            marginBottom: '-15px',

            // height: '100%',
            // paddingTop: 20,
            // paddingBottom: 20,
            // marginBottom: 2,
            // marginTop: 2,

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
            // searchBarRef?.current.focus();
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
