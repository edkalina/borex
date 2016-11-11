# \*In Reducers

Многие reducer'ы, и связанные с ними функции, имеют \*In версию.

Такая функция дополнительно первым аргументом получает "путь" в объекте, по которому выполнится reducer. Это строка вида `key.anotherOne.oneMore`.

Данные reducer'ы будут работать только с plain javascript objects.

```js

const someAction = actionCreator(
  withReducerIn('data.list', append(item => item.id));
);

const reducer = createReducerIn('data', (on) => {
  on(someAction, appendIn('list', item => item.id));
  on(anotherAction, update());
});

```

Список функций, которые имеют \*In версию:

* withReducer
* createReducer
* set
* update
* append
* prepend
* filter
* reject
