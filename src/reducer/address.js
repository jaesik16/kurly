// 리듀서 객체(Object) 생성하기
import { createSlice } from "@reduxjs/toolkit";

const initState = {
    주소:''
}
const addressReducer = createSlice({
    name:'address',
    initialState: initState,
    reducers: {
        address: (state, action)=>{
            state.주소 = action.payload;
        }
    }
});
export default addressReducer.reducer;
export const {address} = addressReducer.actions;
