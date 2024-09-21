import { ICharacterDetails, TFilm } from "@/types/character.types";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CharacterContext } from "../contexts/CharacterContext";
import CharacterDetailsPresentation from "../presentations/CharacterDetails.presentation";

const CharacterDetails = () => {
  const { characterId } = useParams<{ characterId: string }>();
  const navigate = useNavigate();

  const { characters } = useContext(CharacterContext);
  const [characterWithFilms, setCharacterWithFilms] =
    useState<ICharacterDetails | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const character = characters.find(
      (character: ICharacterDetails) => character.id === characterId
    );
    const fetchFilmsOfCharacter: any = async () => {
      try {
        const films: TFilm[] = await Promise.all(
          (character?.films as string[])?.map(async (film: string) => {
            const response = await fetch(film);
            return await response.json();
          }) || []
        );

        if (character) {
          setCharacterWithFilms({ ...character, films });
        } else {
          setError(true);
        }
      } catch (error) {
        console.error("Error fetching films:", error);
        setError(true);
      }
      setLoading(false);
    };

    fetchFilmsOfCharacter();
  }, []);

  return (
    <CharacterDetailsPresentation
      character={characterWithFilms}
      loading={loading}
      error={error}
      navigate={navigate}
    />
  );
};

export default CharacterDetails;
