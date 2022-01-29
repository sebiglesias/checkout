import {ItemsApi} from "../../apis/itemsApi";
import {addCategories} from "../catalogueSlice";
import {useDispatch} from "react-redux";

export const useGetCategories = () => {
    const dispatch = useDispatch()
    const api = new ItemsApi()

    return () => api.getCategories().then(categories => {
        dispatch(addCategories(categories))
    }).catch(e => console.log(e))
}