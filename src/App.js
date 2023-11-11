import logo from './logo.svg';
import './App.css';
import { useEffect, useState, CSSProperties } from 'react';
import defaultBG from './assets/defaultbg.jpg'
import Draggable from 'react-draggable';
import $ from 'jquery'
import Controldock from './controldock';
import Quoter from './quote'
import { motion } from "framer-motion"
import html2canvas from 'html2canvas';
import { Spotify } from 'react-spotify-embed';
const [samplequote, sampleauthor] = ['You take away all the other luxuries in life, and if you can make someone smile and laugh, you have given the most special gift: happiness.', 'Brad Garrett']
const apikey = process.env.REACT_APP_APIKEY

function App() {
  
  const [bgimage, setimage] = useState(defaultBG)
  const availableglows = [{color: 'rgba(255,241,168,0.9)', shadow: 'rgba(255,241,168,0.9)'}, {color: 'radial-gradient(circle, rgba(204, 212, 241, 0.97) 50%, rgb(165, 161, 199) 150%)', shadow: 'rgb(234, 226, 255)'}]
  const [quoteinfo, setquoteinfo] = useState({ quote: samplequote, author: sampleauthor })
  const [loading, setloading] = useState(false)
  const [glowcolor, setglowcolor] = useState(0);
  const [spotifylink, setspotifylink] = useState("https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn")
  const [quotecategory, setquotecategory] = useState("random")
  const [refresh, setrefresh] = useState(false)
  const parentstyles = {
    'backgroundImage': `url(${bgimage})`,
    'width': '100vw',
    'height': '100vh',
    'backgroundSize': 'cover',
    'display': 'grid',
    'justifyItems': 'center',
    'alignItems': 'center'
  }
var clicked = false
  $(".glower").on('mousedown', e => { clicked = true});
  $(document).on('mousemove', e => {clicked = false});
  $(".glower").on('mouseup', e => {clicked ?  glowcolor + 1 >= availableglows.length ? setglowcolor(0) : setglowcolor(glowcolor + 1) : console.log('good');  });
  clicked = false;

  const glowchange = (e) => {
    //check of its last index
   
  }
 
  const bulbstyles = {
    width: '5vw',
    height: '5vw',
    aspectRatio: '1/1',
    background: availableglows[glowcolor].color,
    color: 'yellow',
    borderRadius: '100%',
    position: 'absolute',
    boxShadow: `0px 0px 150px 70px ${availableglows[glowcolor].shadow}`,
    backdropFilter: 'blur(8px)',
    border: '0px solid',
    zIndex: 1,
    left: '90vw',
    top: '50vh',
  }

  const playerStyles = {
    position: 'absolute',
    left: 10,
    top: 10,
    maxWidth: 'fit-content',
    boxShadow: "rgba(0, 1, 4, 0.95) 0px 48px 100px 0px",
  }



  useEffect(() => {
    //fetch the quote
    setloading(true);
    $.ajax({
      url: `https://api.api-ninjas.com/v1/quotes${quotecategory !== 'random' ? "?category=" + quotecategory : ""}`,
      method: 'GET',
      headers: {
        'x-api-key': apikey
      },
      complete: (xhr) => {
        if (xhr.status == 200) {
          console.log(xhr)
          setquoteinfo(xhr.responseJSON[0])

        }
      }
    })
    //fetch the image
    $.ajax({
      url: `https://api.api-ninjas.com/v1/randomimage`,
      method: 'GET',
      headers: {
        'x-api-key': apikey
      },
      complete: (xhr) => {
        if (xhr.status == 200) {
          const base64String = xhr.responseText;
          let localurl = `data:image/png;base64,${base64String}`;
          setimage(localurl)
          setloading(false)

        }
      },
      error: ()=> {
        setloading(false)
      }
    })


  }, [quotecategory, refresh])


  console.log(process.env)

  return (
    <div className='parent' style={
      parentstyles
    }>
      <Draggable>
      <Spotify wide style={playerStyles} link={spotifylink} />

      </Draggable>

      <Quoter quoteinfo={quoteinfo} loading={loading} />
      <Controldock {...{quotecategory, setquotecategory, spotifylink, setspotifylink, loading, refresh, setrefresh}} />
  
      <Draggable>

        <div className='glower' onClick={glowchange} style={bulbstyles}   ></div>
      </Draggable>
    </div>
  );
}

export default App;
