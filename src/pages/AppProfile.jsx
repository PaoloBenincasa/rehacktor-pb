import { useContext } from "react";
import useProfile from "../hooks/useProfile"; // Hook per ottenere i dati del profilo utente
import { getAvatarUrl } from "../utils/getAvatarUrl"; // Funzione per costruire l'URL dell'avatar
import FavContext from "../Components/favContext/favContext";
export default function AppProfile() {
  const { favourites } = useContext(FavContext); // Accedi ai preferiti tramite il contesto
  const { first_name, last_name, username, avatar_url } = useProfile(); // Dati del profilo utente

  return (
    <div>
      <article>
        <header>
          <h1>Ciao {first_name}!</h1>
        </header>
        <div className="user_card">
          <section className="user_data m-2">
            {/* Avatar e informazioni utente */}
            <img
              src={avatar_url && getAvatarUrl(avatar_url)}
              alt="Profile"
              className="h-50 w-50"
            />
            <h4>{username}</h4>
            <p>
              {first_name} {last_name}
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptatem, ipsam enim quis alias, quia exercitationem odio
              repudiandae voluptas nam aliquam repellendus totam eius explicabo
              nisi numquam ratione vero reiciendis delectus.
            </p>
          </section>

          <section className="user_info m-2">
            {/* Preferiti */}
            <details>
              <summary role="button" className="secondary">
                Preferiti
              </summary>
              <div>
                {favourites.length > 0 ? (
                  favourites.map((favourite) => (
                    <p key={favourite.id}>
                      <strong>{favourite.game_name}</strong>
                      
                    </p>
                  ))
                ) : (
                  <p>Non hai ancora preferiti.</p>
                )}
              </div>
            </details>

            {/* Recensioni fatte */}
            <details>
              <summary role="button" className="contrast">
                Recensioni fatte
              </summary>
              <p>...</p>
            </details>
          </section>
        </div>
      </article>
    </div>
  );
}
