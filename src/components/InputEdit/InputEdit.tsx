// @flow
import * as React from 'react';
import {useState} from "react";
import './inputEdit.scss';
import {TStatusBar, TTodo} from "../TodoList/TodoList";
import {useDispatch} from "react-redux";
import {editTodo} from "../../redux/actions/todoActions/todoActions";

type Props = {
    handleStatusModalBar: (status: TStatusBar) => void,
    editingTodo: TTodo,
};

const InputEdit = (props: Props) => {
    const [inputValue, setInputValue] = useState<string>(props.editingTodo.todo);
    const dispatch = useDispatch();

    const handleSaveEdit = () => {
        if(!inputValue) {
            return alert('Поле не может быть пустым!')
        }
        dispatch(editTodo({...props.editingTodo, todo: inputValue}));
        props.handleStatusModalBar('DEFAULT');
    }

    return (
        <div className='edit'>
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