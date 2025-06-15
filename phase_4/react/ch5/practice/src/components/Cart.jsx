import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";

const Cart = ({ cartItems, onIncrement, onDelete, onReset }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        // logic like fetch data from backend.
        navigate("/"); // Then, redirect to home page
    };

    return ( 
        <>
            <div className="m-5">
                <h1>Shopping Cart</h1>
                <button onClick={ onReset } className="w-20 h-10 rounded-lg bg-gray-700 text-white cursor-pointer">Reset</button>

                <div className="mt-10 w-50">
                    { cartItems.map(item => {
                            return (
                                <div key={item.id}>
                                    <div className="mt-4 flex w-full">
                                        <div><h1 className="font-bold text-blue-500">{item.name}</h1></div>
                                        <div className="ml-auto flex items-center space-x-2">
                                            <div className="bg-blue-600 text-white w-5 h-5 rounded-sm flex justify-center items-center">
                                                <span>{ item.count }</span>
                                            </div>
                                            <div onClick={ onIncrement(item) } className="ml-1 w-8 h-8 bg-blue-600 text-white flex justify-center items-center rounded-sm">
                                                <button className="cursor-pointer">+</button>
                                            </div>
                                            <div onClick={ onDelete(item) } className="ml-1">
                                                <FontAwesomeIcon className="cursor-pointer transition delay-150 duration-300 ease-in-out hover:text-red-500" icon={ faTrash } />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div>
                    <button onClick={ handleClick } className="wrap-anywhere bg-blue-500 text-white p-2 rounded-lg cursor-pointer">Go To Home</button>
                </div>
            </div>
        </>
     );
}
 
export default Cart;