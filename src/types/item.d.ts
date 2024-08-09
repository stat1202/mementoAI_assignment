interface Item {
  id: string;
  column: string;
  content: string;
  index: number;
}

interface MoveResult {
  [key: string]: any;
}

type Condition = "reorder" | "move" | "stay" | null;

interface DroppableItem {
  index: number;
  droppableId: DroppableId;
}

interface DragNDropContextType {
  categories: Item[][];
  selectedItems: Item[];
  toggleSelection: (item: Item) => void;
  condition: Condition;
  onDragEnd: OnDragEndResponder;
  onDragStart: OnDragStartResponder;
  onDragUpdate: OnDragUpdateResponder;
  draggedItem: DroppableItem | null;
}
