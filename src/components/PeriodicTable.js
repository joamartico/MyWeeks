import React, { useContext, useEffect } from 'react';
import Element from '../components/Element';


import { Context } from '../Context';
import styled from 'styled-components';
import { elements } from "../../data";






const PeriodicTable = () => {

  
  const { searchText, setSearchText } = useContext(Context);
  var lastSearchedText = searchText != undefined && searchText != '' && searchText;

  useEffect(() => {
    

    document.addEventListener('click', () => {
      if (searchText == '') {
        console.log(lastSearchedText);
      } else {
        setSearchText('');
      }
    });
  }, [searchText]);

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
                  radius={element.radius}
                  atomic_mass={element.mass}
                  atomic_number={element.number}
                  symbol={element.symbol}
                  category={element.category}
                  density={element.density}
                  electronegativity={element.electronegativity_pauling}
                  electron_affinity={element.electron_affinity}
                  boil_temperature={element.boiling_point}
                  melt_temperature={element.melting_point}
                  electron_configuration_semantic={element.electron_configuration}
                  description={element.summary}
                  oxidation_states={element.common_oxidation_states}
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
  min-width: 1400px;
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
