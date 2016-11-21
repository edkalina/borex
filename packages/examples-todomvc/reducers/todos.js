import createReducer from 'borex-reducers/createReducer';
import update from 'borex-reducers/update';
import reject from 'borex-reducers/reject';
import prepend from 'borex-reducers/prepend';

import {
  addTodo, deleteTodo, editTodo, markTodo, markAll, clearMarked,
} from '../actions/TodoActions';

function forTodo(reducer) {
  return (todos, action) => {
    const payload = action.payload;
    const targetId = payload.id || payload;

    return todos.map(todo => (todo.id !== targetId ? todo : reducer(todo, action)));
  };
}

export default createReducer(on => {
  on(addTodo, prepend((text, todos) => ({
    id: (todos.length === 0) ? 0 : todos[0].id + 1,
    marked: false,
    text,
  })));

  on(deleteTodo, reject((todo, targetId) => todo.id === targetId));

  on(editTodo, forTodo(update()));

  on(markTodo, forTodo(update((_, todo) => ({ marked: !todo.marked }))));

  on(markAll, todos => {
    const areAllMarked = todos.every(todo => todo.marked);

    return todos.map(todo => ({
      ...todo,
      marked: !areAllMarked,
    }));
  });

  on(clearMarked, reject(todo => todo.marked));
});
