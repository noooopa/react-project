import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:8000/app/emp";

export const fetchGetEmployee=createAsyncThunk(
    "fetchGetEmployee",
    async (_,thunkAPI,)=>{
        try{
            const resp=await axios.get(`${url}/`)
            return resp.data;
        }catch(e){
            return thunkAPI.rejectWithValue("데이터 로드 실패")
        }

    }
)
export const fetchPostEmployee=createAsyncThunk(
    "fetchPostEmployee",
    async (emp,thunkAPI,)=>{
        try{
            const resp=await axios.post(`${url}/`, emp)
            // console.log(resp);
            return resp.data;
        }catch(e){
            return thunkAPI.rejectWithValue("데이터 전송 실패")
        }

    }
)
export const fetchDeleteEmployee=createAsyncThunk(
    "fetchDeleteEmployee",
    async (name, thunkAPI)=>{
        try{
            console.log("clicked",name)
            const resp=await axios.delete(`${url}/${name}`)
            return resp.data;
        }catch(e){
            return thunkAPI.rejectWithValue("데이터 삭제 실패")
        }

    }
)

export const fetchUpdateEmployee=createAsyncThunk(
    "fetchUpdateEmployee",
    async (emp,thunkAPI,)=>{
        try{
            const resp=await axios.put(`${url}/${emp.name}`, emp)
            return resp.data;
        }catch(e){
            return thunkAPI.rejectWithValue("데이터 수정 실패")
        }

    }
)