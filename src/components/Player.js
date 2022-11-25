import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStepBackward,
  faStepForward,
  faPlay,
  faPause,
} from '@fortawesome/free-solid-svg-icons';

export const Player = ({
  songs,
  setSongs,
  currentSong,
  setCurrentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
}) => {
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    completionPercent: 0,
  });
  useEffect(() => {
    const newSongs = songs.map((item) => {
      if (item.id === currentSong.id) {
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
  }, [currentSong]);
  useEffect(() => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    (async () => {
      if (
        isPlaying &&
        songInfo.completionPercent == 100 &&
        currentSong.id !== songs[songs.length - 1].id
      ) {
        await setCurrentSong(songs[currentIndex + 1]);
        audioRef.current.play();
      } else if (
        songInfo.completionPercent == 100 &&
        currentSong.id == songs[songs.length - 1].id
      ) {
        setIsPlaying(false);
      }
    })();
  }, [songInfo]);
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  const timeHandler = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration || 0;
    const completionPercent = Math.round((current / duration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime: current,
      duration,
      completionPercent,
    });
  };
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
    );
  };
  const inputHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  const skipHandler = async (dir) => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (currentIndex + dir == songs.length && dir == 1) {
      await setCurrentSong(songs[0]);
    } else if (currentIndex == 0 && dir == -1) {
      await setCurrentSong(songs[songs.length - 1]);
    } else {
      await setCurrentSong(songs[currentIndex + dir]);
    }
    audioRef.current.play();
    setIsPlaying(true);
  };
  const trackAnim = {
    transform: `translateX(${songInfo.completionPercent}%)`,
  };
  return (
    <div id="Player">
      <div className="slider">
        <p>{getTime(songInfo.currentTime)}</p>
        <div
          className="track"
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
          }}
        >
          <input
            type="range"
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={inputHandler}
          />
          <div className="animate-track" style={trackAnim} />
        </div>
        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="controls">
        <FontAwesomeIcon
          className=""
          size="2x"
          icon={faStepBackward}
          onClick={() => skipHandler(-1)}
        />
        <FontAwesomeIcon
          className=""
          onClick={playSongHandler}
          size="2x"
          icon={isPlaying ? faPause : faPlay}
        />
        <FontAwesomeIcon
          className=""
          size="2x"
          icon={faStepForward}
          onClick={() => skipHandler(1)}
        />
      </div>
      <audio
        onTimeUpdate={timeHandler}
        onLoadedMetadata={timeHandler}
        src={currentSong.audio}
        ref={audioRef}
        // onEnded={endHandler}
      />
    </div>
  );
};
