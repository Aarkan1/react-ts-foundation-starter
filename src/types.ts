// It's common to store reusable types and interfaces in a "global" interface.ts file.
// Each type and interface is exported, which lets us import them when needed.

// This interface is used in the feed exercise
export interface Item {
  title: string;
  image: string;
}

// This interface is used in the todo exercise
export interface Todo {
  userId?: number;
  id: number;
  title: string;
  completed: boolean;
}

// This interface is used in the auth exercise
export interface Link {
  href: string;
  name: string;
}

// This interface is used in the auth exercise
export interface User {
  id: number;
  name: string;
  email: string;
}
