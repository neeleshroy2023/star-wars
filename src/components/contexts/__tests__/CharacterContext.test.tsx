import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { CharacterProvider, CharacterContext } from '../CharacterContext';
import { ICharacterDetails } from '@/types/character.types';

describe('CharacterContext', () => {
  test('provides initial values', () => {
    const TestComponent = () => {
      const { characters } = React.useContext(CharacterContext);
      return <div>Character count: {characters.length}</div>;
    };

    render(
      <CharacterProvider>
        <TestComponent />
      </CharacterProvider>
    );

    expect(screen.getByText('Character count: 0')).toBeInTheDocument();
  });

  test('setCharacters updates characters in context', () => {
    const TestComponent = () => {
      const { characters, setCharacters } = React.useContext(CharacterContext);
      return (
        <div>
          <div>Character count: {characters.length}</div>
          <button
            onClick={() =>
              setCharacters([
                {
                    id: '1', name: 'Luke Skywalker',
                    gender: '',
                    height: 0,
                    homeworld: ''
                },
                {
                    id: '2', name: 'Darth Vader',
                    gender: '',
                    height: 0,
                    homeworld: ''
                },
              ])
            }
          >
            Set Characters
          </button>
        </div>
      );
    };

    render(
      <CharacterProvider>
        <TestComponent />
      </CharacterProvider>
    );

    expect(screen.getByText('Character count: 0')).toBeInTheDocument();

    act(() => {
      screen.getByText('Set Characters').click();
    });

    expect(screen.getByText('Character count: 2')).toBeInTheDocument();
  });

  test('updateCharacter updates a character in context', () => {
    const initialCharacters: ICharacterDetails[] = [
      {
          id: '1', name: 'Luke Skywalker',
          gender: '',
          height: 0,
          homeworld: ''
      },
      {
          id: '2', name: 'Darth Vader',
          gender: '',
          height: 0,
          homeworld: ''
      },
    ];

    const TestComponent = () => {
      const { characters, setCharacters, updateCharacter } = React.useContext(
        CharacterContext
      );
      return (
        <div>
          <div>Character 1 Name: {characters[0]?.name}</div>
          <button onClick={() => setCharacters(initialCharacters)}>
            Set Initial Characters
          </button>
          <button
            onClick={() =>
              updateCharacter({
                  id: '1', 
                  name: 'Luke Skywalker Updated',
                  gender: '',
                  height: 0,
                  homeworld: ''
              })
            }
          >
            Update Character
          </button>
        </div>
      );
    };

    render(
      <CharacterProvider>
        <TestComponent />
      </CharacterProvider>
    );
    expect(screen.queryByText('Character 1 Name: Luke SkyWalker')).not.toBeInTheDocument();

    act(() => {
      screen.getByText('Set Initial Characters').click();
    });
    expect(screen.getByText('Character 1 Name: Luke Skywalker')).toBeInTheDocument();

    act(() => {
      screen.getByText('Update Character').click();
    });
    expect(screen.getByText('Character 1 Name: Luke Skywalker Updated')).toBeInTheDocument();
  });
});
