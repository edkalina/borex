import actionCreator from 'borex-actions/actionCreator';
import setPayload from 'borex-actions/setPayload';


export const addTodo = actionCreator();
export const deleteTodo = actionCreator();

export const editTodo = actionCreator(
  setPayload((id, text) => ({ id, text })),
);

export const markTodo = actionCreator();
export const markAll = actionCreator();
export const clearMarked = actionCreator();
