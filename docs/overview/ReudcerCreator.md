# Reducer Creator

Для создания reduce функций `borex` предоставляет `createReducer`:

```js
import createReducer from 'borex-reducers/createReducer';
import { setFlag, resetCounter } from './actions';


export default createReducer((on) => {
  on(setFlag,
    (state, action) => ({ ...state, flag: action.payload }),
    (state) => ({ ...state, counter: state.counter + 1 }),
  );

  on(resetCounter, (state) => ({ ...state, counter: 0 }));
});
```

`createReducer` принимает один аргумент - функцию, которая связывает action'ы с reduce-функциями.

## `on`

`on` в качестве первого аргумента принимает action type. Ожидается, что это либо строка, либо `symbol`. Любой другой тип будет приведён к строке. Поэтому мы можем смело использовать в качестве первого аргумента **ActionCreator**, так как у него переопределён `.toString()` метод.

Также допускается массив action type'ов в качестве первого аргумента. В этом случае reducer'ы будут привязаны ко всем action type'ам, указанным в этом массиве.

Остальные аргументы - это неограниченое количество reduce функций.

```js
import createReducer from 'borex-reducers/createReducer';
import { setFlag, noopAction, resetCounter } from './actions';


export default createReducer((on) => {
  on(setFlag, (state, action) => ({ ...state, flag: action.payload }));

  on([setFlag, noopAction],
    (state) => ({ ...state, counter: state.counter + 1 }),
  );

  on(resetCounter, (state) => ({ ...state, counter: 0 }));
});
```

## createReducerIn

Существует специальная версия `createReducer`, которая первым аргументом принимает "путь" в state обьекте, по которому нужно запустить reducer.

```js
import createReducer from 'borex-reducers/createReducer';
import { increment, decrement } from './actions';


export default createReducerIn('counter', (on) => {
  on(increment, (counter) => counter + 1); // state.counter will be incremented
  on(decrement, (counter) => counter - 1); // state.counter will be decremented
});
```

## composeReducers

`composeReducers` создаёт новый reducer, который объеденяет reducer'ы, указанные в аргументах.

```js
import composeReducers from 'borex-reducers/utils/composeReducers';
import someReducer from './someReducer';
import anotherReducer from './anotherReducer';


const composedReducer = composeReducers(someReducer, anotherReducer);
```

## scopeReducer

Вспомогательная функция, которая принимает один reducer и возвращает новый, который будет запускать переданный reducer по указаному "пути" в state обьекте:

```js
import scopeReducer from 'borex-reducers/utils/scopeReducer';
import { increment } from './actions';

const counterReducer = createReducer(on => {
  on(increment, (state) => state + 1);
});

const newCounterValue = counterReducer(0, increment()); // newCounterValue is 1

const scopedCounterReducer = scopeReducer('counter', counterReducer);

const newState = scopedCounterReducer({ counter: 0 }, increment());

// newState value
{
  counter: 1
}
```

## Reducer Helpers

В [следующем](./ReducerHelpers.md) разделе описаны reducer helper'ы, которые предоставляет `borex`.
