import { createReducer, on } from "@ngrx/store";
import { decrement, increment, reset } from "./action.counter";
import { initialState } from "./state.counter";

export const reducer = createReducer(initialState,
    on(increment,(state) => {
        return{
            ...state,count: state.count +1
        }
    }),
    on(decrement,(state) => {
        return{
            ...state,count: state.count -1
        }
    }),
    on(reset,(state) => {
        return{
            ...state,count: 0
        }
    })
    )


export function counterReducer(state:any, action:any){
    return reducer(state,action);
}