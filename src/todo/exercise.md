# Exercise: todo

In this exercise you will implement a "todo" React application, comprised of components with styling for displaying a form (to create new todos) and rendering a list of todos and their details.

## Part 1: Styling

In this part of the exercise, a couple of components are to be created with proper styling applied.

### TodoForm

The _TodoForm_ component (in `TodoForm.tsx`) allows the user to enter a title and create a new todo.

**Inline styling** is to be used, with the following CSS properties:

```javascript
{
  width: '100%',
  backgroundColor: '#FFF',
  padding: 16,
  fontSize: 24,
  fontStyle: 'italic',
  fontWeight: 300,
  border: 'none'
}
```

The component's markup:

```html
<form>
  <input placeholder="What do you need to do?" />
</form>
```

Apply the styling to the _input_ element.

> (Render _TodoForm_ in _App_)

### TodoList

A _TodoList_ component that has the sole responsibility to render all the todos. It accepts a prop called "todos" from the the _App_ component.

Import and use the `Todo` interface from the global _types.ts_ file.

```ts
interface Props {
  todos: Todo[];
}

const TodoList = ({ todos }: Props): JSX.Element => {};
```

It should return this simple markup:

```html
<div>
  <!-- Logic for listing all the todos -->
</div>
```

> (Render _TodoList_ in _App_ underneath the _TodoForm_)

### Todo

The _Todo_ component renders exactly one todo object.

_Todo_ accepts the `Todo` interface as its props.

> You already solved this in exercise: feed/part 1

It returns the following markup:

```html
<Container>
	<div>
		<Checkbox id={"" + id} type="checkbox" />
		<Label htmlFor={"" + id}>Todo title goes here...</Label>
	</div>
	<Button>Button text goes here...</Button>
</Container>
```

Notice that the markup seemingly contains other React components; these are so-called _styled components_, which render just as regular components.

> Installing the VS Code extension [vscode-styled-components](https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components) helps with syntax highlighting and intellisense.

Create a separate styled-component file called _styledComponents.ts_ that should live in the todo-folder. Don't forget to export the components as _const_ so you can import them into the _todo.ts_ file.

Example of a styled-component:

```javascript
import styled from "styled-components";

const BlueDiv = styled.div`
  background: "blue";
`;
```

> Styled components utilizes [tagged template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)

Create the following styled components:

- _Container_: a `div` styled with:

  ```css
  padding: 8px 16px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  ```

- _Checkbox_: an `input` styled with:

  ```css
  appearance: none;
  ```

- _Button_: a `button` styled with:

  ```css
  font-size: 22px;
  color: #cc9a9a;

  &:hover {
    color: #af5b5e;
  }
  ```

