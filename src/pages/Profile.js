import React from "react";
import {
	StyledButton,
	ButtonTitle,
	Title,
	Subtitle,
	FullCard,
} from "../../constants/styledComponents";
import { authentication } from "../../firebase";
import { IonContent, IonPage, useIonRouter } from "@ionic/react";

const Profile = () => {
	const router = useIonRouter()

	// const { displayName, email } = authentication.currentUser;

	const displayName = authentication?.currentUser && authentication?.currentUser?.displayName
	const email = authentication?.currentUser && authentication?.currentUser?.email

	return (
		<IonPage>
			<IonContent className="ion-padding">
			<FullCard className="ion-padding" intoTabs>
				<Title>{displayName && displayName}</Title>
				<Subtitle>{email && email}</Subtitle>
				<StyledButton
					style={{ background: "red", borderWidth: 0 }}
					onClick={() =>
						authentication?.signOut()
							.then(() => router.push("/onboarding", "forward", "pop" ) )
					}
				>
					<ButtonTitle>Log Out</ButtonTitle>
				</StyledButton>
			</FullCard>
			</IonContent>
		</IonPage>
	);
};

export default Profile;
