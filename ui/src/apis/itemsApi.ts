import {EnvUtil} from "../common/envUtils";
import {Category, Item} from "../common/models";

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
}