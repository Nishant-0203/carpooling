import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear JWT token
    navigate('/login'); // Redirect to login
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>🚗 Carpooling App</h2>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/create-ride" style={styles.link}>Create Ride</Link>
        <Link to="/search-ride" style={styles.link}>Search Ride</Link>
        {isLoggedIn ? (
          <button onClick={handleLogout} style={styles.button}>Logout</button>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/signup" style={styles.link}>Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    padding: '1rem 2rem',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    margin: 0,
  },
  links: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    padding: '0.4rem 1rem',
    cursor: 'pointer',
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  }
};

export default Navbar;
