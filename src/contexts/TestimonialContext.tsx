import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/constants/base';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image?: string;
  quote: string;
}

const fallbackTestimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Monika Gupta',
    role: 'Programmer',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3lAsaRkY1bio7NHqRCtay8n-WZSMXHGBpcA&s',
    quote: 'I have been associated with TPC since 2008. It has always been a pleasure to serve the institute.',
  },
  {
    id: 2,
    name: 'Kunnal Thapa',
    role: 'Alumni',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3lAsaRkY1bio7NHqRCtay8n-WZSMXHGBpcA&s',
    quote: 'My alma mater has improved significantly since the new building started operating.',
  },
  {
    id: 3,
    name: 'Gurmehak Kaur',
    role: 'Lecturer',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3lAsaRkY1bio7NHqRCtay8n-WZSMXHGBpcA&s',
    quote: 'We take extreme pleasure in being associated with TPC for our manpower requirements.',
  },
  {
    id: 4,
    name: 'Arsheen Kaur',
    role: 'Lecturer',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3lAsaRkY1bio7NHqRCtay8n-WZSMXHGBpcA&s',
    quote: 'The faculty support and resources have been instrumental in my academic journey.',
  },
  {
    id: 5,
    name: 'Deepak Batish',
    role: 'Lecturer',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3lAsaRkY1bio7NHqRCtay8n-WZSMXHGBpcA&s',
    quote: 'The collaborative environment and facilities make this institution truly special.',
  },
];

const TestimonialContext = createContext<Testimonial[]>([]);

export const TestimonialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get<Testimonial[]>(`${BASE_URL}/testimonials`);
        if (response.data && response.data.length > 0) {
          setTestimonials(response.data);
          console.log('Fetched testimonials:', response.data);
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        setTestimonials(fallbackTestimonials);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <TestimonialContext.Provider value={testimonials}>
      {children}
    </TestimonialContext.Provider>
  );
};

export const useTestimonials = () => useContext(TestimonialContext);
