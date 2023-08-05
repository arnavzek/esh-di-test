import { createSlice } from "@reduxjs/toolkit";

const selectedSpriteSlice  = createSlice({
    name:'selectedSprite',
    initialState:{
        stripeId:1,
        isSpriteRunning:false,
    },
    reducers:{
        startSprite(state, action){
            state.isSpriteRunning = true
        },
        stopSprite(state, action){
            state.isSpriteRunning = false
        },
        setSelectedSprite(state, action){
            state.stripeId = action.payload.spriteId
        }

    }
})

export const selectedSpriteActions = selectedSpriteSlice.actions;
export default selectedSpriteSlice;