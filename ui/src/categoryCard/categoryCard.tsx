import React, {useCallback} from 'react'
import classes from './categoryCard.module.scss'
import {Category} from "../common/models";
import {useDispatch} from "react-redux";
import {selectCategory} from "../catalogue/catalogueSlice";
import {EnvUtil} from "../common/envUtils";

export type CategoryProps = {
    category: Category
}

export const CategoryCard = (props: CategoryProps) => {
    const dispatch = useDispatch()
    const {name, image_id} = props.category

    const pickCategory = useCallback(() => {
        dispatch(selectCategory(props.category))
    }, [props.category])

    return (
        <button className={classes.container} onClick={pickCategory}>
            <div className={classes.header}>{name}</div>
            <img className={classes.img} src={EnvUtil.getImageUrl(image_id)}  alt={"category image"}/>
        </button>
    )
}