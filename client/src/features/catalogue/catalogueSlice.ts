import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
} from "@reduxjs/toolkit";
import { Product, ProductParams } from "../../app/models/product";
import agent from "../../app/api/agent";
import { RootState } from "../../app/store/configureStore";
import { MetaData } from "../../app/models/pagination";

interface CatalogueState {
	productLoaded: boolean;
	filtersLoaded: boolean;
	brands: string[];
	types: string[];
	status: string;
	productParams: ProductParams;
	metaData: MetaData | null;
}

const initialState: CatalogueState = {
	productLoaded: false,
	filtersLoaded: false,
	brands: [],
	types: [],
	status: "idle",
	productParams: initParams(),
	metaData: null,
};

function initParams() {
	return {
		pageNumber: 1,
		pageSize: 6,
		orderBy: "name",
		brands: [],
		types: [],
	};
}

const productAdapter = createEntityAdapter<Product>();

function getAxiosParam(productParams: ProductParams) {
	const params = new URLSearchParams();

	params.append("pageNumber", productParams.pageNumber.toString());
	params.append("pageSize", productParams.pageSize.toString());
	params.append("orderBy", productParams.orderBy);

	if (productParams.searchTerm)
		params.append("searchTerm", productParams.searchTerm);

	if (productParams.brands.length > 0)
		params.append("brands", productParams.brands.toString());

	if (productParams.types.length > 0)
		params.append("types", productParams.types.toString());

	return params;
}

export const fetchProductsAsync = createAsyncThunk<
	Product[],
	void,
	{ state: RootState }
>("catalogue/fetchProductsAsync", async (_, ThunkAPI) => {
	const params = getAxiosParam(ThunkAPI.getState().catalogue.productParams);
	try {
		const response = await agent.Catalogue.list(params);
		ThunkAPI.dispatch(setMetaData(response.metaData));
		return response.items;
	} catch (error: any) {
		return ThunkAPI.rejectWithValue({ error: error.data });
	}
});

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

export const fetchFiltersAsync = createAsyncThunk(
	"catalogue/fetchFiltersAsync",
	async (_, ThunkApi) => {
		try {
			return agent.Catalogue.fetchFilters();
		} catch (error: any) {
			return ThunkApi.rejectWithValue({ error: error.data });
		}
	}
);

export const catalogueSlice = createSlice({
	name: "catalogue",
	initialState: productAdapter.getInitialState(initialState),
	reducers: {
		setProductParams: (state, action) => {
			state.productLoaded = false;
			state.productParams = {
				...state.productParams,
				...action.payload,
				pageNumber: 1,
			};
		},
		setPageNumber: (state, action) => {
			state.productLoaded = false;
			state.productParams = { ...state.productParams, ...action.payload };
		},
		resetProductParams: (state) => {
			state.productParams = initParams();
		},
		setMetaData: (state, action) => {
			state.metaData = action.payload;
		},
		setProduct: (state, action) => {
			productAdapter.upsertOne(state, action.payload);
			state.productLoaded = false;
		},
		removeProduct: (state, action) => {
			productAdapter.removeOne(state, action.payload);
			state.productLoaded = false;
		},
	},
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
		builder.addCase(fetchFiltersAsync.pending, (state) => {
			state.status = "fetchFiltersPending";
		});
		builder.addCase(fetchFiltersAsync.fulfilled, (state, action) => {
			state.filtersLoaded = true;
			state.status = "idle";
			state.brands = action.payload.brands;
			state.types = action.payload.types;
		});
		builder.addCase(fetchFiltersAsync.rejected, (state, action) => {
			console.log(action);
			state.status = "idle";
		});
	},
});

export const productSelectors = productAdapter.getSelectors(
	(state: RootState) => state.catalogue
);

export const {
	setProductParams,
	resetProductParams,
	setMetaData,
	setPageNumber,
	setProduct,
	removeProduct,
} = catalogueSlice.actions;
