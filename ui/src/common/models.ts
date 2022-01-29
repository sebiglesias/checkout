export type Item = {
    id: string
    image_id: string
    name: string
    price: string
    categoryId: string
}

export type Category = {
    id: string
    name: string
    image_id: string
}

export type CartItem = {
    item: Item
    quantity: number
}

export type Order = {
    id: string
    items: {
        item: Item
        quantity: number
        price: number
    }[]
}

export enum OrderHeaderState {
    WAITING_FOR_PAYMENT,
    PAYED
}