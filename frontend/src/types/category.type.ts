export interface Category {
  id: number;
  name: string;
  image: string;
  parentId: number | null;
}

export interface CategoryStore {
  category: number;
  setCategory: (category: number) => void;
  line: number | null;
  setLine: (line: number | null) => void;
}

export interface CategoryLineProp {
  line: Category;
  onclick: (id: number) => void;
}
