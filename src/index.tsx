import * as React from 'react';
import produce from 'immer';

export type Props = { text: string };

export function useProduceState<S>(
  initState: S | (() => S),
  observer: ((newState: S) => void) = noop
): [S, React.Dispatch<React.SetStateAction<S>>] {
  const [state, setState] = React.useState(initState);
  const cb = (mutatorOrValue: any, next?: Function) => {
    if (isFunction(mutatorOrValue)) {
      // is a function, put it through immer
      setState((s: any) => produce(s, d => void mutatorOrValue(d)));
      observer(state);
    } else {
      // is a value
      setState(mutatorOrValue);
      observer(mutatorOrValue);
    }
    if (next) next(); // post setState callback
  };
  // return [state, useCallback(cb, [setState])];
  // return [state, cb] as [any, (mutatorOrValue: any, next?: Function) => {}];
  return [state, cb];
}

// https://stackoverflow.com/questions/5999998/how-can-i-check-if-a-javascript-variable-is-function-type
function isFunction(functionToCheck?: Function) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
  );
}

export function useInput(initialValue = '', stateObserver: any = noop) {
  const [value, setValue] = React.useState(initialValue);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    stateObserver(e.target.value);
  };
  return { value, onChange, setValue };
}

export function useLoading() {
  const [isLoading, setState] = React.useState(false);
  const load = (aPromise: Promise<any>) => {
    setState(true);
    return aPromise.finally(() => {
      setState(false);
    });
  };
  return [isLoading, load] as [
    boolean,
    (aPromise: Promise<any>) => Promise<any>
  ];
}

export function useKeydown(key: string, handler: Function) {
  React.useEffect(
    () => {
      const cb = (e: KeyboardEvent) => e.key === key && handler(e);
      document.body.addEventListener('keydown', cb);
      return () => {
        document.body.removeEventListener('keydown', cb);
      };
    },
    [key, handler]
  );
}

export function useLocalStorage(key: string, optionalCallback: any = noop) {
  const [state, setState] = React.useState<any | null>(null);
  React.useEffect(() => {
    // chose to make this async
    const existingValue = localStorage.getItem(key);
    if (existingValue) {
      const parsedValue = JSON.parse(existingValue);
      setState(parsedValue);
      optionalCallback(parsedValue);
    }
  }, []);
  const removeItem = () => {
    setState(null);
    localStorage.removeItem(key);
    optionalCallback(null);
  };
  const setItem = (obj: any) => {
    setState(obj);
    localStorage.setItem(key, JSON.stringify(obj));
    optionalCallback(obj);
  };
  return [state, setItem, removeItem] as [
    (any | null),
    (obj: any) => void,
    () => void
  ];
}

// utils

function noop() {}

// export function useOptimisticState(initState) {
//   const [state, setState] = useState(initState);
//   const oldState = useRef(state);
//   function optimisticSetState(nextState) {
//     oldState.current = state;
//     setState(nextState);
//   }
//   async function tryAPI(somePromise) {
//     return async function(yay, nay) {
//       try {
//         yay(optimisticSetState);
//         return await somePromise;
//       } catch (err) {
//         nay(err);
//         setState(oldState.current);
//         return err;
//       }
//     };
//   }
//   return [state, tryAPI];
// }

// // usage
// const [state, tryAPI] = useOptimisticState({ count: 0})
// const success = setState => setState({ count : state.count + 1 })
// const failure = error => console.log('Error: ', error)
// const onClick = () => tryAPI(api.plusOne())(success, failure)

// export default function App() {
//   const [state, setState] = useProduceState({ foo: 1, bar: 2 });
//   return (
//     <div>
//       <h1>setoldstate</h1>
//       <div>{JSON.stringify(state)}</div>
//       <button onClick={() => setState(draft => void (draft.foo = 3))}>
//         test
//       </button>
//     </div>
//   );
// }
