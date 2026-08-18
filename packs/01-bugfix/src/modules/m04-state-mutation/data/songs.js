// Local dataset for the PlaylistBuilder mini-app. Works fully offline.
// In a real OA you'd fetch this; here it's local so the app always renders.

export const SONGS = [
  {
    id: "s1",
    title: "Midnight City",
    artist: "M83",
    album: "Hurry Up, We're Dreaming",
    duration: "4:03",
    cover: "https://picsum.photos/seed/s1/300/300",
  },
  {
    id: "s2",
    title: "Redbone",
    artist: "Childish Gambino",
    album: "Awaken, My Love!",
    duration: "5:26",
    cover: "https://picsum.photos/seed/s2/300/300",
  },
  {
    id: "s3",
    title: "Dreams",
    artist: "Fleetwood Mac",
    album: "Rumours",
    duration: "4:14",
    cover: "https://picsum.photos/seed/s3/300/300",
  },
  {
    id: "s4",
    title: "Instant Crush",
    artist: "Daft Punk",
    album: "Random Access Memories",
    duration: "5:37",
    cover: "https://picsum.photos/seed/s4/300/300",
  },
  {
    id: "s5",
    title: "Electric Feel",
    artist: "MGMT",
    album: "Oracular Spectacular",
    duration: "3:49",
    cover: "https://picsum.photos/seed/s5/300/300",
  },
  {
    id: "s6",
    title: "Tame",
    artist: "Tame Impala",
    album: "Currents",
    duration: "4:38",
    cover: "https://picsum.photos/seed/s6/300/300",
  },
];

/**
 * Look up a single song by id. Returns undefined if not found.
 */
export function getSongById(id) {
  return SONGS.find((s) => s.id === id);
}
