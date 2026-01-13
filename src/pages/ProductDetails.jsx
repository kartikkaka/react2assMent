import { useParams } from 'react-router-dom';
import { useProductById, useAddToCart } from '../queries';

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading, error } = useProductById(id);
  const addToCartMutation = useAddToCart();

  if (isLoading) return <div className="loading">Loading details...</div>;
  if (error) return <div className="error">Product not found.</div>;

  const handleAdd = () => {
    addToCartMutation.mutate({ 
      title: product.title, 
      price: product.price, 
      quantity: 1 
    });
  };

  return (
    <div className="container details-page">
      <div className="details-image">
        <img src={product.image || "https://placehold.co/400"} alt={product.title} />
      </div>
      <div className="details-info">
        <h1>{product.title}</h1>
        <p className="category">Category: {product.category}</p>
        <p className="description">{product.description}</p>
        <h2 className="price">${product.price}</h2>
        <button 
          onClick={handleAdd} 
          className="btn btn-primary btn-large"
          disabled={addToCartMutation.isPending}
        >
          {addToCartMutation.isPending ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;