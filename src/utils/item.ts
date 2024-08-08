import { DraggableLocation, DroppableId } from "react-beautiful-dnd";

export const getItems = (count: number, offset = 0): Item[] =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `item ${k + offset + 1}`,
  }));

export const reorder = (list: Item[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const move = (
  source: Item[],
  destination: Item[],
  droppableSource: { index: number; droppableId: DroppableId },
  droppableDestination: { index: number; droppableId: DroppableId }
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
  source: DraggableLocation,
  destination: DraggableLocation | null | undefined
): Condition => {
  if (!destination) {
    return "stay";
  }
  const startIndex = Number(source.droppableId);
  const destinationIndex = Number(destination.droppableId);

  // 짝수 아이템 앞
  if (source.index % 2 === 1 && destination.index % 2 === 0) {
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
