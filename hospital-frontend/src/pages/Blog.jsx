import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import BlogCard from '../components/BlogCard';
import { getBlogs } from '../services/api';

export default function Blog({ hospital }) {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await getBlogs();
                if (response.data.success) {
                    setBlogs(response.data.data);
                }
            } catch (error) {
                // Set default blog data on error
                setBlogs([
                    { id: 1, title: 'Understanding Cataract: Causes, Symptoms, and Treatment', slug: 'understanding-cataract', excerpt: 'Cataract is one of the most common eye conditions affecting millions of people worldwide. Learn about its causes, symptoms, and modern treatment options.', image: null, created_at: '2026-03-15' },
                    { id: 2, title: 'LASIK Eye Surgery: Is It Right for You?', slug: 'lasik-eye-surgery', excerpt: 'LASIK surgery can free you from glasses and contact lenses. Discover if you are a good candidate for this life-changing procedure.', image: null, created_at: '2026-03-10' },
                    { id: 3, title: 'Diabetes and Eye Health: What You Need to Know', slug: 'diabetes-eye-health', excerpt: 'Diabetes can significantly impact your vision. Learn about diabetic retinopathy and how to protect your eyes.', image: null, created_at: '2026-03-05' },
                    { id: 4, title: 'Tips for Maintaining Healthy Eyesight', slug: 'healthy-eyesight-tips', excerpt: 'Simple lifestyle changes can help preserve your vision. Discover expert tips for maintaining healthy eyes.', image: null, created_at: '2026-02-28' },
                    { id: 5, title: 'Glaucoma: The Silent Thief of Vision', slug: 'glaucoma-silent-thief', excerpt: 'Glaucoma often shows no symptoms until significant damage occurs. Early detection is crucial for preserving vision.', image: null, created_at: '2026-02-20' },
                    { id: 6, title: 'Children\'s Eye Health: A Parent\'s Guide', slug: 'children-eye-health', excerpt: 'Proper eye care starts early. Learn how to protect your child\'s vision and spot potential problems.', image: null, created_at: '2026-02-15' },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    // Filter blogs by search term
    const filteredBlogs = blogs.filter(blog =>
        blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                            Our <span className="text-gradient">Blog</span>
                        </h1>
                        <p className="text-xl text-gray-600">
                            Stay informed with the latest health tips, eye care advice, and news from our experts
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search Section */}
            <section className="py-8 bg-white border-b">
                <div className="container-custom">
                    <div className="max-w-md mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Grid Section */}
            <section className="py-20">
                <div className="container-custom">
                    {loading ? (
                        // Loading Skeleton
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-gray-100 rounded-2xl overflow-hidden animate-pulse">
                                    <div className="h-48 bg-gray-200" />
                                    <div className="p-6">
                                        <div className="h-6 bg-gray-200 rounded mb-2" />
                                        <div className="h-4 bg-gray-200 rounded mb-4" />
                                        <div className="h-4 bg-gray-200 rounded w-2/3" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredBlogs.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredBlogs.map((blog, index) => (
                                <BlogCard key={blog.id} blog={blog} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-gray-500 text-lg">No articles found matching your search.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
