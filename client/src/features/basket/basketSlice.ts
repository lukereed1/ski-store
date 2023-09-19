import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/basket";
import agent from "../../app/api/agent";

interface BasketState {
	basket: Basket | null;
	status: string;
}

const initialState: BasketState = {
	basket: null,
	status: "idle",
};

export const addBasketItemAsync = createAsyncThunk<
	Basket,
	{ productId: number; quantity?: number }
>("basket/addBasketItemAsync", async ({ productId, quantity }, ThunkAPI) => {
	try {
		return await agent.Basket.addItem(productId, quantity);
	} catch (error: any) {
		return ThunkAPI.rejectWithValue({ error: error.data });
	}
});

export const removeBasketItemAsync = createAsyncThunk<
	void,
	{ productId: number; quantity: number }
>("basket/removeBasketItemAsync", async ({ productId, quantity }, ThunkAPI) => {
	try {
		await agent.Basket.removeItem(productId, quantity);
	} catch (error: any) {
		return ThunkAPI.rejectWithValue({ error: error.data });
	}
});

export const basketSlice = createSlice({
	name: "basket",
	initialState,
	reducers: {
		setBasket: (state, action) => {
			state.basket = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(addBasketItemAsync.pending, (state, action) => {
			state.status = "itemAddPending" + action.meta.arg.productId;
		});
		builder.addCase(addBasketItemAsync.fulfilled, (state, action) => {
			state.basket = action.payload;
			state.status = "idle";
		});
		builder.addCase(addBasketItemAsync.rejected, (state, action) => {
			console.log(action);
			state.status = "idle";
		});
		builder.addCase(removeBasketItemAsync.pending, (state, action) => {
			if (action.meta.arg.quantity! > 1) {
				state.status = "bulkItemRemovingPending" + action.meta.arg.productId;
			} else {
				state.status = "itemRemovingPending" + action.meta.arg.productId;
			}
		});
		builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
			const itemIndex = state.basket?.items.findIndex(
				(i) => i.productId === action.meta.arg.productId
			);
			if (itemIndex === -1 || itemIndex === undefined) return;

			state.basket!.items[itemIndex].quantity -= action.meta.arg.quantity;

			if (state.basket!.items[itemIndex].quantity === 0) {
				state.basket!.items.splice(itemIndex, 1);
			}

			state.status = "idle";
		});
		builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
			console.log(action);
			state.status = "idle";
		});
	},
});

export const { setBasket } = basketSlice.actions;
