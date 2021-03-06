import { actions, paths } from 'src/constants';

export default {
  setSelected: (agencyId) => ({
    type: actions.AGENCIES_SET_SELECTED,
    agencyId,
  }),

  getAgencies: (page = 0) => ({
    [actions.API_CALL]: {
      types: [
        actions.AGENCIES_GET_REQUEST,
        actions.AGENCIES_GET_SUCCESS,
        actions.AGENCIES_GET_FAILURE,
      ],
      promise: (client) =>
        client.get(paths.api.AGENCIES, {
          params: {
            ordering: 'name',
            limit: 100,
            offset: 100 * page,
          },
        }),
    },
  }),
};
