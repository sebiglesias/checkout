import {ItemsApi} from "../../apis/itemsApi";
import {useDispatch} from "react-redux";

export const useGetCategories = () => {
    const dispatch = useDispatch()
    const api = new ItemsApi()

    return () => api.getCategories()
}