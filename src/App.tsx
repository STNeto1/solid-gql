import request from 'graphql-request'
import { Component, createResource, For, Suspense } from 'solid-js'

import { graphql } from './gql'

const listPokemonsQueryDocument = graphql(`
  query ListPokemons($limit: Int!) {
    pokemon_v2_pokemon(limit: $limit) {
      height
      id
      name
      order
      pokemon_species_id
    }
  }
`)

const App: Component = () => {
  const [data] = createResource(
    () => ['characters'],
    () =>
      request(
        'https://beta.pokeapi.co/graphql/v1beta',
        listPokemonsQueryDocument,
        {
          limit: 10
        }
      )
  )

  return (
    <Suspense fallback={'Loading...'}>
      <ul>
        <For each={data()?.pokemon_v2_pokemon ?? []}>
          {(elem) => <li>{Object.values(elem ?? {}).join(' - ')}</li>}
        </For>
      </ul>
    </Suspense>
  )
}

export default App
