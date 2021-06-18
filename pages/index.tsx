import Head from 'next/head';
import { sortBy, compose, toLower, prop } from 'ramda';
import algoliasearch from 'algoliasearch/lite';

import {
  Configure,
  CurrentRefinements,
  Hits,
  Index,
  InstantSearch,
  Pagination,
  Panel,
  RefinementList,
  SearchBox,
} from '../lib';

const searchClient = algoliasearch(
  'RPF6V4143M',
  '3b24c36fac8bb7c1ee0cce05474849cc'
);

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>React API with InstantSearch.js</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <h1 className="title">
          React API
          <br />
          for <mark>InstantSearch.js</mark>
        </h1>

        <InstantSearch searchClient={searchClient} indexName="kanto_pokedex">
          <Configure hitsPerPage={20} />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
            }}
          >
            <div>
              <Panel header="Types">
                <RefinementList attribute="types.name" showMore={true} />
              </Panel>
              <Panel header="Generation">
                <RefinementList
                  attribute="generation"
                  transformItems={sortByLabel}
                />
              </Panel>
            </div>
            <div>
              <SearchBox placeholder="Search Pokémon" />
              <CurrentRefinements />

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '2rem',
                }}
              >
                <div>
                  <h2>Kanto</h2>
                  <Hits
                    hitComponent={({ hit }) => (
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '1fr 2fr',
                        }}
                      >
                        <Pokemon {...hit} />
                      </div>
                    )}
                  />
                </div>

                <div>
                  <h2>Galar</h2>
                  <Index indexName="galar_pokedex">
                    <Configure hitsPerPage={20} />
                    <Hits
                      hitComponent={({ hit }) => (
                        <div
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 2fr',
                          }}
                        >
                          <Pokemon {...hit} />
                        </div>
                      )}
                    />
                  </Index>
                </div>
              </div>

              <Pagination />
            </div>
          </div>
        </InstantSearch>
      </main>
    </div>
  );
}

const sortByLabel = sortBy(compose(toLower, prop('label')));

type PokemonProps = any;

function Pokemon(props: PokemonProps) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={props.artworkUrl} alt={props.names.en} width={64} />
      <h3
        dangerouslySetInnerHTML={{
          __html: props._highlightResult.names.en.value,
        }}
      />
    </>
  );
}
