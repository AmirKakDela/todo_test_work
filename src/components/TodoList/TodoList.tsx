import {deleteTodo, statusTodo} from "../../redux/actions/todoActions/todoActions";
import React, {useState} from 'react'
import Todo from "../Todo/Todo";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";
import './todoList.scss'
import ModalWindow from "../ModalWindow/ModalWindow";
import InputEdit from "../InputEdit/InputEdit";
import {BsPlusLg} from "react-icons/bs";
import InputAdd from "../InputAdd/InputAdd";


export type TTodo = {
    id: string,
    todo: string,
    status: boolean
}

export type TStatusBar = 'DEFAULT' | 'ADDITING' | 'EDITING';

const TodoList: React.FC = () => {
    const [statusModalBar, setStatusModalBar] = useState<TStatusBar>('DEFAULT');
    const [statusDeletingBar, setStatusDeletingBar] = useState<boolean>(false);
    const [editingTodo, setEditingTodo] = useState<TTodo>({id: '', todo: '', status: false});
    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todo.todos)


    const handleDeleteTodo = (id: string) => {
        dispatch(deleteTodo(id))
    }

    const handleStatusTodo = (todo: TTodo) => {
        dispatch(statusTodo(todo))
    }

    const handleStatusModalBar = (status: TStatusBar) => {
        return setStatusModalBar(status);
    }

    const handleEditingMod = (status: TStatusBar, todo: TTodo) => {
        setEditingTodo(todo)
        handleStatusModalBar(status);
    }

    return (
        <div className="todo-list">
            <div className="todo-list__header">
                <h1 className="todo-list__title">Сегодня</h1>
                {todos.length ? <button className="todo-list__button"
                                        onClick={() => setStatusDeletingBar(prev => !prev)}>
                    {statusDeletingBar ? 'Отменить' : 'Править'}
                </button> : null}

            </div>
            <div className="todo-list__body">
                {!todos.length ? <h2 className="todo-list__subtitle">Список задач пуст</h2>
                    : todos.map(t => {
                        return <Todo key={t.id} todo={t} handleDeleteTodo={handleDeleteTodo}
                                     handleStatusTodo={handleStatusTodo} statusModalBar={statusModalBar}
                                     handleEditingMod={handleEditingMod} statusDeletingBar={statusDeletingBar}
                        />
                    })}
            </div>
            <div className="todo-list__footer">
                <div className="add-icon"
                     onClick={() => setStatusModalBar('ADDITING')}>
                    <BsPlusLg/>
                </div>
            </div>
            {statusModalBar !== 'DEFAULT' ?

                <ModalWindow>
                    {
                        statusModalBar === 'EDITING' ?
                            <InputEdit handleStatusModalBar={handleStatusModalBar} editingTodo={editingTodo}/>
                            :
                            <InputAdd handleStatusModalBar={handleStatusModalBar}/>
                    }
                </ModalWindow>
                : null}
        </div>
    )
}

export default TodoList
