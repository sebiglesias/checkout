import React, {useCallback, useMemo} from "react"
import {Category, Item} from "../common/models"
import {CategoryCard} from "../categoryCard/categoryCard"
import {ItemCard} from "../itemCard/itemCard"
import classes from "./catalogue.module.scss"
import {useDispatch} from "react-redux";
import {selectCategory} from "./catalogueSlice";

export type CatalogueProps = {
    categories: Category[]
    items: Item[]
    selectedCategory?: Category
}

export const Catalogue = (props: CatalogueProps) => {
    const dispatch = useDispatch()
    const { categories, items, selectedCategory } = props;

    const itemList = useMemo(() => {
        const list = !!selectedCategory ? items.filter(item => item.categoryId === selectedCategory.id) : []
        return list.map((item: Item, index) => <ItemCard key={index} item={item} />)
    }, [selectedCategory, items])

    const categoryList = useMemo(() => {
        const list = !!selectedCategory ? [] : categories
        return list.map((category, index) => <CategoryCard key={index} category={category} />)
    }, [selectedCategory, categories])

    const deSelectCategory = useCallback(() => {
        dispatch(selectCategory(undefined))
    }, [selectedCategory])

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <span className={classes.breadCrumb} onClick={deSelectCategory}>All Categories # </span>
                {!!selectedCategory && <>{selectedCategory.name}</>}
            </div>
            <div className={classes.list}>
                {categoryList}
                {itemList}
            </div>
        </div>
    )
}