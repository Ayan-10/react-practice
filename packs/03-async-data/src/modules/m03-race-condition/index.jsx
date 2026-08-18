// m03 — CityExplorer mini-app entry. Re-exports the App so the pack shell can
// mount it at the m03/* route. The race-condition feature lives in
// components/CityDetails.jsx (buggy stub); the fix is in solutions/.
export { default } from "./App.jsx";
