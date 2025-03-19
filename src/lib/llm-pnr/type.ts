export interface PNData {
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

export interface PN {
  /**
   * 专有名词在笔记中使用的名称
   */
  alias: string[];

  /**
   * 专有名词在笔记中相关数据
   */
  data: PNData[];
}

export interface Position {
  start: number;
  end: number;
}
