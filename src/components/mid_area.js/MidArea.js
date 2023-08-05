import React, { useEffect, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import "./style.css";
import { useSelector } from "react-redux";
import { spriteActions } from "../../store/sprite-slice";
import { useDispatch } from "react-redux";
import { selectedSpriteActions } from "../../store/selected_sprite_slice";
import { spriteStyleActions } from "../../store/sprite_style_slice";

export default function MidArea() {
  const dispatch = useDispatch()
  const selectedSpriteId = useSelector(state => state.selectedStripe.stripeId)
  const allStripes = useSelector(state => state.sprite.sprites)
  const [currentSpriteActions, setSpriteActions] = useState([])
  let spriteActions;

  useEffect(() => {

    console.log("midArea useEffect has run")
   spriteActions= allStripes.filter(({spriteId}) => {
      return spriteId == selectedSpriteId
    })[0].actions
    setSpriteActions(spriteActions)
    setSpriteActions([...spriteActions])

  },[ selectedSpriteId,allStripes])

  spriteActions = useSelector((state) => state.sprite.sprites[0].actions);

  return (
    <div className="sprite-div">
      <h2 className="sprite-div-heading">Drop actions in the given space</h2>
      <div className="sprite-action-div">
        <Droppable droppableId="sprite-list-items">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {currentSpriteActions && currentSpriteActions.map(({ id, title, menuColor, action }, index) => {
                return (
                  <Draggable
                    key={id}
                    draggableId={`${id}`}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`sprite-action-item sprite-action-item-${menuColor}`}
                      >
                        {title}
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </div>
  );
}
