import FolderOpenIcon from '@heroicons/react/24/solid/FolderOpenIcon';
import { SvgIcon } from '@mui/material';
import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import { FamilyRestroomOutlined } from '@mui/icons-material';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';


export const items = [
  {
    title: 'Projects',
    path: '/',
    icon: (
      <SvgIcon fontSize="small">
        <FolderOpenIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Analytics',
    // path: '/analytics',
    disabled: true,
    padding: 2,
    icon: (
      <SvgIcon fontSize="small">
       <ChartBarIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Compare',
    path: '/compare/projects',
    disabled: false,
    padding: 2,
    icon: (
      <SvgIcon fontSize="small">
       <TroubleshootIcon />
      </SvgIcon>
    )
  },
];
