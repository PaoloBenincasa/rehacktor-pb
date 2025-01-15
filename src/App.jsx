import { RouterProvider } from "react-router";
import router from "./routes/Routes";
import SessionContextProvider from "./context/SessionContextProvider";
import FavContextProvider from "./Components/FavContext/FavContextProvider";
import GameContextProvider from "./Components/GameContext/GameContextProvider";

function App() {
  return (
    <div className="vh-100">
      <RouterProvider router={router} />
    </div>
  )
}

function Root() {
  return (
    <SessionContextProvider>
      <FavContextProvider>
        <GameContextProvider>
          <App />
        </GameContextProvider>
      </FavContextProvider>
    </SessionContextProvider>
  )
}

export default Root;
