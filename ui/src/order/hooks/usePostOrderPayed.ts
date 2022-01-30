import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {useItemsApi} from "../../apis/useItemsApi";

export const usePostOrderPayed = () => {
    const dispatch = useDispatch()
    const api = useItemsApi()

    return useCallback((id: string, totalPrice: number) => api
        .postAfterPaymentOrder(id, totalPrice), [api, dispatch])
}