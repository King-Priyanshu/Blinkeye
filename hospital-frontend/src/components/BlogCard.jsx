import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { getHospitalSlug } from '../utils/subdomain';

// Default blog images
const defaultBlogImages = [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80', // Medical 1
    'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&q=80', // Medical 2
    'https://images.unsplash.com/photo-1584515933487-779824d29609?w=400&q=80', // Medical 3
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&q=80', // Medical 4
    'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&q=80', // Medical 5
    'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&q=80', // Medical 6
];

export default function BlogCard({ blog, index }) {
    const slug = getHospitalSlug();
    const basePath = slug ? `/${slug}` : '';
    // Get default image based on index or use a generic one
    const defaultImage = defaultBlogImages[index % defaultBlogImages.length] || defaultBlogImages[0];
    const imageToUse = blog.image || defaultImage;

    // Format date
    const formattedDate = blog.created_at ? new Date(blog.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : 'Recent';

    return (
        <div
            className="card card-hover group"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="relative h-48 overflow-hidden">
                <img
                    src={imageToUse}
                    alt={blog.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                {/* Date Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formattedDate}
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {blog.title || 'Blog Title'}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.excerpt || 'Click to read more about this article and stay updated with the latest health news and tips from our expert team.'}
                </p>
                <Link
                    to={`${basePath}/blog/${blog.slug}`}
                    className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors"
                >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
            </div>
        </div>
    );
}
