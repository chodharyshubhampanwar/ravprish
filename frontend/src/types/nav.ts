// types.ts
export interface Item {
  id: string;
  name: string;
  path: string;
}

export interface Category {
  id: string;
  title: string;
  items: Item[];
}

export interface NavigationData {
  categories: Category[];
}

export interface NavbarProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ExploreModalProps {
  isOpen: boolean;
  onClose: () => void;
}
