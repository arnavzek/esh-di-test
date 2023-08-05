import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
    name:'menu',
    initialState:{
        name:'events',
        color:'gold'
    },
    reducers:{
        setMenu(state, action){
                 state.name = action.payload.title
                 state.color = action.payload.color
        }
    }
})


export const menuActions = menuSlice.actions;
export default menuSlice;