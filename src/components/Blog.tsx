import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Clock } from 'lucide-react';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image_url: string;
  date: string;
  read_time: string;
}

const defaultBlogs = [
  {
    id: 1,
    title: 'The Ultimate Guide to Laser Hair Removal: Everything You Need to Know',
    excerpt: 'Discover how laser hair removal works, what to expect during treatment, and why it is the most popular aesthetic procedure worldwide.',
    category: 'Laser',
    image_url: '/images/service-laser.jpg',
    date: '2024-12-15',
    read_time: '5 min read',
  },
  {
    id: 2,
    title: 'Botox vs Dermal Fillers: Understanding the Difference',
    excerpt: 'A comprehensive comparison of two of the most popular anti-aging treatments. Learn which one is right for your aesthetic goals.',
    category: 'Anti-Aging',
    image_url: '/images/service-antiaging.jpg',
    date: '2024-12-01',
    read_time: '4 min read',
  },
  {
    id: 3,
    title: 'Winter Skincare: 7 Tips from Dr. Moona for Glowing Skin',
    excerpt: 'Expert dermatological advice on protecting and nourishing your skin during the harsh winter months. Your complete winter skincare guide.',
    category: 'Skin',
    image_url: '/images/service-skin.jpg',
    date: '2024-11-20',
    read_time: '3 min read',
  },
];

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setBlogs(data);
        } else {
          setBlogs(defaultBlogs);
        }
        setLoading(false);
      })
      .catch(() => {
        setBlogs(defaultBlogs);
        setLoading(false);
      });
  }, []);

  const displayBlogs = blogs.length > 0 ? blogs : defaultBlogs;

  return (
    <section id="blog" className="py-24 sm:py-32 bg-[#faf9f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#C89B3C]/10 rounded-full mb-6">
            <span className="text-[#C89B3C] text-xs tracking-[0.2em] uppercase font-medium">Blog</span>
          </div>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-4">
            Latest <span className="text-[#C89B3C]">Insights</span>
          </h2>
          <p className="text-[#888] max-w-2xl mx-auto font-['Poppins']">
            Expert advice and the latest trends in dermatology and aesthetic medicine from Dr. Moona.
          </p>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
                  <div className="h-6 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#C89B3C] text-white text-xs tracking-wider uppercase font-medium rounded-full">
                      {blog.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-[#888] mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(blog.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {blog.read_time}
                    </span>
                  </div>
                  <h3 className="font-['Playfair_Display'] text-lg font-bold text-[#1a1a1a] mb-3 group-hover:text-[#C89B3C] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-[#888] text-sm leading-relaxed mb-4 line-clamp-2">
                    {blog.excerpt}
                  </p>
                  <span className="flex items-center gap-2 text-[#C89B3C] text-sm font-semibold cursor-pointer group-hover:gap-3 transition-all">
                    Read More <ArrowRight size={16} />
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
