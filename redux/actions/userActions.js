// Action Types

export const INCREMENT_USER = "INCREMENT_USER"
export const DECREMENT_USER = "DECREMENT_USER"

// Action Creator
export const incrementUser = () => {
    type: INCREMENT_USER
}
export const decrementUser = () => {
    type: DECREMENT_USER
}