import { useContext, useEffect, useState } from "react";
import AuthContext from "../stores/authContext";
import styles from "../styles/Guides.module.css";

export default function Guides() {
  const { user, authReady } = useContext(AuthContext);
  const [guides, setGuides] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authReady) {
      //only when established connection
      fetch(
        ".netlify/functions/guides",
        user && {
          //add headers only when there's an user else there will be no user to access
          headers: {
            Authorization: "Bearer " + user.token.access_token, //so that clientToken in guides function can detect user
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error("You must be logged in to view this content.");
          }
          return res.json();
        })
        .then((data) => {
          setGuides(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setGuides(null);
        });
    }
  }, [user, authReady]); //everytime user login status changes or authReady, refetch

  return (
    <div className={styles.guides}>
      {!authReady && <div>Loading...</div>}

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      )}
      
      {guides &&
        guides.map((guide) => (
          <div key={guide.title} className={styles.card}>
            <h3>{guide.title}</h3>
            <h4>Written by {guide.author}</h4>
            <p>
              Cupidatat et magna anim exercitation irure voluptate Lorem labore
              veniam laborum pariatur. In laboris non eiusmod incididunt
              excepteur ad duis. Eiusmod adipisicing velit eiusmod adipisicing
              anim cupidatat sint fugiat.Veniam dolore anim est deserunt elit
              amet do laborum officia quis incididunt irure labore. Consectetur
              tempor labore consectetur nostrud velit. Laboris cupidatat
              voluptate culpa cillum consequat exercitation adipisicing. Ad in
              excepteur ut duis minim non cillum veniam quis. Reprehenderit
              magna nostrud id nostrud reprehenderit commodo reprehenderit minim
              id.
            </p>
          </div>
        ))}
    </div>
  );
}
