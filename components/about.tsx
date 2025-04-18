"use client"

import { motion } from "framer-motion"

export default function About() {
  return (
    <section id="about" className="py-20 px-6 md:px-12 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              About Spark AI Studios
            </span>
          </h2>

          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -left-4 -top-4 w-8 h-8 border-l-2 border-t-2 border-purple-500 opacity-60" />
            <div className="absolute -right-4 -bottom-4 w-8 h-8 border-r-2 border-b-2 border-pink-500 opacity-60" />

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-center md:text-left">
              SparkAI.studio is a micro-studio for curiosity-driven, AI-first experiments. We explore real-world
              applications of recent advances in AI — across real estate, wellness, commerce, and creativity — with a
              focus on rapid prototyping and iteration.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
