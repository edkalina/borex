import actionCreator from 'borex-actions/actionCreator';
import setPayload from 'borex-actions/setPayload';

import withReducerIn from 'borex-reducers/withReducerIn';
import update from 'borex-reducers/update';
import reject from 'borex-reducers/reject';
import prepend from 'borex-reducers/prepend';


function forTodo(reducer) {
  return (todos, action) => {
    const payload = action.payload;
    const targetId = payload.id || payload;

    return todos.map(todo => (todo.id !== targetId ? todo : reducer(todo, action)));
  };
}

export const addTodo = actionCreator(
  withReducerIn('todos', prepend((text, todos) => ({
    id: (todos.length === 0) ? 0 : todos[0].id + 1,
    marked: false,
    text,
  }))),
);

export const deleteTodo = actionCreator(
  withReducerIn('todos', reject((todo, targetId) => todo.id === targetId)),
);

export const editTodo = actionCreator(
  setPayload((id, text) => ({ id, text })),
  withReducerIn('todos', forTodo(update())),
);

export const markTodo = actionCreator(
  withReducerIn('todos', forTodo(update((_, todo) => ({ marked: !todo.marked })))),
);

export const markAll = actionCreator(
  withReducerIn('todos', todos => {
    const areAllMarked = todos.every(todo => todo.marked);

    return todos.map(todo => ({
      ...todo,
      marked: !areAllMarked,
    }));
  }),
);

export const clearMarked = actionCreator(
  withReducerIn('todos', reject(todo => todo.marked)),
);
