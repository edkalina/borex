import isFunction from 'lodash/isFunction';

let actionIndex = 0;

function generateType() {
  // eslint-disable-next-line no-plusplus
  return `ACTION#${actionIndex++}`;
}

export default function actionCreator(...declareArgs) {
  const firstArgIsType = typeof declareArgs[0] === 'string' || typeof declareArgs[0] === 'symbol';
  const enhancers = firstArgIsType ? declareArgs.slice(1) : declareArgs;

  const actionTemplate = {
    type: firstArgIsType ? declareArgs[0] : generateType(),
    payload: null,
    error: false,
    meta: {},
  };

  const actionEnhancers = enhancers && enhancers.reduce((memo, enhancer) => {
    const result = enhancer(actionTemplate);

    if (isFunction(result)) {
      memo.push(result);
    }

    return memo;
  }, []);

  function actionCreatorFn(...creatorArgs) {
    const action = {
      ...actionTemplate,
      payload: creatorArgs[0],
      meta: {
        ...actionTemplate.meta,
        creatorArgs,
      },
    };

    if (action.payload instanceof Error) {
      action.error = true;
    }

    if (actionEnhancers && actionEnhancers.length > 0) {
      actionEnhancers.forEach(enhancer => enhancer(action, ...creatorArgs));
    }

    return action;
  }

  actionCreatorFn.toString = () => actionTemplate.type;
  actionCreatorFn.displayName = actionTemplate.type;
  actionCreatorFn.type = actionTemplate.type;

  return actionCreatorFn;
}
