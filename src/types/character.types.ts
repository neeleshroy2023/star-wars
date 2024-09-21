export type TFilm = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
};

export type Character = {
  name: string;
  gender: string;
  height: number;
  homeworld: string;
  url?: string;
  planetName?: string;
  eye_color: string;
  films: string[] | TFilm[];
  hair_color: string;
};

export interface ICharacterDetails extends Character {
  id: string;
}

export type TCharacterContext = {
  characters: ICharacterDetails[];
  updateCharacter: TCharacterUpdate;
  setCharacters: (characters: ICharacterDetails[]) => void;
};

export type TCharacterUpdate = (character: ICharacterDetails) => void;
