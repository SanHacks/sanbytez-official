'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section id="home" className="min-h-screen pt-32 pb-16 lg:pt-40 lg:pb-24 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden flex items-center">
            {/* Animated gradient mesh background */}
            <div className="gradient-mesh"></div>

            {/* Floating geometric shapes */}
            <div className="floating-shape w-64 h-64 top-20 left-10 opacity-20"></div>
            <div className="floating-shape w-48 h-48 bottom-32 right-20 opacity-15"></div>
            <div className="floating-shape w-32 h-32 top-1/2 right-1/4 opacity-10"></div>

            {/* Background gradient */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-br from-blue-50/30 to-transparent pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Hero Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="hero-content"
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 hero-title">
                            Enterprise Software Solutions<br />
                            <span className="text-blue-900 hero-highlight">Built for Scale</span>
                        </h1>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                            className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl hero-description"
                        >
                            We deliver cutting-edge technology solutions that drive business transformation.
                            Trusted by leading enterprises for mission-critical software development,
                            cloud infrastructure, and digital innovation.
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                            className="flex flex-col sm:flex-row gap-4 mb-12 hero-buttons"
                        >
                            <Link href="#contact" className="cta-button magnetic-hover group inline-flex items-center justify-center px-8 py-4 bg-blue-900 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-800 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 active:scale-95 relative overflow-hidden transform hover:scale-105 glow-on-hover">
                                <span className="relative z-10 flex items-center">
                                    Schedule a Consultation
                                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </Link>
                            <Link href="#services" className="cta-button magnetic-hover group inline-flex items-center justify-center px-8 py-4 border-2 border-blue-900 text-blue-900 font-semibold rounded-lg hover:bg-blue-900 hover:text-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 active:scale-95 relative overflow-hidden transform hover:scale-105">
                                <span className="relative z-10 flex items-center">
                                    Our Services
                                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </Link>
                        </motion.div>
                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.7, delay: 0.6 }}
                            className="flex flex-wrap gap-8 pt-8 border-t border-gray-200 hero-stats"
                        >
                            <div className="group hover:scale-105 transition-transform duration-300 tilt-3d">
                                <h3 className="text-4xl font-bold text-blue-900 mb-2 counter-stat">20+</h3>
                                <p className="text-sm uppercase tracking-wider text-gray-600">Satisfied Clients</p>
                            </div>
                            <div className="group hover:scale-105 transition-transform duration-300 tilt-3d">
                                <h3 className="text-4xl font-bold text-blue-900 mb-2 counter-stat">8+</h3>
                                <p className="text-sm uppercase tracking-wider text-gray-600">Years Experience</p>
                            </div>
                            <div className="group hover:scale-105 transition-transform duration-300 tilt-3d">
                                <h3 className="text-4xl font-bold text-blue-900 mb-2 counter-stat">99.9%</h3>
                                <p className="text-sm uppercase tracking-wider text-gray-600">Uptime SLA</p>
                            </div>
                        </motion.div>
                    </motion.div>
                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="relative hero-image"
                    >
                        <div className="bg-white rounded-xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-300 tilt-3d glass-effect">
                            <svg width="100%" height="100%" viewBox="0 0 600 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:scale-105 transition-transform duration-300">
                                <rect width="600" height="500" fill="#f8fafc" />
                                <rect x="50" y="50" width="500" height="400" rx="8" fill="white" stroke="#e5e7eb" strokeWidth="2" />
                                <rect x="80" y="80" width="200" height="30" rx="4" fill="#e5e7eb" />
                                <rect x="80" y="130" width="150" height="20" rx="4" fill="#e5e7eb" />
                                <rect x="80" y="160" width="180" height="20" rx="4" fill="#e5e7eb" />
                                <rect x="80" y="200" width="440" height="200" rx="4" fill="#f3f4f6" />
                                <circle cx="300" cy="300" r="60" fill="#2563eb" opacity="0.1" />
                                <path d="M280 280 L300 300 L320 280" stroke="#2563eb" strokeWidth="3" fill="none" />
                                <text x="300" y="330" textAnchor="middle" fill="#6b7280" fontSize="14" fontFamily="Inter, sans-serif">Enterprise Solutions</text>
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
