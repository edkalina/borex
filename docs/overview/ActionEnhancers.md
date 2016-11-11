# Action Enhancers

**ActionEnhancer** - это функция, которая модифицирует объект action'а.

`actionCreator` принимает любое количество таких функций и последовательно выполняет их, тем самым конфигурируя объект `action`'а.

`borex`содержит несколько готовых **ActionEnhancer**'ов.

## setPayoad

`setPayload` устанавливает значение `payload` с помощью функции, которая получает аргументы вызова **ActionCreator**'а.

```js
import actionCreator from 'borex-actions/actionCreator';
import setPayload from 'borex-actions/setPayload';

const creator = actionCreator(
  setPayload((id, command) => ({ id, command }))
);
const action = creator(1, 'doIt');

// результат action
{
  type: 'ACTION#0',
  payload: {
    id: 1,
    command: 'doIt',
  },
  error: false,
  meta: {
    creatorArgs: [1, 'doIt']
  }
}
```

## setType

`setType` устанавливает значение `type` action'ов, которые будут созданы.

Оба способа, представленные ниже, на самом деле являются полностью идентичными:

```js
import actionCreator from 'borex-actions/actionCreator';
import setType from 'borex-actions/setType';

const load = actionCreator(
  setType('load')
);

const load = actionCreator('load');

```

## setMeta

`setMeta` устанавливает указанное поле в объекте `meta` с помощью функции, которая принимает аргументы вызова **ActionCreator**'а.

```js
import actionCreator from 'borex-actions/actionCreator';
import setMeta from 'borex-actions/setMeta';

const creator = actionCreator(
  setMeta('analytics', (id, source) => ({ type: 'someAction', id, source }))
);
const action = creator(1, 'dialog');

// результат action
{
  type: 'ACTION#0',
  payload: 1,
  error: false,
  meta: {
    creatorArgs: [1, 'dialog'],
    analytics: {
      type: 'someAction',
      id: 1,
      source: 'dialog',
    }
  }
}
```

## setMetaStatic

Похож на `setMeta`. Но устанавливает конкретное *значение* в указанном поле объекта `meta`.

```js
import actionCreator from 'borex-actions/actionCreator';
import setMetaStatic from 'borex-actions/setMetaStatic';

const creator = actionCreator(
  setMetaStatic('log', true)
);
const action = creator();

// результат action
{
  type: 'ACTION#0',
  payload: undefined,
  error: false,
  meta: {
    creatorArgs: [1, 'dialog'],
    log: true
  }
}
```

> Помимо прочего, `setMetaStatic` отрабатывает при запуске `actionCreator` и изменяет шаблон action'а, в то время как `setMeta` отрабатывает при создании action'а и меняет сам action.

> Подробнее о видах enhancer'ов смотри [Writing enhancers](/docs/writingEnhancers.md)

## setError

`setError` устанавливает поле `error` в `true`, независимо от того, какой будет `payload`.

```js
import actionCreator from 'borex-actions/actionCreator';
import setError from 'borex-actions/setError';

const fetchError = actionCreator('fetchError', setError);
const action = fetchError('Network error');

// результат action
{
  type: 'fetchError',
  payload: 'Network error',
  error: true,
  meta: {
    creatorArgs: ['Network error']
  }
}
```

> В отличие от других enhancer'ов `setError` не принимает никаких параметров и передаётся напрямую, без вызова функции

## withSideEffect

> Для работы данного enhancer'а необходимо подключить `sideEffectProcessor` middleware
> См. также [Side-effects](./SideEffects.md)

`withSideEffect` добавляет функцию в `meta.sideEffects`. В последствии эта функция будет вызвана после dispatch'а.

```js
import actionCreator from 'borex-actions/actionCreator';
import withSideEffect from 'borex-actions/withSideEffect';

const creator = actionCreator(
  withSideEffect((context, param) => {
    console.log(param);
  })
);
const action = creator('param');

store.dispatch(action); // Will log 'param' in console

// результат action
{
  type: 'ACTION#0',
  payload: 'param',
  error: false,
  meta: {
    creatorArgs: ['param'],
    sideEffects: [
      <Function>
    ]
  }
}

```

## withReducer/withReducerIn

> Данный enhancer находится в пакете `borex-reducers`

> Для работы данного enhancer'а необходимо использовать `createMetaReducer`

> См. также [Self-reducing actions](./SelfReducingActions.md)

`withReducer` добавляет reducer в `meta.reducer`, который впоследствии будет запущен с помощью `createMetaReducer`. Позволяет определять reduce функции прямо в объявлении `actionCreator` и избавляет от надобности писать отдельно reduce функции.

```js
import actionCreator from 'borex-actions/actionCreator';
import withReducer from 'borex-reducers/withReducer';
import createMetaReducer from 'borex-reducers/createMetaReducer';

const store = createStore(createMetaReducer(), 0);
const increment = actionCreator(
  withReducer((state) => state + 1)
);
const action = increment();

store.dispatch(action); // will increment state value of store

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

`withReducerIn` это версия `withReducer`, которая принимает первым параметром "путь" в state обьекте, по которому нужно запустить reducer.

```js
import actionCreator from 'borex-actions/actionCreator';
import withReducerIn from 'borex-reducers/withReducerIn';
import createMetaReducer from 'borex-reducers/createMetaReducer';

const initialState = { counter: { value: 0 } };
const store = createStore(createMetaReducer(), initialState);

const increment = actionCreator(
  withReducerIn('counter.value', (state) => state + 1)
);
const action = increment();

store.dispatch(action); // will increment `counter.value` of store's state

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

> Подробнее в [*In Reducers](./InReducers.md)

## Создание enhancer'ов

См. раздел [Writing enhancers](/docs/WritingEnhancers.md).
