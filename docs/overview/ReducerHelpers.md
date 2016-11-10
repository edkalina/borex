# Reducer Helpers

## set/setIn

Возвращает значение `action.payload`. В качестве первого аргумента принимает getter, возвращающий значение, которое нужно использовать вместо `action.payload`.

```js
import createReducer from 'borex-reducers/createReducer';
import set from 'borex-reducers/set';
import { someAction } from './actions';

export default createReducer((on) => {
  // both do the same
  on(someAction, set());
  on(someAction, (state, action) => action.payload);

  // all do the same
  on(someAction, set(payload => payload.a + payload.b));
  on(someAction, set(({ a, b }) => a + b));
  on(someAction, (state, action) => action.payload.a + action.payload.b);
});

```

## update/updateIn

Обновляет объект `state` ключами из `action.payload`. В качестве первого аргумента принимает getter, возвращающий значение, которое нужно использовать вместо `action.payload`.

```js
import createReducer from 'borex-reducers/createReducer';
import update from 'borex-reducers/update';
import { someAction } from './actions';

export default createReducer((on) => {
  // both do the same
  on(someAction, update());
  on(someAction, (state, action) => { ...state, ...action.payload });

  // all do the same
  on(someAction, update(payload => payload.data));
  on(someAction, update(({ data }) => data));
  on(someAction, (state, action) => { ...state, ...action.payload.data});
});

```

## append/appendIn

Добавляет `action.payload` в конец массива `state`. В качестве первого аргумента принимает getter, возвращающий значение, которое нужно использовать вместо `action.payload`.

```js
import createReducer from 'borex-reducers/createReducer';
import append from 'borex-reducers/append';
import { someAction } from './actions';

export default createReducer((on) => {
  // both do the same
  on(someAction, append());
  on(someAction, (state, action) => [...state, action.payload]);

  // all do the same
  on(someAction, append(payload => payload.data));
  on(someAction, append(({ data }) => data));
  on(someAction, (state, action) => [...state, action.payload.data]);
});

```

## prepend/prependIn

Добавляет `action.payload` в начало массива `state`. В качестве первого аргумента принимает getter, возвращающий значение, которое нужно использовать вместо `action.payload`.

```js
import createReducer from 'borex-reducers/createReducer';
import prepend from 'borex-reducers/prepend';
import { someAction } from './actions';

export default createReducer((on) => {
  // both do the same
  on(someAction, prepend());
  on(someAction, (state, action) => [action.payload, ...state]);

  // all do the same
  on(someAction, prepend(payload => payload.data));
  on(someAction, prepend(({ data }) => data));
  on(someAction, (state, action) => [action.payload.data, ...state]);
});

```

## filter/filterIn

Фильтрует текущий `state` с помощью `predicate` функции.

```js
import createReducer from 'borex-reducers/createReducer';
import filter from 'borex-reducers/filter';
import { someAction } from './actions';

export default createReducer((on) => {
  // both do the same
  on(someAction, filter((item, someValue) => item.flag === someValue));
  on(someAction, (state, action) => state.filter((item) => item.flag === action.payload));
});

```

## reject/rejectIn

Фильтрует текущий `state` с помощью `predicate` функции.

```js
import createReducer from 'borex-reducers/createReducer';
import reject from 'borex-reducers/reject';
import { someAction } from './actions';

export default createReducer((on) => {
  // both do the same
  on(someAction, reject((item, id) => item.id === id));
  on(someAction, (state, action) => state.filter((item) => item.id !== action.payload));
});

```

## Область применения

Все helper'ы возвращают стандартный reducer, поэтому его можно использовать в любом месте, где требуется обычный reducer:

```js
// in actionCreator/withReducer
const someAction = actionCreator(
  withReducerIn('data', reject((item, id) => item.id === id));
);

// in createReducer/on
export default createReducer((on) => {
  on(someAction, reject((item, id) => item.id === id));
});

// And even with createReducer from redux recipes

// was
export const todos = createReducer([], {
  [ActionTypes.ADD_TODO](state, action) {
    let text = action.payload.text.trim()
    return [ ...state, text ]
  }
})

// becomes
export const todos = createReducer([], {
  [ActionTypes.ADD_TODO]: append(payload => payload.text.trim())
})

```

## \*In helper'ы

Каждый helper имеет \*In версию, которая выполняет действия по указаному пути в объекте.

> См. [*In Reducers](./InReducers.md)
