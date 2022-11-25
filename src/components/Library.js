import React from 'react';
import { LibrarySong } from './LibrarySong';

export const Library = ({
  songs,
  setCurrentSong,
  audioRef,
  setIsPlaying,
  setSongs,
  libraryOpen,
  setLibraryOpen,
}) => {
  return (
    <div id="Library" className={libraryOpen ? 'open' : ''}>
      <h2>Tunes</h2>
      {songs.map((song) => (
        <LibrarySong
          key={song.id}
          song={song}
          setCurrentSong={setCurrentSong}
          songs={songs}
          audioRef={audioRef}
          setIsPlaying={setIsPlaying}
          setSongs={setSongs}
          setLibraryOpen={setLibraryOpen}
        />
      ))}
    </div>
  );
};
