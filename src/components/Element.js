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
  electron_afinity,
  boil_temperature,
  melt_temperature,
}) => {
  const { property } = useContext(Context);

  return (
    <ElementWrapper category={category}>
      <Row>
        <AtomicNumber>{atomic_number}</AtomicNumber>
        {/*  SI ES PANTALLA MUY CHICA :*/}
        <Symbol>{symbol}</Symbol>
      </Row>

      <Column>
        {/* SI ES PANTALLA GRANDE:  */}

        {/* <Symbol>{symbol}</Symbol> */}

        <Name>{name}</Name>

        <PropertyValue>
          {property == 'Atomic Mass' && atomic_mass}
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
    if (props.category == 'alkali metal') return '#ff000050';
    if (props.category == 'alkaline earth metal') return '#ff500050';
    if (props.category == 'transition metal') return '#ffff0050';
    if (props.category == 'post-transition metal') return '#00ff0050';
    if (props.category == 'metalloid') return '#00ffff50';
    if (props.category == 'nonmetal') return '#0000ff50';
    if (props.category == 'noble gas') return '#ff00ff50';
    else return '#ddddddaa';
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
  justify-content: center;
  align-items: center;
  text-align: center;
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
  font-size: 15px;
  font-weight: bold;
  /* height: 25px; */
  margin-right: auto;
`;

const Symbol = styled.p`
  /* font-size: 16px; */
  font-size: 110%;
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
