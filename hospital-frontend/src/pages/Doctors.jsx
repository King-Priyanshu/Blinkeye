import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, Phone, X } from 'lucide-react';
import { getDoctors } from '../services/api';
import { Link } from 'react-router-dom';
import DoctorCard from '../components/DoctorCard';

export default function Doctors({ hospital }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      // Don't fetch if hospital is not loaded yet
      if (!hospital?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await getDoctors(hospital.id);
        if (response.data.success) {
          setDoctors(response.data.data);
        }
      } catch (error) {
        setDoctors([
          { id: 1, name: 'Dr. Rajesh Kumar', specialty: 'Cataract & LASIK Surgeon', experience: 20, bio: 'Over 20 years of experience in cataract and refractive surgery. Performed over 10,000 successful surgeries.', image: null, education: 'MBBS, MS (Ophthalmology), Fellowship in Cataract Surgery', languages: ['English', 'Hindi', 'Punjabi'] },
          { id: 2, name: 'Dr. Priya Sharma', specialty: 'Retina Specialist', experience: 15, bio: 'Expert in retinal diseases and vitreous surgeries. Specializes in diabetic retinopathy treatment.', image: null, education: 'MBBS, MS (Ophthalmology), Fellowship in Retina', languages: ['English', 'Hindi'] },
          { id: 3, name: 'Dr. Amit Patel', specialty: 'Cornea Specialist', experience: 12, bio: 'Specialized in corneal transplants and ocular surface diseases.', image: null, education: 'MBBS, MS (Ophthalmology), Fellowship in Cornea', languages: ['English', 'Hindi', 'Gujarati'] },
          { id: 4, name: 'Dr. Sneha Reddy', specialty: 'Pediatric Ophthalmologist', experience: 10, bio: 'Dedicated to child eye care and squint treatment.', image: null, education: 'MBBS, MS (Ophthalmology), Fellowship in Pediatric Ophthalmology', languages: ['English', 'Hindi', 'Telugu'] },
          { id: 5, name: 'Dr. Vikram Singh', specialty: 'Glaucoma Specialist', experience: 18, bio: 'Expert in glaucoma diagnosis and treatment with focus on early detection.', image: null, education: 'MBBS, MS (Ophthalmology), Fellowship in Glaucoma', languages: ['English', 'Hindi', 'Punjabi'] },
          { id: 6, name: 'Dr. Meera Joshi', specialty: 'Oculoplasty', experience: 14, bio: 'Specialized in cosmetic and reconstructive eyelid surgery.', image: null, education: 'MBBS, MS (Ophthalmology), Fellowship in Oculoplasty', languages: ['English', 'Hindi', 'Marathi'] },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [hospital?.id]);

  // Get unique specialties
  const specialties = [...new Set(doctors.map(d => d.specialty).filter(Boolean))];

  // Filter doctors
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

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
              Our Expert <span className="text-gradient">Doctors</span>
            </h1>
            <p className="text-xl text-gray-600">
              Meet our team of highly qualified and experienced ophthalmologists dedicated to providing you with the best possible eye care
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Specialty Filter */}
            <div className="relative">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="appearance-none w-full md:w-64 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
              >
                <option value="">All Specialties</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            {/* Clear Filters */}
            {(searchTerm || selectedSpecialty) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialty('');
                }}
                className="flex items-center gap-2 px-4 py-3 text-gray-600 hover:text-primary-600"
              >
                <X className="w-5 h-5" />
                Clear
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="h-64 bg-gray-200" />
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-2" />
                    <div className="h-4 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredDoctors.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor, index) => (
                <DoctorCard key={doctor.id} doctor={doctor} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No doctors found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSpecialty('');
                }}
                className="mt-4 text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Need Help Choosing a Doctor?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Our team will help you find the right specialist for your needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/book-appointment"
                className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
              >
                Book Free Consultation
              </Link>
              <a
                href={`tel:${hospital?.phone || '+919999999999'}`}
                className="border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition-colors"
              >
                Call: {hospital?.phone || '+91 99999 99999'}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
