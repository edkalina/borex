import actionCreator from 'borex-actions/actionCreator';
import commandCreator from 'borex-actions/commandCreator';
import withReducerIn from 'borex-reducers/withReducerIn';


export const increment = actionCreator(
  withReducerIn('counter', (state) => state + 1),
);

export const decrement = actionCreator(
  withReducerIn('counter', (state) => state - 1),
);

export const incrementIfOdd = commandCreator(
  (context) => {
    const { dispatch, getState } = context;
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment());
  }
);

export const incrementAsync = commandCreator(
  ({ dispatch }) => {
    setTimeout(() => {
      dispatch(increment());
    }, 1000);
  }
);
