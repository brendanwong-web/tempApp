import { writable } from "svelte/store";

const temps = writable([]);

const customStore = {
  subscribe: temps.subscribe,
  setTemps: (items) => {
    temps.set(items);
  }
} 

export default customStore;