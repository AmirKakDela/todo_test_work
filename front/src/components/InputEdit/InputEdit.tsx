// @flow
import * as React from 'react';
import {useState} from "react";
import './inputEdit.scss';
import {TStatusBar} from "../TodoList/TodoList";
import {useDispatch} from "react-redux";
import {editTodo, fetchEditTodo} from "../../redux/actions/todoActions/todoActions";
import {ITodo} from "../../@types/todoTypes";

type Props = {
    handleStatusModalBar: (status: TStatusBar) => void,
    editingTodo: ITodo,
};

const InputEdit = (props: Props) => {
    const [inputValue, setInputValue] = useState<string>(props.editingTodo.title);
    const dispatch = useDispatch();

    const handleSaveEdit = () => {
        if(!inputValue) {
            return alert('Поле не может быть пустым!')
        }
        dispatch(fetchEditTodo({...props.editingTodo, title: inputValue}));
        props.handleStatusModalBar('DEFAULT');
    }

    return (
        <div className='edit'>
            <h1 className="modal__title">
                Редактировать
            </h1>
            <input type="text" className="edit__input"
                   value={inputValue}
                   onChange={e => setInputValue(e.target.value)}/>
            <div className="edit__button-wrapper">
                <button className="edit__cancel button"
                        onClick={() => props.handleStatusModalBar('DEFAULT')}>Закрыть
                </button>
                <button className="edit__edit button"
                        onClick={handleSaveEdit}>Сохранить
                </button>
            </div>
        </div>
    );
};

export default InputEdit