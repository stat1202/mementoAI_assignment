import { Draggable } from "react-beautiful-dnd";

interface DraggableItemsProps {
  draggableId: string;
  index: number;
  content: string;
  draggedItem: Item | null;
}

export default function DraggableItem({
  draggableId,
  index,
  content,
  draggedItem,
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
            bg-white 
            ${draggedItem?.id === draggableId && "bg-red-400"}
          `}
        >
          <div className="flex justify-around">{content}</div>
        </div>
      )}
    </Draggable>
  );
}
