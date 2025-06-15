import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

const Products = (props) => {

    const toggleCart = (product) => {
        return () => {
            props.addToCart(product);

        }
    }

    const isProductInCart = (product) => {
        return props.cartItems.some(item => item.id === product.id)
    }
    
    return ( 
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Product name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            
                        </th>
                    </tr>
                </thead>
                <tbody>
                    { props.products.map((product) => {

                        const inCart = isProductInCart(product);

                        return (
                            <tr key={ product.id } className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    { product.name }
                                </th>
                                <td className="px-6 py-4">
                                    { product.price }
                                </td>
                                <td onClick={ toggleCart(product) } className={`cursor-pointer`}>
                                    <FontAwesomeIcon className={ `${inCart ? 'text-gray-500' : 'text-gray-200'}` } icon={ faCartShopping } />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
 
export default Products;