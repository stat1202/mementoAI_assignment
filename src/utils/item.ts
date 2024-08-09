import { DraggableLocation, DroppableId } from "react-beautiful-dnd";

export const getItems = (count: number, column = 0): Item[] =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${column}-${k}-${new Date().getTime()}`,
    column: `${column}`,
    content: `item ${column + 1}-${k + 1}`,
    index: k,
  }));

export const reorder = (
  list: Item[],
  selectedIds: string[],
  destinationIndex: number
) => {
  const selectedItems = list.filter((item) => selectedIds.includes(item.id));
  const remainingItems = list.filter((item) => !selectedIds.includes(item.id));

  const newItems = [
    ...remainingItems.slice(0, destinationIndex),
    ...selectedItems,
    ...remainingItems.slice(destinationIndex),
  ];

  return newItems;
};

export const move = (
  source: Item[],
  destination: Item[],
  droppableSource: DroppableItem,
  droppableDestination: DroppableItem
) => {
  if (droppableSource.index % 2 == 1 && droppableDestination.index % 2 == 0) {
  } else {
  }
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: MoveResult = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

// reorder, move, stay
export const getCondition = (
  item: Item,
  destination: DraggableLocation | null | undefined
) => {
  if (!destination) {
    return "stay";
  }
  const startIndex = Number(item.column);
  const destinationIndex = Number(destination.droppableId);
  // // 짝수 아이템 앞
  if (item.index % 2 === 1 && destination.index % 2 === 1) {
    return "stay";
  }
  if (startIndex === destinationIndex) {
    return "reorder";
  } else if (startIndex === 0 && destinationIndex === 2) {
    // 첫 번째 컬럼에서 세 번째 컬럼 이동 금지
    return "stay";
  } else {
    return "move";
  }
};
