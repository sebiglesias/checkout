import {Item} from "../common/models";

import classes from './itemCard.module.scss'
import {EnvUtil} from "../common/envUtils";
import {ItemCounter} from "../itemCounter/itemCounter";

export type ItemCardProps = {
    item: Item
}

export const ItemCard = (prop: ItemCardProps) => {
    const {name, image_id, id} = prop.item

    return (
        <div className={classes.container}>
            <div className={classes.header}>{name}</div>
            <img src={EnvUtil.getImageUrl(image_id)}  alt={"product image"} className={classes.foodImage}/>
            <div className={classes.counter}><ItemCounter item={prop.item} canRemove={true}/></div>
        </div>
    )
}