import {AppStateType} from "../redux/redux";

export const getBucketItems = (state:AppStateType) =>{
    return state.bucket.bucketItems;
}

export const getSuccessfulAddedArray = (state:AppStateType) =>{
    return state.bucket.successfulAdded;
};