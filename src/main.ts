import { loadCandles } from './storage.js';
import { createStore } from './store.js';
import { initApp } from './render/app.js';

const store = createStore(loadCandles());
initApp(store);
