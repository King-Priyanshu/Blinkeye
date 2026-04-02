import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { getHospitalSlug } from '../utils/subdomain';

export default function Header({ hospital }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    
    const slug = getHospitalSlug();
    const basePath = slug ? `/${slug}` : '';

    const navLinks = [
        { name: 'Home', path: basePath || '/' },
        { name: 'About', path: `${basePath}/about` },
        { name: 'Services', path: `${basePath}/services` },
        { name: 'Doctors', path: `${basePath}/doctors` },
        { name: 'Blog', path: `${basePath}/blog` },
        { name: 'Contact', path: `${basePath}/contact` },
    ];

    const isActive = (path) => {
        if (path === basePath || path === '/') {
            return location.pathname === basePath || location.pathname === '/' || location.pathname === `${basePath}/`;
        }
        return location.pathname.startsWith(path);
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
                isScrolled
                    ? 'bg-white/75 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.05)] border-white/20 py-2.5'
                    : 'bg-white border-transparent py-4'
            }`}
        >
            <div className="container-custom">
                <div className="flex items-center justify-between">
                    {/* Premium Logo */}
                    <Link to={basePath || '/'} className="flex items-center gap-3 group relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-primary-600/20 to-secondary-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-primary-600 to-secondary-500 text-white shadow-lg shadow-primary-500/30 transition-all duration-300 ${
                            isScrolled ? 'w-10 h-10' : 'w-12 h-12'
                        }`}>
                            <span className="font-bold text-lg tracking-tighter">BE</span>
                            <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20"></div>
                        </div>
                        <div>
                            <h1 className={`font-extrabold text-gray-900 tracking-tight transition-all duration-300 ${
                                isScrolled ? 'text-lg' : 'text-xl'
                            }`}>
                                {hospital?.name || 'Blink Eye'}
                            </h1>
                            <p className="text-[10px] font-bold tracking-widest uppercase text-primary-600">
                                {hospital?.location?.name || hospital?.name?.split(' - ')?.[1] || 'Premium Eye Care'}
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1 bg-gray-50/50 rounded-full px-2 py-1.5 border border-gray-100/50">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`relative px-4 py-2 font-medium text-sm transition-all duration-300 rounded-full overflow-hidden group ${
                                    isActive(link.path)
                                        ? 'text-primary-700 font-semibold'
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                <span className="relative z-10">{link.name}</span>
                                {isActive(link.path) && (
                                    <div className="absolute inset-0 bg-white rounded-full shadow-sm border border-gray-100 z-0"></div>
                                )}
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop CTA Area */}
                    <div className="hidden lg:flex items-center gap-5">
                        <a
                            href={`tel:${hospital?.phone || '+919999999999'}`}
                            className="flex items-center gap-2 group text-gray-600 font-medium text-sm hover:text-primary-600 transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                                <Phone className="w-4 h-4 text-primary-600" />
                            </div>
                            <span className="group-hover:tracking-wide transition-all duration-300">{hospital?.phone || '+91 99999 99999'}</span>
                        </a>
                        
                        <Link
                            to={`${basePath}/book-appointment`}
                            className="relative group overflow-hidden rounded-xl bg-gray-900 text-white font-semibold flex items-center gap-2 px-6 py-2.5 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/20 hover:-translate-y-0.5"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <Calendar className="w-4 h-4 relative z-10" />
                            <span className="relative z-10 text-sm">Book Visit</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="lg:hidden relative z-50 p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation Overlay */}
                <div className={`lg:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out ${
                    isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                } pt-24 px-6 pb-6 overflow-y-auto`}>
                    <div className="flex flex-col gap-6">
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`text-2xl font-bold py-3 transition-colors ${
                                        isActive(link.path)
                                            ? 'text-primary-600'
                                            : 'text-gray-900 hover:text-primary-600'
                                    }`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>
                        
                        <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col gap-4">
                            <a
                                href={`tel:${hospital?.phone || '+919999999999'}`}
                                className="flex items-center gap-3 text-lg font-medium text-gray-900"
                            >
                                <div className="w-12 h-12 rounded-full bg-primary-50 flex items-center justify-center">
                                    <Phone className="w-6 h-6 text-primary-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Emergency Call</p>
                                    <p>{hospital?.phone || '+91 99999 99999'}</p>
                                </div>
                            </a>
                            <Link
                                to={`${basePath}/book-appointment`}
                                className="w-full text-center bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary-500/30"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Book Appointment
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
