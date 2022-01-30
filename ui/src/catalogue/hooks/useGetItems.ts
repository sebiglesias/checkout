import {useCallback} from "react";
import {useItemsApi} from "../../apis/useItemsApi";

export const useGetItems = () => {
    const api = useItemsApi()

    return useCallback(() => api.getItems(), [api])
}