// Local GIF dataset for the GifSearch mini-app.
export const GIFS = [
  { id: 1, title: "Happy Dance", url: "https://media.example.com/gifs/happy-dance.gif" },
  { id: 2, title: "Sad Cat", url: "https://media.example.com/gifs/sad-cat.gif" },
  { id: 3, title: "Excited Dog", url: "https://media.example.com/gifs/excited-dog.gif" },
  { id: 4, title: "Facepalm", url: "https://media.example.com/gifs/facepalm.gif" },
  { id: 5, title: "Thumbs Up", url: "https://media.example.com/gifs/thumbs-up.gif" },
  { id: 6, title: "Mind Blown", url: "https://media.example.com/gifs/mind-blown.gif" },
  { id: 7, title: "Slow Clap", url: "https://media.example.com/gifs/slow-clap.gif" },
  { id: 8, title: "Rocket Launch", url: "https://media.example.com/gifs/rocket-launch.gif" },
];

// Async search helper mirroring a network call.
export async function searchGifs(query) {
  return Promise.resolve(
    GIFS.filter((g) => g.title.toLowerCase().includes(query.toLowerCase()))
  );
}

export default searchGifs;
