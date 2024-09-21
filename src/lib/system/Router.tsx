import CharacterList from "@/components/containers/CharacterList";
import CharacterDetails from "@/components/containers/CharacterDetails";
import { useRoutes } from "react-router-dom";

const Router = () => {
  const routes = useRoutes(
    [
      {
        path: "/",
        element: <CharacterList />,
      },
      {
        path: "/character/:characterId",
        element: <CharacterDetails />,
      },
    ]
  );

  return routes;
}

export default Router;
