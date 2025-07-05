import React, { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';
import { COLORS } from '@/constants/colors';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
}

const testimonials: Testimonial[] = [
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

const Testimonials: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollAmount = 0;
    const interval = setInterval(() => {
      if (!container) return;
      scrollAmount += 1;
      container.scrollLeft += 1;

      if (scrollAmount >= container.scrollWidth - container.clientWidth) {
        scrollAmount = 0;
        container.scrollLeft = 0;
      }
    }, 20); 

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="bg-white py-24 px-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-semibold uppercase" style={{ color: COLORS.primaryBg }}>
            Testimonials
          </h2>
          <div className="w-28 h-1 mx-auto rounded-full mt-2" style={{ backgroundColor: COLORS.primaryBg }}></div>
        </div>

        <div className="relative flex items-center">
          <div
            ref={scrollRef}
            className="flex w-full overflow-x-auto scroll-smooth py-6 hide-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            <div className="flex gap-6 px-2 min-w-full transition-transform duration-500 ease-out">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-xl shadow-xl border border-slate-100 p-6 w-[320px] md:w-[360px] lg:w-[400px] flex-shrink-0 hover:shadow-2xl transition duration-300"
                >
                  <div>
                    <Quote className="w-8 h-8 mb-4" style={{ color: COLORS.primaryBg }} />
                    <blockquote className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-5">
                      {t.quote}
                    </blockquote>
                  </div>

                  <div className="pt-4 mt-auto border-t border-gray-200">
                    <div className="flex items-center mt-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden mr-3 border border-gray-300">
                        <img
                          src={t.image}
                          alt={t.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{t.name}</h4>
                        <p className="text-sm font-medium" style={{ color: COLORS.accent }}>
                          {t.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
