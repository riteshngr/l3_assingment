import React from 'react';

const About = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.header}>About Us</h1>
        <p style={styles.text}>
          Welcome to our platform. We are dedicated to providing the best travel 
          and exploration experiences. Our mission is to help you discover 
          hidden gems and must-visit locations with ease.
        </p>
        <p style={styles.text}>
          Founded with a passion for adventure, our team works tirelessly to 
          curate the best content for our users. Whether you are looking for 
          a weekend gateway or a long vacation, we are here to guide you.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  content: {
    backgroundColor: '#f9f9f9',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  header: {
    color: '#333',
    marginBottom: '20px',
  },
  text: {
    color: '#555',
    lineHeight: '1.6',
    marginBottom: '15px',
    fontSize: '1.1rem',
  }
};

export default About;