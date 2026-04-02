import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Doctors from './pages/Doctors';
import Contact from './pages/Contact';
import BookAppointment from './pages/BookAppointment';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import { getTenantConfig, getHospitalBySlug, getHospitals, BASE_DOMAIN } from './services/api';
import { getHospitalSlug, isMainSite } from './utils/subdomain';

function App() {
  const [hospital, setHospital] = useState(null);
  const [hospitals, setHospitals] = useState([]); // All hospitals for main site
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [seoMeta, setSeoMeta] = useState(null);
  const [isMainDomain, setIsMainDomain] = useState(false);
  const location = useLocation();

  // Apply dynamic colors from hospital settings
  useEffect(() => {
    if (hospital) {
      const primaryColor = hospital.branding?.primary_color || hospital.primary_color || '#14b8a6';
      const secondaryColor = hospital.branding?.secondary_color || hospital.secondary_color || '#0ea5e9';

      // Generate color shades
      const primaryShades = generateColorShades(primaryColor);
      const secondaryShades = generateColorShades(secondaryColor);

      // Create CSS variables as a style tag
      const css = `
        :root {
          --primary-50: ${primaryShades[50]};
          --primary-100: ${primaryShades[100]};
          --primary-200: ${primaryShades[200]};
          --primary-300: ${primaryShades[300]};
          --primary-400: ${primaryShades[400]};
          --primary-500: ${primaryShades[500]};
          --primary-600: ${primaryShades[600]};
          --primary-700: ${primaryShades[700]};
          --primary-800: ${primaryShades[800]};
          --primary-900: ${primaryShades[900]};
          --secondary-50: ${secondaryShades[50]};
          --secondary-100: ${secondaryShades[100]};
          --secondary-200: ${secondaryShades[200]};
          --secondary-300: ${secondaryShades[300]};
          --secondary-400: ${secondaryShades[400]};
          --secondary-500: ${secondaryShades[500]};
          --secondary-600: ${secondaryShades[600]};
          --secondary-700: ${secondaryShades[700]};
          --secondary-800: ${secondaryShades[800]};
          --secondary-900: ${secondaryShades[900]};
        }
      `;

      // Remove existing style tag if any
      let styleTag = document.getElementById('dynamic-colors');
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.id = 'dynamic-colors';
        document.head.appendChild(styleTag);
      }
      styleTag.textContent = css;
    }
  }, [hospital]);

  // Helper function to generate color shades
  const generateColorShades = (hexColor) => {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);

    // Generate lighter shades
    const lighten = (percent) => {
      const factor = 1 - percent / 100;
      const newR = Math.round(r + (255 - r) * (1 - factor));
      const newG = Math.round(g + (255 - g) * (1 - factor));
      const newB = Math.round(b + (255 - b) * (1 - factor));
      return `rgb(${newR}, ${newG}, ${newB})`;
    };

    // Generate darker shades
    const darken = (percent) => {
      const factor = 1 - percent / 100;
      const newR = Math.round(r * factor);
      const newG = Math.round(g * factor);
      const newB = Math.round(b * factor);
      return `rgb(${newR}, ${newG}, ${newB})`;
    };

    return {
      50: lighten(94),
      100: lighten(88),
      200: lighten(76),
      300: lighten(56),
      400: lighten(32),
      500: hexColor,
      600: darken(10),
      700: darken(20),
      800: darken(30),
      900: darken(40),
    };
  };

  // Function to fetch hospital data based on subdomain/slug
  const fetchHospitalData = async (subdomain) => {
    try {
      console.log(`Fetching hospital data for: ${subdomain}`);
      const response = await getTenantConfig(subdomain);

      if (!response.data.success) {
        // Try as custom domain
        console.log(`Tenant config failed for ${subdomain}, trying as custom domain...`);
        const domainResponse = await getTenantConfig(null, subdomain);
        
        if (!domainResponse.data.success) {
          // Try direct hospital lookup by slug
          console.log(`Custom domain search failed, trying direct slug lookup for ${subdomain}...`);
          const hospitalResponse = await getHospitalBySlug(subdomain);
          if (hospitalResponse.data.success) {
            setHospital(hospitalResponse.data.data);
            return;
          }
          
          const errorMsg = hospitalResponse.data.message || response.data.message || 'Hospital not found';
          setError(errorMsg);
          setLoading(false);
          return;
        }
        
        // Fetch full hospital details if we found a custom domain match
        const hospitalResponse = await getHospitalBySlug(subdomain);
        if (hospitalResponse.data.success) {
          setHospital(hospitalResponse.data.data);
          return;
        }
        setHospital(domainResponse.data.data);
        return;
      }

      // Got tenant config - now fetch full details
      const hospitalResponse = await getHospitalBySlug(subdomain);
      if (hospitalResponse.data.success) {
        setHospital(hospitalResponse.data.data);
      } else {
        setHospital(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching hospital data:', err);
      
      // Try direct hospital lookup by slug as fallback in case of 404 from tenant config
      try {
        const hospitalResponse = await getHospitalBySlug(subdomain);
        if (hospitalResponse.data.success) {
          setHospital(hospitalResponse.data.data);
          return;
        }
      } catch (fallbackErr) {
        console.error('Fallback slug lookup failed:', fallbackErr);
      }

      // Set error state with more context if available
      const apiErrorMessage = err.response?.data?.message || err.message;
      setError(apiErrorMessage === 'Network Error' 
        ? 'Cannot connect to the server. Please check your internet connection.' 
        : `Hospital not found: ${subdomain}`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let currentSlug = getHospitalSlug();

        const mainSite = isMainSite() && !currentSlug;

        setIsMainDomain(mainSite);

        if (mainSite || !currentSlug) {
          // Main site - fetch all hospitals
          const hospitalsResponse = await getHospitals();

          if (hospitalsResponse.data.success) {
            setHospitals(hospitalsResponse.data.data);

            // Set default hospital from first one or use env default
            const defaultSlug = import.meta.env.VITE_DEFAULT_HOSPITAL_SLUG || 'blink-eye-hospital-amritsar';
            const defaultHospital = hospitalsResponse.data.data.find(h => h.slug === defaultSlug) || hospitalsResponse.data.data[0];

            if (defaultHospital) {
              // Fetch full hospital details
              const hospitalResponse = await getHospitalBySlug(defaultHospital.slug);
              if (hospitalResponse.data.success) {
                setHospital(hospitalResponse.data.data);
              }
            }
          }
        } else {
          // Path-based - fetch hospital by slug
          await fetchHospitalData(currentSlug);
        }

      } catch (err) {
        // Don't set default data - show the error instead
        setError(err.message || 'Failed to load hospital data');
        setHospital(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.pathname.split('/')[1]]); // Re-fetch if hospital slug changes in URL

  // SEO metadata effect — runs when hospital data is loaded
  useEffect(() => {
    if (hospital?.seo_metadata) {
      setSeoMeta({
        title: hospital.seo_metadata.meta_title || hospital.name,
        description: hospital.seo_metadata.meta_description || hospital.short_description,
        keywords: hospital.seo_metadata.meta_keywords,
        ogImage: hospital.seo_metadata.og_image || hospital.image,
        canonical: hospital.seo_metadata.canonical_url,
      });

      document.title = hospital.seo_metadata.meta_title || hospital.name;

      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = hospital.seo_metadata.meta_description || hospital.short_description || '';
    } else if (hospital?.name) {
      document.title = hospital.name + ' | Blink Eye Hospital';
    }
  }, [hospital]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error if hospital not found
  if (error && !hospital) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Hospital Not Found</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <a href="/" className="text-primary-600 hover:text-primary-700 font-medium">
            ← Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <Layout hospital={hospital} hospitals={hospitals} seoMeta={seoMeta}>
      <Routes>
        {/* Path-based hospital routes */}
        <Route path="/:hospitalSlug" element={<Home hospital={hospital} hospitals={hospitals} />} />
        <Route path="/:hospitalSlug/about" element={<About hospital={hospital} />} />
        <Route path="/:hospitalSlug/services" element={<Services hospital={hospital} />} />
        <Route path="/:hospitalSlug/doctors" element={<Doctors hospital={hospital} />} />
        <Route path="/:hospitalSlug/blog" element={<Blog hospital={hospital} />} />
        <Route path="/:hospitalSlug/blog/:slug" element={<BlogPost hospital={hospital} />} />
        <Route path="/:hospitalSlug/contact" element={<Contact hospital={hospital} />} />
        <Route path="/:hospitalSlug/book-appointment" element={<BookAppointment hospital={hospital} />} />

        {/* Fallback routes (if someone accesses without a slug while testing locally) */}
        <Route path="/" element={<Home hospital={hospital} hospitals={hospitals} />} />
        <Route path="/about" element={<About hospital={hospital} />} />
        <Route path="/services" element={<Services hospital={hospital} />} />
        <Route path="/doctors" element={<Doctors hospital={hospital} />} />
        <Route path="/blog" element={<Blog hospital={hospital} />} />
        <Route path="/contact" element={<Contact hospital={hospital} />} />
        <Route path="/book-appointment" element={<BookAppointment hospital={hospital} />} />
      </Routes>
    </Layout>
  );
}

export default App;

