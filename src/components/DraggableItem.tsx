import { Draggable } from "react-beautiful-dnd";

interface DraggableItemsProps {
  draggableId: string;
  index: number;
  content: string;
}

export default function DraggableItem({
  draggableId,
  index,
  content,
}: DraggableItemsProps) {
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`select-none p-4 mb-2 
            rounded-lg
            shadow-md
            ${snapshot.isDragging ? "bg-green-300" : "bg-white"}`}
        >
          <div className="flex justify-around">{content}</div>
        </div>
      )}
    </Draggable>
  );
}
