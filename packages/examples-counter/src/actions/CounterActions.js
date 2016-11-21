import actionCreator from 'borex-actions/actionCreator';
import commandCreator from 'borex-actions/commandCreator';


export const increment = actionCreator();
export const decrement = actionCreator();

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
