import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

export interface CharacterDetailsPresentationProps {
  character: any;
  loading: boolean;
  error: boolean;
  navigate: (value: number) => void;
}

const CharacterDetailsPresentation = ({
  character,
  loading,
  error,
  navigate,
}: CharacterDetailsPresentationProps) => {
  return (
    <div>
      <h1>Character Details</h1>
      {loading && (
        <div className="pos-center">
          <div className="loader">
          </div>
        </div>
      )}
      {error && <p>Error fetching character details</p>}
      {character && (
        <>
          <Button onClick={() => navigate(-1)}>Back</Button>
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-xl">{character?.name}</CardTitle>
              <CardDescription>
                {character?.gender} - {character?.height}cm
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                <div>
                  <h3 className="font-bold">Home planet:</h3>
                  <p>{character?.planetName}</p>
                </div>
                <div>
                  <h3 className="font-bold">Eye color:</h3>
                  <p>{character?.eye_color}</p>
                </div>

                <div>
                  <h3 className="font-bold">Hair color:</h3>
                  <p>{character?.hair_color}</p>
                </div>

                <div>
                  <h3 className="font-bold">Films:</h3>
                  <ul>
                    {character?.films.map((film: any) => (
                      <li key={film}>{film?.title}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default CharacterDetailsPresentation;
