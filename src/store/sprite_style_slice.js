import { createSlice } from "@reduxjs/toolkit";

const spriteStyleSlice  = createSlice({
    name:'spriteStyle',
    initialState:{
        sprites:[{
            spriteId:1,
            top:80,
            right:0,
            left:80,
            bottom:0,
            angle:0,
            isSaying:false
        }
        ]
    },
    reducers:{
        addSprite(state, action){
            state.sprites.push({            
                spriteId:action.payload.unique_id,
                top:30,
                right:0,
                left:30,
                bottom:0,
                angle:0,
                isSaying:false})
        },
        updateSpriteStyle(state, action){
            const index = state.sprites.findIndex(({id}) => id === action.payload.selectedSpriteId )
            state.sprites[index].style = {...state.sprites[index].style,...action.payload.modifiedStyle}
        }

    }
})

export const spriteStyleActions = spriteStyleSlice.actions;
export default spriteStyleSlice;