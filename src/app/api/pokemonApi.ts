import Fuse from 'fuse.js';
import { get, fetchRecords } from './api';

export const BASE_URL = 'https://pokeapi.co/api/v2';
export const SEARCH = `${BASE_URL}/pokemon`;

export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetails {
  types: { type: { name: string } }[];
}

type PokemonTypeCount = Record<string, number>;

type SingleDualTypeCount = {
  singleType: number;
  dualType: number;
};

export const fetchPokemonDetails = async (pokemon: Pokemon): Promise<PokemonDetails> => {
  return get<PokemonDetails>(pokemon.url);
};

export const fetchPokemonTypes = async (): Promise<PokemonTypeCount> => {
  const pokemonList = await get<{ results: Pokemon[] }>(`${SEARCH}?limit=151`);
  const pokemonTypesCount: PokemonTypeCount = {};

  await Promise.all(
    pokemonList.results.map(async (pokemon: Pokemon) => {
      const details = await fetchPokemonDetails(pokemon);
      details.types.forEach(({ type }) => {
        const typeName = type.name;
        pokemonTypesCount[typeName] = (pokemonTypesCount[typeName] || 0) + 1;
      });
    })
  );

  return pokemonTypesCount;
};

export const fetchSingleDualTypes = async (): Promise<SingleDualTypeCount> => {
  const pokemonList = await get<{ results: Pokemon[] }>(`${SEARCH}?limit=151`);

  let singleTypeCount = 0;
  let dualTypeCount = 0;

  await Promise.all(
    pokemonList.results.map(async (pokemon: Pokemon) => {
      const details = await fetchPokemonDetails(pokemon);

      if (details.types.length === 1) {
        singleTypeCount += 1;
      } else if (details.types.length === 2) {
        dualTypeCount += 1;
      }
    })
  );

  return {
    singleType: singleTypeCount,
    dualType: dualTypeCount,
  };
};

export const searchPokemonByName = async (name: string): Promise<Pokemon[]> => {
  const records = await fetchRecords<{ results: Pokemon[] }>(`${SEARCH}?limit=1500`);

  const fuse = new Fuse(records?.results || [], {
    keys: ['name'],
    threshold: 0.7,
  });
  
  const results = fuse.search(name);
  
  return results.map(i => i.item);
};
