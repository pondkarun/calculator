// Action Creator
export const setUser = (model) => {
    localStorage.setItem("lastUsers", JSON.stringify(model));
    return dispatch => {
        dispatch({
            type: "SET_USER",
            payload: model
        });
    };
};

