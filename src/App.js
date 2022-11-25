import react, { useEffect, useState, useRef } from 'react';
import './styles/App.scss';
import { Player } from './components/Player';
import { Song } from './components/Song';
import { Library } from './components/Library';
import { Nav } from './components/Nav';
import data from './data';

function App() {
  const [songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => {
    const activeSong = songs.filter((song) => song.active);
    setCurrentSong(activeSong[0]);
  }, []);
  const audioRef = useRef();
  const [libraryOpen, setLibraryOpen] = useState(false);
  return (
    <div id="App">
      <Nav libraryOpen={libraryOpen} setLibraryOpen={setLibraryOpen} />
      <div className={libraryOpen ? 'openLib' : ''}>
        <Song currentSong={currentSong} isPlaying={isPlaying} />
        <Player
          songs={songs}
          setSongs={setSongs}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          audioRef={audioRef}
        />
      </div>
      <Library
        songs={songs}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        setIsPlaying={setIsPlaying}
        setSongs={setSongs}
        libraryOpen={libraryOpen}
        setLibraryOpen={setLibraryOpen}
      />
    </div>
  );
}

export default App;
