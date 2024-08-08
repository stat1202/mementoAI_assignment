interface Item {
  id: string;
  content: string;
}

interface MoveResult {
  [key: string]: any;
}

type Condition = "reorder" | "move" | "stay";
