import "./style.css";

// Interface which are exported from the global types file.
import { Item } from "../types";

const items: Item[] = [
  {
    title: "first item",
    image: "https://via.placeholder.com/350x150",
  },
  {
    title: "second item",
    image: "https://via.placeholder.com/350x150",
  },
  {
    title: "third item",
    image: "https://via.placeholder.com/350x150",
  },
];

const App = (): JSX.Element => {
  return <h1>App Feed</h1>;
};

export default App;
