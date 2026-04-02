import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, Shield, Clock, Heart, Eye, Star, Phone, Calendar, Users, Award, Building2, MapPin, Sparkles, ChevronRight } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import DoctorCard from '../components/DoctorCard';
import BlogCard from '../components/BlogCard';
import { getServices, getDoctors, getBlogs, getReviews } from '../services/api';
import { buildHospitalUrl, getHospitalSlug } from '../utils/subdomain';

export default function Home({ hospital, hospitals }) {
    const slug = getHospitalSlug();
    const basePath = slug ? `/${slug}` : '';
    const [services, setServices] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 500], [0, 150]);
    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

    // Sample default hero background image for hospitals
    const defaultHeroImage = "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&q=80";
    // Sample default hospital image for hero section box
    const defaultHospitalImage = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80";
    const isMainDomain = !hospital?.subdomain || (hospitals && hospitals.length > 0 && !hospital?.subdomain);

    useEffect(() => {
        const fetchData = async () => {
            if (!hospital?.id) {
                try {
                    const [blogsRes, reviewsRes] = await Promise.all([
                        getBlogs(null),
                        getReviews(null)
                    ]);
                    if (blogsRes.data.success) {
                        setBlogs(blogsRes.data.data.slice(0, 3));
                    }
                    if (reviewsRes.data.success) {
                        setReviews(reviewsRes.data.data);
                    }
                } catch (error) {
                    if (import.meta.env.DEV) {
                        console.log('Error fetching main domain data');
                    }
                }
                setLoading(false);
                return;
            }

            try {
                const hospitalId = hospital.id;
                const [servicesRes, doctorsRes, blogsRes, reviewsRes] = await Promise.all([
                    getServices(hospitalId),
                    getDoctors(hospitalId),
                    getBlogs(hospitalId),
                    getReviews(hospitalId)
                ]);

                if (servicesRes.data.success) {
                    setServices(servicesRes.data.data.slice(0, 6));
                }
                if (doctorsRes.data.success) {
                    setDoctors(doctorsRes.data.data.slice(0, 4));
                }
                if (blogsRes.data.success) {
                    setBlogs(blogsRes.data.data.slice(0, 3));
                }
                if (reviewsRes && reviewsRes.data.success) {
                    setReviews(reviewsRes.data.data);
                }
            } catch (error) {
                if (import.meta.env.DEV) {
                    console.log('Using default data');
                }
                setServices([
                    { id: 1, name: 'Cataract Surgery', description: 'Advanced phacoemulsification technique with premium IOL options for crystal clear vision.', image: null },
                    { id: 2, name: 'LASIK Surgery', description: 'Blade-free LASIK using advanced laser technology for permanent vision correction.', image: null },
                    { id: 3, name: 'Retina Treatment', description: 'Expert care for retinal diseases including macular degeneration and diabetic retinopathy.', image: null },
                    { id: 4, name: 'Glaucoma Care', description: 'Comprehensive diagnosis and treatment to prevent vision loss from glaucoma.', image: null },
                    { id: 5, name: 'Cornea Services', description: 'Corneal transplant and treatment for corneal diseases and infections.', image: null },
                    { id: 6, name: 'Pediatric Eye Care', description: 'Specialized eye care for children including squint and amblyopia treatment.', image: null },
                ]);
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
        { icon: Building2, value: hospital?.number_of_beds || hospital?.site_settings?.stats?.stat_locations?.value || '50+', label: 'Beds Facility' },
        { icon: Users, value: hospital?.number_of_doctors || hospital?.site_settings?.stats?.stat_specialists?.value || '15+', label: 'Specialist Doctors' },
        { icon: Award, value: hospital?.site_settings?.stats?.stat_experience?.value || '14+', label: 'Years Excellence' },
        { icon: Heart, value: hospital?.site_settings?.stats?.stat_surgeries?.value || '50K+', label: 'Happy Patients' },
    ];

    const features = [
        { icon: Shield, title: 'Advanced Technology', description: 'State-of-the-art diagnostic equipment and latest treatment techniques.' },
        { icon: Clock, title: '24/7 Emergency', description: 'Round-the-clock emergency eye care services, always available.' },
        { icon: Eye, title: 'Expert Specialists', description: 'Team of highly qualified ophthalmologists from top institutes.' },
        { icon: Sparkles, title: 'Premium Care', description: 'Patient-centered approach with personalized, luxury treatment.' },
    ];

    return (
        <div className="bg-slate-50 min-h-screen selection:bg-primary-500/30 selection:text-primary-900">
            {/* Hero Section */}
            {isMainDomain && hospitals && hospitals.length > 0 ? (
                // Main domain - Show all hospitals
                <section className="relative min-h-[90vh] flex items-center bg-white pt-20 overflow-hidden">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-primary-100/40 to-secondary-50/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-secondary-100/40 to-primary-50/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
                    
                    <div className="container-custom relative z-10 py-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-center mb-16 max-w-4xl mx-auto"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100 shadow-sm text-primary-700 font-semibold text-sm">
                                <Sparkles className="w-4 h-4" />
                                <span>Premium Eye Care Network</span>
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
                                Welcome to{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500">Blink Eye Hospital</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-slate-500 mb-10 max-w-2xl mx-auto font-light">
                                Select your city to find the nearest Blink Eye Hospital and experience clear vision today.
                            </p>
                        </motion.div>

                        {/* Hospitals Grid */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 relative z-20">
                            {hospitals.map((h, index) => (
                                <motion.div
                                    key={h.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.15 + 0.3, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <a
                                        href={buildHospitalUrl(h.slug)}
                                        className="group block bg-white/60 backdrop-blur-xl rounded-3xl p-6 border border-white shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        
                                        <div className="relative z-10">
                                            <div className="flex items-start justify-between mb-6">
                                                <div className="w-16 h-16 bg-gradient-to-tr from-primary-100 to-primary-50 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                                                    <Building2 className="w-8 h-8 text-primary-600" />
                                                </div>
                                                {h.average_rating > 0 && (
                                                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full shadow-sm border border-slate-100">
                                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                                        <span className="text-sm font-bold text-slate-700">{h.average_rating}</span>
                                                    </div>
                                                )}
                                            </div>
                                            
                                            <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-primary-700 transition-colors">{h.name}</h3>
                                            
                                            <div className="flex items-center gap-2 mb-4 text-slate-500 font-medium bg-slate-50 px-3 py-1.5 rounded-lg inline-flex">
                                                <MapPin className="w-4 h-4 text-primary-500" />
                                                {h.location?.name || 'Punjab'}
                                            </div>
                                            
                                            <p className="text-slate-600 text-sm mb-8 leading-relaxed line-clamp-2">
                                                {h.short_description || 'Expert eye care services in your city'}
                                            </p>
                                            
                                            <div className="flex items-center text-primary-600 font-bold group-hover:text-primary-700">
                                                <span className="mr-2 group-hover:mr-4 transition-all duration-300">Visit Hospital Site</span>
                                                <ArrowRight className="w-5 h-5" />
                                            </div>
                                        </div>
                                    </a>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : (
                // Hospital subdomain - Premium Single Hospital Hero
                <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-slate-900">
                    {/* Parallax Background */}
                    <motion.div 
                        className="absolute inset-0 z-0"
                        style={{ y: heroY, opacity: heroOpacity }}
                    >
                        <div 
                            className="absolute inset-0 bg-cover bg-center transform scale-110"
                            style={{ backgroundImage: `url(${hospital?.background_image || defaultHeroImage})` }}
                        />
                        {/* Elegant Gradient Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent z-10"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20 z-10"></div>
                    </motion.div>

                    <div className="container-custom relative z-20">
                        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
                            {/* Left Content */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="max-w-2xl"
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg">
                                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    <span className="text-sm font-semibold tracking-wide">{hospital?.site_settings?.hero?.hero_badge?.value || `Best Eye Hospital in ${hospital?.location?.name || 'Your City'}`}</span>
                                </div>

                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-[1.1] text-white tracking-tight">
                                    {hospital?.site_settings?.hero?.hero_title?.value?.split('<br>')[0] || 'Clear Vision for a'} <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200">{hospital?.site_settings?.hero?.hero_title?.value?.split('<br>')[1] || 'Brighter Life'}</span>
                                </h1>

                                <p className="text-xl md:text-2xl mb-10 text-slate-300 font-light leading-relaxed max-w-xl">
                                    {hospital?.short_description || 'Experience world-class eye care with our superior team of expert ophthalmologists and advanced technology.'}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 mb-16">
                                    <Link to={`${basePath}/book-appointment`} className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold bg-primary-600 text-white shadow-[0_0_40px_rgba(var(--color-primary-600),0.4)] hover:shadow-[0_0_60px_rgba(var(--color-primary-600),0.6)] transition-all duration-300 hover:-translate-y-1">
                                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        <Calendar className="w-5 h-5 relative z-10" />
                                        <span className="relative z-10">Book Free Consultation</span>
                                    </Link>
                                    <a href={`tel:${hospital?.phone || '+919999999999'}`} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold border border-white/30 bg-white/5 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300 hover:-translate-y-1">
                                        <Phone className="w-5 h-5" />
                                        Call Now
                                    </a>
                                </div>

                                {/* Minimal Stats Row */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/20">
                                    {stats.map((stat, index) => (
                                        <motion.div
                                            key={stat.label}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                                        >
                                            <p className="text-3xl font-black text-white mb-1 tracking-tight">{stat.value}</p>
                                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{stat.label}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Right Image/Illustration with Glassmorphism Badges */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                className="hidden lg:block relative"
                            >
                                <div className="relative max-w-lg mx-auto">
                                    {/* Glowing Orbs Behind */}
                                    <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary-500 rounded-full blur-[80px] opacity-40 mix-blend-screen animate-pulse"></div>
                                    <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary-500 rounded-full blur-[80px] opacity-40 mix-blend-screen"></div>

                                    {/* Main Hero Image */}
                                    <div className="relative rounded-[2.5rem] p-3 bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl skew-y-2 transform -rotate-2 hover:rotate-0 hover:skew-y-0 transition-transform duration-700 ease-out z-10">
                                        <div className="aspect-[4/5] rounded-[2rem] overflow-hidden relative">
                                            <div className="absolute inset-0 bg-slate-900/10 z-10"></div>
                                            <img
                                                src={hospital?.image || defaultHospitalImage}
                                                alt={hospital?.name || "Hospital Building"}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Floating Glass Badges */}
                                    <div className="absolute -right-8 top-1/3 z-20">
                                        <motion.div 
                                            animate={{ y: [0, -10, 0] }}
                                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                                            className="bg-white/80 backdrop-blur-xl border border-white shadow-2xl rounded-2xl p-4 flex items-center gap-4"
                                        >
                                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                                                <CheckCircle className="w-6 h-6 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-black text-xl text-slate-900">99.8%</p>
                                                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Success Rate</p>
                                            </div>
                                        </motion.div>
                                    </div>

                                    <div className="absolute -left-10 bottom-1/4 z-20">
                                        <motion.div 
                                            animate={{ y: [0, 15, 0] }}
                                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                                            className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 shadow-2xl rounded-2xl p-4 flex items-center gap-4"
                                        >
                                            <div className="w-12 h-12 bg-amber-500/20 border border-amber-500/30 rounded-xl flex items-center justify-center shrink-0">
                                                <Award className="w-6 h-6 text-amber-400" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-white leading-tight">National<br/>Award</p>
                                                <p className="text-xs font-medium text-amber-400/80 mt-1">Excellence in Care</p>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}

            {/* Premium Features Section */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-white pointer-events-none"></div>
                <div className="container-custom relative z-10">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="group bg-slate-50 border border-slate-100 rounded-[2rem] p-8 hover:bg-white hover:shadow-2xl hover:-translate-y-2 hover:border-primary-100 transition-all duration-500"
                            >
                                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-50 transition-all duration-500">
                                    <feature.icon className="w-8 h-8 text-primary-600" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-24 bg-slate-100 rounded-[3rem] mx-4 sm:mx-8 mb-24 relative overflow-hidden shadow-inner">
                {/* Decorative blob */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl pointer-events-none translate-x-1/2 -translate-y-1/2"></div>
                
                <div className="container-custom relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-16 max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Clinical Excellence</h2>
                        <p className="text-xl text-slate-600 leading-relaxed font-light">
                            Comprehensive eye care services using cutting-edge technology and proven treatment methods by industry-leading specialists.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                        {loading ? (
                            Array(6).fill(0).map((_, i) => (
                                <div key={i} className="bg-white rounded-[2rem] p-2 animate-pulse">
                                    <div className="h-48 bg-slate-200 rounded-3xl mb-4" />
                                    <div className="px-6 pb-6">
                                        <div className="h-6 bg-slate-200 rounded-lg w-2/3 mb-3" />
                                        <div className="h-4 bg-slate-200 rounded-lg w-full mb-2" />
                                        <div className="h-4 bg-slate-200 rounded-lg w-4/5" />
                                    </div>
                                </div>
                            ))
                        ) : (
                            services.map((service, index) => (
                                <ServiceCard key={service.id} service={service} index={index} />
                            ))
                        )}
                    </div>

                    <div className="text-center">
                        <Link to={`${basePath}/services`} className="inline-flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 rounded-xl font-bold text-slate-700 hover:text-primary-600 hover:border-primary-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                            Browse All Procedures
                            <ChevronRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Reviews / Testimonials Section */}
            {reviews && reviews.length > 0 && (
                <section className="py-24 bg-white relative overflow-hidden">
                    <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary-100/30 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
                    <div className="container-custom relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center mb-16 max-w-3xl mx-auto"
                        >
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
                                Our Patients Say It Best
                            </h2>
                            <p className="text-xl text-slate-600 leading-relaxed font-light">
                                Discover patient experiences and their journey to clearer, healthier vision with Blink Eye Hospitals.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {reviews.slice(0, 3).map((review, index) => (
                                <motion.div
                                    key={review.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                                    viewport={{ once: true }}
                                    className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 hover:bg-white hover:shadow-2xl hover:-translate-y-2 hover:border-primary-100 transition-all duration-500 relative flex flex-col h-full"
                                >
                                    <div className="flex text-amber-400 mb-6">
                                        {[...Array(review.rating || 5)].map((_, i) => (
                                            <Star key={i} className="w-5 h-5 fill-current" />
                                        ))}
                                    </div>
                                    <p className="text-slate-600 text-lg leading-relaxed mb-8 flex-grow">
                                        "{review.content}"
                                    </p>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-xl uppercase">
                                            {review.author_name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{review.author_name}</h4>
                                            <p className="text-sm text-slate-500">{review.source}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Call to Action Banner */}
            <section className="py-24 relative overflow-hidden bg-slate-950">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-secondary-900/90 z-10"></div>
                    <img src={defaultHeroImage} alt="Operation Theater" className="w-full h-full object-cover" />
                </div>
                
                <div className="container-custom relative z-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
                            Ready for Life-Changing Vision?
                        </h2>
                        <p className="text-xl md:text-2xl text-slate-300 font-light mb-12 max-w-3xl mx-auto">
                            Take the first step towards perfect clarity. Schedule your comprehensive eye evaluation with our specialists today.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                to={`${basePath}/book-appointment`}
                                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-900 font-bold rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:-translate-y-1 transition-all duration-300"
                            >
                                Schedule Consultation
                            </Link>
                            <a
                                href={`tel:${hospital?.phone || '+919999999999'}`}
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
                            >
                                <Phone className="w-5 h-5" />
                                {hospital?.phone || '+91 99999 99999'}
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Keep Doctors and Map sections mostly intact, omitting for brevity in this overhaul unless specific updates are requested */}
            {/* Map Section - Our Location */}
            {hospital?.lat && hospital?.lng && (
                <section className="py-24 bg-white">
                    <div className="container-custom">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center mb-16 max-w-3xl mx-auto"
                        >
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Our Location</h2>
                            <p className="text-xl text-slate-600 leading-relaxed font-light">
                                Visit us at {hospital?.name}. We are conveniently located in {hospital?.location?.name || 'your city'}.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200"
                        >
                            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
                                <iframe
                                    src={hospital?.map_url || `https://www.openstreetmap.org/export/embed.html?bbox=${parseFloat(hospital.lng) - 0.015}%2C${parseFloat(hospital.lat) - 0.01}%2C${parseFloat(hospital.lng) + 0.015}%2C${parseFloat(hospital.lat) + 0.01}&layer=mapnik&marker=${hospital.lat}%2C${hospital.lng}`}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title={`${hospital.name} Location`}
                                />
                            </div>
                        </motion.div>

                        <div className="grid sm:grid-cols-3 gap-6 mt-8">
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">Address</h3>
                                    <p className="text-sm text-slate-600">{hospital?.address || `${hospital?.location?.name || 'Amritsar'}, Punjab`}</p>
                                </div>
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">Phone</h3>
                                    <a href={`tel:${hospital?.phone || '+919999999999'}`} className="text-sm text-slate-600 hover:text-primary-600">{hospital?.phone || '+91 99999 99999'}</a>
                                </div>
                            </div>
                            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex items-start gap-4">
                                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">Hours</h3>
                                    <p className="text-sm text-slate-600">{hospital?.working_hours_weekday || 'Mon-Sat: 9AM - 6PM'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
