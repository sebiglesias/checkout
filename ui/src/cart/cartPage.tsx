import classes from './cartPage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../store";
import {useCallback, useEffect, useMemo, useState} from "react";
import {CartItemSummary} from "./cartItemSummary/cartItemSummary";
import { useNavigate} from "react-router-dom";
import {Routes} from "../routes";
import {usePostOrderWaitingForPayment} from "../order/hooks/usePostOrderWaitingForPayment";
import {toast} from "react-toastify";
import {addWaitingForPaymentOrder} from "../order/orderSlice";

export const CartPage = () => {
    const [ totalPrice, setTotalPrice ] = useState(0)
    const dispatch = useDispatch()
    const { items } = useSelector((state: AppState) => state.cart)
    const orderHook = usePostOrderWaitingForPayment()

    // this might be better off on a wrapper rather on the CartPage
    const navigate = useNavigate();

    useEffect(() => {
        let count = 0
        items.forEach(item => count += item.item.price * item.quantity)
        setTotalPrice(count)
    }, [items, setTotalPrice])

    const itemList =  useMemo(() => {
      return items.map((item, index) => <CartItemSummary key={index} cartItem={item} /> )
    }, [items])

    const sendOrder = useCallback( () => {
        orderHook(items)
        .then((response) => {
            dispatch(addWaitingForPaymentOrder(response))
            navigate(Routes.payment, {replace: true})
        }).catch(e => {
            toast.error("There was a problem registering your order try again.")
            console.log(e)
        })
    }, [items])

    return (
        <div className={classes.container}>
            {itemList.length === 0 && <span className={classes.empty}>Your cart is empty</span>}
            <div className={classes.itemList}>
                {itemList}
            </div>
            <div className={classes.bottomBar}>
                <span>Total: ${totalPrice.toFixed(2)}</span>
                <button disabled={totalPrice === 0} onClick={sendOrder}>Pay</button>
            </div>
        </div>
    )
}