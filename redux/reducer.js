import { createSlice, configureStore } from '@reduxjs/toolkit'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {},
    reducers: {
      incremented: (state, action) => {
        if(action.payload.itemName in state)
        return {
            ...state,
            [action.payload.itemName] : {
                ...state[action.payload.itemName], 
                count : state[action.payload.itemName].count + 1
            }
        }
        else return {
            ...state,
            [action.payload.itemName] : {
                ...action.payload,
                count: 1
            }
        }
      },
      decremented: (state, action) => {
        return {
            ...state,
            [action.payload.itemName] : {
                ...state[action.payload.itemId],
                count : state[action.payload.itemName].count - 1
            }
        }
      }
    }
})

export const { incremented, decremented} = cartSlice.actions

export const store = configureStore({
    reducer: cartSlice.reducer
})