- _Label_: a `label` styled with:

  ```css
  cursor: pointer;
  display: inline-block;
  padding: 15px 15px 15px 60px;
  user-select: none;
  ```

  In addition, add these CSS properties below to the label styled component. Their values should adapt based on the _completed_ prop passed to _Todo_. In order for them to properly work with TS you also need an interface that defines the props the label accepts, put it in the _styledComponents.ts_ file:

  ```css
  color: /* '#d9d9d9' if completed, otherwise 'initial' */ ;
  text-decoration: ; /* 'line-through' if completed, otherwise 'none' */
  ```

  With TypeScript, if using styled components with props it needs to have the props typed:

  ```ts
  interface ParagraphProps {
    primary: boolean;
  }

  const Paragraph = styled.p<ParagraphProps>`
    /* Adapt the colors based on primary prop */
    background: ${(props) => (props.primary ? "red" : "white")};
  `;
  ```

  > See [Adapting based on props](https://styled-components.com/docs/basics#adapting-based-on-props) in the styled-components documentation.

Render the list of todos which has been sent down from the _App_ component to the _TodoList_, which in turn renders each individual _Todo_.

## Part 2: Component state and event handling

In this part, the list of todos will be managed as component state (in _App_). In order to manage this we need to up our skills in TS a little. These two links will help you on your way:

Documentation (Very good): [Typescript](https://www.typescriptlang.org/)

Documentation for React Typescript (Also very good): [ReactTypescript](https://react-typescript-cheatsheet.netlify.app/)

### Creating a todo

In order to create a todo with a user-entered title, the following must be implemented:

- Add a _handleOnSubmit_ event handler that is bound to the _onSubmit_ form event in _TodoForm_.

  > To prevent default form submission, call _event.preventDefault()_; Every "event-handler" in react automatically gets access to an _event_-object that contains information about the event. But in order to make this work with TS (so the event-handler actually recognize the event-object) you need to properly type it according to the TS rules. Try logging this event to the console to see what it contains.

  Verify that the event handler is called upon submitting the form (pressing Enter) by logging something, "Submitting" maybe.

- Add a _handleOnChange_ event handler that is bound to the _onChange_ event on the input field in _TodoForm_. This method must interact with a state variable in order for the component to control its own state. Again, don't forget to type it according to the rules of TS.

- Therefor also create a _useState_ variable, "todoTitle", that will contain the value of the input field. The set method of this state variable is the one that the _handleOnChange_ method needs to interact with. _useState_ is a generic function in TS. Check the [ReactTypescript: useState](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/hooks#usestate) docs for more info, but here is a sneak peak:

```typescript
const [value, setValue] = useState<number>(0);
```

- In order to support rerendering the application when a new todo is added, the list of todos must be managed as component state in _App_.

  Ensure that todos are now handled by the _useState_ hook (passing the _initialTodos_ list as initial state).

  > Note: You'll now render the list of todos managed by _useState_ instead of the previous _initialTodos_!

- Create a callback function _createTodo_ in the _App_ component:

  ```typescript
  const createTodo = (title: string) => {
    // update the state (the list of todos) by adding a new todo object - with the passed title - first in the list:
    const newTodo: Todo = {
      id: Date.now(),
      completed: false,
      title,
    };

    // Important! You must update the state (the list of todos) as a completely NEW list of todos, containing the new todo object as the first element followed by all the elements of the current todos list.
  };
  ```

  > See [this link](https://www.samanthaming.com/tidbits/14-combine-multiple-arrays-using-spread/) for how to create/combine arrays using the spread operator.

  Pass the _createTodo_ callback function as a prop to _TodoForm_.

  ```typescript
  interface Props {
    createTodo: (title: string) => void;
  }
  ```

  Invoke the callback function upon form submission; verify that a new todo is added (first) to the list.

### Deleting a todo

- Create a callback function _deleteTodo_ in the _App_ component.

  This function should receive a todo id, remove the corresponding todo object and update the list of todos.

  > Hint: Use [array.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) to remove a todo and get a new list as a result.

- Pass this function as a prop to the _Todo_ component via the _TodoList_ component.

- Bind an event handler function to the _onClick_ event on the _Button_ styled component; the event handler should
  invoke the _deleteTodo_ callback with the todo's id. Don't forget to type the function.

### Update a todo

- Create a callback function _updateTodo_ in the _App_ component.

  This function should receive a todo id, locate the corresponding todo object and flip the _completed_ flag of that todo.

  > Hint: Use [array.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) to iterate over the todos, update the target todo object and get a new list as a result.

- Pass this function as a prop to the _Todo_ component via the _TodoList_ component.

- Bind an event handler function to the _onClick_ event (with the correct typing) on the _Checkbox_ styled component; the event handler should invoke the _updateTodo_ callback with the todo's id.

### Optional: Set document title

As the user interacts with the list of todos, the number of uncompleted todos should be displayed in the document title.

It's best practice to perform this type of calculation - a typical _side effect_ - in a _useEffect_ callback, meaning the code will run **after** the component has rendered . See the first code snippet [explaining effects in the React docs](https://reactjs.org/docs/hooks-overview.html#effect-hook) for how the hook _useEffect_ may be utilized.

Add a call to _useEffect_ to the _App_ component that updates _document.title_ with the number of uncompleted todos.

> Hint: Try to use [array.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) to calculate the uncompleted count!

## Part 3: Data fetching

Instead of embedding static (mock) todos as part of the application bundle, the _App_ component should fetch todos from a remote API.

- To differentiate between whether todos have been fetched or not, change the _useState_ hook call for the todos to:

  ```typescript
  const [todos, setTodos] = useState<Todo[]>([]);
  ```

  **Question**: Is this better than having `null` as the initial value? Why?

- Do the **Optional exercise** of **Part 2**.

- Update the _useEffect_ for setting the document title - if no todos are yet available, display `Todos (N/A)`.

- If the todos have not yet been fetched, _only_ display `Loading todos...` as the render output.

- Finally, add the following code to a _useEffect_ callback:

```typescript
const fetchTodos = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos: Todo[] = await response.json();

  setTodos(todos);
};

fetchTodos();
```

> Question: Do you know how to extract a todo without the userId?
> It can be done by using the [rest syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#rest_property) (using the spread operator)

**Important**: Ensure that the todos are only fetched once!

> With React 18 the `useEffect` with empty dependencies get's ran twice in development. See this [StackOverflow answer](https://stackoverflow.com/a/72238236) for a good explanation to why this is good.

### Optional: Fetching status

Fetching data typically involves a number of stages:

- `idle`

  Data fetching has not yet begun.

- `loading`

  Data fetching has begun.

- `success`

  Data was fetched successfully.

- `failure`

  An error occurred while fetching data.

  **Hint**: To simulate a fetching error, change the API URL to something invalid.

A better way to differentiate whether or not data has been fetched, as well as to handle any errors, is to introduce state in the component which tracks these data fetching stages.

- Add a state variable (suitably called _status_) with _useState_ that is parameterized by the new type. Let the initial state be a status of `idle`.

- Add error handling to the data fetching code as follows:

  ```javascript
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos: Todo[] = await response.json();

    setTodos(todos);
  } catch (error) {}
  ```

  In the code above, update the status where appropriate to reflect the various data fetching stages.

- If the status is `idle`, return null as the render output.

- If the status is `loading`, return `Loading todos...` as the render output.

- If the status is `failure`, return `An error occurred while loading todos!` as the render output.

- If the status is `success`, return the list of todos.

- Add a "Refetch" button to allow the user to refetch / refresh the list of todos.

  **Hints**

Depending on how you construct your fetch and useEffects, this text below might be of value to you.

- In order for data to be refetched, the _useEffect_ must add the status state variable as a dependency.

  Inside the _useEffect_ callback, first check if the status is `idle`; if it's not, return immediately.

- Set the status to the appropriate value when clicking the "Refetch" button.
