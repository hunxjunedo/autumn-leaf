import logo from './logo.svg';
import './App.css';
import { useEffect, useState, CSSProperties } from 'react';
import defaultBG from './assets/defaultbg.jpg'
import Draggable from 'react-draggable';
import $ from 'jquery'
import Controldock from './controldock';
import Quoter from './quote'
import collection from './piclicks.json';
import { motion } from "framer-motion"
import html2canvas from 'html2canvas';
import { Spotify } from 'react-spotify-embed';
import CreditBar from './creditbar';
const [samplequote, sampleauthor] = ['You take away all the other luxuries in life, and if you can make someone smile and laugh, you have given the most special gift: happiness.', 'Brad Garrett']
const apikey = process.env.REACT_APP_APIKEY


function App() {
  const themeclr = 'orange'; const themedark = "rgb(1, 1, 1,0.75)"; const themedarkfull = "rgb(1, 1, 1)"
  const [bgimage, setimage] = useState(defaultBG)
  const availableglows = [
    {color: 'rgba(255,241,168,0.9)', shadow: 'rgba(255,241,168,0.9)'}, 
    {color: 'radial-gradient(circle, rgba(204, 212, 241, 0.97) 50%, rgb(165, 161, 199) 150%)', shadow: 'rgb(234, 226, 255)'}, 
    {color: 'rgb(239 143 143 / 84%)', shadow: 'rgb(255, 101, 164)'},
    {color: 'rgba(225, 129, 0, 0.9)', shadow: 'rgb(235 124 5)'},
    {color: 'rgb(162 148 255 / 51%)', shadow: 'rgb(255 115 248)'}

]
  const [quoteinfo, setquoteinfo] = useState({ quote: samplequote, author: sampleauthor })
  const [loading, setloading] = useState(false)
  const [avgcolor, setavgcolor] = useState(themeclr)
  const [glowcolor, setglowcolor] = useState(0);
  const [spotifylink, setspotifylink] = useState("https://open.spotify.com/playlist/37i9dQZF1DWWQRwui0ExPn")
  const [quotecategory, setquotecategory] = useState("random")
  const [refresh, setrefresh] = useState(false)
  const [imagecredits, setimagecredits] = useState({name: 'John Doe', link: 'https://www.pexels.com/@johndo'})
  const ismobile = window.innerWidth <= 700
  const size = ismobile ? 11 : 16;
  const parentstyles = {
    'backgroundImage': `url(${bgimage})`,
    'backgroundColor': avgcolor,
    'width': '100vw',
    'height': '100vh',
    'backgroundSize': 'cover',
    'display': 'grid',
    'justifyItems': 'center',
    'alignItems': 'center'
  }
  const glowspread = ismobile ? 100 : 70
var clicked = false
  $(".glower").on('mousedown', e => { clicked = true});
  $(document).on('mousemove', e => {clicked = false});
  $(".glower").on('mouseup', e => {clicked ?  glowcolor + 1 >= availableglows.length ? setglowcolor(0) : setglowcolor(glowcolor + 1) : console.log('good');  });
  clicked = false;

 
  const bulbstyles = {
    width: '5vw',
    height: '5vw',
    aspectRatio: '1/1',
    background: availableglows[glowcolor].color,
    color: 'yellow',
    borderRadius: '100%',
    position: 'absolute',
    boxShadow: `0px 0px 150px ${glowspread}px ${availableglows[glowcolor].shadow}`,
    backdropFilter: 'blur(8px)',
    border: '0px solid',
    zIndex: 1,
    left: '90vw',
    top: '50vh',
  }

  const playerStyles = {
    position: 'absolute',
    left: ismobile ? "" : 10,
    top: 10,
    maxWidth: 'fit-content',
    boxShadow: "rgba(0, 1, 4, 0.95) 0px 48px 100px 0px",
  }



  useEffect(() => {
    //fetch the quote
    $(".main-container").css("opacity", "0").css("transform", "translate(0, -5)")
    setloading(true);
   
    $.ajax({
      url: `https://api.api-ninjas.com/v1/quotes${quotecategory !== 'random' ? "?category=" + quotecategory : ""}`,
      method: 'GET',
      headers: {
        'x-api-key': apikey
      },
      complete: (xhr) => {
        if (xhr.status == 200) {
          setquoteinfo(xhr.responseJSON[0])
          $(".main-container").delay(1000).queue(function(next){
            $(this).css('opacity', '1').css("transform", "translate(0, 5)")
            next();
          })

        }
      }
    })
    //fetch the image
    let randomimage = collection.photos[Math.floor(Math.random()*collection.photos.length)];
    //remove if that kind of image

    while(randomimage.photographer === 'Polina Tankilevitch'){
      console.log('rolling...')
      randomimage = collection.photos[Math.floor(Math.random()*collection.photos.length)];
    }
    let imagelink = (ismobile ? randomimage.src.portrait : randomimage.src.landscape) || randomimage.src.original

    setimagecredits({name: randomimage.photographer, link: randomimage.photographer_url})
    setavgcolor(randomimage.avg_color)
    setimage(imagelink)
    setloading(false)

  }, [quotecategory, refresh])



  return (
    <div className='parent' style={
      parentstyles
    }>
      <Draggable>
      <Spotify wide style={playerStyles} link={spotifylink} />

      </Draggable>

      <Quoter ismobile={ismobile} quoteinfo={quoteinfo} loading={loading} />
      <Controldock {...{quotecategory, size, setquotecategory, themeclr, themedark, spotifylink,ismobile, setspotifylink, loading, refresh, setrefresh}} />
  
      <Draggable>

        <div className='glower' style={bulbstyles}   ></div>
      </Draggable>

      <CreditBar credits={imagecredits} ismobile={ismobile} themeclr={themeclr} size={size} darkclr={themedark} />
    </div>
  );
}

export default App;
