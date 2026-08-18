import { loadCandles } from './storage.js';
import { createStore } from './store.js';
import { initApp } from './render/app.js';

// Loading N/A: sync localStorage, render same-task.
const store = createStore(loadCandles());
initApp(store);
