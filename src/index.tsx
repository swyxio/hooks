import * as React from 'react';

// import styles from './styles.css'

export type Props = { text: string };

export function useLoading() {
  const [isLoading, setState] = React.useState(false);
  const load = (aPromise: Promise<any>) => {
    setState(true);
    return aPromise
      .then((...args) => {
        setState(false);
        return Promise.resolve(...args);
      })
      .catch((...args) => {
        setState(false);
        return Promise.reject(...args);
      });
  };
  return [isLoading, load];
}
