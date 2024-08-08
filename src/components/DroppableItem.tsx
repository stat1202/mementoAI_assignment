import React from "react";
import { Droppable } from "react-beautiful-dnd";
import DraggableItem from "./DraggableItem";

interface DroppableItemProps {
  droppableId: number;
  items: Item[];
  draggedItem: Item | null;
}

export default function DroppableItem({
  droppableId,
  items,
  draggedItem,
}: DroppableItemProps) {
  return (
    <section className="shadow-md rounded-2xl overflow-hidden bg-white">
      <Droppable droppableId={`${droppableId}`}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            className={`w-60 h-full p-4 ${
              snapshot.isDraggingOver && "bg-gray-100"
            } `}
            {...provided.droppableProps}
          >
            <span className="font-bold pb-3 block">{`Category-${droppableId}`}</span>
            {items.map((item, index) => (
              <DraggableItem
                key={item.id}
                draggableId={item.id}
                index={index}
                content={item.content}
                draggedItem={draggedItem}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
}
