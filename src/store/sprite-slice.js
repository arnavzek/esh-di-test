import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid } from 'uuid';

const spriteSlice  = createSlice({
    name:'sprite',
    initialState:{
        sprites:[{
            spriteId:1,
            actions:[
            ]
        }]

    },
    reducers:{
        addStripe(state, action){
          state.sprites.push({spriteId: action.payload.unique_id, actions:[]})
        },
        addActionInSprite(state, action){

            const unique_id = uuid().slice(0,8)
            const newAction = {
                title:`${action.payload.title}`,
                action:action.payload.menuTitle,
                menuColor:action.payload.menuColor,
                blockId:action.payload.id,
                id:unique_id
            }
            const index = state.sprites.findIndex(({spriteId}) => (spriteId === action.payload.selectedSpriteId))

            state.sprites[index].actions.splice(action.payload.destinationId, 0, newAction)
        },
        
        removeActionfromSprite(state, action){
            const index = state.sprites.findIndex(({spriteId}) => (spriteId === action.payload.selectedSpriteId))
            state.sprites[index].actions.splice(action.payload.sourceId, 1)

        },

    }
})

export const spriteActions = spriteSlice.actions;
export default spriteSlice;