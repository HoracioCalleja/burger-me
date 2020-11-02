const updateObject = (state, updatedObjectAtributes) => {
  return {
    ...state,
    ...updatedObjectAtributes,
  };
};

export default updateObject;
