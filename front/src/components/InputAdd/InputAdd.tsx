import * as React from 'react';
import {TStatusBar} from "../TodoList/TodoList";
import './inputAdd.scss';
import {addTodo, fetchAddTodo} from "../../redux/actions/todoActions/todoActions";
import {useDispatch} from "react-redux";
import {useState} from "react";
import {ITodo} from "../../@types/todoTypes";

const {v4: uuidv4} = require('uuid');

type TAddProps = {
    handleStatusModalBar: (status: TStatusBar) => void;
};
const InputAdd: React.FC<TAddProps> = (props) => {
    const dispatch = useDispatch();
    const [textareaValue, setTextareaValue] = useState('');

    const handleAddTodo = (): void => {
        if(!textareaValue) {
            return alert('Поле не может быть пустым!')
        }
        const todo: ITodo = {
            _id: uuidv4(),
            title: textareaValue,
            status: false
        }
        dispatch(fetchAddTodo(todo));
        props.handleStatusModalBar('DEFAULT');
    }

    return (
        <div className='add'>
            <h1 className="modal__title">
                Новая задача
            </h1>
            <textarea className="add__textarea"
                      value={textareaValue} onChange={e => setTextareaValue(e.target.value)}
            >Новая задача</textarea>
            <div className="add__button-wrapper">
                <button className="add__cancel button"
                        onClick={() => props.handleStatusModalBar('DEFAULT')}
                >Закрыть
                </button>
                <button className="add__add button"
                        onClick={handleAddTodo}
                >Добавить
                </button>
            </div>
        </div>
    );
};

export default InputAdd;