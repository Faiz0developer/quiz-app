import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name:'user',
    initialState:{userId:''},
    reducers:{
        registerUserAction(state, action){
              state.userId = action.payload  
              console.log(action.payload)
        }
    }
})

export const selectUser = (state) => state.user.userId
export const {registerUserAction} = userSlice.actions
export default userSlice.reducer