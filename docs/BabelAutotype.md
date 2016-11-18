# Auto-generated actionCreator type

`borex` предлагает плаин для babel, который автоматически подставит action-creator type первым аргументом. `type` будет сгенерирован на основе имени файла и имени переменной/свойства, в контексте которой вызывается `actionCreator`:

```js
// examples.js
import actionCreator from 'borex-actions/actionCreator';


const creator0 = actionCreator('is already named');
const creator1 = actionCreator();

export const creator2 = actionCreator();

const actions = {
  creator3: actionCreator(),
};

class Actions {
  creator4 = actionCreator()
}

export default actionCreator();

```

превращается в:

```js
// examples.js
import actionCreator from 'borex-actions/actionCreator';


const creator0 = actionCreator('this has been already named');
const creator1 = actionCreator('examples/creator1');

export const creator2 = actionCreator('examples/creator2');

const actions = {
  creator3: actionCreator('examples/creator3'),
};

class Actions {
  creator4 = actionCreator('examples/creator4')
}

export default actionCreator('examples');

```

Если вызов `actionCreator`'а уже содержить тип первым аргументом, то такой вызов будет пропущен (`creator0` в примере выше).

Также нужно учесть, что `actionCreator` должен быть импортирован под именем `'actionCreator'`, иначе плагин не определит вызов функции.

Более подробно поддерживаемый синтаксис можно посмотреть в [тестах](https://github.com/kastigar/borex/tree/master/packages/babel-plugin-borex-autotype/src/__tests__/fixtures).

## Dev and production

В большинстве случаев, осмысленные название типов не нужны, и их можно опустить. Но такие action'ы становится трудно дебажить. Поэтому в dev окружении можно подключить данный плагин, который даст более осмысленные названия типам action'ов. В production окружении, такой плагин вряд ли пригодится.
