
import classes from './topBar.module.scss'
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import {SearchBar} from "../searchBar/searchBar";
import {Routes} from "../routes";
import {useSelector} from "react-redux";
import {AppState} from "../store";
import {useMemo} from "react";

export const TopBar = () => {
    const {items} = useSelector((state: AppState) => state.cart)

    const count = useMemo(() => {
        let count = 0
        items.forEach(item => {
            count += item.quantity
        })
        return count
    }, [items])

    return (
        <div className={classes.topBarContainer}>
            <Link to={Routes.home} className={classes.link}>SebCheckout</Link>
            <SearchBar />
            <Link to={Routes.cart} className={classes.cart}><FontAwesomeIcon icon={faShoppingCart} color={'white'}/>{count}</Link>
        </div>
    )
}