import { useContext, useEffect, useState } from "react"
import AppAside from "../Components/AppAside"
import Game from "../Components/Game/index"
import { useAsyncList } from "react-stately";
import { useInView } from "react-intersection-observer";
import SessionContext from "../context/SessionContext";




export default function AppHome() {
  
  
  // const [userLogged, setUserLogged] = useState('');

  // useEffect(() => {
  //   async function getSession(params) {
  //     const { data, error } = await supabase.auth.getSession();
  //     const {
  //       data: { user },
  //     } = await supabase.auth.getUser()
  //     let { first_name } = user.user_metadata
  //     setUserLogged(first_name);

  //   }
  //   getSession();
  // }, [])

  let games = useAsyncList({
    async load({ signal, cursor }) {

      let res = await fetch(cursor || `${import.meta.env.VITE_API_BASE_URL}games?key=${import.meta.env.VITE_API_KEY}&dates=2021-06-01,2024-01-01&page=1`, {
        signal
      });
      let json = await res.json();
      return {
        items: json.results,
        cursor: json.next
      };
    }
  });

  const { ref, inView } = useInView({
    threshold: 0,
  });


  useEffect(() => {
    if (inView && !games.isLoading && games.items.length) {
      games.loadMore();
    }
  }, [inView, games]);
  


  return (
    <div className="container-fluid d-flex mt-4">
      <div className="sidebar">
        <AppAside />

      </div>
      <div className="gamesWrapper ps-2">
        <div className="mb-3">
          <h1> trend e novità dal mondo del gaming</h1>
          {/* {loading && <progress />} */}
        </div>
        <div className="gamesList">
          {games.items.map(game => (
            <Game key={game.id} game={game} />

          ))}

        </div>
        <div ref={ref} aria-busy="true" className="loading"></div>
        {/* <div ref={ref} aria-busy="true" className="loading"></div> */}
      </div>

    </div>

  )
}