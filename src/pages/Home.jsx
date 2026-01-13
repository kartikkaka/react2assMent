const Home = () => {
  const { data: products = {}, isLoading, error } = useProducts();
  const addToCartMutation = useAddToCart();

  if (isLoading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error loading products.</div>;

  const handleQuickAdd = (product) => {
    addToCartMutation.mutate({ 
      title: product.title, 
      price: product.price, 
      quantity: 1 
    });
  };

  return (
    <div className="container">
      <h1>Featured Products</h1>
      <div className="grid">
        {products.products?.map((product) => (
          <div key={product.id} className="card">
            <div className="image-placeholder">
              <img 
                src={product.image || "https://placehold.co/200"} 
                alt={product.title} 
                style={{ width:'100%', height:'200px', objectFit:'cover' }} 
              />
            </div>
            <div className="card-body">
              <h3>{product.title}</h3>
              <p className="price">${product.price}</p>
              <div className="actions">
                <Link to={`/product/${product.id}`} className="btn btn-outline">View Details</Link>
                <button 
                  onClick={() => handleQuickAdd(product)} 
                  className="btn btn-primary"
                  disabled={addToCartMutation.isPending}
                >
                  {addToCartMutation.isPending ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;