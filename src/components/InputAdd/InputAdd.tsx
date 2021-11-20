import * as React from 'react';
import {TStatusBar, TTodo} from "../TodoList/TodoList";
import './inputAdd.scss';
import {addTodo} from "../../redux/actions/todoActions/todoActions";
import {useDispatch} from "react-redux";
import {useState} from "react";

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
        const todo: TTodo = {
            id: uuidv4(),
            todo: textareaValue,
            status: false
        }
        dispatch(addTodo(todo));
        props.handleStatusModalBar('DEFAULT');
    }

    return (
        <div className='add'>
            <textarea className="add__textarea"
                      value={textareaValue} onChange={e => setTextareaValue(e.target.value)}
            ></textarea>
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