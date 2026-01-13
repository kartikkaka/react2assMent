import { useCart, useUpdateCartItem, useDeleteCartItem } from '../queries';

const Cart = () => {
  const { data: cartItems, isLoading, error } = useCart();
  const updateMutation = useUpdateCartItem();
  const deleteMutation = useDeleteCartItem();

  if (isLoading) return <div className="loading">Loading cart...</div>;
  if (error) return <div className="error">Error loading cart.</div>;

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="container empty-cart">
        <h2>Your cart is empty</h2>
        <p>Go back to home and shop some items!</p>
      </div>
    );
  }

  // --- Calculations ---
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * 0.10; // 10%
  const total = subtotal + tax;

  return (
    <div className="container cart-page">
      <h1>Shopping Cart</h1>
      
      <div className="cart-grid">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-info">
                <h3>{item.title}</h3>
                <p>Unit Price: ${item.price}</p>
              </div>
              
              <div className="item-controls">
                <div className="quantity-wrapper">
                  <button 
                    onClick={() => updateMutation.mutate({ id: item.id, quantity: item.quantity - 1 })}
                    disabled={item.quantity <= 1 || updateMutation.isPending}
                    className="btn-small"
                  > - </button>
                  
                  <span className="qty-display">{item.quantity}</span>
                  
                  <button 
                    onClick={() => updateMutation.mutate({ id: item.id, quantity: item.quantity + 1 })}
                    disabled={updateMutation.isPending}
                    className="btn-small"
                  > + </button>
                </div>

                <button 
                  onClick={() => deleteMutation.mutate(item.id)}
                  className="btn-delete"
                >
                  Remove
                </button>
              </div>
              
              <div className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax (10%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <hr />
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="btn btn-primary btn-block">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;