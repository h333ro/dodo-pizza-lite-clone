import {AdditionalType, IngredientType, PizzaTypesType} from "./productsReducer";
import {GetActionType} from "../redux";

const ADD_ITEM = 'bucketReducer/ADD_ITEM';
const INCREASE_DECREASE_FLOW = 'bucketReducer/INCREASE_DECREASE_FLOW';
const REMOVE_ITEM = 'bucketReducer/REMOVE_ITEM';
const ADD_SUCCESSFUL_ITEM = 'bucketReducer/ADD_SUCCESSFUL_ITEM';
const REMOVE_SUCCESSFUL_ITEM = 'bucketReducer/REMOVE_SUCCESSFUL_ITEM';

export type BucketPizzaItem = {
    bucketItemType: 'pizza' | 'snack',
    id:number,
    name: string,
    imgURL:string,
    ingredients: Array<IngredientType>,
    type: PizzaTypesType,
    additional: Array<AdditionalType>,
    dough: string,
    totalCost: number,
}
export type BucketItemType = {
    id: number,
    item: BucketPizzaItem,
    count: number,
}

const initialState = {
    bucketItems: [] as Array<BucketItemType>,
    successfulAdded:[] as Array<{id:number,name:string}>,
};
type InitialState = typeof initialState;

export const bucketReducer = (state: InitialState = initialState, action: ActionType): InitialState => {
    switch (action.type) {
        case ADD_ITEM: {
            const itemId = state.bucketItems.length > 0 ? state.bucketItems[state.bucketItems.length - 1].id + 1 : 0;
            return {
                ...state,
                bucketItems: [...state.bucketItems, {id: itemId, item: action.item, count: 1}]
            }
        }
        case INCREASE_DECREASE_FLOW: {
            const itemForChange = state.bucketItems.find(bucketItem => bucketItem.id === action.itemId);
            let newCount = itemForChange!.count;
            if (action.changeType === "increase") {
                newCount = newCount + 1;
            } else {
                newCount = newCount - 1;
            }

            let newBucketItems;
            if(newCount > 0){
                newBucketItems = state.bucketItems.map(bucketItem => {
                    if(bucketItem.id === action.itemId){
                        return{...bucketItem,count:newCount}
                    }
                    return bucketItem;
                });
            }else{
                newBucketItems = state.bucketItems.filter(bucketItem => bucketItem.id !== action.itemId);
            }

            return {
                ...state,
                bucketItems: newBucketItems,
            };
        }
        case REMOVE_ITEM:{
            return{
                ...state,
                bucketItems: state.bucketItems.filter(bucketItem => bucketItem.id !== action.itemId),
            }
        }
        case ADD_SUCCESSFUL_ITEM:{
            const itemId = state.successfulAdded.length > 0 ? state.successfulAdded[state.successfulAdded.length - 1].id + 1 : 0 ;
            return {
                ...state,
                successfulAdded: [...state.successfulAdded,{id:itemId,name:action.name}],
            }
        }
        case REMOVE_SUCCESSFUL_ITEM:{
            return {
                ...state,
                successfulAdded: state.successfulAdded.filter(addedItem => addedItem.id !== action.id),
            }
        }
        default:
            return state;
    }
};

type ActionType = GetActionType<typeof bucketActions>;
export const bucketActions = {
    addItem: (item: BucketPizzaItem) => ({type: ADD_ITEM, item} as const),
    increaseDecreaseFlow: (itemId: number, changeType: 'increase' | 'decrease') => ({type: INCREASE_DECREASE_FLOW, itemId, changeType} as const),
    removeItem:(itemId:number) => ({type:REMOVE_ITEM,itemId} as const),
    addSuccessfulAddedItem:(name:string) => ({type:ADD_SUCCESSFUL_ITEM,name}as const),
    removeSuccessfulAddedItem:(id:number) => ({type:REMOVE_SUCCESSFUL_ITEM,id}as const),
};