import {
    AddTodoAction,
    DeleteTodoAction,
    EditTodoAction,
    ITodo,
    StatusTodoAction,
    TodoAction,
    TodoActionTypes
} from "../../../@types/todoTypes";
import {Dispatch} from "redux";
import axios from "axios";

export interface ITodoAction {
    type: string,
    payload?: any
}


export const addTodo = (todo: ITodo): AddTodoAction => {
    return {
        type: TodoActionTypes.ADD_TODO,
        payload: todo
    }
}

export const deleteTodo = (id: string): DeleteTodoAction => {
    return {
        type: TodoActionTypes.DELETE_TODO,
        payload: id
    }
}

export const statusTodo = (todo: ITodo): StatusTodoAction => {
    return {
        type: TodoActionTypes.STATUS_TODO,
        payload: todo
    }
}

export const editTodo = (todo: ITodo): EditTodoAction => {
    return {
        type: TodoActionTypes.EDIT_TODO,
        payload: todo
    }
}

export const fetchAllTodos = () => {
    return async (dispatch: Dispatch<TodoAction>) => {
        try {
            dispatch({type: TodoActionTypes.FETCH_ALL_TODOS});
            const response = await axios.get('/api/todos/todos')
            setTimeout(() => {
                dispatch({type: TodoActionTypes.FETCH_ALL_TODOS_SUCCESS, payload: response.data});
            }, 500)
        } catch (e) {
            console.log('fetchAllTodos error', e);
        }

    }
}

export const fetchAddTodo = (todo: ITodo) => {
    return async (dispatch: Dispatch<TodoAction>) => {
        try {
            const response = await axios.post('/api/todos/add', todo);
            dispatch(addTodo(response.data));
        } catch (e) {
            console.log('fetchAddTodo error', e);
        }

    }
}

export const fetchDeleteTodo = (id: string) => {
    return async (dispatch: Dispatch<TodoAction>) => {
        try {
            const response = await axios.delete(`/api/todos/delete/${id}`);
            dispatch(deleteTodo(id))
        } catch (e) {
            console.log('fetchDeleteTodo error', e)
        }

    }
}

export const fetchEditTodo = (todo: ITodo) => {
    return async (dispatch: Dispatch<TodoAction>) => {
        try {
            const response = await axios.put(`/api/todos/update/${todo._id}`, todo);
            dispatch(editTodo(todo));
        } catch (e) {
            console.log('fetchEditTodo', e);
        }

    }
}

export const fetchStatusTodo = (todo: ITodo) => {
    return async (dispatch: Dispatch<TodoAction>) => {
        try {
            const response = await axios.put(`/api/todos/update/${todo._id}`, todo);
            dispatch(statusTodo(todo));
        } catch (e) {
            console.log('fetchStatusTodo', e);
        }

    }
}