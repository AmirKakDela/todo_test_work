import * as actionTypes from './actionTypes';
import {ITodo} from "../../../@types/todoTypes";

export interface IAction {
    type: string,
    payload?: any
}

export const addTodo = (todo: ITodo): IAction => {
    return {
        type: actionTypes.ADD_TODO,
        payload: todo
    }
}

export const deleteTodo = (id: string): IAction => {
    return {
        type: actionTypes.DELETE_TODO,
        payload: id
    }
}

export const statusTodo = (todo: ITodo): IAction => {
    return {
        type: actionTypes.STATUS_TODO,
        payload: todo
    }
}

export const editTodo = (todo: ITodo): IAction => {
    return {
        type: actionTypes.EDIT_TODO,
        payload: todo
    }
}