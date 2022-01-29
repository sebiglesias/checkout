import classes from './itemCounter.module.scss'
import {useGetItemQuantity} from "../cart/hooks/useGetItemQuantity";
import {useCallback} from "react";
import {useDispatch} from "react-redux";
import {addItem} from "../cart/cartSlice";
import {Item} from "../common/models";

export type ItemCounterProps = {
    item: Item
    canRemove: boolean
    readOnly?: boolean
}

export const ItemCounter = (props: ItemCounterProps) => {
    const quantity = useGetItemQuantity(props.item.id)
    const dispatch = useDispatch()
    const addItemWithInputQuantity = useCallback((event) => {
        dispatch(addItem({item: props.item, quantity: event.target.value}))
    }, [props.item])

    const removeSingleItem = useCallback(() => {
        const quant = quantity()
        // In cart, can't remove if I only have 1 item
        if (!props.canRemove && quant === 1)return;
        if (quant > 1) {
            dispatch(addItem({item: props.item, quantity: quant - 1 }))
        }
    }, [props.item, quantity])

    const addSingleItem = useCallback(() => {
        dispatch(addItem({item: props.item, quantity: quantity() + 1 }))
    }, [props.item, quantity])

    // const clearItem = useCallback(() => {
    //     dispatch(removeItem(props.item.id))
    // }, [props.item, quantity])

    const minusStyle = `${classes.noStyleButton} ${!props.canRemove && quantity() === 1 && classes.noStyleButton}`

    return (
        <div className={classes.container}>
            <button onClick={removeSingleItem} className={minusStyle} disabled={props.readOnly}>-</button>
            <input type={'number'} value={quantity()} onChange={addItemWithInputQuantity} disabled={props.readOnly}/>
            <button onClick={addSingleItem} className={classes.noStyleButton} disabled={props.readOnly}>+</button>
            {/*<button onClick={clearItem} className={classes.clearButton}>Clear All</button>*/}
        </div>
    )
}