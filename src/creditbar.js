import { useState } from "react";

export default function CreditBar(props){
    const {credits, ismobile, themeclr, darkclr, size} = props;
    const [infoopen, setinfoopen] = useState(false)
    return (
        <div onClick={()=>{setinfoopen(!infoopen)}} style={{
            position: 'absolute',
            right: 10,
            bottom: 10,
            borderRadius: 30,
            background: darkclr,
            backdropFilter: 'blur(12px)',
            fontSize: size,
            padding: ismobile ? 10 : 15,
            color: themeclr,
            opacity: '0.7',
            zIndex: 100,
            maxWidth: '40vw'
        }}>
            {infoopen ? 
          <>
                    Coded with 🤍  by <a href="https://github.com/hunxjunedo">hunxjunedo</a>
                    <br/>
                    Shot by <a href={credits.link}>{credits.name}</a> @ <a href="https://www.pexels.com/"> Pexels</a>
                    <br/>
                    <a  href="https://www.buymeacoffee.com/hunxjunedo"><img style={{marginTop: 10}} src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=hunxjunedo&button_colour=ffa500&font_colour=000000&font_family=Inter&outline_colour=000000&coffee_colour=FFDD00" /></a>          </>
                 :
                '🤍'
        
        }
        </div>
    )
}