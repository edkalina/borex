# Borex

Borex is helper library for [redux](http://redux.js.org/).

Learn it by [Documentation](http://gokalina.github.io/borex/) (sorry, it is still draft in russian).

Also check rewritten [counter example](https://github.com/gokalina/borex/commit/71df7a3a86300723dd7cbdd70cbb28d308bf574b?diff=split) and another [remake](https://github.com/gokalina/borex/commit/22dc3af6c1f887b478131ef00c6ab0abbd52e90d?diff=split) with self-reducing actions. The same for [TodoMVC example](https://github.com/gokalina/borex/commit/896d842435373b35706bf9ef80f393c98eec63b3?diff=split) ([remake](https://github.com/gokalina/borex/commit/8a941bce10e30761ef4adf1fe95c4a484b1b518a?diff=split) with self-reducing actions).

## Key features

* Write less code with [redux](http://redux.js.org/)
* FSA compliant actions
* Fat action creators (with action enhancers)
* Self-reducing actions
* Easy data manipulation in reducers (with reducer helpers)
* Simple side-effects
* Extendable: create your own enhancers and helpers
* Flexible: use it any way you like

## Action helper

```
npm install -S borex-actions
```

`borex-actions` provides utilities for action creating.

```js
import actionCreator from 'borex-actions/actionCreator';
import setPayload from 'borex-actions/setPayload';
import setMeta from 'borex-actions/setMeta';
import setType from 'borex-actions/setType';
import withReducerIn from 'borex-actions/withReducerIn';


export const increment = actionCreator();
export const decrement = actionCreator();

export const addItem = actionCreator(
  setPayload((id, text) => ({ id, text }))
);

export const fatAction = actionCreator(
  setType('Fat action'),
  setPayload((id, text) => ({ id, text })),
  setMeta('analytics', (id, text) => ({ event: 'fat-action', id, text })),
  withReducerIn('data.list', (state, action) => [...state, action.payload]),
);

```

## Reducer helpers

```
npm install -S borex-reducers
```

`borex-reducers` provides utilities for reducer declaration.

```js
import createReducer from 'borex-reducers/createReducer';
import createReducerIn from 'borex-reducers/createReducerIn';
import composeReducers from 'borex-reducers/composeReducers';
import appendIn from 'borex-reducers/appendIn';

import { increment, decrement, addItem } from './actions';

const counterReducer = createReducerIn('counter', on => {
  on(increment, counter => counter + 1);
  on(decrement, counter => counter - 1);
});

const dataReducer = createReducer(on => {
  on(addItem, appendIn('data.list', data => { ...data, createdAt: Date.now() }));
});

const rootReducer = composeReducers(dataReducer, counterReducer);
```

## Autotype babel plugin

```
npm install -D babel-plugin-borex-autotype
```

`.babelrc`

```
{
  "plugins": [
    "babel-plugin-borex-autotype"
  ]
}
```

This plugin inserts names for all anonymous `actionCreator` calls.

**Input**(counter.js):

```js
const increment = actionCreator();
```

**Output**:

```js
const increment = actionCreator('counter/increment');
```

Check [plugin documentation page](https://gokalina.github.io/borex/docs/BabelAutotype.html) for more details.


## Name and logo

The idea is

`borex` = **BO**ilerplate **RE**ducer for redu**X**

Also it looks like Boreas with super-duper modern -X suffix :) This fact explains logo (Boreas is Greek god of North Wind).
