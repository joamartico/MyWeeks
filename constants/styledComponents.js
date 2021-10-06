import { IonButton, IonInput, IonTextarea } from "@ionic/react";
import styled from "styled-components";
import { COLORS } from "./theme";

// export const ScrollBody = styled.ScrollView`
// 	height: ${screenHeight};
// 	width: 100vw;
// 	background: ${COLORS.bg};
// 	padding-left: 10px;
// 	padding-right: 10px;
// 	padding-top: ${({ insetTop }) => insetTop};
// 	padding-bottom: ${({ insetBottom }) => insetBottom};
// 	aspect-ratio: 1;
// `;

// export const Body = styled.SafeAreaView`
// 	height: ${({ insetBottom, insetTop }) => screenHeight + insetTop};
// 	/* width: 100vw; */
// 	width: ${screenWidth};
// 	background: ${COLORS.bg};
// 	padding-left: 10px;
// 	padding-right: 10px;
// 	padding-top: ${({ insetTop }) => insetTop + 15};
// 	padding-bottom: ${({ insetBottom }) => insetBottom + 15};
// 	/* padding-top: 10px;
// 	padding-bottom: 10px; */
// 	align-items: center;
// 	justify-content: center;
// 	aspect-ratio: 1;
// `;

export const Card = styled.div`
	background-color: #fff;
	width: 100%;
	padding: 15px;
	border-radius: 15px;
	margin-top: 20px;
	box-shadow: 0 7px 5px ${() => "#0004"};
	max-width: 700px;
	margin-left: auto;
	margin-right: auto;
`;

export const FullCard = styled.div`
	background-color: #fff;
	padding: 20px;
	border-radius: 15px;
	padding-top: 25px;
	padding-bottom: 25px;
	margin-top: 10px;
	margin-bottom: 10px;
	height: 95vh;
	width: 95vw;
	max-width: 700px;
	box-shadow: 0 7px 5px ${() => "#0004"};
	flex-direction: column;
	justify-content: space-around;
`;

export const Title = styled.p`
	font-size: 20px;
	font-weight: bold;
	color: ${COLORS.primary};
	align-items: center;
`;

export const Subtitle = styled.p`
	font-size: 20;
	display: flex;
	/* font-weight: bold; */
	color: ${COLORS.primary};
	margin-bottom: 8px;
`;

export const StyledButton = styled.div`
	margin-top: 20px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 55px;
	border-radius: 10px;
	border: 1px solid ${COLORS.primary};
	background-color: ${COLORS.primary};
	cursor: pointer;

`;

export const ButtonTitle = styled.p`
	font-size: 20px;
	font-weight: bold;
	color: white;
`;

export const InputNotes = styled(IonTextarea)`
	width: 100%;
	font-size: 15px;
	min-height: 20px;
`;

export const InputObjective = styled(IonTextarea)`
	width: 100vw;
	font-size: 15px;
	margin-left: auto;
`;




export const InputText = styled(IonInput)`
	font-size: 18px;
	/* padding-left: 10px; */
	margin-top: 20px;
	width: 100%;
	height: 50px;
	/* border-radius: 6px; */
	border-bottom: 1px solid ${COLORS.primary} !important;
`;
