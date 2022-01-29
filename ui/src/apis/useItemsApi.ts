import {ItemsApi} from "./itemsApi";
import {useMemo} from "react";

export const useItemsApi = () => {
    return useMemo(() => {
        return new ItemsApi()
    }, [])
}
