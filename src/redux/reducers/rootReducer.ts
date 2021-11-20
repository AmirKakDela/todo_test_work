import {todoReducer} from "./todoReducer";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
    todo: todoReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer