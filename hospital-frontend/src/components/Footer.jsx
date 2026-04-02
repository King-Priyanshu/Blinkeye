import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Clock, ArrowRight, ArrowUpRight } from 'lucide-react';
import { getHospitalSlug } from '../utils/subdomain';

const isSafeUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    try {
        const parsed = new URL(url);
        return parsed.protocol === 'https:' || parsed.protocol === 'http:';
    } catch {
        return false;
    }
};

export default function Footer({ hospital }) {
    const currentYear = new Date().getFullYear();

    const slug = getHospitalSlug();
    const basePath = slug ? `/${slug}` : '';

    const quickLinks = [
        { name: 'Home', path: basePath || '/' },
        { name: 'About Us', path: `${basePath}/about` },
        { name: 'Services', path: `${basePath}/services` },
        { name: 'Our Doctors', path: `${basePath}/doctors` },
        { name: 'Contact', path: `${basePath}/contact` },
    ];

    const services = [
        { name: 'Cataract Surgery', path: `${basePath}/services` },
        { name: 'LASIK Surgery', path: `${basePath}/services` },
        { name: 'Retina Treatment', path: `${basePath}/services` },
        { name: 'Glaucoma Care', path: `${basePath}/services` },
        { name: 'Eye Checkup', path: `${basePath}/services` },
    ];

    return (
        <footer className="relative bg-slate-950 text-slate-300 overflow-hidden">
            {/* Top Glowing Border */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-600/50 to-transparent opacity-50"></div>
            
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-900/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-900/10 rounded-full blur-[100px] pointer-events-none"></div>
            
            {/* Main Footer */}
            <div className="container-custom py-20 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
                    
                    {/* Hospital Brand Info - Spans 4 columns */}
                    <div className="lg:col-span-4 pr-0 lg:pr-8">
                        <Link to={basePath || '/'} className="flex items-center gap-3 mb-6 group inline-flex">
                            <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-tr from-primary-600 to-secondary-500 text-white shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow duration-300">
                                <span className="font-bold text-xl tracking-tighter">BE</span>
                                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20"></div>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-primary-400 transition-colors">
                                    {hospital?.name || 'Blink Eye'}
                                </h3>
                                <p className="text-[10px] font-bold tracking-widest uppercase text-primary-500">
                                    {hospital?.location?.name || 'Premium Eye Care'}
                                </p>
                            </div>
                        </Link>
                        
                        <p className="text-slate-400 leading-relaxed mb-8">
                            {hospital?.short_description || 'Providing world-class eye care services with state-of-the-art diagnostic technology and highly experienced ophthalmology specialists dedicated to your vision.'}
                        </p>
                        
                        {/* Social Handles */}
                        <div className="flex gap-4">
                            {isSafeUrl(hospital?.social_links?.facebook) && (
                                <a
                                    href={hospital.social_links.facebook}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-primary-600 hover:text-white hover:border-primary-500 hover:shadow-[0_0_15px_rgba(var(--primary-600),0.5)] transition-all duration-300 group"
                                    aria-label="Facebook"
                                >
                                    <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                </a>
                            )}
                            {isSafeUrl(hospital?.social_links?.instagram) && (
                                <a
                                    href={hospital.social_links.instagram}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white hover:border-pink-500 hover:shadow-[0_0_15px_rgba(219,39,119,0.5)] transition-all duration-300 group"
                                    aria-label="Instagram"
                                >
                                    <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                </a>
                            )}
                            {isSafeUrl(hospital?.social_links?.youtube) && (
                                <a
                                    href={hospital.social_links.youtube}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:bg-red-600 hover:text-white hover:border-red-500 hover:shadow-[0_0_15px_rgba(220,38,38,0.5)] transition-all duration-300 group"
                                    aria-label="YouTube"
                                >
                                    <Youtube className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Quick Navigation Links - Spans 2 columns */}
                    <div className="lg:col-span-2">
                        <h4 className="text-white font-bold tracking-wide uppercase text-sm mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                            Explore
                        </h4>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className="group flex items-center text-slate-400 hover:text-white transition-colors text-sm font-medium"
                                    >
                                        <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary-400 transition-all duration-300" />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Links - Spans 3 columns */}
                    <div className="lg:col-span-3">
                        <h4 className="text-white font-bold tracking-wide uppercase text-sm mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-secondary-500"></span>
                            Treatments
                        </h4>
                        <ul className="space-y-4">
                            {services.map((service) => (
                                <li key={service.name}>
                                    <Link
                                        to={service.path}
                                        className="group flex items-center text-slate-400 hover:text-white transition-colors text-sm font-medium"
                                    >
                                        <ArrowRight className="w-3.5 h-3.5 mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-secondary-400 transition-all duration-300" />
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">{service.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info - Spans 3 columns */}
                    <div className="lg:col-span-3 bg-slate-900/50 rounded-2xl p-6 border border-slate-800 shadow-inner">
                        <h4 className="text-white font-bold tracking-wide uppercase text-sm mb-6 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            Get in Touch
                        </h4>
                        <ul className="space-y-5">
                            <li className="flex items-start gap-4 group">
                                <div className="p-2 rounded-lg bg-slate-800 text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-colors mt-0.5">
                                    <MapPin className="w-4 h-4" />
                                </div>
                                <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                                    {hospital?.address || 'Mall Road, Amritsar, Punjab 143001'}
                                </span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="p-2 rounded-lg bg-slate-800 text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <a
                                    href={`tel:${hospital?.phone || '+919999999999'}`}
                                    className="text-sm text-slate-400 hover:text-white font-medium transition-colors flex items-center gap-2"
                                >
                                    {hospital?.phone || '+91 99999 99999'}
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary-400" />
                                </a>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="p-2 rounded-lg bg-slate-800 text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <a
                                    href={`mailto:${hospital?.email || 'info@blinkeyehospital.com'}`}
                                    className="text-sm text-slate-400 hover:text-white font-medium transition-colors flex items-center gap-2 break-all"
                                >
                                    {hospital?.email || 'info@blink.com'}
                                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary-400" />
                                </a>
                            </li>
                            <li className="flex items-start gap-4 pt-2">
                                <div className="p-2 rounded-lg bg-slate-800 text-slate-400 mt-0.5">
                                    <Clock className="w-4 h-4" />
                                </div>
                                <div className="text-sm text-slate-500">
                                    <p className="text-slate-300 font-medium mb-1">Operating Hours</p>
                                    <p>Mon-Sat: {hospital?.working_hours_weekday || '9:00 AM - 6:00 PM'}</p>
                                    {hospital?.working_hours_sunday && <p className="mt-1 flex items-center text-xs"><span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2"></span>Sun: {hospital.working_hours_sunday}</p>}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="relative z-10 border-t border-slate-800/80 bg-slate-950">
                <div className="container-custom py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-500 text-sm font-medium">
                            © {currentYear} <span className="text-slate-300">{hospital?.name || 'Blink Eye Hospital'}</span>. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
                            <Link to={`${basePath}/privacy`} className="hover:text-white transition-colors hover:underline underline-offset-4 decoration-primary-500/50">Privacy Policy</Link>
                            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                            <Link to={`${basePath}/terms`} className="hover:text-white transition-colors hover:underline underline-offset-4 decoration-primary-500/50">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
