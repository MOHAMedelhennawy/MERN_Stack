import { getOrder, createOrderDB, getUserDB } from "./db.js";  // Not a default import
import { sendEmail } from "./email.js";

export const sum = (a, b) => {
    return a + b;
}

export const greeting = (name) => `Hello, ${name}!`;

export const isEven = (num) => num % 2 === 0;

export const ANIMALS = ["cat", "dog", "monkey"];

export const getOrderByID = (id) => {
    if (!id) throw new Error('id is missing');
    return { id: 5, price: 123 };
}

export const applyDiscount = (orderId) => {
    const order = getOrder(orderId);

    if (order.price >= 10)
        order.price *= 0.9;

    return order;
}

export const createOrder = async (userId, products) => {

    if (!userId) {
        throw new Error('User Id not found');
    }

    let totalPrice = 0;

    products.forEach(product => {
        totalPrice += product.price;
    });

    await createOrderDB(userId, products);

    const user = await getUserDB(userId);
    await sendEmail(user.email, totalPrice);

    return `Order created successfully with total price ${totalPrice} and products ${products}`;
}