export interface ITodo {
    _id: string,
    title: string,
    status: boolean
}

export enum TodoActionTypes {
    FETCH_ALL_TODOS = 'FETCH_ALL_TODOS',
    FETCH_ALL_TODOS_SUCCESS = 'FETCH_ALL_TODOS_SUCCESS',
    ADD_TODO = 'ADD_TODO',
    DELETE_TODO = 'DELETE_TODO',
    STATUS_TODO = 'STATUS_TODO',
    EDIT_TODO = 'EDIT_TODO',
}

export interface FetchAllTodosAction {
    type: TodoActionTypes.FETCH_ALL_TODOS
}

export interface FetchAllTodosSuccessAction {
    type: TodoActionTypes.FETCH_ALL_TODOS_SUCCESS,
    payload: Array<ITodo>
}

export interface AddTodoAction {
    type: TodoActionTypes.ADD_TODO,
    payload: ITodo
}

export interface DeleteTodoAction {
    type: TodoActionTypes.DELETE_TODO,
    payload: string
}

export interface StatusTodoAction {
    type: TodoActionTypes.STATUS_TODO,
    payload: ITodo
}

export interface EditTodoAction {
    type: TodoActionTypes.EDIT_TODO,
    payload: ITodo
}

export type TodoAction =
    EditTodoAction
    | StatusTodoAction
    | DeleteTodoAction
    | AddTodoAction
    | FetchAllTodosSuccessAction
    | FetchAllTodosAction
