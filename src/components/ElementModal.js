import { IonModal, IonContent, IonSlides, IonSlide } from '@ionic/react';
import React, { useContext, useRef,} from 'react';
import { Context } from '../Context';
import styled from 'styled-components';

const ElementModal = () => {
  const { elementModal, setElementModal } = useContext(Context);
  if (elementModal) {
    const {
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
      radius,
      electron_configuration_semantic,
      description,
      oxidation_states
    } = elementModal;

    const slideOptions = {
      spaceBetween: 15,
      slidesPerView: 1.1,
      // slidesPerView: 2,
    };

    const ref = useRef()

    return (
      <Modal
        isOpen={elementModal != null ? true : false}
        swipeToClose={true}
        onDidDismiss={() => setElementModal(null)}
      >
        <TitleRow>
          <Symbol>{symbol}</Symbol>
          <Name>{name}</Name>
        </TitleRow>

        {window.screen.width < 1000 ? (
          <Slides options={slideOptions}>
            <BasicDataSlide>
              {/* <Padding> */}
                <Data>
                  <strong>Atomic Number:</strong> {atomic_number}
                </Data>
                <Data>
                  <strong>Atomic Mass:</strong> {atomic_mass}
                </Data>
                <Data>
                  <strong>Category:</strong> {category}
                </Data>

                <Data>
                  <ElectronConfig>
                  <strong>Electron Configuration:&nbsp;</strong>
                  <div  dangerouslySetInnerHTML={{ __html: electron_configuration_semantic }} style={{marginTop: -4}}/>
                  </ElectronConfig>
                </Data>

                <Data>
                  <strong>Oxidation States:</strong> {oxidation_states.map((ox_state, i) => i+1  != oxidation_states.length ? `${ox_state}, ` : `${ox_state}`)}
                </Data>

                <Data>
                  <strong>Electronegativity:</strong> {electronegativity}
                </Data>

                <Data>
                  <strong>Density:</strong> {density}
                </Data>

                <Data>
                  <strong>Radius:</strong> {radius}
                </Data>
                <Data>
                  <strong>Electron Affinity:</strong> {electron_affinity}
                </Data>
                
                <Data>
                  <strong>Melt Temperature:</strong> {melt_temperature} K
                </Data>
                <Data>
                  <strong>Boil Temperature:</strong> {boil_temperature} K
                </Data>

                
              {/* </Padding> */}
            </BasicDataSlide>

            <InfoSlide>
              {/* <Padding> */}
                <InfoTitle>Properties & Uses</InfoTitle>
                <DescriptionText>{description}</DescriptionText>
              {/* </Padding> */}
            </InfoSlide>
          </Slides>
        ) : (
          <ModalBody>
            <BasicDataSlide>
              {/* <Padding> */}
                <Data>
                  <strong>Atomic Number:</strong> {atomic_number}
                </Data>
                <Data>
                  <strong>Atomic Mass:</strong> {atomic_mass}
                </Data>
                <Data>
                  <strong>Category:</strong> {category}
                </Data>

                <Data>
                  <ElectronConfig>
                  <strong>Electron Configuration:&nbsp;</strong>
                  <div  dangerouslySetInnerHTML={{ __html: electron_configuration_semantic }} style={{marginTop: -4}}/>
                  </ElectronConfig>
                </Data>

                <Data>
                  <strong>Oxidation States:</strong> {oxidation_states.map((ox_state, i) => i+1  != oxidation_states.length ? `${ox_state}, ` : `${ox_state}`)}
                </Data>

                <Data>
                  <strong>Electronegativity:</strong> {electronegativity}
                </Data>
                
                <Data>
                  <strong>Density:</strong> {density}
                </Data>

                <Data>
                  <strong>Radius:</strong> {radius}
                </Data>
                <Data>
                  <strong>Electron Affinity:</strong> {electron_affinity}
                </Data>
                
                <Data>
                  <strong>Melt Temperature:</strong> {melt_temperature} K
                </Data>
                <Data>
                  <strong>Boil Temperature:</strong> {boil_temperature} K
                </Data>

                {/* <p> --- </p>

                <p> --- </p> */}
              {/* </Padding> */}
            </BasicDataSlide>

            <InfoSlide>
              {/* <Padding> */}
                <InfoTitle>Properties & Uses</InfoTitle>
                <DescriptionText>{description}</DescriptionText>
              {/* </Padding> */}
            </InfoSlide>
          </ModalBody>
        )}
      </Modal>
    );
  } else return '';
};

