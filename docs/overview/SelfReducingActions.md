# Self-reducing Actions

`borex` позволяет создавать self-reducing actions. Основная идея такого подхода - это писать reduce функцию непосредственно в action creator'е. Таким образом можно вообще не писать reducer'ы в отдельных модулях или функциях.

## withReducer

Для того, чтобы привязать reduce функцию к action'у, можно воспользоваться `withReducer` enhancer'ом:

```js
import actionCreator from 'borex-actions/actionCreator';
import withReducer from 'borex-reducers/withReducer';

const setFlag = actionCreator(
  withReducer((state, action) => ({ ...state, flag: action.payload })),
  withReducer((state) => ({ ...state, counter: state.counter + 1 })),
);

// результат action
{
  type: 'ACTION#0',
  payload: undefined,
  error: false,
  meta: {
    creatorArgs: [],
    reducer: <Function>
  }
}

```

Объявленный reducer появится в `meta.reducer` и будет выполнен при помощи `createMetaReducer`.

Можно обьявить любое количество reducer'ов. В итоге они будут объеденены в одну функцию.

## withReducerIn

Также существует специальная версия `withReducer`, которая первым аргументом принимает "путь" в state обьекте, по которому нужно запустить reducer:

```js
import actionCreator from 'borex-actions/actionCreator';
import withReducer from 'borex-reducers/withReducer';

const setFlag = actionCreator(
  withReducerIn('flag', (flag, action) => action.payload),
  withReducerIn('counter', (counter) => counter + 1),
);

```

Эта версия action creator'а выглядит проще и понятней. Но такой вариант работает только с plain javascript объектами.

## createMetaReducer

Для того, чтобы `meta.reducer` выполнился, нужно использовать `createMetaReducer`. Он проверит, есть ли у action'а reducer, и при наличии выполнит его.

```js
import { createStore } from 'redux';
import createMetaReducer from 'borex-reducers/createMetaReducer';

const store = createStore(createMetaReducer(), {
  flag: false,
  counter: 0,
});

```

`createMetaReducer` создаёт специальный reducer, который передаётся redux store'у.

Если есть необходимость использовать классический reducer совместно с meta-reducer'ами, его можно передать в качестве первого аргумента:

```js
import { createStore } from 'redux';
import createMetaReducer from 'borex-reducers/createMetaReducer';
import rootReducer from './reducers/index';

const store = createStore(createMetaReducer(rootReducer), {
  flag: false,
  counter: 0,
});

```

Теперь оба reducer'а `rootReducer` и `meta.reducer` будут выполнены.
