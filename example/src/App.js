import React from 'react';

import { useLoading } from 'hooks';

function TestUseLoading() {
  const [isLoading, load] = useLoading();
  const [state, setState] = React.useState();
  const handler = () => {
    load(fakeAPIcall()).then(() => setState(Math.floor(Math.random(100))));
  };

  return (
    <div>
      <button onClick={handler}>Click me</button>
      <hr />
      <div>api result: {isLoading ? 'loading...' : state}</div>
    </div>
  );
}

function fakeAPIcall(time = 500) {
  return new Promise(resolve => setTimeout(resolve, time));
}

export default function App() {
  return (
    <div>
      <TestUseLoading />
    </div>
  );
}
