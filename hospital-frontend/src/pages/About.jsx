import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Heart, Shield, Eye, Star, CheckCircle, Calendar, Phone } from 'lucide-react';
import { getDoctors } from '../services/api';
import DoctorCard from '../components/DoctorCard';
import { Link } from 'react-router-dom';
import { getHospitalSlug } from '../utils/subdomain';

export default function About({ hospital }) {
    const slug = getHospitalSlug();
    const basePath = slug ? `/${slug}` : '';
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const doctorsRes = await getDoctors(hospital?.id || 1);
                if (doctorsRes.data.success) {
                    setDoctors(doctorsRes.data.data.slice(0, 4));
                }
            } catch (error) {
                setDoctors([
                    { id: 1, name: 'Dr. Rajesh Kumar', specialty: 'Cataract & LASIK Surgeon', experience: 20, bio: 'Over 20 years of experience in cataract and refractive surgery.', image: null },
                    { id: 2, name: 'Dr. Priya Sharma', specialty: 'Retina Specialist', experience: 15, bio: 'Expert in retinal diseases and vitreous surgeries.', image: null },
                    { id: 3, name: 'Dr. Amit Patel', specialty: 'Cornea Specialist', experience: 12, bio: 'Specialized in corneal transplants and ocular surface diseases.', image: null },
                    { id: 4, name: 'Dr. Sneha Reddy', specialty: 'Pediatric Ophthalmologist', experience: 10, bio: 'Dedicated to child eye care and squint treatment.', image: null },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [hospital?.id]);

    const stats = [
        { icon: Users, value: '50K+', label: 'Patients Treated' },
        { icon: Award, value: '14+', label: 'Years Experience' },
        { icon: Heart, value: '98%', label: 'Success Rate' },
        { icon: Shield, value: '50+', label: 'Beds Facility' },
    ];

    const values = [
        { icon: Eye, title: 'Vision Excellence', description: 'Committed to providing the highest quality eye care with precision and expertise' },
        { icon: Heart, title: 'Patient First', description: 'Every patient receives personalized care and attention' },
        { icon: Shield, title: 'Safety First', description: 'Strict safety protocols and sterile environments' },
        { icon: Star, title: 'Innovation', description: 'Continuous adoption of latest technologies and techniques' },
    ];

    const timeline = [
        { year: '2010', title: 'Foundation', description: 'Started with a vision to provide world-class eye care in Amritsar' },
        { year: '2015', title: 'Expansion', description: 'Added advanced LASIK and retina surgery facilities' },
        { year: '2018', title: 'Recognition', description: 'Received best eye hospital award in Punjab' },
        { year: '2024', title: 'Growth', description: 'Expanded to 50+ beds with state-of-the-art infrastructure' },
    ];

    return (
        <div>
            {/* Hero Section */}
            <section className="relative pt-32 pb-20 bg-gradient-to-br from-gray-50 via-white to-primary-50">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            About <span className="text-gradient">{hospital?.name || 'Blink Eye Hospital'}</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8">
                            {hospital?.about_us || 'We are committed to providing the highest quality eye care services with cutting-edge technology and a team of experienced specialists.'}
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link to={`${basePath}/book-appointment`} className="btn-primary inline-flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                Book Consultation
                            </Link>
                            <a href={`tel:${hospital?.phone || '+919999999999'}`} className="btn-outline inline-flex items-center gap-2">
                                <Phone className="w-5 h-5" />
                                Call Now
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <stat.icon className="w-8 h-8 text-primary-600" />
                                </div>
                                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                                <p className="text-gray-600">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 bg-gray-50">
                <div className="container-custom">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                Our Story
                            </h2>
                            <div className="space-y-4 text-gray-600">
                                <p>
                                    Founded in {hospital?.established_year || '2010'}, {hospital?.name || 'Blink Eye Hospital'} has been at the forefront of eye care in Amritsar and surrounding regions. Our journey began with a simple mission: to make world-class eye care accessible to everyone.
                                </p>
                                <p>
                                    Over the years, we have grown from a small clinic to a comprehensive eye hospital equipped with state-of-the-art technology and a team of highly skilled ophthalmologists.
                                </p>
                                <p>
                                    Today, we are proud to have helped over {stats[0].value} patients achieve better vision, with a success rate of {stats[2].value} across all our procedures.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-4"
                        >
                            {timeline.map((item, index) => (
                                <div
                                    key={item.year}
                                    className={`bg-white p-6 rounded-2xl shadow-md ${index % 2 === 1 ? 'mt-8' : ''}`}
                                >
                                    <p className="text-2xl font-bold text-primary-600 mb-2">{item.year}</p>
                                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="section-title">Our Values</h2>
                        <p className="section-subtitle mx-auto">
                            The principles that guide everything we do
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                            >
                                <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                                    <value.icon className="w-7 h-7 text-primary-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Why Choose Us?
                        </h2>
                        <p className="text-xl text-white/90">
                            Experience the difference of quality eye care
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            'Advanced Laser Technology',
                            'Expert Ophthalmologists',
                            'Comprehensive Eye Care',
                            'Sterile Operation Theatres',
                            'Personalized Treatment',
                            'Affordable Packages',
                        ].map((feature, index) => (
                            <motion.div
                                key={feature}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white"
                            >
                                <CheckCircle className="w-6 h-6 mb-3 text-accent-400" />
                                <p className="font-medium">{feature}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-gray-50">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="section-title">Meet Our Team</h2>
                        <p className="section-subtitle mx-auto">
                            Our experienced team of ophthalmologists is dedicated to providing you with the best possible care
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {loading ? (
                            Array(4).fill(0).map((_, i) => (
                                <div key={i} className="card animate-pulse">
                                    <div className="h-64 bg-gray-200" />
                                    <div className="p-6">
                                        <div className="h-6 bg-gray-200 rounded mb-2" />
                                        <div className="h-4 bg-gray-200 rounded" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            doctors.map((doctor, index) => (
                                <DoctorCard key={doctor.id} doctor={doctor} index={index} />
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Ready to Visit Us?
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Schedule a consultation with our experts and take the first step towards better vision.
                        </p>
                        <Link to={`${basePath}/book-appointment`} className="btn-primary inline-flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            Book Appointment
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
