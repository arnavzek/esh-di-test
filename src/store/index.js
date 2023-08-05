import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./menu_slice";
import spriteSlice from "./sprite-slice";
import selectedSpriteSlice from "./selected_sprite_slice";
import spriteStyleSlice from "./sprite_style_slice";

const store = configureStore({
    reducer:{
        menu:menuSlice.reducer,
        sprite:spriteSlice.reducer,
        selectedStripe:selectedSpriteSlice.reducer,
        spriteStyle:spriteStyleSlice.reducer
    }
})

export default store;