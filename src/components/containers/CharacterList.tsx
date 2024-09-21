
import { ICharacterDetails } from "@/types/character.types";
import { useContext, useEffect, useState } from "react";
import { CharacterContext } from "@/components/contexts/CharacterContext";
import CharacterListPresentation from "@/components/presentations/CharacterList.presentation";

const CharacterList: React.FC = () => {
  const { characters, setCharacters } = useContext(CharacterContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchCharactersWithPlanets = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/people');
        const data = await response.json();
        const characters = data.results;

        const charactersWithPlanets: ICharacterDetails[] = await Promise.all(
          characters.map(async (character: ICharacterDetails) => {
            const planetResponse = await fetch(character.homeworld);
            const planet = await planetResponse.json();
            return { ...character, planetName: planet.name, id: crypto.randomUUID() };
          })
        );

        setCharacters(charactersWithPlanets);

      } catch (error) {
        console.error('Error fetching characters or planets:', error);
        setError(true);
      }
        setLoading(false);
    };

    fetchCharactersWithPlanets();
  }, []);

  return (
    <CharacterListPresentation characters={characters} loading={loading} error={error}/>
  );
};

export default CharacterList;
