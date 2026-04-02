import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getHospitalSlug } from '../utils/subdomain';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, Share2, Clock, User, Tag, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import DOMPurify from 'dompurify';
import BlogCard from '../components/BlogCard';
import { getBlogBySlug, getBlogs } from '../services/api';

// Default blog images
const defaultBlogImages = [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80',
    'https://images.unsplash.com/photo-1584515933487-779824d29609?w=800&q=80',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
    'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80',
    'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80',
];

export default function BlogPost({ hospital }) {
    const hospitalSlug = getHospitalSlug();
    const basePath = hospitalSlug ? `/${hospitalSlug}` : '';
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogPost = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch the blog post by slug
                const response = await getBlogBySlug(slug);

                if (response.data.success) {
                    setBlog(response.data.data);

                    // Fetch related blogs (excluding current)
                    const allBlogsResponse = await getBlogs();
                    if (allBlogsResponse.data.success) {
                        const related = allBlogsResponse.data.data
                            .filter(b => b.id !== response.data.data.id)
                            .slice(0, 3);
                        setRelatedBlogs(related);
                    }
                } else {
                    // Set demo data for blog posts
                    const demoBlog = getDemoBlog(slug);
                    if (demoBlog) {
                        setBlog(demoBlog);
                        setRelatedBlogs(getRelatedDemoBlogs(demoBlog.id));
                    } else {
                        setError('Blog post not found');
                    }
                }
            } catch (err) {
                if (import.meta.env.DEV) {
                    console.error('Error fetching blog:', err);
                }
                // Set demo data on error
                const demoBlog = getDemoBlog(slug);
                if (demoBlog) {
                    setBlog(demoBlog);
                    setRelatedBlogs(getRelatedDemoBlogs(demoBlog.id));
                } else {
                    setError('Failed to load blog post');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBlogPost();
        // Scroll to top when slug changes
        window.scrollTo(0, 0);
    }, [slug]);

    // Demo blog data
    const getDemoBlog = (slug) => {
        const demoBlogs = [
            {
                id: 1,
                title: 'Understanding Cataract: Causes, Symptoms, and Treatment',
                slug: 'understanding-cataract',
                excerpt: 'Cataract is one of the most common eye conditions affecting millions of people worldwide. Learn about its causes, symptoms, and modern treatment options.',
                content: `
                    <h2>What is a Cataract?</h2>
                    <p>A cataract is a clouding of the eye's natural lens, which lies behind the iris and the pupil. Cataracts are the most common cause of vision loss in people over age 40 and are the principal cause of blindness in the world.</p>
                    
                    <h2>Types of Cataracts</h2>
                    <p>There are several types of cataracts:</p>
                    <ul>
                        <li><strong>Age-related cataracts:</strong> Most cataracts are related to aging.</li>
                        <li><strong>Congenital cataracts:</strong> Some babies are born with cataracts, or they may develop in childhood.</li>
                        <li><strong>Secondary cataracts:</strong> Can form after surgery for other eye problems.</li>
                        <li><strong>Traumatic cataracts:</strong> Develop after an eye injury.</li>
                    </ul>
                    
                    <h2>Symptoms of Cataracts</h2>
                    <p>Common symptoms include:</p>
                    <ul>
                        <li>Cloudy or blurred vision</li>
                        <li>Difficulty seeing at night</li>
                        <li>Sensitivity to light and glare</li>
                        <li>Seeing "halos" around lights</li>
                        <li>Faded colors</li>
                        <li>Double vision in one eye</li>
                    </ul>
                    
                    <h2>Treatment Options</h2>
                    <p>The only effective treatment for cataracts is surgery. During cataract surgery, the cloudy lens is removed and replaced with an artificial intraocular lens (IOL). This is one of the most common and successful surgical procedures performed today.</p>
                    
                    <h2>Prevention</h2>
                    <p>While cataracts cannot be completely prevented, you can reduce your risk by:</p>
                    <ul>
                        <li>Regular eye examinations</li>
                        <li>Controlling diabetes</li>
                        <li>Quitting smoking</li>
                        <li>Wearing sunglasses to protect against UV rays</li>
                        <li>Eating a healthy diet rich in antioxidants</li>
                    </ul>
                `,
                image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
                created_at: '2026-03-15',
                author: 'Dr. Rajesh Kumar',
                category: 'Eye Care',
                read_time: 8
            },
            {
                id: 2,
                title: 'LASIK Eye Surgery: Is It Right for You?',
                slug: 'lasik-eye-surgery',
                excerpt: 'LASIK surgery can free you from glasses and contact lenses. Discover if you are a good candidate for this life-changing procedure.',
                content: `
                    <h2>What is LASIK?</h2>
                    <p>LASIK (Laser-Assisted In Situ Keratomileusis) is a popular refractive surgery that corrects vision problems by reshaping the cornea using a laser. It can treat nearsightedness, farsightedness, and astigmatism.</p>
                    
                    <h2>Am I a Good Candidate?</h2>
                    <p>Good candidates for LASIK include:</p>
                    <ul>
                        <li>Adults over 18 years old</li>
                        <li>Stable vision prescription for at least one year</li>
                        <li>Healthy corneas</li>
                        <li>Realistic expectations about the outcome</li>
                        <li>No significant eye diseases</li>
                    </ul>
                    
                    <h2>The Procedure</h2>
                    <p>LASIK surgery typically takes about 15 minutes per eye. The surgeon creates a thin flap in the cornea, then uses a laser to reshape the underlying tissue. The flap is then repositioned, acting as a natural bandage.</p>
                    
                    <h2>Recovery</h2>
                    <p>Most patients experience improved vision within 24-48 hours after surgery. Full recovery usually takes about 3-6 months. It's important to follow your surgeon's post-operative instructions carefully.</p>
                    
                    <h2>Risks and Benefits</h2>
                    <p>Like any surgery, LASIK carries some risks, including dry eyes, glare, and undercorrection or overcorrection. However, the vast majority of patients achieve 20/20 vision or better and are thrilled with their results.</p>
                `,
                image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80',
                created_at: '2026-03-10',
                author: 'Dr. Priya Sharma',
                category: 'Refractive Surgery',
                read_time: 6
            },
            {
                id: 3,
                title: 'Diabetes and Eye Health: What You Need to Know',
                slug: 'diabetes-eye-health',
                excerpt: 'Diabetes can significantly impact your vision. Learn about diabetic retinopathy and how to protect your eyes.',
                content: `
                    <h2>Understanding Diabetic Retinopathy</h2>
                    <p>Diabetic retinopathy is a diabetes complication that affects eyes. It's caused by damage to the blood vessels of the light-sensitive tissue at the back of the eye (retina).</p>
                    
                    <h2>Stages of Diabetic Retinopathy</h2>
                    <p>The disease progresses through stages:</p>
                    <ul>
                        <li><strong>Mild NPDR:</strong> Small areas of balloon-like swelling in the retina's blood vessels.</li>
                        <li><strong>Moderate NPDR:</strong> Blood vessels that nourish the retina may swell and lose their ability to transport blood.</li>
                        <li><strong>Severe NPDR:</strong> Blocked blood vessels lead to reduced blood supply to retina areas.</li>
                        <li><strong>PDR:</strong> New, abnormal blood vessels grow on the retina.</li>
                    </ul>
                    
                    <h2>Symptoms</h2>
                    <p>Early stages may have no symptoms. As it progresses, you may notice:</p>
                    <ul>
                        <li>Spots or dark strings floating in your vision (floaters)</li>
                        <li>Blurred vision</li>
                        <li>Fluctuating vision</li>
                        <li>Dark or empty areas in your vision</li>
                        <li>Vision loss</li>
                    </ul>
                    
                    <h2>Prevention and Treatment</h2>
                    <p>The best way to prevent diabetic retinopathy is through good diabetes management. Annual comprehensive eye exams are crucial. Treatment options include laser therapy, injections, and surgery for advanced cases.</p>
                `,
                image: 'https://images.unsplash.com/photo-1584515933487-779824d29609?w=800&q=80',
                created_at: '2026-03-05',
                author: 'Dr. Amit Patel',
                category: 'Diabetes Care',
                read_time: 7
            },
            {
                id: 4,
                title: 'Tips for Maintaining Healthy Eyesight',
                slug: 'healthy-eyesight-tips',
                excerpt: 'Simple lifestyle changes can help preserve your vision. Discover expert tips for maintaining healthy eyes.',
                content: `
                    <h2>Regular Eye Exams</h2>
                    <p>Comprehensive eye exams are essential for maintaining healthy vision. Many eye diseases have no early symptoms, making regular check-ups crucial for early detection and treatment.</p>
                    
                    <h2>Protect Your Eyes from UV</h2>
                    <p>Excessive UV exposure can increase your risk of cataracts and macular degeneration. Always wear sunglasses that block 100% of UVA and UVB rays.</p>
                    
                    <h2>Follow the 20-20-20 Rule</h2>
                    <p>To reduce digital eye strain: every 20 minutes, look at something 20 feet away for 20 seconds. This helps relax your eye muscles and reduce fatigue.</p>
                    
                    <h2>Eat a Vision-Healthy Diet</h2>
                    <p>Foods rich in vitamins C and E, zinc, lutein, and omega-3 fatty acids can help prevent age-related vision problems. Include:</p>
                    <ul>
                        <li>Leafy green vegetables</li>
                        <li>Fish high in omega-3s</li>
                        <li>Eggs and nuts</li>
                        <li>Citrus fruits</li>
                    </ul>
                    
                    <h2>Don't Smoke</h2>
                    <p>Smoking increases the risk of cataracts, optic nerve damage, and macular degeneration. Quitting smoking significantly improves overall eye health.</p>
                    
                    <h2>Manage Health Conditions</h2>
                    <p>Conditions like diabetes and hypertension can affect your vision. Proper management of these conditions is crucial for maintaining healthy eyes.</p>
                `,
                image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80',
                created_at: '2026-02-28',
                author: 'Dr. Sneha Reddy',
                category: 'Preventive Care',
                read_time: 5
            },
            {
                id: 5,
                title: 'Glaucoma: The Silent Thief of Vision',
                slug: 'glaucoma-silent-thief',
                excerpt: 'Glaucoma often shows no symptoms until significant damage occurs. Early detection is crucial for preserving vision.',
                content: `
                    <h2>What is Glaucoma?</h2>
                    <p>Glaucoma is a group of eye conditions that damage the optic nerve, which is vital for good vision. This damage is usually caused by abnormally high pressure in your eye.</p>
                    
                    <h2>Types of Glaucoma</h2>
                    <ul>
                        <li><strong>Primary Open-Angle Glaucoma:</strong> The most common type, develops slowly and painlessly.</li>
                        <li><strong>Angle-Closure Glaucoma:</strong> Occurs suddenly when the iris blocks the drainage angle.</li>
                        <li><strong>Normal-Tension Glaucoma:</strong> Optic nerve damage despite normal eye pressure.</li>
                        <li><strong>Secondary Glaucoma:</strong> Caused by another eye condition, medication, or trauma.</li>
                    </ul>
                    
                    <h2>Risk Factors</h2>
                    <p>You may be at higher risk if you:</p>
                    <ul>
                        <li>Are over 60 years old</li>
                        <li>Have a family history of glaucoma</li>
                        <li>Have high internal eye pressure</li>
                        <li>Are of African, Asian, or Hispanic descent</li>
                        <li>Have thin corneas</li>
                    </ul>
                    
                    <h2>Treatment</h2>
                    <p>While there's no cure for glaucoma, treatment can slow or prevent further vision loss. Options include prescription eye drops, oral medications, laser therapy, and surgery.</p>
                `,
                image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80',
                created_at: '2026-02-20',
                author: 'Dr. Rajesh Kumar',
                category: 'Glaucoma',
                read_time: 7
            },
            {
                id: 6,
                title: "Children's Eye Health: A Parent's Guide",
                slug: 'children-eye-health',
                excerpt: 'Proper eye care starts early. Learn how to protect your child\'s vision and spot potential problems.',
                content: `
                    <h2>Why Children's Eye Health Matters</h2>
                    <p>Good vision is essential for a child's development and learning. Many vision problems, if detected early, can be successfully treated.</p>
                    
                    <h2>Signs of Vision Problems in Children</h2>
                    <p>Watch for these warning signs:</p>
                    <ul>
                        <li>Sitting too close to the TV</li>
                        <li>Rubbing eyes frequently</li>
                        <li>Complaining of headaches</li>
                        <li>Trouble with reading or schoolwork</li>
                        <li>Crossed eyes or eyes that don't align</li>
                    </ul>
                    
                    <h2>Recommended Eye Exams</h2>
                    <p>Children should have their first comprehensive eye exam at:</p>
                    <ul>
                        <li>6 months old</li>
                        <li>3 years old</li>
                        <li>Before starting school (around age 5-6)</li>
                        <li>Every 1-2 years thereafter</li>
                    </ul>
                    
                    <h2>Protecting Your Child's Eyes</h2>
                    <ul>
                        <li>Ensure adequate outdoor time (reduases myopia risk)</li>
                        <li>Limit screen time</li>
                        <li>Provide protective eyewear for sports</li>
                        <li>Encourage healthy eating habits</li>
                    </ul>
                    
                    <h2>Common Childhood Eye Conditions</h2>
                    <p>Early detection and treatment of conditions like amblyopia (lazy eye), strabismus (crossed eyes), and refractive errors can prevent long-term vision problems.</p>
                `,
                image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80',
                created_at: '2026-02-15',
                author: 'Dr. Sneha Reddy',
                category: 'Pediatric Eye Care',
                read_time: 6
            },
        ];

        return demoBlogs.find(b => b.slug === slug);
    };

    const getRelatedDemoBlogs = (currentId) => {
        const demoBlogs = [
            { id: 1, title: 'Understanding Cataract: Causes, Symptoms, and Treatment', slug: 'understanding-cataract', excerpt: 'Cataract is one of the most common eye conditions affecting millions of people worldwide.', image: defaultBlogImages[0], created_at: '2026-03-15' },
            { id: 2, title: 'LASIK Eye Surgery: Is It Right for You?', slug: 'lasik-eye-surgery', excerpt: 'LASIK surgery can free you from glasses and contact lenses.', image: defaultBlogImages[1], created_at: '2026-03-10' },
            { id: 3, title: 'Diabetes and Eye Health: What You Need to Know', slug: 'diabetes-eye-health', excerpt: 'Diabetes can significantly impact your vision.', image: defaultBlogImages[2], created_at: '2026-03-05' },
            { id: 4, title: 'Tips for Maintaining Healthy Eyesight', slug: 'healthy-eyesight-tips', excerpt: 'Simple lifestyle changes can help preserve your vision.', image: defaultBlogImages[3], created_at: '2026-02-28' },
            { id: 5, title: 'Glaucoma: The Silent Thief of Vision', slug: 'glaucoma-silent-thief', excerpt: 'Glaucoma often shows no symptoms until significant damage occurs.', image: defaultBlogImages[4], created_at: '2026-02-20' },
            { id: 6, title: 'Children\'s Eye Health: A Parent\'s Guide', slug: 'children-eye-health', excerpt: 'Proper eye care starts early.', image: defaultBlogImages[5], created_at: '2026-02-15' },
        ];

        return demoBlogs.filter(b => b.id !== currentId).slice(0, 3);
    };

    // Format date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Share functions
    const shareBlog = (platform) => {
        const url = window.location.href;
        const title = blog?.title || '';

        let shareUrl = '';
        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                break;
            default:
                navigator.clipboard.writeText(url);
                return;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading article...</p>
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center max-w-md p-6">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Article Not Found</h2>
                    <p className="text-gray-600 mb-4">{error || 'The article you are looking for does not exist.'}</p>
                    <Link to={`${basePath}/blog`} className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 bg-gradient-to-br from-gray-50 via-white to-primary-50">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Back Link */}
                        <Link
                            to={`${basePath}/blog`}
                            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" /> Back to Blog
                        </Link>

                        {/* Category Tag */}
                        {blog.category && (
                            <span className="inline-block bg-primary-100 text-primary-700 text-sm font-medium px-4 py-1 rounded-full mb-4">
                                {blog.category}
                            </span>
                        )}

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            {blog.title}
                        </h1>

                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-600 mb-8">
                            {blog.author && (
                                <div className="flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    <span className="font-medium">{blog.author}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                <span>{formatDate(blog.created_at)}</span>
                            </div>
                            {blog.read_time && (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    <span>{blog.read_time} min read</span>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Image */}
            <section className="container-custom -mt-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="rounded-2xl overflow-hidden shadow-2xl"
                >
                    <img
                        src={blog.image || defaultBlogImages[0]}
                        alt={blog.title}
                        className="w-full h-64 md:h-96 lg:h-[500px] object-cover"
                    />
                </motion.div>
            </section>

            {/* Content Section */}
            <section className="py-12 md:py-16">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Main Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="lg:col-span-8"
                        >
                            <article className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-primary-600 prose-img:rounded-xl">
                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blog.content) }} />
                            </article>

                            {/* Tags */}
                            {blog.tags && blog.tags.length > 0 && (
                                <div className="mt-8 pt-8 border-t">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <Tag className="w-5 h-5 text-gray-400" />
                                        {blog.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Share */}
                            <div className="mt-8 pt-8 border-t">
                                <div className="flex items-center gap-4">
                                    <span className="font-medium text-gray-900">Share this article:</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => shareBlog('facebook')}
                                            className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                                        >
                                            <Facebook className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => shareBlog('twitter')}
                                            className="w-10 h-10 bg-sky-500 text-white rounded-full flex items-center justify-center hover:bg-sky-600 transition-colors"
                                        >
                                            <Twitter className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => shareBlog('linkedin')}
                                            className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                                        >
                                            <Linkedin className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => shareBlog('copy')}
                                            className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                                        >
                                            <LinkIcon className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="lg:col-span-4"
                        >
                            {/* Author Card */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">About the Author</h3>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                                        <User className="w-8 h-8 text-primary-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{blog.author || 'Expert Author'}</p>
                                        <p className="text-sm text-gray-600">Eye Care Specialist</p>
                                    </div>
                                </div>
                                <p className="mt-4 text-gray-600">
                                    Our experienced team of ophthalmologists is dedicated to providing the highest quality eye care and sharing valuable health information.
                                </p>
                            </div>

                            {/* Related Articles */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Related Articles</h3>
                                <div className="space-y-4">
                                    {relatedBlogs.length > 0 ? (
                                        relatedBlogs.map((relatedBlog, index) => (
                                            <Link
                                                key={relatedBlog.id}
                                                to={`${basePath}/blog/${relatedBlog.slug}`}
                                                className="flex gap-3 group"
                                            >
                                                <img
                                                    src={relatedBlog.image || defaultBlogImages[index]}
                                                    alt={relatedBlog.title}
                                                    className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                                                />
                                                <div>
                                                    <h4 className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
                                                        {relatedBlog.title}
                                                    </h4>
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {formatDate(relatedBlog.created_at)}
                                                    </p>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No related articles found.</p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Related Posts Section */}
            {relatedBlogs.length > 0 && (
                <section className="py-12 md:py-16 bg-white">
                    <div className="container-custom">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
                            You Might Also Like
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedBlogs.map((relatedBlog, index) => (
                                <BlogCard key={relatedBlog.id} blog={relatedBlog} index={index} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-12 md:py-16 bg-gradient-to-r from-primary-600 to-primary-700">
                <div className="container-custom text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Have Questions About Your Eye Health?
                    </h2>
                    <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
                        Our expert ophthalmologists are here to help. Schedule a consultation today.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to={`${basePath}/book-appointment`}
                            className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            Book Appointment
                        </Link>
                        <Link
                            to={`${basePath}/contact`}
                            className="inline-flex items-center justify-center px-6 py-3 bg-primary-800 text-white font-semibold rounded-lg hover:bg-primary-900 transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
