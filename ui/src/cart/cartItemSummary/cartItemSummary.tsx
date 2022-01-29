import classes from './cartItem.module.scss'
import {CartItem} from "../../common/models";
import {ItemCounter} from "../../itemCounter/itemCounter";
import {EnvUtil} from "../../common/envUtils";
import {useDispatch} from "react-redux";
import {removeItem} from "../cartSlice";
import {useCallback} from "react";

export type CartItemProp = {
    cartItem: CartItem
    readOnly?: boolean
}

export const CartItemSummary = (props: CartItemProp) => {
    const dispatch = useDispatch()
    const {cartItem} = props

    const removeFromCart = useCallback(() => {
        dispatch(removeItem(cartItem.item.id))
    }, [cartItem.item.id])

    return (
        <div className={classes.container}>
            <img src={EnvUtil.getImageUrl(cartItem.item.image_id)} alt={"product image"}/>
            <div className={classes.rightGroup}>
                <div className={classes.info}>
                    <div className={classes.name}>{cartItem.item.name}</div>
                    <div>${cartItem.item.price}</div>
                    <div className={classes.remove} onClick={removeFromCart}>Remove Product</div>
                </div>
                <ItemCounter item={cartItem.item} canRemove={false} readOnly={props.readOnly}/>
                <div>${(parseFloat(cartItem.item.price) * cartItem.quantity).toFixed(2)}</div>
            </div>
        </div>
    )
}