import * as React from 'react';

// import styles from './styles.css'

export type Props = { text: string };

export function useLoading() {
  const [isLoading, setState] = React.useState(false);
  const load = (aPromise: Promise<any>) => {
    setState(true);
    return aPromise
      .then((...args: any[]) => {
        setState(false);
        // return Promise.resolve(...args);
        return args;
      })
      .catch((...args: any[]) => {
        setState(false);
        // return Promise.reject(...args);
        return args;
      });
  };
  return [isLoading, load];
}
