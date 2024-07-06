import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/apiSetup";

const initialState = {
    requests : [],
    userRequests:[]
}

export const fetchRequests = createAsyncThunk(
    "request/fetchRequests",
    async(thunkAPI)=>{
        try{
            const res = await api.get(`/requests`)
            return res.data.message
        }catch(e){
            console.log(e);
        }
    }
)

export const fetchUserRequests = createAsyncThunk(
    "request/fetchUserRequests",
    async(thunkAPI,userId)=>{
        try{
            const res = await api.get(`/request/${userId}`)
            return res.request
        }catch(e){
            console.log(e);
        }
    }
)

const requestSlice = createSlice({
    name:"request",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchRequests.fulfilled,(state,action)=>{
            state.requests = action.payload
        })

        builder.addCase(fetchUserRequests.fulfilled,(state,action)=>{
            state.userRequests = action.payload
        })
    }
})

export const requests = (state)=>state.request.requests
export const userRequests = (state)=>state.request.userRequests
export default requestSlice