# Action Creator

Чтобы избежать путаницы сразу определим:

* `actionCreator` - фабрика для создания action creator'ов
* **ActionCreator** - сам action creator, созданный нашей фабрикой

Давайте посмотрим как объявляется простой **ActionCreator**:

```js
import actionCreator from `borex-actions/actionCreator`;

const creator = actionCreator();
```

Теперь посмотрим на `action`, который сгенерирует наш **ActionCreator**:

```js
const action = creator();

// результат action
{
  type: 'ACTION#0',
  payload: undefined,
  error: false,
  meta: {
    creatorArgs: [],
  }
}
```

`action` придерживается [FSA](https://github.com/acdlite/flux-standard-action) стандарта. Можно видеть, что `type` уже определён, `payload` - `undefined`, `error` установлен в `false`, а в `meta` лежит массив `creatorArgs`, аргументы, с которыми был вызван **ActionCreator**. Теперь посмотрим, как можно управлять всем этим.

## Payload

По-умолчанию, `payload` - это первый аргумент вызова функции нашего **ActionCreator**'а:

```js
const action = creator('payload');

// результат action
{
  type: 'ACTION#0',
  payload: 'payload',
  error: false,
  meta: {
    creatorArgs: ['payload']
  }
}
```

Остальные аргументы не повлияют на `payload`, лишь будут видны в `creatorArgs`:

```js
const action = creator('payload', 'another');

// результат action
{
  type: 'ACTION#0',
  payload: 'payload',
  error: false,
  meta: {
    creatorArgs: ['payload', 'another']
  }
}
```

## Error

Если `payload` является объектом класса `Error`, то **ActionCreator** автоматически утановит `error` в `true`:

```js
const action = creator(new Error('error'));

// результат action
{
  type: 'ACTION#0',
  payload: <Error: error>,
  error: true,
  meta: {
    creatorArgs: [<Error: error>]
  }
}
```

## Type

По-умолчанию, каждый **ActionCreator** получает уникальный `type`, который генерирует `actionCreator`.

Есть возможность задать `type` вручную. `actionCreator` принимает опциональный первый параметр типа `string` или `symbol`:

```js
const creator = actionCreator('myAction');
const action = creator();

// результат action
{
  type: 'myAction',
  payload: undefined,
  error: false,
  meta: {
    creatorArgs: []
  }
}
```
```js
const creator = actionCreator(Symbol('myAction'));
const action = creator();

// результат action
{
  type: Symbol(myAction),
  payload: undefined,
  error: false,
  meta: {
    creatorArgs: []
  }
}
```

## Enhancers

Также есть возможность управлять генерацией `action`'ов с помощью enhancer функций. О них в [следующем разделе](./ActionEnhancers.md).

## commandCreator

С помощью `commandCreator` можно создавать action'ы, которые выполняют лишь side-effect'ы или так называемые async-actions.

```js
import commandCreator from 'borex-actions/commandCreator';

const creator = commandCreator((context, param) => {
  const { dispatch, getState } = context;

  dispatch(someAction(param));
});
const action = creator('param');

store.dispatch(action); // Will call function passed to `commandCreator`

// результат action
{
  type: 'ACTION#0',
  payload: 'param',
  error: false,
  meta: {
    creatorArgs: ['param'],
    sideEffects: [
      <Function>
    ],
    sideEffectsOnly: true
  }
}
```

Если посмотреть на полученный action, то можно понять, что `commandCreator` это всего лишь alias:

```js
function commandCreator(command) {
  return actionCreator(
    withSideEffect(command),
    setMetaStatic('sideEffectsOnly', true)
  );
}
```

> См. также [Side-effects](./SideEffects.md)
