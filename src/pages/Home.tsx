import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonToggle,
} from "@ionic/react";
import React from "react";
import "./Home.css";
// import { moon } from "ionicons/icons";

const Home: React.FC = () => {
  const toggleDarkModeHandler = () => document.body.classList.toggle("dark");

  return (
    <>
      <IonHeader translucent={true} collapse="fade"  className="x-ion-no-border">
        <IonToolbar>
          <IonTitle>Home</IonTitle>
          <IonToggle
            slot="end"
            name="darkMode"
            onIonChange={toggleDarkModeHandler}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" scrollEvents={true} >
     
        <h1>Heading 1</h1>
        <h2>Heading 2</h2>
        <h3>Heading 3</h3>
        <h4>Heading 4</h4>
        <h5>Heading 5</h5>
        <h6>Heading 6</h6>

        <p>
          Here's a small text description for the content. Nothing more, nothing
          less.
        </p>
        <p>
          Here's a small text description for the content. Nothing more, nothing
          less.
        </p>
        <p>
          Here's a small text description for the content. Nothing more, nothing
          less.
        </p>

        <p>
          Here's a small text description for the content. Nothing more, nothing
          less.
        </p>
        <p>
          Here's a small text description for the content. Nothing more, nothing
          less.
        </p>
        <p>
          Here's a small text description for the content. Nothing more, nothing
          less.
        </p>
        <p>
          Here's a small text description for the content. Nothing more, nothing
          less.
        </p>
        <p>
          Here's a small text description for the content. Nothing more, nothing
          less.
        </p>
        <p>
          Here's a small text description for the content. Nothing more, nothing
          less.
        </p>
        <p>
          Here's a small text description for the content. Nothing more, nothing
          less.
        </p>
        <p>
          Here's a small text description for the content. Nothing more, nothing
          less.
        </p>
        <p>
          Here's a small text description for the content. Nothing more, nothing
          less.
        </p>
        <p>
          Here's a small text description for the content. Nothing more, nothing
          less.
        </p>
      </IonContent>
      {/* <IonFooter>
        <IonToolbar>
          <IonTitle>Footer</IonTitle>
        </IonToolbar>
      </IonFooter> */}
    </>
  );
};

export default Home;
