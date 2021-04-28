
const userReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state, users: state.users
            }
        default:
            return {
                ...state
            }
    }
}

export default userReducer;