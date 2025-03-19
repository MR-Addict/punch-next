import { Position } from "../type";

export default function getPositions(target: string, content: string): Position[] {
  const positions: Position[] = [];

  let stat = 0;

  while (true) {
    const start = content.indexOf(target, stat);
    if (start === -1) break;

    const end = start + target.length;
    positions.push({ start, end });
    stat = end;
  }

  return positions;
}
