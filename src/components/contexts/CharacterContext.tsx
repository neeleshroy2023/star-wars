import {
  ICharacterDetails,
  TCharacterUpdate,
  TCharacterContext,
} from "@/types/character.types";
import { TChildren } from "@/types/system.types";
import { createContext, useState } from "react";

const initialCharacterState: ICharacterDetails[] = [];
const updateCharacter: TCharacterUpdate = () => {};

export const CharacterContext = createContext<TCharacterContext>({
  characters: initialCharacterState,
  updateCharacter,
  setCharacters: () => {},
});

export const CharacterProvider = ({ children }: TChildren) => {
  const [characters, setCharacters] = useState(initialCharacterState);

  const updateExistingCharacter: TCharacterUpdate = (
    character: ICharacterDetails
  ) => {
    const updatedCharacters = characters.map((c) => {
      if (c.id === character.id) {
        return character;
      }
      return c;
    });
    setCharacters(updatedCharacters);
  };

  return (
    <CharacterContext.Provider
      value={{
        characters,
        setCharacters,
        updateCharacter: updateExistingCharacter,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};
