import React, { useState, useEffect } from 'react';
import { CheckCircle, BookOpen, Github, ExternalLink, ShoppingCart, FileText, Download } from 'lucide-react';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const increment: number = target / (duration / 16);
    const timer = setInterval(() => {
      setCount((prev: number) => {
        if (prev < target) {
          return Math.min(prev + increment, target);
        }
        clearInterval(timer);
        return target;
      });
    }, 16);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <>{Math.floor(count)}</>;
};

interface ResourceCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  link: string;
  linkText: string;
  delay?: number;
}

const ResourceCard: React.FC<ResourceCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  link, 
  linkText, 
  delay = 0 
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 hover:bg-gray-100/80 hover:scale-105 transition-all duration-500 group hover:shadow-lg ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
          </div>
          <p className="text-gray-700 mb-4 leading-relaxed">{description}</p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-4 py-2 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
          >
            {linkText}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

interface FloatingElementProps {
  children: React.ReactNode;
  delay?: number;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ children, delay = 0 }) => {
  return (
    <div 
      className="animate-bounce"
      style={{ 
        animationDelay: `${delay}ms`,
        animationDuration: '3s',
        animationIterationCount: 'infinite'
      }}
    >
      {children}
    </div>
  );
};

const MLBookResources: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingElement delay={0}>
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/5 rounded-full blur-xl"></div>
        </FloatingElement>
        <FloatingElement delay={1000}>
          <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/5 rounded-full blur-xl"></div>
        </FloatingElement>
        <FloatingElement delay={2000}>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-pink-500/5 rounded-full blur-xl"></div>
        </FloatingElement>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className={`text-center mb-16 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000`}>
          {/* <div className="inline-flex items-center gap-3 bg-gray-100 border border-gray-200 rounded-full px-6 py-3 mb-6">
            <BookOpen className="w-6 h-6 text-blue-600" />
            <span className="text-gray-700 font-medium">Cambridge University Press</span>
          </div> */}
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
            Instructor Resources
          </h1>
          
          <h2 className="text-2xl md:text-3xl text-gray-700 font-light mb-4 leading-relaxed">
            <span className="italic text-blue-600">Machine Learning with Python:</span><br />
            <span className="text-purple-600">Principles and Practical Techniques</span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive teaching materials designed to seamlessly integrate into your curriculum. 
            Everything you need to deliver engaging machine learning courses.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">
                <AnimatedCounter target={5} />+
              </div>
              <div className="text-sm text-gray-600">Resources</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">
                <AnimatedCounter target={100} />+
              </div>
              <div className="text-sm text-gray-600">Slides</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">
                <AnimatedCounter target={50} />+
              </div>
              <div className="text-sm text-gray-600">Exercises</div>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-6 md:gap-8">
            <ResourceCard
              icon={FileText}
              title="PowerPoint Slides (Editable)"
              description="Complete set of lecture slides, fully customizable for your teaching needs. Includes diagrams, examples, and exercise templates."
              link="https://drive.google.com/drive/folders/your-slides-folder"
              linkText="Access Slides Folder"
              delay={100}
            />
            <ResourceCard
              icon={Github}
              title="GitHub Repository with Colab-Ready Notebooks"
              description="Interactive Jupyter notebooks ready to run in Google Colab. Includes code examples, datasets, and practical exercises."
              link="https://github.com/bhatiaparteek/ml_with_python"
              linkText="View on GitHub"
              delay={200}
            />
            <ResourceCard
              icon={BookOpen}
              title="Cambridge Book Page"
              description="Official Cambridge University Press page with detailed book information, sample chapters, and additional resources."
              link="https://www.cambridge.org/highereducation/books/machine-learning-with-python"
              linkText="Visit Cambridge Page"
              delay={300}
            />
            <ResourceCard
              icon={Download}
              title="Request Examination Copy (For Faculty)"
              description="Faculty members can request a complimentary examination copy for course evaluation and adoption consideration."
              link="https://www.cambridge.org/academic/textbooks/examination-copy-request"
              linkText="Submit Request"
              delay={400}
            />
            <ResourceCard
              icon={ShoppingCart}
              title="Buy on Amazon India"
              description="Purchase your copy directly from Amazon India with fast delivery and competitive pricing."
              link="https://www.amazon.in/Machine-Learning-Python-Principles-Techniques/dp/your-book-id"
              linkText="Buy Now on Amazon"
              delay={500}
            />
          </div>
        </div>

        {/* Call to Action */}
        {/* <div className="text-center mt-16 p-8 bg-gradient-to-r from-blue-50 to-purple-50 border border-gray-200 rounded-3xl">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Transform Your Teaching?</h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Join hundreds of educators worldwide who are already using these resources to deliver 
            exceptional machine learning education.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3 rounded-xl text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25">
              Get Started Today
            </button>
            <button className="border border-gray-300 hover:border-gray-400 px-8 py-3 rounded-xl text-gray-700 font-semibold transition-all duration-300 hover:bg-gray-50 hover:scale-105">
              Contact Support
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default MLBookResources;