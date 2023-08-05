import React from "react";
import Icon from "../Icon";
import IconSideBar from "../icon_side_bar.js/IconSideBar";
import "./style.css";
import { useSelector } from "react-redux";
import { Droppable , Draggable} from "react-beautiful-dnd";
import { blocks } from "../../contants/blocks";


export default function Sidebar() {
  const menuTitle = useSelector(state => state.menu.name)
  const menuColor = useSelector(state => state.menu.color)
  const menuList = blocks[`${menuTitle}`];
  return (
    <div className="w-60 flex-none h-full flex flex-row items-start border-r border-gray-200">
      <IconSideBar></IconSideBar>
      <div className="side-bar-list">
          <h2 className="side-bar-heading">{menuTitle}</h2>
          <Droppable droppableId="menu-list-items" >
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}
          >
          {menuList.map(({id, title}, index) => {
                            return(
                            <Draggable
                            key={id}
                            draggableId={`${id}`}
                            index ={index}
                          >
                            {(provided) => (
                                <li  ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps} 
                                        className={`list-content list-content-color-${menuColor}`}>
                                        {title}
                                      </li>
                            )}
                          </Draggable>)
})
      }
      {provided.placeholder}
          </ul>
        )}
        
      </Droppable>

        </div>
      

      {/* <div className="font-bold"> {"Events"} </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When this sprite clicked"}
      </div>
      <div className="font-bold"> {"Motion"} </div>
      <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"Move 10 steps"}
      </div>
      <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"Turn "}
        <Icon name="undo" size={15} className="text-white mx-2" />
        {"15 degrees"}
      </div>
      <div className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"Turn "}
        <Icon name="redo" size={15} className="text-white mx-2" />
        {"15 degrees"}
      </div> */}
    </div>
  );
}
