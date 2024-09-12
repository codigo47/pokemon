import { fetchPokemonTypes, fetchSingleDualTypes } from './pokemonApi';
import { get } from './api';

jest.mock('./api', () => ({
  get: jest.fn(),
}));

describe('Pokemon API Tests', () => {
  const mockPokemonListResponse = {
    count: 1302,
    next: 'https://pokeapi.co/api/v2/pokemon?offset=151&limit=151',
    previous: null,
    results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
      { name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
      { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
      { name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
    ],
  };

  const mockPokemonDetails = (name: string, types: Array<{ name: string }>) => ({
    types: types.map(type => ({ type })),
  });

  beforeEach(() => {
    (get as jest.Mock).mockImplementation((url: string) => {
      if (url.includes('/pokemon?limit=151')) {
        return Promise.resolve(mockPokemonListResponse);
      }
      if (url.includes('/pokemon/1/')) {
        return Promise.resolve(mockPokemonDetails('bulbasaur', [{ name: 'grass' }, { name: 'poison' }]));
      }
      if (url.includes('/pokemon/2/')) {
        return Promise.resolve(mockPokemonDetails('ivysaur', [{ name: 'grass' }, { name: 'poison' }]));
      }
      if (url.includes('/pokemon/3/')) {
        return Promise.resolve(mockPokemonDetails('venusaur', [{ name: 'grass' }, { name: 'poison' }]));
      }
      if (url.includes('/pokemon/4/')) {
        return Promise.resolve(mockPokemonDetails('charmander', [{ name: 'fire' }]));
      }
      if (url.includes('/pokemon/5/')) {
        return Promise.resolve(mockPokemonDetails('charmeleon', [{ name: 'fire' }]));
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('fetchPokemonTypes should correctly count Pokémon types', async () => {
    const result = await fetchPokemonTypes();
    expect(result).toEqual({
      grass: 3,
      poison: 3,
      fire: 2,
    });
  });

  test('fetchSingleDualTypes should correctly count single and dual types', async () => {
    const result = await fetchSingleDualTypes();
    expect(result).toEqual({
      singleType: 2,
      dualType: 3,
    });
  });
});
