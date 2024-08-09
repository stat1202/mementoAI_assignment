import { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableItem from "./DroppableItem";
import { DragNDropContext } from "./DragNDropProvider";

export default function DragDropContainer() {
  const { categories, onDragEnd, onDragStart, onDragUpdate } = useContext(
    DragNDropContext
  ) as DragNDropContextType;
  return (
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
    >
      {categories.map((items, index) => (
        <DroppableItem droppableId={index} items={items} key={index} />
      ))}
    </DragDropContext>
  );
}
