import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

const VolumePump = ({ onPump }) => {
    const [isDown, setIsPumped] = useState(false);

    const MAX_TRAVEL = 80;

    const handleDrag = (event, info) => {

        if (isDown == false && info.offset.y >= MAX_TRAVEL * 0.9) { 
            setIsPumped(true)
            onPump()
        }
        else if (isDown == true && info.offset.y <= 10) {
            setIsPumped(false)
        }
    };


  return (
    <div className="pump-container">
      <motion.div
        className="pump-handle-group"
        drag="y"
        dragConstraints={{top: 0, bottom: MAX_TRAVEL}}
        dragElastic={0}

        onDrag={handleDrag} 
      >
        <div className="pump-grip"></div>  
        <div className="pump-rod"></div>   
      </motion.div>

      <div className="pump-base"></div>
    </div>
  );
};

export default VolumePump;
