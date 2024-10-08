import React from 'react';
import { motion } from 'framer-motion';
import TypingEffect from 'react-typing-effect';
import { Container } from 'react-bootstrap';

const HomeScreen = () => {
  return (
    <Container className="text-center">
      {/* Welcome Message with Motion */}
      <motion.h1
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="my-5"
      >
        Welcome to Prodigy Tech
      </motion.h1>
      
      {/* Typing Effect for About Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        <div className="lead">
          <TypingEffect
            text={[
              "Our platform provides secure user authentication...",
              "Seamless access management is our top priority.",
              "Register and explore functionalities for data security and integrity!"
            ]}
            speed={100}
            eraseDelay={2000}
            typingDelay={500}
            className="lead"
          />
        </div>
      </motion.div>

      <style>{`
        .emoji-link {
          font-size: 24px;
          text-decoration: none;
          margin: 10px;
          color: #007bff;
          cursor: pointer;
          font-weight: bold;
        }

        .emoji-link:hover {
          color: #0056b3;
        }
      `}</style>
    </Container>
  );
};

export default HomeScreen;
