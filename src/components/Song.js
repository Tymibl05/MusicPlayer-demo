import React from 'react';

export const Song = ({ currentSong, isPlaying }) => {
  return (
    <div id="Song">
      <img src={currentSong.cover} alt="" className={isPlaying ? 'spin' : ''} />
      <h2>{currentSong.name}</h2>
      <h3>{currentSong.artist}</h3>
    </div>
  );
};
