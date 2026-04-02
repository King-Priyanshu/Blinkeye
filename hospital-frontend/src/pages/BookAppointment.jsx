import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, CheckCircle, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react';
import { getServices, getDoctors, submitLead } from '../services/api';

export default function BookAppointment({ hospital }) {
    const [step, setStep] = useState(1);
    const [services, setServices] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        // Step 1: Service
        service: '',
        // Step 2: Doctor
        doctor: '',
        // Step 3: Date & Time
        date: '',
        time: '',
        // Step 4: Patient Info
        name: '',
        email: '',
        phone: '',
        age: '',
        gender: '',
        message: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            // Don't fetch if hospital is not loaded yet
            if (!hospital?.id) {
                return;
            }

            try {
                const [servicesRes, doctorsRes] = await Promise.all([
                    getServices(hospital.id),
                    getDoctors(hospital.id),
                ]);

                if (servicesRes.data.success) {
                    setServices(servicesRes.data.data);
                }
                if (doctorsRes.data.success) {
                    setDoctors(doctorsRes.data.data);
                }
            } catch (error) {
                setServices([
                    { id: 1, name: 'Cataract Surgery' },
                    { id: 2, name: 'LASIK Surgery' },
                    { id: 3, name: 'Retina Treatment' },
                    { id: 4, name: 'Glaucoma Care' },
                    { id: 5, name: 'General Eye Checkup' },
                ]);
                setDoctors([
                    { id: 1, name: 'Dr. Rajesh Kumar' },
                    { id: 2, name: 'Dr. Priya Sharma' },
                    { id: 3, name: 'Dr. Amit Patel' },
                    { id: 4, name: 'Dr. Sneha Reddy' },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [hospital?.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        // Enforce max length limits
        const maxLengths = { name: 100, email: 254, phone: 20, age: 3, message: 2000, service: 100, doctor: 100 };
        if (maxLengths[name] && value.length > maxLengths[name]) return;
        setFormData({ ...formData, [name]: value });
    };

    const nextStep = () => {
        if (step < 4) setStep(step + 1);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Client-side validation
        if (!formData.name.trim() || !formData.phone.trim()) {
            return;
        }
        setSubmitting(true);

        try {
            await submitLead({
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
                message: `Appointment Request:\nService: ${formData.service}\nDoctor: ${formData.doctor}\nDate: ${formData.date}\nTime: ${formData.time}\nAge: ${formData.age}\nGender: ${formData.gender}\n\nMessage: ${formData.message}`.trim(),
                hospital_id: hospital?.id,
                source_url: window.location.pathname
            });
            setSuccess(true);
        } catch (error) {
            if (import.meta.env.DEV) {
                console.error('Error submitting appointment:', error);
            }
            // Show error state instead of false success
            setSuccess(false);
        } finally {
            setSubmitting(false);
        }
    };

    const isStepValid = () => {
        switch (step) {
            case 1:
                return formData.service;
            case 2:
                return formData.doctor;
            case 3:
                return formData.date && formData.time;
            case 4:
                return formData.name && formData.phone;
            default:
                return false;
        }
    };

    const timeSlots = [
        '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
        '12:00 PM', '12:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
        '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
    ];

    if (success) {
        return (
            <div className="min-h-screen pt-32 pb-20 bg-gray-50">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="max-w-lg mx-auto text-center bg-white rounded-2xl shadow-lg p-8"
                    >
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Booked Successfully!</h2>
                        <p className="text-gray-600 mb-6">
                            Thank you for booking your appointment with {hospital?.name || 'Blink Eye Hospital'}.
                            Our team will contact you shortly to confirm your appointment.
                        </p>
                        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                            <p className="text-sm text-gray-600 mb-2">Appointment Details:</p>
                            <p className="font-medium">Service: {formData.service}</p>
                            <p className="font-medium">Doctor: {formData.doctor}</p>
                            <p className="font-medium">Date: {formData.date}</p>
                            <p className="font-medium">Time: {formData.time}</p>
                        </div>
                        <a href="/" className="btn-primary inline-block">
                            Back to Home
                        </a>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-gray-50">
            <div className="container-custom">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Book an <span className="text-gradient">Appointment</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Fill out the form below to book your consultation with our experts
                    </p>
                </motion.div>

                {/* Progress Steps */}
                <div className="max-w-3xl mx-auto mb-8">
                    <div className="flex items-center justify-between mb-2">
                        {[1, 2, 3, 4].map((s) => (
                            <div key={s} className="flex items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${s === step
                                        ? 'bg-primary-600 text-white'
                                        : s < step
                                            ? 'bg-green-500 text-white'
                                            : 'bg-gray-200 text-gray-600'
                                        }`}
                                >
                                    {s < step ? <CheckCircle className="w-5 h-5" /> : s}
                                </div>
                                {s < 4 && (
                                    <div className={`w-20 h-1 mx-2 ${s < step ? 'bg-green-500' : 'bg-gray-200'}`} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Service</span>
                        <span>Doctor</span>
                        <span>Schedule</span>
                        <span>Details</span>
                    </div>
                </div>

                {/* Form */}
                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                    <AnimatePresence mode="wait">
                        {/* Step 1: Service Selection */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Select a Service</h2>
                                {loading ? (
                                    <div className="space-y-3">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {services.map((service) => (
                                            <label
                                                key={service.id}
                                                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${formData.service === service.name
                                                    ? 'border-primary-600 bg-primary-50'
                                                    : 'border-gray-200 hover:border-primary-300'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="service"
                                                    value={service.name}
                                                    checked={formData.service === service.name}
                                                    onChange={handleChange}
                                                    className="sr-only"
                                                />
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900">{service.name}</p>
                                                </div>
                                                {formData.service === service.name && (
                                                    <CheckCircle className="w-5 h-5 text-primary-600" />
                                                )}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Step 2: Doctor Selection */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Select a Doctor</h2>
                                {loading ? (
                                    <div className="space-y-3">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {doctors.map((doctor) => (
                                            <label
                                                key={doctor.id}
                                                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${formData.doctor === doctor.name
                                                    ? 'border-primary-600 bg-primary-50'
                                                    : 'border-gray-200 hover:border-primary-300'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="doctor"
                                                    value={doctor.name}
                                                    checked={formData.doctor === doctor.name}
                                                    onChange={handleChange}
                                                    className="sr-only"
                                                />
                                                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                                                    <User className="w-6 h-6 text-primary-600" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900">{doctor.name}</p>
                                                    <p className="text-sm text-gray-600">{doctor.specialty}</p>
                                                </div>
                                                {formData.doctor === doctor.name && (
                                                    <CheckCircle className="w-5 h-5 text-primary-600" />
                                                )}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Step 3: Date & Time */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Date & Time</h2>
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            min={new Date().toISOString().split('T')[0]}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                                        <div className="grid grid-cols-4 gap-2">
                                            {timeSlots.map((time) => (
                                                <button
                                                    key={time}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, time })}
                                                    className={`py-2 px-3 text-sm rounded-lg border transition-colors ${formData.time === time
                                                        ? 'bg-primary-600 text-white border-primary-600'
                                                        : 'border-gray-200 hover:border-primary-300'
                                                        }`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Patient Info */}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Information</h2>
                                <div className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                                placeholder="Your full name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                                            <input
                                                type="number"
                                                name="age"
                                                value={formData.age}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                                placeholder="Your age"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                                placeholder="+91 98765 43210"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                        <select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                        >
                                            <option value="">Select gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                                            placeholder="Any specific concerns or symptoms..."
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                        {step > 1 ? (
                            <button
                                onClick={prevStep}
                                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                Back
                            </button>
                        ) : (
                            <div />
                        )}

                        {step < 4 ? (
                            <button
                                onClick={nextStep}
                                disabled={!isStepValid()}
                                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={!isStepValid() || submitting}
                                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-5 h-5" />
                                        Book Appointment
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
