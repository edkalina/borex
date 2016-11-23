function updateInPath(path, atom, updater, index = 0) {
  if (index >= path.length) {
    return updater(atom);
  }

  const prop = path[index];
  const value = atom && atom[prop];
  const newValue = updateInPath(path, value, updater, index + 1);

  return newValue === value ? atom : { ...atom, [prop]: newValue };
}

export default function scopeReducer(pathStr, reducer) {
  const path = pathStr.split('.');
  const wrapper = (state, action) => updateInPath(path, state, atom => reducer(atom, action));

  if (process.env.NODE_ENV !== 'production') {
    wrapper.displayName = reducer.name ? `${reducer.name}In` : 'anonymousInReducer';
  }

  return wrapper;
}
