# hooks

> swyx's personal hooks library

[![NPM](https://img.shields.io/npm/v/hooks.svg)](https://www.npmjs.com/package/hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @swyx/hooks
```

## Usage

```tsx
// useProduceState demo
const [state, setState] = useProduceState({
  todos: [],
  showMenu: false
});
const closeModal = e => {
  setState(draft => (draft.showMenu = false));
};

// useLocalStorage
const [item, setItem, removeItem] = useLocalStorage(
  'yourspecialkeyhere',
  callbackOnItemChange
);

// useInput demo
export default function InputArea({ onSubmit, defaultValue }) {
  const { setValue, ...inputProps } = useInput(defaultValue);
  const handleNewTodoKeyDown = event => {
    if (event.keyCode !== 13) return;
    event.preventDefault();
    var val = event.target.value.trim();
    if (val) {
      onSubmit(val);
      setValue('');
    }
  };
  return (
    <input onKeyDown={handleNewTodoKeyDown} {...inputProps} autoFocus={true} />
  );
}

// useLoading demo
function App() {
  const [isLoading, load] = useLoading();
  const [state, setState] = React.useState('you shouldnt see this');
  React.useEffect(() => {
    load(pingAPI(2000)).then(() => setState('hello there'));
  });
  return isLoading ? <div>Loading</div> : <div>{state}</div>;
}

function pingAPI(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

// useKeyDown demo
export default function Menu(props) {
  useKeydown('Escape', () => props.showMenu && props.handleModalClose());
  // ...
}
```

## Video Docs:

- useLoading: https://www.youtube.com/watch?v=gAr2Qqoa00c
- useKeyDown: https://twitter.com/swyx/status/1058927958205681664

## Acknowledgements

bootstrapped with Travis Fischer's wonderful https://www.npmjs.com/package/create-react-library

## License

MIT © [sw-yx](https://github.com/sw-yx)
