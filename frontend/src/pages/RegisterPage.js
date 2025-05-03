import React, { useState } from 'react';
import axios from 'axios'; // Or use fetch

function RegisterPage() {
  // State variables for form inputs
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setcontrasena] = useState('');
  const [telefono, setTelefono] = useState('');

  // State variables for feedback and loading status
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // --- IMPORTANT: Backend API Endpoint ---
  // This should match the route configured in your backend (server.js and authRoutes.js)
  const REGISTER_API_URL = 'http://localhost:5000/api/auth/register'; // Example API route

  // --- Form Submission Handler ---
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setError(''); // Clear previous errors
    setSuccessMessage(''); // Clear previous success messages
    setLoading(true); // Set loading state

    // Simple frontend validation (add more as needed)
    if (!nombre || !apellido || !email || !contrasena || !telefono) {
      setError('Todos los campos son obligatorios.');
      setLoading(false);
      return;
    }
    // You could add more validation here (email format, contrasena strength, etc.)

    try {
      // --- Backend Request ---
      console.log(nombre, apellido, email, contrasena, telefono); // Debugging: Log the data being sent
      // Send the new user data to the backend endpoint.
      const REGISTER_API_URL = 'http://localhost:5000/api/auth/register';
      const response = await axios.post(REGISTER_API_URL, {
        nombre,
        apellido,
        email,
        contrasena: contrasena, // Ensure the key matches what the backend expects ('contrasena')
        telefono,
      });

      // --- Handle Successful Response ---
      console.log('Registro exitoso:', response.data);
      setSuccessMessage('¡Usuario registrado exitosamente! Ahora puedes iniciar sesión.');

      // Clear form fields after successful registration
      setNombre('');
      setApellido('');
      setEmail('');
      setcontrasena('');
      setTelefono('');

      // Optional: Redirect to login page after a delay
      // setTimeout(() => { window.location.href = '/login'; }, 3000);

    } catch (err) {
      // --- Handle Errors ---
      let errorMessage = 'Ocurrió un error durante el registro.'; // Default error message

      // Check if the error response from the backend has a specific message
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message; // Use backend message (e.g., "Email already registered")
      } else if (err.request) {
        // Handle network errors (couldn't reach the server)
        errorMessage = 'No se pudo conectar con el servidor. Inténtalo de nuevo.';
      }
      console.error('Error en el registro:', err); // Log the full error for debugging
      setError(errorMessage); // Display the error message to the user
    } finally {
      setLoading(false); // Reset loading state regardless of success or failure
    }
  };

  // --- Inline Styles (Consider moving to CSS/Styled Components for larger apps) ---
  const styles = {
    registerContainer: {
      maxWidth: '450px',
      margin: '50px auto',
      padding: '30px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f9f9f9',
      fontFamily: 'sans-serif',
    },
    heading: {
      textAlign: 'center',
      marginBottom: '25px',
      color: '#333',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      color: '#555',
      fontWeight: 'bold',
      fontSize: '0.9rem',
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box', // Include padding and border in the element's total width and height
      fontSize: '1rem',
    },
    buttonBase: { // Base button styles
      width: '100%',
      padding: '12px',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      marginTop: '10px',
      transition: 'background-color 0.2s ease',
    },
    buttonEnabled: { // Styles when button is enabled
      backgroundColor: '#28a745', // Green for register
    },
    buttonDisabled: { // Styles when button is disabled (loading)
      backgroundColor: '#aaa',
      cursor: 'not-allowed',
    },
    errorMessage: { // Error message styles
      color: '#d9534f', // Red
      backgroundColor: '#f2dede',
      border: '1px solid #ebccd1',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '15px',
      textAlign: 'center',
      fontSize: '0.9rem',
    },
    successMessage: { // Success message styles
      color: '#155724', // Dark green
      backgroundColor: '#d4edda', // Light green
      border: '1px solid #c3e6cb',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '15px',
      textAlign: 'center',
      fontSize: '0.9rem',
    },
    loadingMessage: {
      textAlign: 'center',
      color: '#555',
      marginBottom: '15px',
    },
    loginLink: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '0.9rem',
    }
  };

  // Dynamically set button style based on loading state
  const buttonStyle = {
    ...styles.buttonBase,
    ...(loading ? styles.buttonDisabled : styles.buttonEnabled),
  };

  // --- JSX Structure ---
  return (
    <div style={styles.registerContainer}>
      <h2 style={styles.heading}>Registro de Nuevo Usuario</h2>
      <form onSubmit={handleSubmit} noValidate> {/* noValidate disables browser's default validation */}

        {/* Display error or success messages */}
        {error && <p style={styles.errorMessage}>{error}</p>}
        {successMessage && <p style={styles.successMessage}>{successMessage}</p>}

        {/* Form Fields */}
        <div style={styles.formGroup}>
          <label htmlFor="nombre" style={styles.label}>Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required // HTML5 validation attribute (basic)
            disabled={loading} // Disable input while loading
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="apellido" style={styles.label}>Apellido:</label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
            disabled={loading}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="contrasena" style={styles.label}>Contraseña:</label>
          <input
            type="contrasena"
            id="contrasena"
            value={contrasena}
            onChange={(e) => setcontrasena(e.target.value)}
            required
            disabled={loading}
            style={styles.input}
          />
          {/* Consider adding a contrasena confirmation field */}
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="telefono" style={styles.label}>Teléfono:</label>
          <input
            type="tel" // Use type="tel" for potential mobile optimizations
            id="telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            disabled={loading}
            style={styles.input}
          />
        </div>

        {/* Loading Indicator */}
        {loading && <p style={styles.loadingMessage}>Registrando...</p>}

        {/* Submit Button */}
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? 'Cargando...' : 'Registrarme'}
        </button>
      </form>

      {/* Link to Login Page */}
      <div style={styles.loginLink}>
        ¿Ya tienes cuenta? <a href="/login">Inicia Sesión</a> {/* Use Link component if using React Router */}
      </div>
    </div>
  );
}

export default RegisterPage;
