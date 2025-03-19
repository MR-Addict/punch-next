export interface PNDataType {
  /**
   * 值班笔记的学期
   */
  term: string;

  /**
   * 值班笔记的 ID
   */
  _id: string;

  /**
   * 专有名词在笔记中的位置
   */
  positions: Position[];
}

export interface Position {
  start: number;
  end: number;
}
