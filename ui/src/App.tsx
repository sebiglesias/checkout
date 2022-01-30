import React, {useEffect} from 'react';
import './App.module.scss';
import {Catalogue} from "./catalogue/catalogue";
import {TopBar} from "./topBar/topBar";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "./store";
import {useGetItems} from "./catalogue/hooks/useGetItems";
import {useGetCategories} from "./catalogue/hooks/useGetCategories";

import classes from "./App.module.scss"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Payment} from "./payment/payment";
import {OrderPage} from "./order/orderPage";
import {CartPage} from "./cart/cartPage";

import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addCategories, addItems} from "./catalogue/catalogueSlice";

export const App: React.FC = () => {
    const {categories, items, selectedCategory} = useSelector((state: AppState) => state.catalogue)
    const getItems = useGetItems()
    const getCategories = useGetCategories()
    const dispatch = useDispatch()

    useEffect(() => {
        if (items.length === 0 && categories.length === 0) {
            getItems().then((its) => dispatch(addItems(its)))
                .catch(e=> toast.error('There was a problem getting the product categories, try refreshing the page.'))
            getCategories().then((cats) => dispatch(addCategories(cats)))
                .catch(e=> toast.error("There was a problem getting the product categories, try refreshing the page."))
        }
    }, [categories, items])

    return (
        <div className={classes.container}>
            <ToastContainer/>
            <BrowserRouter>
                <>

                </>
                {/*Could probably use a wrapper component with the TopBat to put the navbar everywhere, but i'll see if i can do it on another iteration*/}
                <Routes>
                    <Route path="/" element={
                        <>
                            <TopBar withCart={true} withSearch={true} />
                            <Catalogue categories={categories} items={items} selectedCategory={selectedCategory}/>
                        </>
                    }
                    />
                    <Route path="/cart" element={
                        <>
                            <TopBar withSearch={false} withCart={true} />
                            <CartPage />
                        </>
                    } />
                    <Route path="/order" element={<OrderPage />} />
                    <Route path="/payment" element={<Payment />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
