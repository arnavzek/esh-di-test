import React, { useEffect, useState } from "react";
import CatSprite from "../CatSprite";
import "./style.css"
import { useSelector } from "react-redux";
import { spriteActions } from "../../store/sprite-slice";
import { useDispatch } from "react-redux";
import { spriteStyleActions } from "../../store/sprite_style_slice";
import { selectedSpriteActions } from "../../store/selected_sprite_slice";
import { v4 as uuid } from 'uuid';
import { blocks } from "../../contants/blocks";

export default function PreviewArea() {
  const selectedSpriteId = useSelector(state => state.selectedStripe.stripeId)
  const allStripes = useSelector(state => state.sprite.sprites)
  const spriteStyles = useSelector(state => state.spriteStyle.sprites )
  const isSpriteRunning  = useSelector(state => state.selectedStripe.isSpriteRunning)
  const [spritesStyleObject, setSpriteStyle] = useState(spriteStyles);
  const [spriteCSS, setSpriteCss] = useState([])

  window.onkeypress = function(event) {
    const actionIndex = allStripes.findIndex(({spriteId}) => {
      return spriteId === selectedSpriteId
    })


    let selectedActions = allStripes[actionIndex].actions
    const index  = selectedActions.findIndex(({action}) =>(action == 'events'));

    if(index === -1)
    return true;

    const eventAction = selectedActions[index];

  
    const action = blocks['events'];
    const actionId = action.findIndex(({id}) => eventAction.blockId == id)
    const actionPerformed = action[actionId]

    if(actionPerformed.action === 'Key' ){
      if(actionPerformed.key === 'space' && event.which == 32){
        startStripe()
      }
  }

  }

  const dispatch = useDispatch()

  function looks(actions,selectedSprite){
    const action = blocks[`${actions.action}`]
    const actionId = action.findIndex(({id}) => actions.blockId == id)
    const actionPerformed = action[actionId]
    let modifiedStyle = {}
    let timeout = 0
    let revertAction =''
    if(actionPerformed.action === 'Say'){
    modifiedStyle = {...selectedSprite, isSaying:true}
    timeout = actionPerformed.duration
    revertAction = 'isSaying'
    }

  return {modifiedStyle, timeout, revertAction};

  }

  async function control (actions,selectedSprite){
    const action = blocks[`${actions.action}`]
    const actionId = action.findIndex(({id}) => actions.blockId == id)
    const actionPerformed = action[actionId]
    if(actionPerformed.action === 'Wait'){
         await sleepNow(actionPerformed.count)
    }

  }

  const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
  //run sprite
  async function startStripe(){

    //finding index value
    const cssIndex = spriteCSS.findIndex(({spriteId}) => {
      return spriteId === selectedSpriteId
    })

    //finding action index
    const actionIndex = allStripes.findIndex(({spriteId}) => {
      return spriteId === selectedSpriteId
    })

    
    let selectedCss = spriteCSS[cssIndex];
    let selectedActions = allStripes[actionIndex].actions

    if(selectedActions.length === 0)return

    if(isSpriteRunning)return;

    else
    dispatch(selectedSpriteActions.startSprite())



    for(let i =0; i< selectedActions.length; i++){

      await sleepNow(1000);
        const actionPerformed = selectedActions[i].action
        if(actionPerformed === 'motion'){
          const modifiedStyle =  motion(selectedActions[i], selectedCss)
          const index = spriteCSS.findIndex(({spriteId}) => spriteId === modifiedStyle[0].spriteId)
          let tempArray = spriteCSS
          tempArray[index].style = {...modifiedStyle[0].style}

          setSpriteCss(prevArray => [...tempArray]);
        }

        else if (actionPerformed === 'looks'){
            const {modifiedStyle, timeout, revertAction} = looks(selectedActions[i], selectedCss)
            const index = spriteCSS.findIndex(({spriteId}) => spriteId === modifiedStyle.spriteId)
            let tempArray = spriteCSS
            tempArray[index] = {...modifiedStyle}
            setSpriteCss([...tempArray]);
            setTimeout(() => {
                 const index = spriteCSS.findIndex(({spriteId}) => spriteId === modifiedStyle.spriteId)
                 tempArray[index][`${revertAction}`] = false
                 setSpriteCss([...tempArray]);
            },timeout * 1000)

        }
        else if(actionPerformed === 'control'){
          control(selectedActions[i], selectedCss)
        }

    }

    dispatch(selectedSpriteActions.stopSprite())

     }

     //dont touch
     useEffect(() => {

      console.log("preview area useEffect has run")

      let styledArray = []
      spritesStyleObject.forEach(({top, bottom, left, right, angle, spriteId, isSaying}) => {
        styledArray.push({
          spriteId,
          isSaying,
          style:{
            left, right, top, bottom, transform:`rotate(${angle}deg)`
          }
        })
      })
      setSpriteCss(prevArray => [...prevArray, ...styledArray]);
     },[])

  //motion
  function motion(actions, selectedSprite){
    const action = blocks[`${actions.action}`]
    const actionId = action.findIndex(({id}) => actions.blockId == id)
    const actionPerformed = action[actionId]
    let top = selectedSprite.style.top
    let left = selectedSprite.style.left
    let right = selectedSprite.style.right
    let bottom = selectedSprite.style.bottom
    let angle = selectedSprite.style.transform.slice(7,).slice(0,-4)  - '0'
    let modifiedStyle = []
    if(actionPerformed.action === 'Move'){
    modifiedStyle = [{spriteId:selectedSprite.spriteId, style:{...selectedSprite.style,left:left+ actionPerformed.count}}]

    }
    else if(actionPerformed.action == "Turn")
    {
      modifiedStyle = [{spriteId:selectedSprite.spriteId, style:{...selectedSprite.style,transform:`rotate(${angle + actionPerformed.count}deg)`}}]

    }

  return modifiedStyle;

}

const addSprite = () => {

  // console.log("adding sprite")
  const unique_id = uuid().slice(0,8)
  // console.log("1")
  dispatch(spriteStyleActions.addSprite({unique_id}))
  // console.log("2")
  dispatch(spriteActions.addStripe({unique_id}))
  // console.log("3")
  dispatch(selectedSpriteActions.setSelectedSprite({spriteId:unique_id}))
    const newSprite = {
      spriteId: unique_id,
      isSaying:false,
      style:{
        left:30, right:0, top:30, bottom:0, transform:`rotate(0deg)`
      }
    }
    // console.log("4")
    setSpriteCss(preState => [...preState, newSprite])
}

const selectSprite = (id) => {
  dispatch(selectedSpriteActions.setSelectedSprite({spriteId:id}))
}


  return (
    <div className="preview-field-div h-full overflow-y-auto p-2">
      <div className="preview-field">
        {
          spriteCSS && spriteCSS.map((({spriteId, style, isSaying}) => {
            return(
              <div key={spriteId} className="stripe-image" onClick={() => selectSprite(spriteId)} style={style}>
                {isSaying?
                <div className="cloud-say">hello</div>:null}
                
              <CatSprite />
              </div>
            )
          }))

        }

      {/* <button onClick={()=>{ console.log("hello") }}>Test</button>  */}
      <button onClick={startStripe} className="run-sprite">Run</button>
      <button onClick={addSprite} className="add-sprite">Add Sprite</button>
      </div>

    </div>
  );
}
