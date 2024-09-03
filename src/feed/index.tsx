import "./style.css";

// Interface which are exported from the global interfaces file.
import { Item } from "../interfaces";

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
