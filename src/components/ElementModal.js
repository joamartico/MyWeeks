import { IonModal, IonContent, IonSlides, IonSlide } from '@ionic/react';
import React, { useContext } from 'react';
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
      radio,
      electron_configuration_semantic,
      description,
    } = elementModal;

    const slideOptions = {
      spaceBetween: 15,
      slidesPerView: 1.1,
      // slidesPerView: 2,
    };

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
              <Padding>
                <p>
                  <strong>Atomic Number:</strong> {atomic_number}
                </p>
                <p>
                  <strong>Atomic Mass:</strong> {atomic_mass}
                </p>
                <p>
                  <strong>Category:</strong> {category}
                </p>
                <p>
                  <strong>Density:</strong> {density}
                </p>
                <p>
                  <strong>Radio:</strong> {radio}
                </p>
                <p>
                  <strong>Oxidation States:</strong> 2, 3
                </p>
                <p>
                  <strong>Electronegativity:</strong> {electronegativity}
                </p>
                <p>
                  <strong>Electron Affinity:</strong> {electron_affinity}
                </p>
                <p>
                  <strong>Melt Temperature:</strong> {melt_temperature}
                </p>
                <p>
                  <strong>Boil Temperature:</strong> {boil_temperature}
                </p>
                <ElectronConfig>
                  <strong>Electron Configuration: </strong>
                  {electron_configuration_semantic}
                </ElectronConfig>
              </Padding>
            </BasicDataSlide>

            <InfoSlide>
              <Padding>
                <InfoTitle>Properties & Uses</InfoTitle>
                <DescriptionText>{description}</DescriptionText>
              </Padding>
            </InfoSlide>
          </Slides>
        ) : (
          <ModalBody>
            <BasicDataSlide>
              <Padding>
                <p>
                  <strong>Atomic Number:</strong> {atomic_number}
                </p>
                <p>
                  <strong>Atomic Mass:</strong> {atomic_mass}
                </p>
                <p>
                  <strong>Category:</strong> {category}
                </p>
                <p>
                  <strong>Density:</strong> {density}
                </p>
                <p>
                  <strong>Radio:</strong> {radio}
                </p>
                <p>
                  <strong>Oxidation States:</strong> 2, 3
                </p>
                <p>
                  <strong>Electronegativity:</strong> {electronegativity}
                </p>
                <p>
                  <strong>Electron Affinity:</strong> {electron_affinity}
                </p>
                <p>
                  <strong>Melt Temperature:</strong> {melt_temperature}
                </p>
                <p>
                  <strong>Boil Temperature:</strong> {boil_temperature}
                </p>

                <p>
                  <strong>Electron Configuration:</strong> {electron_configuration_semantic}
                </p>
                {/* <p> --- </p>

                <p> --- </p> */}
              </Padding>
            </BasicDataSlide>

            <InfoSlide>
              <Padding>
                <InfoTitle>Properties & Uses</InfoTitle>
                <DescriptionText>{description}</DescriptionText>
              </Padding>
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

const Padding = styled.div`
  height: 85%;
  width: 85%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start !important;
  line-height: 1.2vh;
  font-size: 1.8vh;
`;

const TitleRow = styled.div`
  display: flex;
  flex-direction: row;

  height: 25%;
  width: ${window.screen.width < 1000 ? '100%' : '48%'};
  justify-content: left;
  /* background-color: #ffff0050; */
  border-radius: 10px;
  margin-left: 5%;
  flex-wrap: wrap;
`;

const Symbol = styled.p`
  font-weight: bold;
  font-size: 13.5vh;
  font-size: 820%;
  /* height: 82%; */
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
  padding-bottom: auto;
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
`;

const InfoTitle = styled.p`
  font-size: 2.5vh;
  font-weight: bold;
  margin: 0;
  background-color: #fff;
`;

const DescriptionText = styled.div`
  width: 100%;
  height: 100%;
  text-align: start;
  line-height: 25px;
  justify-content: left;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 15px 0 0 0;
`;

const ElectronConfig = styled.div`
  width: 100%;
  text-align: start;
  line-height: 25px;
  margin-left: 0px;
  justify-content: left;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  margin: 0;
`;

const ModalBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  /* padding: 5%; */
  padding-top: 0;
`;
