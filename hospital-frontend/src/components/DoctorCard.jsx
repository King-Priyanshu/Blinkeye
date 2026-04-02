import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Star } from 'lucide-react';
import { getHospitalSlug } from '../utils/subdomain';

// Default doctor images
const defaultDoctorImages = [
    'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80', // Doctor 1
    'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80', // Doctor 2
    'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&q=80', // Doctor 3
    'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&q=80', // Doctor 4
];

export default function DoctorCard({ doctor, index }) {
    const slug = getHospitalSlug();
    const basePath = slug ? `/${slug}` : '';
    // Get default image based on index or use a generic one
    const defaultImage = defaultDoctorImages[index % defaultDoctorImages.length] || defaultDoctorImages[0];
    const imageToUse = doctor.image || defaultImage;

    return (
        <div
            className="card card-hover group"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="relative h-64 overflow-hidden">
                <img
                    src={imageToUse}
                    alt={doctor.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Specialty Badge */}
                <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 text-white text-sm font-medium px-3 py-1 rounded-full">
                        {doctor.specialty || 'Ophthalmologist'}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                    {doctor.name || 'Dr. Name'}
                </h3>
                <p className="text-gray-500 text-sm mb-3">
                    {doctor.experience ? `${doctor.experience} years experience` : '15+ years experience'}
                </p>
                <p className="text-gray-600 mb-4 line-clamp-2">
                    {doctor.bio || 'Expert in advanced eye treatments and surgeries with a patient-centered approach.'}
                </p>

                <div className="flex items-center gap-4">
                    <Link
                        to={`${basePath}/book-appointment`}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                        <Calendar className="w-4 h-4" />
                        Book Now
                    </Link>
                    <Link
                        to={`${basePath}/doctors`}
                        className="inline-flex items-center justify-center w-10 h-10 border-2 border-gray-200 hover:border-primary-600 rounded-lg transition-colors"
                    >
                        <ArrowRight className="w-4 h-4 text-gray-400 hover:text-primary-600" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
