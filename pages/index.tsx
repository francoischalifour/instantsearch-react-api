import Head from 'next/head';
import { sortBy, compose, toLower, prop } from 'ramda';
import algoliasearch from 'algoliasearch/lite';

import {
  Configure,
  CurrentRefinements,
  Highlight,
  Hits,
  Index,
  InstantSearch,
  Menu,
  Pagination,
  Panel,
  RefinementList,
  SearchBox,
} from '../lib';

const searchClient = algoliasearch(
  'RPF6V4143M',
  '3b24c36fac8bb7c1ee0cce05474849cc'
);

const isHidden = ({ canRefine }) => canRefine === false;

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
          <Configure hitsPerPage={10} />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '250px 2fr',
              gap: '2rem',
            }}
          >
            <div>
              <Panel header="Types" collapsible={true} isHidden={isHidden}>
                <RefinementList
                  attribute="types.name"
                  showMore={true}
                  searchable={true}
                  searchablePlaceholder="Search types"
                />
              </Panel>
              <Panel header="Generation" collapsible={true} isHidden={isHidden}>
                <Menu attribute="generation" transformItems={sortByLabel} />
              </Panel>
            </div>
            <div style={{ minWidth: 650 }}>
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
      <img
        src={`https://res.cloudinary.com/xoxox/image/upload/q_auto,w_64/v1626513032/pokedex/home/${props.nationalId}.png`}
        alt={props.names.en}
        width={64}
        height={64}
      />
      <h3>
        <Highlight hit={props} attribute={['names', 'en']} />
      </h3>
    </>
  );
}
