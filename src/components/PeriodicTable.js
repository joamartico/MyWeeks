import React from 'react';
import Element from '../components/Element';

import { elements } from '../../data';
import { Context } from '../Context';
import styled from 'styled-components';

const PeriodicTable = () => {
  return (
    <TableWrapper>
      <Table>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(i => (
          <Group>
            <GroupNumber>{i}</GroupNumber>
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
                  electron_affinity={element.electron_affinity}
                  boil_temperature={element.boil}
                  melt_temperature={element.melt}
                  electron_configuration_semantic={element.electron_configuration_semantic}
                  description={element.summary}
                />
              ))}
          </Group>
        ))}
      </Table>
    </TableWrapper>
  );
};

const TableWrapper = styled.div`
  height: 100%;
  max-height: 100% !important;
  width: 100%;
  min-width: 1500px;
  max-width: 100%;
  /* padding: 20px; */
  overflow: hidden;
  /* margin: auto;
  margin-bottom: 10px; */
  /* background-color: #ff02; */
`;

const Table = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  /* margin: auto; */
  /* margin-bottom: 10px; */
  overflow: hidden;
  justify-content: space-between;
  width: 97%;
  height: 92%;
  margin: auto;
  /* background-color: #f002; */
  padding-top: 40px;
`;

const Group = styled.div`
  height: 100%;
  width: 5%;
  display: flex;
  flex-direction: column;
  /* align-items: flex-end; */
  align-items: center;
  justify-content: flex-end;
`;

const GroupNumber = styled.p`
  font-size: 12px;
`;

export default PeriodicTable;
