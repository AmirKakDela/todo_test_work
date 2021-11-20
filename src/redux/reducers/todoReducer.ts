import {ITodo} from "../../@types/todoTypes";
import {ADD_TODO, DELETE_TODO, EDIT_TODO, STATUS_TODO} from "../actions/todoActions/actionTypes";
import {IAction} from "../actions/todoActions/todoActions";

interface ITodoState {
    todos: Array<ITodo>
}

const todoInitialState: ITodoState = {
    todos: [
        {
            id: 'a4c6a81f-ba65-45cb-a32d-70726e495c08',
            todo: 'Приготовить обед',
            status: false
        },
        {
            id: 'e4d4f368-2eda-4970-bf62-d6b24fd4c8c7',
            todo: 'Посидеть за компьютером',
            status: false
        },
        {
            id: 'eb9a129d-a0eb-41b5-9181-1ffcbfb1b2f5',
            todo: 'Курьер',
            status: true
        },
    ]
}

export const todoReducer = (state = todoInitialState, action: IAction) => {
    switch (action.type) {
        case  ADD_TODO:
            return {
                ...state, todos: [...state.todos, action.payload]
            }
        case DELETE_TODO:
            return {
                ...state, todos: [...state.todos].filter(t => {
                    return t.id !== action.payload
                })
            }
        case STATUS_TODO :
            return {
                ...state, todos: [...state.todos].map(t => {
                    if (t.id === action.payload.id) {
                        t.status = !t.status
                    }
                    return t
                })
            }
        case EDIT_TODO :
            return {
                ...state, todos: [...state.todos].map(t => {
                    if(t.id === action.payload.id) {
                        t.todo = action.payload.todo
                    }
                    return t
                })
            }
        default:
            return state
    }
}