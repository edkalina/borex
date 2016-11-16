const actionCreator = function actionCreator() {};
const enhancer = function enhancer() {};

const creator1 = actionCreator('named', enhancer);
const creator2 = actionCreator(Symbol('named'), enhancer);
const creator3 = actionCreator(enhancer(), enhancer);
