import {useDispatch} from "react-redux";
import {useCallback} from "react";
import {useItemsApi} from "../../apis/useItemsApi";
import {CartItem} from "../../common/models";
import {EnvUtil} from "../../common/envUtils";

export const usePostOrderWaitingForPayment = () => {
    const dispatch = useDispatch()
    const api = useItemsApi()

    return useCallback((items: CartItem[]) => api
        .postBeforePaymentOrder(items)
        .then(res => EnvUtil.storeTempOrder(res))
        .catch(e => console.log(e)), [api, dispatch])
}