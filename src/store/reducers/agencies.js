import { actions } from 'src/constants';

const initialState = {
  data: [],
  selectedId: null,
};

const actionMap = {
  [actions.AGENCIES_SET_SELECTED]: (state, action) => ({
    ...state,
    selectedId: action.agencyId,
  }),

  [actions.AGENCIES_GET_REQUEST]: (state) => ({
    ...state,
    isLoading: true,
  }),

  [actions.AGENCIES_GET_SUCCESS]: (
    state,
    {
      result: {
        data: { results },
      },
    },
  ) => ({
    ...state,
    data: [
      ...state.data,
      ...results.map((result) => ({
        id: result.id,
        name: result.name,
      })),
    ],
    isLoading: false,
  }),

  [actions.AGENCIES_GET_FAILURE]: (state) => ({
    ...state,
    isLoading: false,
  }),
};

export default (state = initialState, action) => {
  if (actionMap[action.type]) {
    return actionMap[action.type](state, action);
  }

  return state;
};
