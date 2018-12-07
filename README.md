# hooks

> swyx's personal hooks library

[![NPM](https://img.shields.io/npm/v/hooks.svg)](https://www.npmjs.com/package/hooks) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @swyx/hooks
```

## Usage

```tsx
import * as React from 'react';

import { useLoading } from '@swyx/hooks';

function App() {
  const [isLoading, load] = useLoading();
  const [state, setState] = React.useState('you shouldnt see this');
  React.useEffect(() => {
    pingAPI(2000).then(setState('hello there'));
  });
  return isLoading ? <div>Loading</div> : <div>{state}</div>;
}

function pingAPI(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}
```

## Video Docs:

- useLoading: https://www.youtube.com/watch?v=gAr2Qqoa00c

## Acknowledgements

bootstrapped with Travis Fischer's wonderful https://www.npmjs.com/package/create-react-library

## License

MIT © [sw-yx](https://github.com/sw-yx)
