import { render, screen, waitFor } from '@testing-library/react'
import CharacterDetails from '@/components/containers/CharacterDetails'
import { MemoryRouter } from 'react-router-dom'
import { CharacterContext } from '@/components/contexts/CharacterContext'
import { vi } from 'vitest'

const mockCharacter = {
  id: '1',
  name: 'Luke Skywalker',
  films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/2/'],
  gender: 'male',
  height: 172,
  homeworld: 'https://swapi.dev/api/planets/1/',
  eye_color: 'blue',
  hair_color: 'blond',
}

const mockFilms = [
  { title: 'A New Hope', episode_id: 4 },
  { title: 'The Empire Strikes Back', episode_id: 5 },
]

global.fetch = vi.fn((url) => Promise.resolve({
    json: () => {
        if (url === 'https://swapi.dev/api/films/1/') {
            return Promise.resolve(mockFilms[0])
        } else if (url === 'https://swapi.dev/api/films/2/') {
            return Promise.resolve(mockFilms[1])
        } else {
            return Promise.reject(new Error('Unknown URL'))
        }
    },
})
) as unknown as jest.Mock

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>(
    'react-router-dom'
  )
  return {
    ...actual,
    useParams: () => ({ characterId: '1' }),
    useNavigate: () => vi.fn(),
  }
})

vi.mock('../presentations/CharacterDetails.presentation', () => ({
  __esModule: true,
  default: ({ character }: any) => (
    <div>
      <h1>{character?.name}</h1>
      {character?.films?.map((film: any, index: number) => (
        <p key={index}>{film.title}</p>
      ))}
    </div>
  ),
}))

test('renders CharacterDetails and displays character info', async () => {
  render(
    <CharacterContext.Provider value={{ 
        characters: [mockCharacter], 
        updateCharacter: vi.fn(), 
        setCharacters: vi.fn() 
    }}>
      <MemoryRouter>
        <CharacterDetails />
      </MemoryRouter>
    </CharacterContext.Provider>
  )

  await waitFor(() => {
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument()
  })

  expect(screen.getByText('A New Hope')).toBeInTheDocument()
  expect(screen.getByText('The Empire Strikes Back')).toBeInTheDocument()

  expect(global.fetch).toHaveBeenCalledTimes(2)
  expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/films/1/')
  expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/films/2/')
})
