import {addItems} from "../catalogueSlice";
import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {useItemsApi} from "../../apis/useItemsApi";

export const useGetItems = () => {
    const dispatch = useDispatch()
    const api = useItemsApi()

    return useCallback(() => api
        .getItems()
        .then(items => dispatch(addItems(items)))
        .catch(e => console.log(e)), [api, dispatch])
}