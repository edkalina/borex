const actionCreator = function actionCreator() {};
const dynProp = 'dynProp';


const obj = { inner: {} };

obj.creatorAsProp = actionCreator();
obj[dynProp] = actionCreator();
obj['strProp'] = actionCreator();

obj.inner.creatorAsProp = actionCreator();
obj.inner[dynProp] = actionCreator();
obj.inner['strProp'] = actionCreator();
