const actionCreator = function actionCreator() {};

const creator1 = actionCreator();
let creator2 = actionCreator();
var creator3 = actionCreator();

const { creator4 = actionCreator() } = {};
let { creator5 = actionCreator() } = {};
var { creator6 = actionCreator() } = {};

let creator7;
creator7 = actionCreator();

var creator8;
creator8 = actionCreator();


function foo(creator9 = actionCreator()) {}
