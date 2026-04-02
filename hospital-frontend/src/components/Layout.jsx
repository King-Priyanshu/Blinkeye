import Header from './Header';
import Footer from './Footer';

const getStorageUrl = (path) => {
    if (!path) return null;
    // If already a full URL, return as-is
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    // Build full URL from API base
    const apiUrl = import.meta.env.VITE_API_URL || 'https://blink.drkashishgupta.com/api';
    const baseUrl = apiUrl.replace(/\/api$/, '');
    return `${baseUrl}/storage/${path.replace(/^\/storage\//, '')}`;
};

export default function Layout({ children, hospital, hospitals, seoMeta }) {

    // Get background image - check multiple possible locations
    const backgroundImage = hospital?.background_image || hospital?.branding?.background_image;

    // Get gallery images
    const galleryImages = hospital?.galleries || [];

    return (
        <div className="min-h-screen flex flex-col relative">
            {/* Background Image with Blur Effect */}
            {backgroundImage && (
                <div className="fixed inset-0 -z-10">
                    <img
                        src={getStorageUrl(backgroundImage)}
                        alt="Background"
                        className="w-full h-full object-cover blur-sm"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70"></div>
                </div>
            )}

            {/* Fallback: Use first gallery image as background if no dedicated background image */}
            {!backgroundImage && galleryImages.length > 0 && (
                <div className="fixed inset-0 -z-10">
                    <img
                        src={getStorageUrl(galleryImages[0].image || galleryImages[0].image_path)}
                        alt="Background"
                        className="w-full h-full object-cover blur-sm"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/70"></div>
                </div>
            )}

            <Header hospital={hospital} hospitals={hospitals} />
            <main className="flex-grow">
                {children}
            </main>
            <Footer hospital={hospital} />
        </div>
    );
}
