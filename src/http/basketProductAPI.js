import { $authHost } from "./index";

export const fetchBasketProducts = async () => {
    const { data } = await $authHost.get('api/basketProduct');
    return data
}

export const createBasketProducts = async (productId) => {
    console.log(productId);
    const { data } = await $authHost.post('api/basketProduct', { productId });
    return data
}