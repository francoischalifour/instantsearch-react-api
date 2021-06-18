import { createContext } from 'react';
import { IndexWidget } from 'instantsearch.js/es/widgets/index/index';

export const IndexContext = createContext<null | IndexWidget>(null);
