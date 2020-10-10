import { actions, paths } from 'src/constants';

export default {
  setViewDate: (date) => ({
    type: actions.LAUNCHES_SET_VIEW_DATE,
    date,
  }),

  getEvents: ({ from, to }) => ({
    [actions.API_CALL]: {
      types: [
        actions.LAUNCHES_GET_REQUEST,
        actions.LAUNCHES_GET_SUCCESS,
        actions.LAUNCHES_GET_FAILURE,
      ],
      promise: (client) =>
        client.get(paths.api.LAUNCH, {
          params: {
            net__gte: from,
            net__lte: to,
            order: 'net',
          },
        }),
    },
  }),
};
