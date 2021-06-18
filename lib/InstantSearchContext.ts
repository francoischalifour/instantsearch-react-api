import { createContext } from 'react';
import { InstantSearch } from 'instantsearch.js';

export const InstantSearchContext = createContext<null | InstantSearch>(null);
