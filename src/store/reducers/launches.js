import { actions } from 'src/constants';

const initialState = {
  data: [],
  view: {
    day: null,
    month: null,
    year: null,
    data: [],
  },
  isLoading: false,
};

const actionMap = {
  [actions.LAUNCHES_SET_VIEW_DATE]: (state, action) => {
    const { day, month, year } = action.date;

    const viewDate = [
      year,
      month.toString().padStart(2, '0'),
      day.toString().padStart(2, '0'),
    ].join('-');

    return {
      ...state,
      view: {
        day,
        month,
        year,
        data: state.data.filter(({ date }) => date.indexOf(`${viewDate}T`) === 0),
      },
    };
  },

  [actions.LAUNCHES_GET_REQUEST]: (state) => ({
    ...state,
    data: [],
    isLoading: true,
  }),

  [actions.LAUNCHES_GET_SUCCESS]: (
    state,
    {
      result: {
        data: { results },
      },
    },
  ) => ({
    ...state,
    data: results.map((result) => ({
      id: result.id,
      imageUrl: result.image,
      name: result.name,
      date: result.net,
      agency: {
        id: result.launch_service_provider?.id,
        name: result.launch_service_provider?.name,
      },
    })),
    isLoading: false,
  }),

  [actions.LAUNCHES_GET_FAILURE]: (state) => ({
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
