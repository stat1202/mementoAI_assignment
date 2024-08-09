import { createContext } from "react";
import useDragDrop from "../../hooks/useDragDrop";

interface DragNDropProviderProps {
  children: React.ReactNode;
}

export const DragNDropContext = createContext<DragNDropContextType | null>(
  null
);

export default function DragNDropProvider({
  children,
}: DragNDropProviderProps) {
  const {
    categories,
    selectedItems,
    draggedItem,
    toggleSelection,
    condition,
    onDragEnd,
    onDragStart,
    onDragUpdate,
  } = useDragDrop();
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
