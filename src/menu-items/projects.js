// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { DollarOutlined, LoginOutlined, PhoneOutlined, RocketOutlined,UnorderedListOutlined,EditOutlined,CalendarOutlined } from '@ant-design/icons';

// icons
const icons = { DollarOutlined, LoginOutlined, PhoneOutlined, RocketOutlined, UnorderedListOutlined, EditOutlined,CalendarOutlined};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const Courses = {
  id: 'group-pages',
  title: <FormattedMessage id="Project Manager" />,
  type: 'group',
  children: [
    {
      id: 'list',
      title: <FormattedMessage id="Projects" />,
      type: 'item',
      url: '/project-manager/project-list',
      icon: icons.CalendarOutlined,
      target: false
    },
   
  ]
};

export default Courses;
