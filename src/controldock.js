import Draggable from "react-draggable";
import validator from "validator";
import { Button, ConfigProvider, Input, Select, theme } from "antd";
export default function(props) {
    console.log(props)
    const {spotifylink, setspotifylink, quotecategory, refresh, setrefresh, setquotecategory, loading} = props
    const themeclr = 'orange'; const themedark = "rgb(1, 1, 1,0.75)"; const themedarkfull = "rgb(1, 1, 1)"
    const quotecategroies = [
        {"value": "amazing", "label": "amazing"},
        {"value": "anger", "label": "anger"},
        {"value": "architecture", "label": "architecture"},
        {"value": "art", "label": "art"},
        {"value": "attitude", "label": "attitude"},
        {"value": "beauty", "label": "beauty"},
        {"value": "best", "label": "best"},
        {"value": "birthday", "label": "birthday"},
        {"value": "business", "label": "business"},
        {"value": "car", "label": "car"},
        {"value": "change", "label": "change"},
        {"value": "communications", "label": "communications"},
        {"value": "computers", "label": "computers"},
        {"value": "cool", "label": "cool"},
        {"value": "courage", "label": "courage"},
        {"value": "dad", "label": "dad"},
        {"value": "dating", "label": "dating"},
        {"value": "death", "label": "death"},
        {"value": "design", "label": "design"},
        {"value": "dreams", "label": "dreams"},
        {"value": "education", "label": "education"},
        {"value": "environmental", "label": "environmental"},
        {"value": "equality", "label": "equality"},
        {"value": "experience", "label": "experience"},
        {"value": "failure", "label": "failure"},
        {"value": "faith", "label": "faith"},
        {"value": "family", "label": "family"},
        {"value": "famous", "label": "famous"},
        {"value": "fear", "label": "fear"},
        {"value": "fitness", "label": "fitness"},
        {"value": "food", "label": "food"},
        {"value": "forgiveness", "label": "forgiveness"},
        {"value": "freedom", "label": "freedom"},
        {"value": "friendship", "label": "friendship"},
        {"value": "funny", "label": "funny"},
        {"value": "future", "label": "future"},
        {"value": "god", "label": "god"},
        {"value": "good", "label": "good"},
        {"value": "government", "label": "government"},
        {"value": "graduation", "label": "graduation"},
        {"value": "great", "label": "great"},
        {"value": "happiness", "label": "happiness"},
        {"value": "health", "label": "health"},
        {"value": "history", "label": "history"},
        {"value": "home", "label": "home"},
        {"value": "hope", "label": "hope"},
        {"value": "humor", "label": "humor"},
        {"value": "imagination", "label": "imagination"},
        {"value": "inspirational", "label": "inspirational"},
        {"value": "intelligence", "label": "intelligence"},
        {"value": "jealousy", "label": "jealousy"},
        {"value": "knowledge", "label": "knowledge"},
        {"value": "leadership", "label": "leadership"},
        {"value": "learning", "label": "learning"},
        {"value": "legal", "label": "legal"},
        {"value": "life", "label": "life"},
        {"value": "love", "label": "love"},
        {"value": "marriage", "label": "marriage"},
        {"value": "medical", "label": "medical"},
        {"value": "men", "label": "men"},
        {"value": "mom", "label": "mom"},
        {"value": "money", "label": "money"},
        {"value": "morning", "label": "morning"},
        {"value": "movies", "label": "movies"},
        {"value": "success", "label": "success"}
      ]
    const dockstyles = {
        width: "25vw",
        cursor: 'move',
        position : "absolute",
        bottom: 10,
        left: 10,
        borderRadius: 20,
        background: themedark,
        backdropFilter: "blur(20px)",
        display: 'grid',
        justfiyItems: 'center',
        padding: "1vw",
        zIndex: 10
    }

    const basicdivstyles = {
        display: "grid",
        width: '23vw',
        margin: 5,
        padding: 5,
        gridTemplateColumns: "repeat(2, 1fr)",
        justifySelf: 'center',
        color: themeclr
    }

    const dataenterstyles ={
        width: '15vw',
        borderRadius: 10,
        color: themeclr,
        paddding: 2,
        background: 'transparent',
        border:   `1px solid ${themeclr}`,
        backdropFilter: 'blur(10px)'
    }
    return (
          <ConfigProvider theme={{
            components: {
            select: {
                selectorBg: themedark
            },
            Button: {
                primaryColor	: themeclr,
                primaryShadow: 'none',
                margin: 2,
                borderColorDisabled: 'white'

            }
            }, token: {
                colorBgContainer	: 'transparent',
                colorBorder	: 'transparent',
                colorText: themeclr,
                colorPrimary: 'transparent',
                colorPrimaryText: themeclr,
                colorTextDisabled	: 'white',

            }
          }}>
        <Draggable>
          <div style={dockstyles} >
              <div style={basicdivstyles}> 
              Spotify Song: <Input allowClear={true} disabled={loading} draggable={false} spellCheck={false} defaultValue={spotifylink}  onPressEnter={(e) => {validator.isURL(e.target.value) ? setspotifylink(e.target.value) : console.log('wrong url')}} style={dataenterstyles} />
              </div>
               <div style={basicdivstyles}>
               Quote Category: <Select showSearch disabled={loading} style={dataenterstyles} defaultValue={quotecategory} onChange={setquotecategory} options={quotecategroies}/>
               </div>
          <div style={{display: 'grid', 'gridTemplateColumns': 'repeat(2, 1fr)', gridAutoFlow: 'column'}}>
          <Button style={{margin: 5}}>
                 Reset
               </Button>
                <Button style={{margin: 5}} onClick={() => {setrefresh(!refresh)}} disabled={loading} type="primary">
                    Refresh
                </Button>
          </div>
            </div>
        </Draggable>
          </ConfigProvider>
    )
}