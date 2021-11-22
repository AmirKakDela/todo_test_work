import {
    deleteTodo,
    fetchAllTodos,
    fetchDeleteTodo,
    fetchStatusTodo,
    statusTodo
} from "../../redux/actions/todoActions/todoActions";
import React, {useEffect, useState} from 'react'
import Todo from "../Todo/Todo";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/rootReducer";
import './todoList.scss'
import ModalWindow from "../ModalWindow/ModalWindow";
import InputEdit from "../InputEdit/InputEdit";
import BeatLoader from "react-spinners/BeatLoader";
import {BsPlusLg} from "react-icons/bs";
import InputAdd from "../InputAdd/InputAdd";
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {ITodo} from "../../@types/todoTypes";


export type TStatusBar = 'DEFAULT' | 'ADDITING' | 'EDITING';

const TodoList: React.FC = () => {
    const [statusModalBar, setStatusModalBar] = useState<TStatusBar>('DEFAULT');
    const [statusDeletingBar, setStatusDeletingBar] = useState<boolean>(false);
    const [editingTodo, setEditingTodo] = useState<ITodo>({_id: '', title: '', status: false});
    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todo.todos);
    const loading = useSelector((state: RootState) => state.todo.loading);

    useEffect(() => {
        dispatch(fetchAllTodos());
    }, [])


    const handleDeleteTodo = (id: string) => {
        dispatch(fetchDeleteTodo(id))
    }

    const handleStatusTodo = (todo: ITodo) => {
        dispatch(fetchStatusTodo(todo))
    }

    const handleStatusModalBar = (status: TStatusBar) => {
        return setStatusModalBar(status);
    }

    const handleEditingMod = (status: TStatusBar, todo: ITodo) => {
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
                {!loading ? <>
                    {!todos.length ? <h2 className="todo-list__subtitle">Список задач пуст</h2>
                        :
                        <TransitionGroup>
                            {todos && todos.map((t: ITodo) => {
                                return (
                                    <CSSTransition addEndListener={(node: HTMLElement, done: () => void) => {
                                        node.addEventListener("transitionend", done, false)
                                    }}
                                                   key={t._id}
                                                   in={!!todos}
                                                   timeout={500}
                                                   classNames="todo">
                                        <Todo key={t._id} todo={t} handleDeleteTodo={handleDeleteTodo}
                                              handleStatusTodo={handleStatusTodo} statusModalBar={statusModalBar}
                                              handleEditingMod={handleEditingMod} statusDeletingBar={statusDeletingBar}
                                        />
                                    </CSSTransition>
                                )
                            })}
                        </TransitionGroup>
                    }
                </> : <BeatLoader/>}
            </div>
            <div className="todo-list__footer">
                <div className="add-icon"
                     onClick={() => setStatusModalBar('ADDITING')}>
                    <BsPlusLg/>
                </div>
            </div>
            <CSSTransition addEndListener={(node: HTMLElement, done: () => void) => {
                node.addEventListener("transitionend", done, false)
            }} in={statusModalBar !== 'DEFAULT'}
                           unmountOnExit
                           classNames="modal">

                <ModalWindow>
                    {
                        statusModalBar === 'EDITING' ?
                            <InputEdit handleStatusModalBar={handleStatusModalBar} editingTodo={editingTodo}/>
                            :
                            <InputAdd handleStatusModalBar={handleStatusModalBar}/>
                    }
                </ModalWindow>
            </CSSTransition>
        </div>
    )
}

export default TodoList
