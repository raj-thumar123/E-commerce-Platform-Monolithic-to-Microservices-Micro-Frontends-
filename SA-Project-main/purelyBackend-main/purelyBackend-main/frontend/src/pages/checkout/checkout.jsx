import Logo from '../../components/logo/logo';
import './checkout.css';
import { useForm } from 'react-hook-form';
import CopyRight from '../../components/footer/copyright';
import OrderService from '../../api-service/order.service';
import { useContext } from 'react';
import CartContext from '../../contexts/cart.contect';
import { Link } from 'react-router-dom';
import CheckoutService from '../../api-service/Checkout.service'; // Import CheckoutService

const CheckoutForm = () => {
    const { register, handleSubmit, formState } = useForm();
    const { isLoading, error, placeOrder } = OrderService();
    const { cart, cartError, isProcessingCart } = useContext(CartContext);
    const { checkoutLoading, checkoutError, initiateCheckout } = CheckoutService(); // Use CheckoutService

    const onSubmit = async (data) => {
        try {
            // Place the order in the backend first
           // await placeOrder(data, cart.cartId);

            // Once order is placed successfully, initiate Stripe Checkout
            await initiateCheckout(cart.subtotal, "Order Payment");
            await placeOrder(data, cart.cartId);
        } catch (error) {
            console.error("Order or Payment Failed:", error);
        }
    };

    return (
        <>
            <header className='app-header'><Logo /></header>
            <div className="checkout-container">
                <h1>Checkout</h1>
                <div className='checkout-wrapper'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {error && <small className="text-danger">{error}</small>}
                        {checkoutError && <small className="text-danger">{checkoutError}</small>}
                        
                        <div className="input-box">
                            <label htmlFor="fname" className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Eg. John"
                                {...register('fname', { required: "First name is required!" })}
                            />
                            {formState.errors.fname && <small className="text-danger">{formState.errors.fname.message}</small>}
                        </div>

                        <div className="input-box">
                            <label htmlFor="lname" className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Eg. Smith"
                                {...register('lname', { required: "Last name is required!" })}
                            />
                            {formState.errors.lname && <small className="text-danger">{formState.errors.lname.message}</small>}
                        </div>

                        <div className="input-box">
                            <label htmlFor="address1" className="form-label">Address Line 1</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Eg. House No, Street No, Area"
                                {...register('address1', { required: "Address line 1 is required!" })}
                            />
                            {formState.errors.address1 && <small className="text-danger">{formState.errors.address1.message}</small>}
                        </div>

                        <div className="input-box">
                            <label htmlFor="city" className="form-label">City</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Eg. Point Pedro"
                                {...register('city', { required: "City is required!" })}
                            />
                            {formState.errors.city && <small className="text-danger">{formState.errors.city.message}</small>}
                        </div>

                        <div className="input-box">
                            <label htmlFor="phone" className="form-label">Phone Number</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Eg. 07xxxxxxxx"
                                {...register('phone', { required: "Phone is required!" })}
                            />
                            {formState.errors.phone && <small className="text-danger">{formState.errors.phone.message}</small>}
                        </div>

                        <button
                            type="submit"
                            className={isLoading || checkoutLoading ? "loading" : ""}
                            disabled={isLoading || checkoutLoading}
                        >
                            {isLoading || checkoutLoading ? "Processing..." : "Place Order"}
                        </button>
                    </form>

                    <summary>
                        <h2>Order Summary</h2>
                        <hr />
                        {cart?.cartItems.map((cartItem) => (
                            <div className="product" key={cartItem.productId}>
                                <img src={`${cartItem.imageUrl}`} alt={cartItem.productName} />
                                <div className="product-info">
                                    <h4>{cartItem.productName}</h4>
                                    <span className="product-price">
                                        {cartItem.price} x {cartItem.quantity} = Rs. {parseFloat(cartItem.amount).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        ))}
                        <hr />
                        <h3><span>Sub Total</span><span>Rs. {parseFloat(cart?.subtotal).toFixed(2)}</span></h3><br />
                        <small>Delivery charges will be added at your doorstep by our staff when we deliver your order.</small>
                        <br />
                        <Link to="/"><button>Edit cart</button></Link>
                    </summary>
                </div>
            </div>
            <CopyRight />
        </>
    );
};

export default CheckoutForm;
