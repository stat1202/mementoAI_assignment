import { useState } from "react";
import { getItems, move, reorder } from "./utils/item";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import DraggableItem from "./components/DraggableItem";

export default function App() {
  const [items, setItems] = useState([
    getItems(10),
    getItems(5, 10),
    getItems(7, 20),
    getItems(3, 30),
  ]);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const startIndex = Number(source.droppableId);
    const destinationIndex = Number(destination.droppableId);

    if (startIndex === destinationIndex) {
      const reorderedItems = reorder(
        items[startIndex],
        source.index,
        destination.index
      );
      const newState: any = [...items];
      newState[startIndex] = reorderedItems;
      setItems(newState);
    } else {
      const result = move(
        items[startIndex],
        items[destinationIndex],
        source,
        destination
      );
      const newState = [...items];
      newState[startIndex] = result[startIndex];
      newState[destinationIndex] = result[destinationIndex];

      setItems(newState.filter((group) => group.length));
    }
  };

  return (
    <main className="flex h-screen justify-center items-center bg-gray-50">
      <div className="flex gap-5">
        <DragDropContext onDragEnd={onDragEnd}>
          {items.map((el, ind) => (
            <section className="shadow-md rounded-2xl overflow-hidden bg-white">
              <Droppable key={ind} droppableId={`${ind}`}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    className={`w-60 h-full p-4 ${
                      snapshot.isDraggingOver && "bg-gray-100"
                    } `}
                    {...provided.droppableProps}
                  >
                    <span className="font-bold pb-3 block">{`Category-${ind}`}</span>
                    {el.map((item, index) => (
                      <DraggableItem
                        key={item.id}
                        draggableId={item.id}
                        index={index}
                        content={item.content}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </section>
          ))}
        </DragDropContext>
      </div>
    </main>
  );
}
