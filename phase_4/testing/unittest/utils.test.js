import { sum,
    greeting,
    isEven,
    ANIMALS,
    getOrderByID,
    createOrder
 } from "./utils.js";

import { getUserDB, createOrderDB } from './db.js';
import { sendEmail } from "./email.js";

// Mock the ENTIRE module with named exports
jest.mock("./db.js", () => ({
    getOrder: jest.fn(),
    getUserDB: jest.fn(),
    createOrderDB: jest.fn(),
  }));;

jest.mock("./email.js", () => ({
    sendEmail: jest.fn(),
}))

describe('sum', () => {
    test("return sum of a, b", () =>{
        const result = sum(2, 4);
        expect(result).toBe(6);
        expect(result).toBeGreaterThan(5);
        expect(result).toBeGreaterThanOrEqual(5);
        expect(result).toBeGreaterThanOrEqual(6);
    
        // But dealing with floating number is little different
        // expect(sum(0.1, 0.2)).toBe(0.3); // not pass: "Received: 0.30000000000000004"
        expect(sum(0.1, 0.2)).toBeCloseTo(0.3); // pass
    })
})

describe('greeting', () => {
    test("return hello followed by name", () => {
        const greetingMahmoud = greeting('Mahmoud');
        
        expect(greetingMahmoud).toBe('Hello, Mahmoud!');
        // it's good in testing to be not very specific and not be very generic.
        // So it's better with strings to use toMatch

        expect(greetingMahmoud).toMatch('Hello, Mahmoud');
    })
});

describe('isEven', () => {
    test('check if number is even or not', () => {
        expect(isEven(4)).toBeTruthy();
        expect(isEven(4)).not.toBeFalsy();

        expect(isEven(5)).toBeFalsy();
        expect(isEven(5)).not.toBeTruthy();
    })
})

describe('Validation', () => {
    test('should test if variable is undefined', () => {
        let x;
    
        expect(x).toBeUndefined();
        expect(x).not.toBeDefined();
    })
    
    test('should test if variable is defined', () => {
        let x = 5;

        expect(x).not.toBeUndefined();
        expect(x).toBeDefined();
    })

    test('should test if variable is null', () =>{
        let x = null;
        expect(x).toBeNull();
    })
})


describe('ANIMALS', () => {
    test('should test if cat is in array or not', () => {
        expect(ANIMALS).not.toBe("cat");
        expect(ANIMALS).toContain("cat");
    })
})

describe('getOrderByID', () => {
    it('Should return order by id', () => {
        const order = getOrderByID(5);

        // The function return the right object, so why is not.toBe?
        // toBe matcher is check both value and refrence, order and object reference are differnce
        // while toEqual is check value only
        expect(order).not.toBe({ id: 5, price: 123 });
        expect(order).toEqual({ id: 5, price: 123 });

        // it's better to use matcher that not so speciefic
        expect(order).toMatchObject({ id: 5, price: 123 })

        expect(order).toHaveProperty('id', 5);

        expect(() => getOrderByID()).toThrow()
    })
})

// describe('applyDiscount', () => {
//     it('should apply 10% discount for order price 10', () => {
//         // Setup mock implementation
//         getOrder.mockReturnValue({ id: 1, price: 10 });
        
//         const result = applyDiscount(1);
//         console.log(getOrder.mock)
        
//         // Verify the discount calculation
//         expect(result.price).toBe(9);
        
//         // Verify the mock was called correctly
//         expect(getOrder).toHaveBeenCalledWith(1);
//     });
// });


describe('getOrder', () => {
    it('Should to throw error if user is not defined', async () => {
        await expect(createOrder()).rejects.toThrowError('User Id not found');
    })

    it('Should create the order and send email', async () => {
        getUserDB.mockReturnValue({ id: 5, name: 'mohammed', email: 'test@gm.com' });

        const user = await getUserDB();
        const message = await createOrder(user.id, [{ price: 5 }, { price: 10 }]);

        expect(createOrderDB).toHaveBeenCalled();
        expect(getUserDB).toHaveBeenCalled();

        expect(createOrderDB).toHaveBeenCalledWith(user.id, [{ price: 5 }, { price: 10 }]);

        expect(sendEmail).toHaveBeenCalledWith(user.email, 15);
        // OR
        expect(sendEmail.mock.calls.length).toBe(1);
        expect(sendEmail.mock.calls[0][0]).toMatch('test@gm.com');
        expect(sendEmail.mock.calls[0][1]).toBe(15);

        expect(message).toMatch(`Order created successfully`);
    })
})