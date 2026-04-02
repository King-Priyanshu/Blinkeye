import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { getHospitalSlug } from '../utils/subdomain';

// Default service images (medical/eye care related)
const defaultServiceImages = [
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=80', // Cataract
    'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&q=80', // LASIK
    'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&q=80', // Retina
    'https://images.unsplash.com/photo-1584515933487-779824d29609?w=400&q=80', // Glaucoma
    'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&q=80', // Cornea
    'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&q=80', // Pediatric
];

export default function ServiceCard({ service, index }) {
    const slug = getHospitalSlug();
    const basePath = slug ? `/${slug}` : '';
    // Get default image based on index or use a generic one
    const defaultImage = defaultServiceImages[index % defaultServiceImages.length] || defaultServiceImages[0];
    const imageToUse = service.image || defaultImage;

    return (
        <div
            className="card card-hover group"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={imageToUse}
                    alt={service.name}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {service.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                    {service.description || 'Advanced eye care treatment using latest technology and techniques.'}
                </p>
                <Link
                    to={`${basePath}/book-appointment`}
                    className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors"
                >
                    Book Consultation
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
            </div>
        </div>
    );
}
