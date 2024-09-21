import "./App.css";
import Router from "@/lib/system/Router";
import { CharacterProvider } from "@/components/contexts/CharacterContext";

function App() {
  return (
    <CharacterProvider>
    <div className="dark container mx-auto px-4">
      <Router />
    </div>
    </CharacterProvider>
  );
}

export default App;
