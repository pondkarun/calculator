// Action Creator
export const setUser = (model) => {
    return dispatch => {
        dispatch({
            type: "SET_USER",
            payload: model
        });
    };
};

