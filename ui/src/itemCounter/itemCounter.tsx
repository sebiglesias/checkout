import classes from './itemCounter.module.scss'
import {useGetItemQuantity} from "../cart/hooks/useGetItemQuantity";
import {useCallback} from "react";
import {useDispatch} from "react-redux";
import {addItem, removeItem} from "../cart/cartSlice";
import {Item} from "../common/models";

export type ItemCounterProps = {
    item: Item
}

export const ItemCounter = (props: ItemCounterProps) => {
    const quantity = useGetItemQuantity(props.item.id)
    const dispatch = useDispatch()
    const addItemWithInputQuantity = useCallback((event) => {
        dispatch(addItem({item: props.item, quantity: event.target.value}))
    }, [props.item])

    const removeSingleItem = useCallback(() => {
        dispatch(addItem({item: props.item, quantity: quantity() - 1 }))
    }, [props.item, quantity])

    const addSingleItem = useCallback(() => {
        dispatch(addItem({item: props.item, quantity: quantity() + 1 }))
    }, [props.item, quantity])

    const clearItem = useCallback(() => {
        dispatch(removeItem(props.item.id))
    }, [props.item, quantity])

    return (
        <div className={classes.container}>
            <button onClick={removeSingleItem}>-</button>
            <input type={'number'} value={quantity()} onChange={addItemWithInputQuantity}/>
            <button onClick={addSingleItem}>+</button>
            <button onClick={clearItem}>Clear All</button>
        </div>
    )
}