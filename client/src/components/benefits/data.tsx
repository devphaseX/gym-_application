import React from 'react';
import {
  HomeModernIcon,
  UserGroupIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
interface BenefitData {
  title: string;
  icon: React.ReactNode;
  description: string;
  refUrl?: string;
}

const benefitsData: Array<BenefitData> = [
  {
    icon: <HomeModernIcon style={{ width: '24px', height: '24px' }} />,
    title: 'State of the Art Facilities',
    description:
      'Neque adipiscing amet amet enim. Feugiat dolor enim fermentum in a in lectus pellentesque. Ullamcorper et.',
  },
  {
    icon: <UserGroupIcon style={{ width: '24px', height: '24px' }} />,
    title: "100's of Diverse Classes",
    description:
      'Eu ipsum id egestas risus tempus enim semper felis quis. Nec consectetur ac venenatis facilisi est. Eget ac turpis id.',
  },
  {
    icon: <AcademicCapIcon style={{ width: '24px', height: '24px' }} />,
    title: 'Expert and Pro Trainers',
    description:
      'Fusce vestibulum aliquam ut cras. Nisl lectus egestas sapien nisl. Lacus at mi sit pellentesque. Congue parturient.',
  },
];

export { benefitsData };
export type { BenefitData };
