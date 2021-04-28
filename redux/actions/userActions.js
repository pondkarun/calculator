// Action Creator
export const setUser = () => {
    return dispatch => {
        dispatch({
            type: "SET_USER",
        });
    };
};

