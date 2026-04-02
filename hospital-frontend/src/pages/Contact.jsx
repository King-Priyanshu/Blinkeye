import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { submitLead } from '../services/api';
import { Link } from 'react-router-dom';

export default function Contact({ hospital }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Enforce max length limits
        const maxLengths = { name: 100, email: 254, phone: 20, message: 2000 };
        if (maxLengths[name] && value.length > maxLengths[name]) return;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Client-side validation
        if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
            setStatus('error');
            return;
        }
        setLoading(true);
        setStatus(null);

        try {
            await submitLead({
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                message: formData.message.trim(),
                hospital_id: hospital?.id,
                source_url: window.location.pathname
            });
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (error) {
            if (import.meta.env.DEV) {
                console.error('Error submitting form:', error);
            }
            setStatus('error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-50 via-white to-primary-50">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Contact <span className="text-gradient">Us</span>
                        </h1>
                        <p className="text-xl text-gray-600">
                            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-gray-50 rounded-2xl p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

                                {status === 'success' && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-green-800">Message Sent Successfully!</p>
                                            <p className="text-sm text-green-700">We'll get back to you soon.</p>
                                        </div>
                                    </div>
                                )}

                                {status === 'error' && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <p className="font-medium text-red-800">Something went wrong!</p>
                                            <p className="text-sm text-red-700">Please try again or call us directly.</p>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            placeholder="Your full name"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                            placeholder="+91 98765 43210"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                                            placeholder="How can we help you?"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full btn-primary flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </motion.div>

                        {/* Contact Info & Map */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            {/* Contact Cards */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="bg-gray-50 rounded-2xl p-6">
                                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                                        <Phone className="w-6 h-6 text-primary-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
                                    <a href={`tel:${hospital?.phone || '+919999999999'}`} className="text-gray-600 hover:text-primary-600">
                                        {hospital?.phone || '+91 99999 99999'}
                                    </a>
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-6">
                                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                                        <Mail className="w-6 h-6 text-primary-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                                    <a href={`mailto:${hospital?.email || 'info@blinkeyehospital.com'}`} className="text-gray-600 hover:text-primary-600">
                                        {hospital?.email || 'info@blinkeyehospital.com'}
                                    </a>
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-6 sm:col-span-2">
                                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                                        <MapPin className="w-6 h-6 text-primary-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Address</h3>
                                    <p className="text-gray-600">
                                        {hospital?.address || 'Mall Road, Amritsar, Punjab 143001'}
                                    </p>
                                </div>

                                <div className="bg-gray-50 rounded-2xl p-6 sm:col-span-2">
                                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                                        <Clock className="w-6 h-6 text-primary-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Working Hours</h3>
                                    <div className="text-gray-600 space-y-1 text-sm">
                                        <p>Mon - Fri: {hospital?.working_hours_weekday || '9:00 AM - 6:00 PM'}</p>
                                        {hospital?.working_hours_saturday && <p>Saturday: {hospital.working_hours_saturday}</p>}
                                        {hospital?.working_hours_sunday && <p className="text-red-500 font-medium">Sunday: {hospital.working_hours_sunday}</p>}
                                    </div>
                                </div>
                            </div>

                            {/* Map */}
                            <div className="bg-gray-50 rounded-2xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Find Us</h3>
                                <div className="aspect-video bg-gray-200 rounded-xl overflow-hidden">
                                    {hospital?.lat && hospital?.lng ? (
                                        <iframe
                                            src={hospital?.map_url || `https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(hospital.lng) - 0.015}%2C${parseFloat(hospital.lat) - 0.01}%2C${parseFloat(hospital.lng) + 0.015}%2C${parseFloat(hospital.lat) + 0.01}&layer=mapnik&marker=${hospital.lat}%2C${hospital.lng}`}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="Hospital Location"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <p>Map not available</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Emergency Contact */}
                            <div className={`bg-gradient-to-r ${hospital?.is_24_7_emergency ? 'from-red-500 to-red-600' : 'from-primary-500 to-primary-600'} rounded-2xl p-6 text-white`}>
                                <h3 className="text-lg font-semibold mb-2">{hospital?.is_24_7_emergency ? '24/7 Emergency' : 'Need Help?'}</h3>
                                <p className="opacity-90 mb-4">{hospital?.is_24_7_emergency ? 'Our emergency services are available round the clock' : 'Get in touch with our experts for any queries'}</p>
                                <a
                                    href={`tel:${hospital?.phone || '+919999999999'}`}
                                    className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-gray-50"
                                >
                                    <Phone className="w-5 h-5 text-primary-600" />
                                    {hospital?.is_24_7_emergency ? 'Emergency: ' : 'Call: '}{hospital?.phone || '+91 99999 99999'}
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
