"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IngredientLegendButtonProps {
  specialIngredients: { name: string; className: string; check: boolean }[];
}

const IngredientLegendButton: React.FC<IngredientLegendButtonProps> = ({ specialIngredients }) => {
  const [showLegend, setShowLegend] = useState(false);

  return (
    <>
      {/* Botón flotante centrado verticalmente con animación de pulso */}
      <motion.button
        className="fixed z-50 p-4 text-white transition rounded-full shadow-lg top-1/2 right-6 bg-primary-background-800 hover:bg-primary-background-700"
        style={{ transform: "translateY(-50%)" }}
        onClick={() => setShowLegend(!showLegend)}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.2 }}
      >
        🛈
      </motion.button>

      {/* Leyenda animada */}
      <AnimatePresence>
        {showLegend && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
            className="fixed z-50 p-4 text-white rounded-lg shadow-lg top-1/2 right-20 bg-black/80 w-52"
            style={{ transform: "translateY(-50%)" }}
          >
            <h4 className="mb-2 font-bold text-center">Ingredientes</h4>
            <ul className="flex flex-col gap-2">
              {specialIngredients.map(
                (item, index) =>
                  item.check && (
                    <li key={index} className="flex items-center gap-2">
                      <span className={`w-4 h-4 ${item.className} rounded-full`}></span>
                      {item.name}
                    </li>
                  )
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default IngredientLegendButton;


