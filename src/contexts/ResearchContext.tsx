import React, { createContext, useContext } from 'react';

export interface ResearchProject {
  _id: string;
  title: string;
  amount: string;
  fundingAgency: string;
  scheme: string;
  duration: string;
  investigators: string;
  discription: string;
  link?: string;
}

const researchProjects: ResearchProject[] = [
  {
    _id: '1',
    title:
      'Tox2020: Toxicity Prediction of pre clinical trial drug using Physico-chemical Properties and Machine Learning Approaches (File No: ECR/2015/000150)',
    amount: '25.87 Lakhs',
    fundingAgency: 'DST-SERB',
    scheme: 'Early Career Research Scheme',
    duration: 'Two Year (2016–18)',
    investigators: 'PS Rana, V Kumar, D Garg, A Mishra',
    discription: '',
    link: '/research/tox2020',
  },
  {
    _id: '2',
    title:
      'SmartGlucoBinder: Design and Synthesis of a Small Glucose Binder Molecule using Computational Intelligence Approach (File No: ECR/2016/001231/LS)',
    amount: '27.19 Lakhs',
    fundingAgency: 'DST-SERB',
    scheme: 'Early Career Research Scheme',
    duration: 'Three Year (2017–20)',
    investigators: 'V Kumar, PS Rana, A Ali, A Mishra',
    discription: '',
    link: '/research/smartglucobinder',
  },
  {
    _id: '3',
    title: 'Drug Molecule Designing using Modelling and Simulation',
    amount: '2.5 Lakhs',
    fundingAgency: 'NVIDIA',
    scheme: 'NVIDIA GPU Grant for Academic',
    duration: 'One Year (2018–19)',
    investigators: 'PS Rana',
    discription: '',
    link: '/research/drug-design',
  },
  {
    _id: '4',
    title:
      'An Efficient Modified Artificial Bee Colony based Approach for Solving Wind Farm Layout Optimization Problem (File No: TEQIP-III/RTU(ATU)/CRS/2019-20/16)',
    amount: '2.4 Lakhs',
    fundingAgency: 'RTU(ATU) TEQIP-III',
    scheme: 'Competitive Research Scheme',
    duration: 'One Year (2019–20)',
    discription: '',
    investigators: 'N Sharma, A Sharma, H Sharma, PS Rana, K Sharma',
    link: '/research/wind-farm',
  },
  {
    _id: '5',
    title:
      'Aarogya Parhari: Tracking and Data Analysis of Patients for Predictive Management (File No: CIBioD/20/151)',
    amount: '5.5 Lakhs',
    fundingAgency: 'ICMR - PGIMER',
    scheme: 'ICMR - CIBioD (Center for Innovation & Bio-Design)',
    duration: 'Three Months (2020)',
    investigators: 'PS Rana',
    discription: '',
    link: '/research/aarogya-parhari',
  },
  {
    _id: '6',
    title: 'Development of an Intelligent Blood Extraction Device (File No: ---)',
    amount: '35.05 Lakhs',
    fundingAgency: 'ICMR',
    scheme: 'GIA (Grant-in-Aid)',
    duration: 'Three Years',
    investigators: 'S Pattnaik, H Sharma, PS Rana',
    discription: '',
    link: '/research/blood-device',
  },
];

const ResearchContext = createContext<ResearchProject[]>(researchProjects);

export const useResearch = () => useContext(ResearchContext);

export const ResearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ResearchContext.Provider value={researchProjects}>
      {children}
    </ResearchContext.Provider>
  );
};
