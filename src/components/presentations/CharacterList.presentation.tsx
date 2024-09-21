import { ICharacterDetails } from "@/types/character.types";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Link } from "react-router-dom";

interface CharacterListPresentationProps {
  characters: ICharacterDetails[];
  loading: boolean;
  error: boolean;
}

const CharacterListPresentation: React.FC<CharacterListPresentationProps> = ({
  characters,
  loading,
  error,
}) => {
  return (
    <>
      {loading && (
        <div className="pos-center">
          <div className="loader"></div>
        </div>
      )}
      {error && <p>Error fetching characters/planets</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        {!loading &&
          !error &&
          characters &&
          characters?.map((character: any) => (
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-xl">{character.name}</CardTitle>
                <CardDescription>
                  {character.gender} - {character.height}cm
                </CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="font-bold">Home planet:</h3>
                <p>{character?.planetName}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button>
                  <Link to={`/character/${character?.id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </>
  );
};

export default CharacterListPresentation;
