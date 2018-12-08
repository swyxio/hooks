import * as React from 'react';

export function useLoading() {
  const [isLoading, setState] = React.useState(false);
  const load = (aPromise: Promise<any>) => {
    setState(true);
    return aPromise.finally(() => {
      setState(false);
    });
  };
  return [isLoading, load];
}
