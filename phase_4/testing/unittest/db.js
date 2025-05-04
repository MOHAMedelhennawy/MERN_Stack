import axios from "axios";

export const getOrder = (orderId) => {
    return ({ id: orderId, price: 200});
}

export const fetchData = async () => {
    const data = await axios.get('http://url.com');
    return data;
}

export const createOrderDB = async (userId, products) => {
    return ({ orderId: 3, products, userId});
}

export const getUserDB = async (userId) => {
    return ({ userId, name: 'mohammed'});
}