export default ElementModal;

const Modal = styled(IonModal)`
  padding-top: 50px;
  --width: 100%;
  --max-width: 900px;
  /* --min-height: 650px; */
  --border-radius: 15px !important;
  /* margin-top: -50px; */




  font-family: arial;
  /* justify-content: center;
  align-items: center; */
`;

const Padding = styled.div`height: 100%;
padding: 15px;
height: 100%;
  /* width: 90%; */
  width: 100%;
  background: red;
  font-size: 15px;
  margin: auto;
  /* display: flex; */
  /* flex-direction: column; */
  /* padding-bottom: auto; */
  /* padding-top: auto; */
  text-align: start;
  align-items: flex-start !important;
`;

const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  
  height: 25%;
  width: ${window.screen.width < 1000 ? '100%' : '48%'};
  justify-content: left;
  /* background-color: #ffff0050; */
  z-index: 999999;
  border-radius: 10px;
  margin-left: 5%;
  flex-wrap: wrap;
`;

const Symbol = styled.p`
  font-weight: bold;
  font-size: 13.5vh;
  margin-top: 0;
  margin-bottom: 20px;

`;

const Name = styled.div`
  font-weight: bold;
  font-size: 4.5vh;
  font-size: 200%;
  height: 13.5vh;
  margin-top: 0;
  display: flex;
  align-items: flex-end;
  margin-left: 5%;
`;

const Slides = styled(IonSlides)`
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-evenly;
`;

const BasicDataSlide = styled(IonSlide)`
  background-color: #f1f1f1;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: ${window.screen.width < 1000 ? 'auto 0 80px 4%' : '0 1% 80px 1%'};
  width: ${window.screen.width < 1000 ? '86% !important' : '46%'};
  height: ${window.screen.width < 1000 ? '90%' : '75%'};
  overflow-y: auto;
  overflow-x: hidden;
  /* padding-bottom: auto; */
  text-align: start;
  align-items: flex-start !important;
  font-size: 15px;
  padding: 16px;
  padding-top: 5%;
  padding-bottom: 0;
`;

const InfoSlide = styled(IonSlide)`
  background-color: #f1f1f1;
  border-radius: 10px;
  margin: auto;
  display: flex;
  flex-direction: column;
  margin: ${window.screen.width < 1000 ? 'auto 0 80px 0% !important' : '0 1% 80px 1%'};
  width: ${window.screen.width < 1000 ? '86% !important' : '46%'};
  height: ${window.screen.width < 1000 ? '90%' : '75%'};
  overflow-y: auto;
  overflow-x: hidden;
  text-align: start;
  align-items: flex-start !important;
  font-size: 16px;
  line-height: 16px;
  padding: 15px;
`;

const InfoTitle = styled.p`
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 0;
`;

const DescriptionText = styled.div`
  width: 100%;
  height: 100%;
  text-align: start;
  line-height: 20px;
  justify-content: left;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 15px 0 0 0;
`;

const ElectronConfig = styled.div`
  text-align: start;
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;
  align-items: center;
`;

const ModalBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  /* padding: 5%; */
  padding-top: 0;
`;

const Data = styled.p`
    margin: 0 0 28px 0;
    font-size: 16px;
    line-height: 15px;
    width: 100%;

`