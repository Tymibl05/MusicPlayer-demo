import React from 'react';

export const LibrarySong = ({
  song,
  setCurrentSong,
  audioRef,
  setIsPlaying,
  setSongs,
  songs,
  setLibraryOpen,
}) => {
  const selectSongHandler = async () => {
    await setCurrentSong(song);
    audioRef.current.play();
    setIsPlaying(true);
    const newSongs = songs.map((item) => {
      if (item.id === song.id) {
        return {
          ...item,
          active: true,
        };
      } else {
        return {
          ...item,
          active: false,
        };
      }
    });
    setSongs(newSongs);
    setLibraryOpen(false);
  };
  return (
    <div
      id="LibrarySong"
      className={song.active ? 'activeSong' : ''}
      onClick={selectSongHandler}
    >
      <img src={song.cover} alt="" />
      <div className="song-info">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};
