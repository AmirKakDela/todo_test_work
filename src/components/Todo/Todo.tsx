import React from "react";
import './todo.scss'
import {TStatusBar, TTodo} from "../TodoList/TodoList";

type TTodoProps = {
    todo: TTodo,
    statusModalBar: TStatusBar,
    statusDeletingBar: boolean
    handleDeleteTodo: (id: string) => void,
    handleStatusTodo: (id: TTodo) => void,
    handleEditingMod: (status: TStatusBar, todo: TTodo) => void
}


const Todo: React.FC<TTodoProps> = (props) => {
    const {todo, handleDeleteTodo, handleStatusTodo, handleEditingMod, statusDeletingBar} = props;


    return (
        <div>
            <div className="todo">
                {statusDeletingBar ?
                    <div className="todo__mark-delete mark" onClick={() => handleDeleteTodo(todo.id)}>
                        <span className="mark__delete"></span>
                    </div>
                    :
                    <div className="todo__mark-status mark" onClick={() => handleStatusTodo(todo)}>
                        <div className={`mark__done ${!todo.status ? 'mark__not' : ''}`}></div>
                    </div>}
                <p className={`todo__title ${todo.status ? 'todo__title-done' : ''}`}
                   onClick={() => handleEditingMod('EDITING', todo)}>{todo.todo}</p>
            </div>
        </div>
    )
}

export default Todo