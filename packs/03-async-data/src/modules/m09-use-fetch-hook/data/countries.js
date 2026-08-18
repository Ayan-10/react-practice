// Local dataset for the CountryStats mini-app. Works fully offline.
// Kept here (not shared/api.js) so the module is self-contained.
//
//   n1 Japan      — Tokyo
//   n2 Brazil     — Brasília
//   n3 Norway     — Oslo
//   n4 Kenya      — Nairobi

export const COUNTRIES = [
  { id: "n1", name: "Japan", capital: "Tokyo", population: 125_000_000 },
  { id: "n2", name: "Brazil", capital: "Brasília", population: 214_000_000 },
  { id: "n3", name: "Norway", capital: "Oslo", population: 5_400_000 },
  { id: "n4", name: "Kenya", capital: "Nairobi", population: 54_000_000 },
];

/**
 * Default async loader for the UserList feature. Resolves to the array the
 * feature renders (each item has { id, name }). Injectable in tests via the
 * `loadUsers` prop so tests can force success/failure. Fully offline.
 */
export default function loadCountries() {
  return Promise.resolve(COUNTRIES);
}

export { loadCountries };
