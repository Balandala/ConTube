import React, { useEffect, useRef, useState } from 'react';
import YouTube from 'react-youtube';
import './App.css';
import VolumePump from './components/VolumePump';

function App() {
  const [videoId, setVideoId] = useState(() => {
    return localStorage.getItem("videoId") || null;
  });
  
  const [inputValue, setInputValue] = useState("");
  const [volume, setVolume] = useState(50);

  const playerRef = useRef(null);



  useEffect(() => {

    const decayTimer = setInterval(() => {
      if (playerRef.current) {
        const newVol = Math.max(0, volume - 3);
        playerRef.current.setVolume(newVol);
        setVolume(newVol);
      }
    }, 200);

    return () => clearInterval(decayTimer);

  })


  const submitURL = () => {
    const id = youtube_parser(inputValue);
    if (id) {
      setVideoId(id);
      localStorage.setItem("videoId", id);
    }
    else {
      alert("Invalid youtube URL!");
    }
  };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
    // https://developers.google.com/youtube/player_parameters
        controls: 0,
        disablekb: 1,
        fs: 0,
        rel: 0,
        iv_load_policy: 3,
    },
  };

const handlePump = () => {
    if (playerRef.current) {
      const currentVol = playerRef.current.getVolume();
      const newVol = Math.min(100, currentVol + 10);
      playerRef.current.setVolume(newVol);
      setVolume(newVol);
    }
  };

function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return (match&&match[7].length==11)? match[7] : false;
}

  const onPlayerReady = (event) => {
    playerRef.current = event.target;
    event.target.setVolume(50);
    setVolume(50);
  };

  return (
    <div className="layout">
      
      <header>
        <h1>ConTube</h1>
        <h5>The most convinient youtube player!</h5>
      </header>

      <main>
        <div className="control-zone">
          
          <VolumePump
          onPump={handlePump}/>
          <div className="volume-gauge">
            <div 
              className="volume-fill" 
              style={{ height: `${volume}%` }} 
            />
          </div>

        </div>
        <div className="tv-wrapper">
          {videoId ? (
            <>
              <div className="tv">   
                <div className="">
                </div>
                <YouTube
                  onReady={onPlayerReady}
                  videoId={videoId}
                  opts={opts} 
                  className="youtube-absolute"
                />
              </div>
            </>
            ) : (<></>)
          }

          <div className='url-container'>
            <input 
              className='url-input'
              type="text"
              placeholder='Insert a YouTube URL'
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} 
              />
              <button
              className='url-button'
              onClick={submitURL}>
                Submit
              </button>
          </div>

        </div>

        <div className="control-zone">

        </div>
      </main>

      <footer className="footer">
        © 2025 Useless Web Project
      </footer>

    </div>
  );
}

export default App;
