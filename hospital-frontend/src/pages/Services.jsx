import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, ArrowRight, Calendar, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import { getServices } from '../services/api';
import { Link } from 'react-router-dom';
import { getHospitalSlug } from '../utils/subdomain';

export default function Services({ hospital }) {
    const slug = getHospitalSlug();
    const basePath = slug ? `/${slug}` : '';
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedService, setExpandedService] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            // Don't fetch if hospital is not loaded yet
            if (!hospital?.id) {
                setLoading(false);
                return;
            }
            
            try {
                const response = await getServices(hospital.id);
                if (response.data.success) {
                    setServices(response.data.data);
                }
            } catch (error) {
                setServices([
                    { id: 1, name: 'Cataract Surgery', description: 'Advanced phacoemulsification technique with premium IOL options for crystal clear vision.', image: null, details: 'Our cataract surgery uses the latest phacoemulsification technique with options for premium intraocular lenses (IOL) including multifocal and toric lenses. The procedure is pain-free, takes about 15-20 minutes, and most patients can return to normal activities the next day.' },
                    { id: 2, name: 'LASIK Surgery', description: 'Blade-free LASIK using advanced laser technology for permanent vision correction.', image: null, details: 'Our blade-free LASIK surgery uses advanced femtosecond laser technology to create a precise corneal flap. The procedure corrects nearsightedness, farsightedness, and astigmatism, giving you clear vision without glasses or contact lenses.' },
                    { id: 3, name: 'Retina Treatment', description: 'Expert care for retinal diseases including macular degeneration and diabetic retinopathy.', image: null, details: 'We provide comprehensive diagnosis and treatment for all retinal conditions including age-related macular degeneration (AMD), diabetic retinopathy, retinal detachment, and macular holes. Our treatments include laser therapy, injections, and vitrectomy surgery.' },
                    { id: 4, name: 'Glaucoma Care', description: 'Comprehensive diagnosis and treatment to prevent vision loss from glaucoma.', image: null, details: 'Glaucoma is often called the "silent thief of sight." We offer comprehensive glaucoma screening, diagnosis, and treatment including medication management, laser therapy (SLT), and surgical options to prevent vision loss.' },
                    { id: 5, name: 'Cornea Services', description: 'Corneal transplant and treatment for corneal diseases and infections.', image: null, details: 'Our cornea services include treatment for corneal infections, dystrophies, and injuries. We perform various types of corneal transplants including full-thickness (penetrating keratoplasty) and partial-thickness (DSAEK, DMEK) procedures.' },
                    { id: 6, name: 'Pediatric Eye Care', description: 'Specialized eye care for children including squint and amblyopia treatment.', image: null, details: 'We provide comprehensive eye care for children including screening for common childhood eye conditions like strabismus (squint), amblyopia (lazy eye), and refractive errors. Early detection and treatment are crucial for good vision development.' },
                    { id: 7, name: 'Oculoplasty', description: 'Cosmetic and reconstructive eyelid surgery.', image: null, details: 'Our oculoplasty services include cosmetic eyelid surgery (blepharoplasty), treatment for ptosis (drooping eyelids), eyelid tumor removal, and reconstruction after trauma or cancer surgery.' },
                    { id: 8, name: 'Squint Treatment', description: 'Expert diagnosis and treatment for strabismus (crossed eyes).', image: null, details: 'We offer comprehensive squint treatment including glasses, eye patches, vision therapy, and surgical alignment. Our specialists work with patients of all ages to achieve the best possible visual outcomes.' },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [hospital?.id]);

    const toggleService = (id) => {
        setExpandedService(expandedService === id ? null : id);
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
                            Our <span className="text-gradient">Services</span>
                        </h1>
                        <p className="text-xl text-gray-600">
                            Comprehensive eye care services using cutting-edge technology and proven treatment methods
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services List */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    {loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array(6).fill(0).map((_, i) => (
                                <div key={i} className="card animate-pulse">
                                    <div className="h-48 bg-gray-200" />
                                    <div className="p-6">
                                        <div className="h-6 bg-gray-200 rounded mb-2" />
                                        <div className="h-4 bg-gray-200 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {services.map((service, index) => (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.05 }}
                                    viewport={{ once: true }}
                                    className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
                                >
                                    <div className="grid md:grid-cols-4 gap-6 p-6">
                                        {/* Image */}
                                        <div className="md:col-span-1">
                                            <div className="aspect-video md:aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-primary-100 to-secondary-100">
                                                {service.image ? (
                                                    <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Eye className="w-12 h-12 text-primary-600" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="md:col-span-3">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                                                    <p className="text-gray-600 mb-4">{service.description}</p>
                                                </div>
                                                <button
                                                    onClick={() => toggleService(service.id)}
                                                    className="ml-4 p-2 text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                                                >
                                                    {expandedService === service.id ? (
                                                        <ChevronUp className="w-5 h-5" />
                                                    ) : (
                                                        <ChevronDown className="w-5 h-5" />
                                                    )}
                                                </button>
                                            </div>

                                            {/* Expanded Details */}
                                            {expandedService === service.id && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    transition={{ duration: 0.3 }}
                                                    className="mt-4 pt-4 border-t border-gray-200"
                                                >
                                                    <p className="text-gray-600 mb-4">
                                                        {service.details || 'Detailed information about this service will be provided during your consultation with our specialists.'}
                                                    </p>
                                                    <div className="flex flex-wrap gap-4">
                                                        <Link to={`${basePath}/book-appointment`} className="btn-primary inline-flex items-center gap-2 text-sm">
                                                            <Calendar className="w-4 h-4" />
                                                            Book Consultation
                                                        </Link>
                                                        <a href={`tel:${hospital?.phone || '+919999999999'}`} className="btn-outline inline-flex items-center gap-2 text-sm">
                                                            <Phone className="w-4 h-4" />
                                                            Call Now
                                                        </a>
                                                    </div>
                                                </motion.div>
                                            )}

                                            {/* Quick Action (when collapsed) */}
                                            {expandedService !== service.id && (
                                                <div className="flex items-center gap-4 mt-2">
                                                    <Link
                                                        to={`${basePath}/book-appointment`}
                                                        className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                                                    >
                                                        Learn More
                                                        <ArrowRight className="w-4 h-4 ml-1" />
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
                <div className="container-custom text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Not Sure Which Service You Need?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Our experts will guide you to the right treatment. Book a free consultation today.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                to={`${basePath}/book-appointment`}
                                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
                            >
                                Book Free Consultation
                            </Link>
                            <a
                                href={`tel:${hospital?.phone || '+919999999999'}`}
                                className="border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-colors"
                            >
                                Call: {hospital?.phone || '+91 99999 99999'}
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
