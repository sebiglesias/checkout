import {Order} from "./models";

export class EnvUtil {
    public static getBaseUrl(): string {
        return process.env.BASE_URL || 'http://localhost:8080/'
    }

    public static getImageUrl(id: string) {
        return process.env.CDN_URL || `/images/${id}.jpg`
    }
}