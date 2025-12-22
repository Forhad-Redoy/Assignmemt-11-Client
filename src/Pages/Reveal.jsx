import React from 'react';
import { motion } from "framer-motion";
const Reveal = ( {children, delay = 0, y = 40}) => {
    return (
          <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
    );
};

export default Reveal;