import {ITodo, TodoAction, TodoActionTypes} from "../../@types/todoTypes";

interface ITodoState {
    todos: Array<ITodo>,
    loading?: boolean,
}

const todoInitialState: ITodoState = {
    todos: [],
    loading: false,
}

export const todoReducer = (state = todoInitialState, action: TodoAction) => {
    switch (action.type) {
        case TodoActionTypes.FETCH_ALL_TODOS :
            return {
                ...state, loading: true, todos: []
            }
        case TodoActionTypes.FETCH_ALL_TODOS_SUCCESS:
            return {
                ...state, loading: false, todos: [...action.payload]
            }
        case TodoActionTypes.ADD_TODO:
            return {
                ...state, todos: [...state.todos, action.payload]
            }
        case TodoActionTypes.DELETE_TODO:
            return {
                ...state, todos: [...state.todos].filter(t => {
                    return t._id !== action.payload
                })
            }
        case TodoActionTypes.STATUS_TODO :
            return {
                ...state, todos: [...state.todos].map(t => {
                    if (t._id === action.payload._id) {
                        t.status = !t.status
                    }
                    return t
                })
            }
        case TodoActionTypes.EDIT_TODO :
            return {
                ...state, todos: [...state.todos].map(t => {
                    if (t._id === action.payload._id) {
                        t.title = action.payload.title
                    }
                    return t
                })
            }
        default:
            return state
    }
}