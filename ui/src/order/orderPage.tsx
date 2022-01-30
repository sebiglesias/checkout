import {useCallback, useMemo} from "react";
import {CartItemSummary} from "../cart/cartItemSummary/cartItemSummary";
import {useNavigate} from "react-router-dom";
import {Routes} from "../routes";

import classes from './orderPage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../store";
import {removeOrder} from "./orderSlice";
import {CartItem} from "../common/models";
import {clearCart} from "../cart/cartSlice";

export const OrderPage = () => {
    const {order} = useSelector((state: AppState) => state.order)
    const {items} = useSelector((state: AppState) => state.catalogue)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const itemList = useMemo(() => {
        return order !== undefined && order.items.map((item, index) => {
            // @ts-ignore
            const element = items.find(i => i.id === item.itemId);
            const cartItem: CartItem = {
                item: {
                    ...item,
                    image_id: element !== undefined && element.image_id || '',
                    categoryId: element !== undefined && element.categoryId || '',
                    name: element !== undefined && element.name || '',
                    id: element !== undefined && element.id || '',
                },
                quantity: item.quantity
            }

            return <CartItemSummary cartItem={cartItem} key={index} readOnly={true}/>
        })
    }, [order])

    const goBack = useCallback(() => {
        dispatch(clearCart())
        dispatch(removeOrder())
        navigate(Routes.home, {replace: true})
    }, [])

    return (
        <div className={classes.container}>
            <h1>Order was performed successfully</h1>
            <div>
                <h2>Order Details</h2>
                <div className={classes.itemList}>
                    {itemList}
                </div>
            </div>
            <div className={classes.bottomBar}>
                <button onClick={goBack}>Make another order</button>
            </div>
        </div>
    )
}