
import { motion } from "framer-motion";


const HeroBanner = () => {
  

  return (
    <section className="bg-gradient-to-b from-orange-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 text-sm font-medium text-orange-700 bg-orange-100 px-4 py-2 rounded-full"
          >
            🍽️ Homemade food from trusted chefs
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
          >
            Fresh homemade meals,
            <br />
            straight from local chefs
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base md:text-lg text-gray-600 max-w-xl"
          >
            Chef Bazaar connects you with skilled home chefs near you. Order
            daily meals, enjoy real flavors, and eat with confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <button className="px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition">
              Browse Meals
            </button>
            <button className="px-6 py-3 rounded-xl border border-orange-300 text-orange-600 font-semibold hover:bg-orange-50 transition">
              Become a Chef
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 flex items-center gap-6 text-sm text-gray-600"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
              Fast delivery
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              Verified chefs
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              Homemade food
            </div>
          </motion.div>
        </div>

        {/* Right Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          {/* Floating glow shapes */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -left-8 w-40 h-40 bg-orange-200 rounded-full blur-2xl opacity-70"
          />
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-12 -right-10 w-48 h-48 bg-orange-300 rounded-full blur-2xl opacity-60"
          />

          {/* Featured Meal Card */}
          <div className="relative bg-white border border-orange-200 rounded-3xl shadow-xl p-6 md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today’s Special</p>
                <h3 className="text-xl font-bold text-gray-900 mt-1">
                  Chicken Biryani
                </h3>
              </div>
              <span className="px-3 py-1 text-sm font-semibold rounded-full bg-orange-500 text-white">
                ⭐ 4.9
              </span>
            </div>

            <div className="mt-5 w-full h-44 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
              {/* Replace with actual image */}
              <p className="text-orange-700 font-medium">
                Meal Image
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Price</p>
                <p className="text-lg font-bold text-gray-900">$11.50</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
              >
                Order Now
              </motion.button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 text-orange-700">
                30 min delivery
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 text-orange-700">
                Freshly cooked
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-orange-50 text-orange-700">
                Home chef
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroBanner;