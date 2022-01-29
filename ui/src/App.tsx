import React, {useEffect} from 'react';
import './App.module.scss';
import {Catalogue} from "./catalogue/catalogue";
import {TopBar} from "./topBar/topBar";
import {useSelector} from "react-redux";
import {AppState} from "./store";
import {useGetItems} from "./catalogue/hooks/useGetItems";
import {useGetCategories} from "./catalogue/hooks/useGetCategories";

import classes from "./App.module.scss"

export const App: React.FC = () => {
    const {categories, items, selectedCategory} = useSelector((state: AppState) => state.catalogue)
    const getItems = useGetItems()
    const getCategories = useGetCategories()

    useEffect(() => {
        if (items.length === 0 && categories.length === 0) {
            getItems().then().catch(e=> console.log(e))
            getCategories().then().catch(e=> console.log(e))
        }
    }, [categories, items])

    return (
        <div className={classes.container}>
            <TopBar/>
            <Catalogue categories={categories} items={items} selectedCategory={selectedCategory}/>
        </div>
    );
}

export default App;
