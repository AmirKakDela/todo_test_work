import React from 'react';
import './App.scss';
import TodoList from "./components/TodoList/TodoList";
import {Provider} from "react-redux";
import store from './redux/store'

function App() {
    return (
        <Provider store={store}>
            <div className="app">
                <TodoList/>
            </div>
        </Provider>
    );
}

export default App;
