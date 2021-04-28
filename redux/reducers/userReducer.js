
const INIT_STATE = {
    listUser: [],
};

const userReducer = (state = INIT_STATE, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state, listUser: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default userReducer;