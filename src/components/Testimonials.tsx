import React, { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';
import { COLORS } from '@/constants/colors';
import { useTestimonials } from '@/contexts/TestimonialContext';
import { BASE_URL } from '@/constants/base';

const placeholderImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/500px-Unknown_person.jpg';

const Testimonials: React.FC = () => {
  const testimonials = useTestimonials();
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
    }, 25);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-24 px-4">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-10 text-center`}>
            My <span className={`${COLORS.gradientText}`}>Testimonials</span>
          </h2>
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
            <div className="flex gap-6 px-4 min-w-full">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 w-[320px] md:w-[360px] lg:w-[400px] flex-shrink-0 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <Quote className="w-8 h-8 mb-4 text-blue-500" />
                    <blockquote className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-6">
                      {t.quote}
                    </blockquote>
                  </div>

                  <div className="pt-4 mt-auto border-t border-gray-200">
                    <div className="flex items-center mt-4">
                      <div className="w-14 h-14 rounded-full overflow-hidden mr-3 border border-gray-300">
                        <img
                          src={BASE_URL +'/' +t.image?.trim() || placeholderImage}
                          alt={t.name}
                          onError={(e) => ((e.target as HTMLImageElement).src = placeholderImage)}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800">{t.name}</h4>
                        <p className={`text-sm font-medium ${COLORS.gradientText}`}>
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
