import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {useItemsApi} from "../../apis/useItemsApi";
import {CartItem} from "../../common/models";

export const usePostOrderWaitingForPayment = () => {
    const dispatch = useDispatch()
    const api = useItemsApi()

    return useCallback((items: CartItem[]) => api
        .postBeforePaymentOrder(items), [api, dispatch])
}