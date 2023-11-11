import Draggable from "react-draggable"
import { FadeLoader } from "react-spinners"

export default function(props) {
    var {quoteinfo, loading } = props
    return (
        <Draggable>
        <div className='main-container' style={
          {
            'max-width': window.innerWidth > 900 ? '30vw' : '70vw',
            padding: '30px',
            fontSize: 19,
            'background': 'rgb(251, 251, 251, 0.53)',
            backdropFilter: 'blur(20px)',
            lineHeight: 1.5,
            borderRadius: '20px',
            boxSizing: 'border-box',
            boxShadow: "rgba(0, 1, 4, 0.95) 0px 48px 100px 0px",
            cursor: "move",
            zIndex: 10,
            userSelect: 'none'
          }
        }>
          {!loading ?
            (<>
              <h3>Quote </h3>
              <br />
              {quoteinfo.quote}
              <br />
              <br />
              <br />
              - {quoteinfo.author}</>
            ) :

            (
                <FadeLoader cssOverride={{transform: 'translate(0vw, -0.5vw)', scale: "0.75"}}/>
            )
          }

        </div>
      </Draggable>
    )
}