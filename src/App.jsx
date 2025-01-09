import { RouterProvider } from "react-router";
import router from "./routes/Routes";
import SessionContextProvider from "./context/SessionContextProvider";
import FavContextProvider from "./Components/favContext/favContextProvider";
import GameContextProvider from "./Components/GameContext/GameContextProvider";

function App() {
  return (
    <RouterProvider router={router} />
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
