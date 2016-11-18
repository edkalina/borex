# Side-effects

`borex` предоставляет простую реализацию side-effect'ов. Её можно использовать как альтернативу `redux-thunk`.

## sideEffectProcessor middleware

Side-effect'ы запускаются при момощи `sideEffectProcessor` middleware. Его нужно подключить:

```js
import { createStore, applyMiddleware } from 'redux';
import sideEffectProcessor from 'borex-actions/sideEffectProcessor';
import rootReducer from './reducers/index';

const store = createStore(
  rootReducer,
  applyMiddleware(
    sideEffectProcessor({ context: { api, history } })
  )
);
```

Первый аргумент вызова `sideEffectProcessor` - это опции. Пока поддерживается единственная опция `context`. Это обьект, который передаётся в качестве первого аргумента в функцию side-effect'а. Также `context` будет дополнен `dispatch` и `getState` функциями из `store`.

Теперь `sideEffectProcessor` будет отлавливать все action'ы, у которых есть `meta.sideEffects` массив, и запускать функции из этого массива.

## withSideEffect enhancer

Для удобного добавления side-effect'ов в `borex-actions` есть `withSideEffect` action enhancer:

```js
import actionCreator from 'borex-actions/actionCreator';
import withSideEffect from 'borex-actions/withSideEffect';

const creator = actionCreator(
  withSideEffect((context, param1, param2) => {
    // these objects are available here
    const { api, history, dispatch, getState } = context;

    console.log(param1, param2);
  }),
  withSideEffect((context, param) => {
    console.log('I use only first param', param);
  })
);

const action = creator('param1', 'param2');

```

Функция side-effect'а первым аргументом получает `context`, о котором говорилось выше. Остальные аргументы, это те аргументы, которые были переданы в **ActionCreator**.

Можно объявить любое количество side-effect'ов. Все они будут запущены с одинаковыми параметрами, и в том порядке, в которм объявлены.

## sideEffectsOnly флаг

`sideEffectProcessor` также реагирует на `meta.sideEffectsOnly` флаг. Если он установлен в `true`, то цепочка вызова middleware'ов будет прервана, а значит такой action не попадёт в reducer.
