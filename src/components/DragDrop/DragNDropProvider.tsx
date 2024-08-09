import { createContext, useState } from "react";
import { getCondition, getItems, reorder } from "../../utils/item";
import {
  OnDragEndResponder,
  OnDragStartResponder,
  OnDragUpdateResponder,
} from "react-beautiful-dnd";

interface DragNDropProviderProps {
  children: React.ReactNode;
}

export const DragNDropContext = createContext<DragNDropContextType | null>(
  null
);

export default function DragNDropProvider({
  children,
}: DragNDropProviderProps) {
  const [categories, setCategories] = useState([
    getItems(10),
    getItems(5, 1),
    getItems(7, 2),
    getItems(3, 3),
  ]);

  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [condition, setCondition] = useState<Condition>(null);
  const [draggedItem, setDraggedItem] = useState<DroppableItem | null>(null);

  const toggleSelection = (item: Item) => {
    const isSelected = selectedItems.includes(item);

    if (isSelected) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
      return;
    }

    if (selectedItems.length === 0 || selectedItems[0].column === item.column) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems([item]);
    }
  };

  const onDragStart: OnDragStartResponder = (start) => {
    const { source } = start;
    const startIndex = Number(source.droppableId);
    const item = categories[startIndex][source.index];

    setDraggedItem(source);

    if (!selectedItems.includes(item)) {
      setSelectedItems([item]);
    }
  };

  const onDragUpdate: OnDragUpdateResponder = (update) => {
    const { destination } = update;

    setCondition(getCondition(selectedItems[0], destination));
  };

  const onDragEnd: OnDragEndResponder = (result) => {
    const { source, destination } = result;

    if (!destination) {
      setCondition(null);
      return;
    }

    const startIndex = Number(source.droppableId);
    const destinationIndex = Number(destination.droppableId);

    setSelectedItems([]);
    setCondition(null);
    setDraggedItem(null);
    switch (condition) {
      case "stay":
        return;
      case "reorder":
        const selectedIds = selectedItems.map((item) => item.id);
        const reorderedItems = reorder(
          categories[startIndex],
          selectedIds,
          destination.index
        ).map((item, idx) => {
          return { ...item, index: idx };
        });
        const reorderedState = [...categories];
        reorderedState[startIndex] = reorderedItems;
        setCategories(reorderedState);

        return;
      case "move":
        const filteredStartItems = categories[startIndex].filter(
          (item) => !selectedItems.includes(item)
        );
        const newDestinationItems = [
          ...categories[destinationIndex].slice(0, destination.index),
          ...selectedItems,
          ...categories[destinationIndex].slice(destination.index),
        ].map((item, idx) => {
          return { ...item, column: destination.droppableId, index: idx };
        });

        const movedState = [...categories];
        movedState[startIndex] = filteredStartItems;
        movedState[destinationIndex] = newDestinationItems;

        setCategories(movedState.filter((group: any) => group.length));
        return;
    }
  };

  return (
    <DragNDropContext.Provider
      value={{
        categories,
        selectedItems,
        draggedItem,
        toggleSelection,
        condition,
        onDragEnd,
        onDragStart,
        onDragUpdate,
      }}
    >
      {children}
    </DragNDropContext.Provider>
  );
}
