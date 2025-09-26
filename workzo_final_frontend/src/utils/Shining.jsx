import { motion } from "framer-motion";

const ShiningButton = ({ text }) => {
  return (
    <motion.button
      className="relative px-2 py-1 font-semibold text-white bg-green-500 rounded-lg shadow-lg overflow-hidden border border-green-400 mt-1"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={() =>
        window.open(
          "https://chromewebstore.google.com/detail/workzo-autofill/cehdmlgfdkngdalpkhbdeepedicloocd?hl=en-US&utm_source=ext_sidebar",
          "_blank"
        )
      }
    >
      {text}
      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shining_1.5s_linear_infinite]" />
      <style>
        {`
          @keyframes shining {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </motion.button>
  );
};

export default ShiningButton;
