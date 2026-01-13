import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>ShopHub</Link>
        <div style={styles.links}>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/cart" style={styles.link}>Cart</Link>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  nav: { background: '#333', color: '#fff', padding: '1rem 0', marginBottom: '2rem' },
  container: { display: 'flex', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' },
  logo: { fontSize: '1.5rem', fontWeight: 'bold', color: '#fff', textDecoration: 'none' },
  links: { display: 'flex', gap: '1.5rem' },
  link: { color: '#fff', textDecoration: 'none' }
};

export default Navbar;