import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, BookOpen, Github, ExternalLink, ShoppingCart, FileText, Download,
Menu, X, ChevronRight
} from 'lucide-react';

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

interface ContentSection {
  _id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  subtitle: string;
  description: string;
  resources: {
    _id: string;
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    link: string;
    linkText: string;
  }[];
}

const contentSections: ContentSection[] = [
  {
    _id: '66c1a2b4f8e9d12345678901',
    title: 'Machine Learning with Python',
    icon: BookOpen,
    subtitle: 'Teaching Materials',
    description: 'Comprehensive teaching materials designed to seamlessly integrate into your curriculum. Everything you need to deliver engaging machine learning courses.',
    resources: [
      {
        _id: '66c1a2b4f8e9d12345678902',
        icon: FileText,
        title: 'PowerPoint Slides (Editable)',
        description: 'Complete set of lecture slides, fully customizable for your teaching needs. Includes diagrams, examples, and exercise templates.',
        link: 'https://drive.google.com/drive/folders/1e58gAoZ_XtyqjuB5h-Ja17rsg6fMPssL',
        linkText: 'Access Slides Folder'
      },
      {
        _id: '66c1a2b4f8e9d12345678903',
        icon: Github,
        title: 'GitHub Repository with Colab-Ready Notebooks',
        description: 'Interactive Jupyter notebooks ready to run in Google Colab. Includes code examples, datasets, and practical exercises.',
        link: 'https://github.com/bhatiaparteek/ml_with_python',
        linkText: 'View on GitHub'
      },
      {
        _id: '66c1a2b4f8e9d12345678904',
        icon: BookOpen,
        title: 'Cambridge Book Page',
        description: 'Official Cambridge University Press page with detailed book information, sample chapters, and additional resources.',
        link: 'https://www.cambridge.org/highereducation/books/machine-learning-with-python/DEA3D763262EB770E3E47DAEAA6588B5#overview',
        linkText: 'Visit Cambridge Page'
      },
      {
        _id: '66c1a2b4f8e9d12345678905',
        icon: Download,
        title: 'Request Examination Copy (For Faculty)',
        description: 'Faculty members can request a complimentary examination copy for course evaluation and adoption consideration.',
        link: 'https://www.cambridge.org/highereducation/books/machine-learning-with-python/DEA3D763262EB770E3E47DAEAA6588B5/examination-copy/login',
        linkText: 'Submit Request'
      },
      {
        _id: '66c1a2b4f8e9d12345678906',
        icon: ShoppingCart,
        title: 'Buy on Amazon India',
        description: 'Purchase your copy directly from Amazon India with fast delivery and competitive pricing.',
        link: 'https://www.amazon.in/Machine-Learning-Python-Principles-Techniques/dp/1009170244',
        linkText: 'Buy Now on Amazon'
      }
    ]
  },
];

const GenericResourcesPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [selectedSection, setSelectedSection] = useState<string>('66c1a2b4f8e9d12345678901');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const currentSection = contentSections.find(section => section._id === selectedSection) || contentSections[0];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSectionChange = (sectionId: string) => {
    setSelectedSection(sectionId);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-white relative overflow-hidden pt-20">
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

      <div className="flex relative z-10">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed top-4 left-4 z-50 bg-white border border-gray-200 rounded-lg p-2 shadow-lg hover:bg-gray-50 transition-colors duration-200"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Sidebar */}
        <div className={`fixed lg:static inset-y-0 left-0 z-40 w-80 bg-white border-r border-gray-200 shadow-lg lg:shadow-none transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Resources</h2>
            <nav className="space-y-2">
              {contentSections.map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section._id}
                    onClick={() => handleSectionChange(section._id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-300 group ${
                      selectedSection === section._id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    <IconComponent className={`w-6 h-6 ${
                      selectedSection === section._id ? 'text-white' : 'text-gray-500 group-hover:text-blue-500'
                    }`} />
                    <div className="flex-1 text-left">
                      <div className="font-semibold">{section.title}</div>
                      <div className={`text-sm ${
                        selectedSection === section._id ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {section.subtitle}
                      </div>
                    </div>
                    {selectedSection === section._id && (
                      <ChevronRight className="w-5 h-5 text-white" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-12">
            {/* Header Section */}
            <div className={`text-center mb-16 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} transition-all duration-1000`}>
              <div className="inline-flex items-center gap-3 bg-gray-100 border border-gray-200 rounded-full px-6 py-3 mb-6">
                <currentSection.icon className="w-6 h-6 text-blue-600" />
                <span className="text-gray-700 font-medium">{currentSection.subtitle}</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
                {currentSection.title}
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {currentSection.description}
              </p>
            </div>

            {/* Resources Grid */}
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-6 md:gap-8">
                {currentSection.resources.map((resource, index) => (
                  <ResourceCard
                    key={resource._id}
                    icon={resource.icon}
                    title={resource.title}
                    description={resource.description}
                    link={resource.link}
                    linkText={resource.linkText}
                    delay={100 * (index + 1)}
                  />
                ))}
              </div>
            </div>

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericResourcesPage;