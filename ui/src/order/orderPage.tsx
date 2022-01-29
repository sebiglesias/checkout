import {EnvUtil} from "../common/envUtils";
import {Order} from "../common/models";
import {useMemo} from "react";
import {CartItemSummary} from "../cart/cartItemSummary/cartItemSummary";


export const OrderPage = () => {
    const tempOrder: Order = EnvUtil.getTempOrder();

    const itemlist = useMemo(() => {
        return tempOrder.items.map((item, index) => <CartItemSummary cartItem={item} key={index} />)
    }, [])

    return (
        <div>
            <h1>Order was performed successfully</h1>
            <div>
                <h2>Order Details</h2>

            </div>
        </div>
    )
}