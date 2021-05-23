import React, { useContext } from 'react';
import styled from 'styled-components';

import { IonPage, IonHeader, IonToolbar, IonButtons, IonContent } from '@ionic/react';

import Element from '../components/Element';

import { elements } from '../../data';
import { Context } from '../Context';
import PropertySelector from '../components/PropertySelector';
import SearchBarOrIcon from '../components/SearchBarOrIcon';

const PeriodicTable = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <SearchBarOrIcon />
          <PropertySelector />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <ScrollX>
          <TableWrapper>
            <Table>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(i => (
                <Group>
                  {elements
                    .filter(element => element.xpos == i)
                    .map(element => (
                      <Element
                        name={element.name}
                        atomic_mass={element.atomic_mass}
                        atomic_number={element.number}
                        symbol={element.symbol}
                        category={element.category}
                        density={element.density}
                        electronegativity={element.electronegativity_pauling}
                        boil={element.boil}
                        melt={element.melt}
                      />
                    ))}
                </Group>
              ))}
            </Table>
          </TableWrapper>
        </ScrollX>
      </IonContent>
    </IonPage>
  );
};

const ScrollX = styled.div`
  overflow-y: hidden !important;
  overflow-x: auto !important;
  height: 100%;

  display: flex; // ??????
  /* margin: auto; */
  width: 100%;
`;

const TableWrapper = styled.div`
  height: 100%;
  max-height: 100% !important;
  width: 100%;
  min-width: 1400px;
  max-width: 100%;
  padding: 20px;
  overflow: hidden;
  /* margin: auto;
  margin-bottom: 10px; */
`;

const Table = styled.div`
  height: 96%;
  width: 100%;
  display: flex;
  /* margin: auto; */
  /* margin-bottom: 10px; */
  overflow: hidden;
  justify-content: space-between;
`;

const Group = styled.div`
  height: 100%;
  width: 5%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
`;
export default PeriodicTable;
