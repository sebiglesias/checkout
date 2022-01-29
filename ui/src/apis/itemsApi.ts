import {EnvUtil} from "../common/envUtils";
import {CartItem, Category, Item, Order, OrderHeaderState} from "../common/models";

export class ItemsApi {
    private baseUrl = EnvUtil.getBaseUrl()

    getItems(): Promise<Item[]> {
        return fetch(this.baseUrl + 'menu')
            .then(response => response.json())
            .then(data => {
                return data
            });
    }

    getCategories(): Promise<Category[]> {
        return fetch(this.baseUrl + 'categories')
            .then(response => response.json())
            .then(data => {
                return data
            });
    }


    // These 2 posts to the `orders` endpoint would preferably be done to different endpoints in the api,
    // for simplicity I will reuse the same endpoint and perform validations on the api's side, which I admit is not the best.

    postBeforePaymentOrder(items: CartItem[]): Promise<Order> {
        return fetch(
            this.baseUrl + 'orders',
            {
                    method: 'POST',
                    body: JSON.stringify({
                        // fixed mocked values to show possible extensions to this implementation
                        store: 1,
                        client: 1,
                        items: items,
                        orderHeaderStateId: OrderHeaderState.WAITING_FOR_PAYMENT
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
            })
            .then(response => response.json())
            .then(data => {
                return data
            });
    }

    postAfterPaymentOrder(id: string): Promise<Order> {
        return fetch(
            this.baseUrl + 'orders',
            {
                method: 'POST',
                body: JSON.stringify({
                    id,
                    orderHeaderStateId: OrderHeaderState.PAYED,
                    // depending on a paymentType it may differ due to taxes or extra costs. But for this case, I will only
                    // use the price coming from the items.
                    payments: [{
                        paymentType: 0,
                        paymentAmount: 0
                    }]
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                return data
            });
    }
}