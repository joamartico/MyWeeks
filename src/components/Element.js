import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Context } from '../Context';

const Element = ({
  symbol,
  name,
  atomic_mass,
  atomic_number,
  category,
  electronegativity,
  density,
  electron_affinity,
  boil_temperature,
  melt_temperature,
  radio,
}) => {
  const { property, searchText } = useContext(Context);

  const isElementSearched = _property => {
    if (searchText != '' && searchText != undefined && symbol && name) {
      if (
        symbol.toLowerCase().includes(searchText.toLowerCase()) ||
        name.toLowerCase().includes(searchText.toLowerCase())
      ) {
        if (_property === 'Atomic Mass') return 'ff';
        else return '1';
      } else {
        if (_property === 'Atomic Mass') return '30';
        else return '0.4';
      }
    } else {
      if (_property === 'Atomic Mass') return '50';
      else return '1';
    }
  };

  return (
    <ElementWrapper
      category={category}
      property={property}
      electronegativity={electronegativity}
      electron_affinity={electron_affinity}
      density={density}
      boil_temperature={boil_temperature}
      melt_temperature={melt_temperature}
      opacity={isElementSearched(property)}
    >
      <Row>
        <AtomicNumber>{atomic_number}</AtomicNumber>
        {console.log(window.screen.height)}
        {window.screen.height < 670 && <Symbol>{symbol}</Symbol>}
      </Row>

      <Column>
        {/* SI ES PANTALLA GRANDE:  */}
        {window.screen.height > 671 && <Symbol>{symbol}</Symbol>}

        <Name>{name}</Name>

        <PropertyValue>
          {property == 'Atomic Mass' && atomic_mass}
          {property == 'Density' && density}
          {property == 'Electron Affinity' && electron_affinity}
          {property == 'Boil Temperature' && boil_temperature}
          {property == 'Melt Temperature' && melt_temperature}
          {property == 'Electronegativity' && electronegativity}
        </PropertyValue>
      </Column>
    </ElementWrapper>
  );
};

const ElementWrapper = styled.div`
  height: 13%;
  width: 100%;
  margin-bottom: 10%;
  background: ${props => {
    if (props.property == 'Atomic Mass') {
      if (props.category == 'alkali metal') return `#ff0000${props.opacity}`;
      if (props.category == 'alkaline earth metal') return `#ff7700${props.opacity}`;
      if (props.category == 'transition metal') return `#ffff00${props.opacity}`;
      if (props.category == 'post-transition metal') return `#00ff00${props.opacity}`;
      if (props.category == 'metalloid') return `#00ffff${props.opacity}`;
      if (props.category == 'nonmetal') return `#0000ff${props.opacity}`;
      if (props.category == 'noble gas') return `#ff00ff${props.opacity}`;
      else return '#ddddddaa';
    }
    if (props.property == 'Electronegativity')
      return `rgb(255, ${(1 - props.electronegativity / 4) * 320}, 0 ,${props.opacity})`;
    if (props.property == 'Density')
      return `rgb(255, ${(1 - props.density / 23) * 255}, 0, ${props.opacity})`;
    if (props.property == 'Electron Affinity')
      return `rgb(255, ${(1 - props.electron_affinity / 330) * 255}, 0, ${props.opacity})`;
    if (props.property == 'Boil Temperature')
      return `rgb(255, ${(1 - props.boil_temperature / 6500) * 255}, 0, ${props.opacity})`;
    if (props.property == 'Melt Temperature')
      return `rgb(255, ${(1 - props.melt_temperature / 3300) * 255}, 0, ${props.opacity})`;
  }};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  /* justify-content: space-around; */
`;

const Column = styled.div`
  height: 85%;
  display: flex;
  flex-direction: column;
  margin: auto;
  align-items: center;
  text-align: center;
  justify-content: space-evenly;
  padding-top: 10px;
  padding-bottom: 10px;
  /* margin-top: -15px; */
`;
const Row = styled.div`
  width: 70%;
  padding-left: 13%;
  padding-right: 13%;
  padding-top: 13%;
  height: 15%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AtomicNumber = styled.p`
  font-size: 1.8vh;
  font-weight: bold;
  /* height: 25px; */
  margin-right: auto;
`;

const Symbol = styled.p`
  /* font-size: 16px; */
  font-size: 2vh;
  font-weight: bold;
  margin: 0;
  display: flex;
  display: inline;
`;

const Name = styled.p`
  font-size: 10px;
  margin: 0;
`;

const PropertyValue = styled.p`
  font-size: 10px;
  margin: 0;
`;

export default Element;
