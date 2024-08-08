import { useState } from "react";
import { getCondition, getItems, move, reorder } from "./utils/item";
import {
  DragDropContext,
  OnDragEndResponder,
  OnDragUpdateResponder,
} from "react-beautiful-dnd";
import DroppableItem from "./components/DroppableItem";

export default function App() {
  const [draggedItem, setDraggedItem] = useState<Item | null>(null);
  const [categories, setCategories] = useState([
    getItems(10),
    getItems(5, 10),
    getItems(7, 20),
    getItems(3, 30),
  ]);

  const onDragUpdate: OnDragUpdateResponder = (update) => {
    const { source, destination } = update;
    const item = categories[Number(source.droppableId)][source.index];
    const condition = getCondition(source, destination);

    setDraggedItem(condition === "stay" ? item : null);
  };

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination } = result;

    const condition = getCondition(source, destination);
    const startIndex = Number(source.droppableId);
    setDraggedItem(null);

    switch (condition) {
      case "stay":
        return;
      case "reorder":
        const reorderedItems = reorder(
          categories[startIndex],
          source.index,
          destination!.index
        );
        const reorderedState = [...categories];
        reorderedState[startIndex] = reorderedItems;
        setCategories(reorderedState);
        return;
      case "move":
        const destinationIndex = Number(destination!.droppableId);
        const result = move(
          categories[startIndex],
          categories[destinationIndex],
          source,
          destination!
        );
        const movedState = [...categories];
        movedState[startIndex] = result[startIndex];
        movedState[destinationIndex] = result[destinationIndex];

        setCategories(movedState.filter((group: any) => group.length));
        return;
    }
  };

  return (
    <main className="flex h-screen justify-center items-center bg-gray-50">
      <div className="flex gap-5">
        <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
          {categories.map((items, index) => (
            <DroppableItem
              key={index}
              droppableId={index}
              items={items}
              draggedItem={draggedItem}
            />
          ))}
        </DragDropContext>
      </div>
    </main>
  );
}
