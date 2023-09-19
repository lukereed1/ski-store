import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";
import { Product } from "../../app/models/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";

const productAdapter = createEntityAdapter<Product>();

interface CatalogueState {
	productLoaded: boolean;
	status: string;
}

const initialState: CatalogueState = {
	productLoaded: false,
	status: "idle",
};

export const fetchProductsAsync = createAsyncThunk<Product[]>(
	"catalogue/fetchProductsAsync",
	async (_, ThunkAPI) => {
		try {
			return await agent.Catalogue.list();
		} catch (error: any) {
			return ThunkAPI.rejectWithValue({ error: error.data });
		}
	}
);

export const fetchProductAsync = createAsyncThunk<Product, number>(
	"catalogue/fetchProductAsync",
	async (productId, ThunkAPI) => {
		try {
			return await agent.Catalogue.details(productId);
		} catch (error: any) {
			return ThunkAPI.rejectWithValue({ error: error.data });
		}
	}
);

export const catalogueSlice = createSlice({
	name: "catalogue",
	initialState: productAdapter.getInitialState(initialState),
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProductsAsync.pending, (state) => {
			state.status = "fetchProductsPending";
		});
		builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
			productAdapter.setAll(state, action.payload);
			state.status = "idle";
			state.productLoaded = true;
		});
		builder.addCase(fetchProductsAsync.rejected, (state, action) => {
			console.log(action);
			state.status = "idle";
		});
		builder.addCase(fetchProductAsync.pending, (state) => {
			state.status = "fetchProductPending";
		});
		builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
			productAdapter.upsertOne(state, action.payload);
			state.status = "idle";
		});
		builder.addCase(fetchProductAsync.rejected, (state, action) => {
			console.log(action);
			state.status = "idle";
		});
	},
});

export const productSelectors = productAdapter.getSelectors(
	(state: RootState) => state.catalogue
);
