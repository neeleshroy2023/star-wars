import { render, screen, waitFor } from "@testing-library/react";
import CharacterList from "../CharacterList";
import { CharacterContext } from "@/components/contexts/CharacterContext";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

const mockCharacters = [
  {
    name: "Luke Skywalker",
    gender: "male",
    height: 172,
    homeworld: "https://swapi.dev/api/planets/1/",
  },
  {
    name: "C-3PO",
    gender: "n/a",
    height: 167,
    homeworld: "https://swapi.dev/api/planets/1/",
  },
];

const mockPlanets = {
  "https://swapi.dev/api/planets/1/": { name: "Tatooine" },
};

const mockCharactersWithPlanets = [
  {
    ...mockCharacters[0],
    planetName: "Tatooine",
    id: "uuid-1",
  },
  {
    ...mockCharacters[1],
    planetName: "Tatooine",
    id: "uuid-2",
  },
];

// Mock global.fetch
global.fetch = vi.fn((url: string) => {
  if (url === "https://swapi.dev/api/people") {
    return Promise.resolve({
      json: () => Promise.resolve({ results: mockCharacters }),
    });
  } else if (url in mockPlanets) {
    return Promise.resolve({
      json: () => Promise.resolve(mockPlanets[url as keyof typeof mockPlanets]),
    });
  } else {
    return Promise.reject(new Error(`Unhandled request: ${url}`));
  }
}) as unknown as jest.Mock;

// Mock crypto.randomUUID()
Object.defineProperty(global, "crypto", {
  value: {
    randomUUID: vi
      .fn()
      .mockReturnValueOnce("uuid-1")
      .mockReturnValueOnce("uuid-2"),
  },
});

test("renders CharacterList and displays character list", async () => {
  const TestWrapper = () => {
    return (
        <CharacterContext.Provider value={{ 
            characters: mockCharactersWithPlanets, 
            updateCharacter: vi.fn(), 
            setCharacters: vi.fn() 
        }}>
          <MemoryRouter>
            <CharacterList />
          </MemoryRouter>
        </CharacterContext.Provider>
    );
  };

  render(<TestWrapper />);

  waitFor(() => {
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });

  const characterCards = screen.getAllByRole("article");
  expect(characterCards).toHaveLength(2);

  expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  expect(screen.getByText("male - 172cm")).toBeInTheDocument();
  expect(screen.getAllByText("Home planet:")).toHaveLength(2);
  expect(screen.getAllByText("Tatooine")).toHaveLength(2);

  expect(screen.getByText("C-3PO")).toBeInTheDocument();
  expect(screen.getByText("n/a - 167cm")).toBeInTheDocument();

  const viewDetailsButtons = screen.getAllByRole("button", {
    name: /view details/i,
  });
  expect(viewDetailsButtons).toHaveLength(2);

  const links = screen.getAllByRole("link", { name: /view details/i });
  expect(links).toHaveLength(2);
  expect(links[0]).toHaveAttribute("href", "/character/uuid-1");
  expect(links[1]).toHaveAttribute("href", "/character/uuid-2");
});
