function updateInPath(path, atom, updater, index = 0) {
  if (index >= path.length) {
    return updater(atom);
  }

  const prop = path[index];
  const value = atom && atom[prop];
  const newValue = updateInPath(path, value, updater, index + 1);

  return newValue === value ? atom : { ...atom, [prop]: newValue };
}

export default function inReducerWrapper(pathStr, reducer) {
  const path = pathStr.split('.');

  return (state, action) => updateInPath(path, state, atom => reducer(atom, action));
}
