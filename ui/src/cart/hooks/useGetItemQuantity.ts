import {useSelector} from "react-redux";
import {AppState} from "../../store";
import {useCallback} from "react";

export const useGetItemQuantity = (id: string) => {
    const {items} = useSelector((state: AppState) => state.cart)

    return useCallback(() => {
        const element = items.find(cartItem => cartItem.item.id === id);
        return !!element ? element.quantity : 0
    }, [items])
}