import { useContext } from "react";
import { Draggable } from "react-beautiful-dnd";
import { DragNDropContext } from "./DragNDropProvider";

interface DraggableItemsProps {
  item: Item;
  index: number;
}

export default function DraggableItem({ item, index }: DraggableItemsProps) {
  const { toggleSelection, selectedItems, condition, draggedItem } = useContext(
    DragNDropContext
  ) as DragNDropContextType;

  const bgColor = selectedItems.includes(item)
    ? condition === "stay"
      ? "bg-red-400"
      : "bg-gray-200"
    : "bg-white";
  return (
    <Draggable draggableId={item.id} index={index} key={item.id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => toggleSelection(item)}
          className={`select-none p-4 mb-2 
                  rounded-lg relative
                  shadow-md
                  ${bgColor}
                  `}
        >
          <div className={`flex justify-around`}>{item.content}</div>
          {condition !== null &&
            draggedItem?.droppableId === item.column &&
            draggedItem?.index === Number(item.index) && (
              <div className="absolute -right-2 -top-2 w-8 h-8 bg-gray-600 text-white flex items-center justify-center font-bold rounded-full">
                {selectedItems.length}
              </div>
            )}
        </div>
      )}
    </Draggable>
  );
}
