// Reusable Services Data - Easy to maintain and update
const servicesData = [
  {
    id: 'ai',
    title: 'AI-Powered Solutions',
    icon: 'lni-gift',
    description: 'Advanced AI algorithms and machine learning solutions for business optimization.',
    features: [
      'Predictive Analytics',
      'Natural Language Processing',
      'Computer Vision',
      'Machine Learning Models'
    ]
  },
  {
    id: 'web',
    title: 'Responsive Web Applications',
    icon: 'lni-move',
    description: 'Modern, scalable web solutions built with cutting-edge technologies.',
    features: [
      'Responsive Web Applications',
      'Progressive Web Apps (PWA)',
      'E-commerce Solutions',
      'Content Management Systems'
    ]
  },
  {
    id: 'mobile',
    title: 'Cross-Platform Mobile Solutions',
    icon: 'lni-layout',
    description: 'High-performance mobile apps that work seamlessly across platforms.',
    features: [
      'Native iOS & Android Apps',
      'Cross-platform Development',
      'Mobile App Design',
      'App Store Optimization'
    ]
  },
  {
    id: 'cloud',
    title: 'Cloud Solutions',
    icon: 'lni-layers',
    description: 'Enterprise cloud services for scalable infrastructure.',
    features: [
      'Cloud Migration',
      'DevOps & CI/CD',
      'Serverless Architecture',
      'Cloud Security'
    ]
  }
];

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = servicesData;
}

