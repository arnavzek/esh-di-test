import React from "react";
import Sidebar from "./components/side_bar/Sidebar";
import MidArea from "./components/mid_area.js/MidArea";
import PreviewArea from "./components/preview_area/PreviewArea";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { spriteActions } from "./store/sprite-slice";
import { blocks } from "./contants/blocks";


export default function App() {
  const dispatch = useDispatch();
  const selectedSpriteId = useSelector(state => state.selectedStripe.stripeId)
  const menuTitle = useSelector((state) => state.menu.name);
  const menuColor = useSelector((state) => state.menu.color);
  const isSpriteRunning = useSelector(state => state.selectedStripe.isSpriteRunning)
  const menuList = blocks[`${menuTitle}`];
  const onDragEnd = (result) => {

    if(isSpriteRunning)
    return;

    const { source, destination } = result;
    if (
      destination == null ||
      (source.droppableId == destination.droppableId &&
        source.index == destination.index)
    ) {
      return;
    }

    //adding action in sprite
    if (
      source.droppableId == "menu-list-items" &&
      destination.droppableId == "sprite-list-items"
    ) {
      dispatch(
        spriteActions.addActionInSprite({
          destinationId: destination.index,
          ...menuList[source.index],
          menuTitle,
          menuColor,
          selectedSpriteId
        })
      );
    }

    //removing action from sprite
    if (
      source.droppableId == "sprite-list-items" &&
      destination.droppableId == "menu-list-items"
    ) {
      dispatch(
        spriteActions.removeActionfromSprite({ sourceId: source.index,
          selectedSpriteId })
      );
    }
  };
  return (
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
            <Sidebar />
            <MidArea />
          </div>
          <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
            <PreviewArea />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
