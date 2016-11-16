module.exports = function AutotypePlugin({ types: t }) {
  function hasType(callArguments) {
    if (callArguments.length === 0) {
      return false;
    }

    const firstArg = callArguments[0];

    if (t.isStringLiteral(firstArg)) {
      return true;
    }

    if (t.isCallExpression(firstArg) && t.isIdentifier(firstArg.callee, { name: 'Symbol' })) {
      return true;
    }

    return false;
  }

  const gettersByType = {
    VariableDeclarator(path) {
      const { id } = path.parent;

      if (t.isIdentifier(id)) {
        return id.name;
      }

      return null;
    },
    ObjectProperty(path) {
      const { key, computed } = path.parent;

      if (t.isStringLiteral(key)) {
        return key.value;
      }

      if (t.isIdentifier(key)) {
        return computed ? null : key.name;
      }

      return null;
    },
    ClassProperty(path) {
      const { key } = path.parent;

      if (t.isIdentifier(key)) {
        return key.name;
      }

      return null;
    },
    AssignmentExpression(path) {
      const { left, operator } = path.parent;

      if (operator !== '=') {
        return null;
      }

      if (t.isIdentifier(left)) {
        return left.name;
      }

      if (t.isMemberExpression(left)) {
        if (t.isIdentifier(left.property)) {
          return left.computed ? null : left.property.name;
        }

        if (t.isStringLiteral(left.property)) {
          return left.property.value;
        }
      }

      return null;
    },
    ExportDefaultDeclaration() {
      return '';
    },
    AssignmentPattern(path) {
      const { left } = path.parent;

      if (t.isIdentifier(left)) {
        return left.name;
      }

      return null;
    },
  };

  return {
    visitor: {
      CallExpression(path, state) {
        if (!t.isIdentifier(path.node.callee, { name: 'actionCreator' })) {
          return;
        }

        if (hasType(path.node.arguments)) {
          return;
        }

        const getAssignmentName = gettersByType[path.parent.type];

        if (!getAssignmentName) {
          return;
        }

        const name = getAssignmentName(path);

        if (name !== null) {
          const { basename } = state.file.opts;
          const actionType = name.length > 0 ? `${basename}/${name}` : basename;

          path.node.arguments.unshift(t.stringLiteral(actionType));
        }
      },
    },
  };
};
