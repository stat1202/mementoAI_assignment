import { Droppable } from "react-beautiful-dnd";
import DraggableItem from "./DraggableItem";

interface DroppableItemProps {
  droppableId: number;
  items: Item[];
}

export default function DroppableItem({
  droppableId,
  items,
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
            <span className="font-bold pb-3 block">{`Column-${
              droppableId + 1
            }`}</span>
            {items.map((item, index) => (
              <DraggableItem item={item} index={index} key={item.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </section>
  );
}
