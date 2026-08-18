import { loadCandles } from './storage.js';
import { createStore } from './store.js';
import { initApp } from './render/app.js';

// Loading N/A: localStorage is synchronous, first render happens in the same task as load.
const store = createStore(loadCandles());
initApp(store);
