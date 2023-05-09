// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { DollarOutlined, LoginOutlined, PhoneOutlined, RocketOutlined,UnorderedListOutlined,EditOutlined,ApartmentOutlined,ReadOutlined } from '@ant-design/icons';

// icons
const icons = { DollarOutlined, LoginOutlined, PhoneOutlined, RocketOutlined, UnorderedListOutlined, EditOutlined,ApartmentOutlined,ReadOutlined };

// ==============================|| MENU ITEMS - PAGES ||============================== //

const Courses = {
  id: 'group-pages',
  title: <FormattedMessage id="Course Manager" />,
  type: 'group',
  children: [
    {
      id: 'list',
      title: <FormattedMessage id="Courses" />,
      type: 'item',
      url: '/course-manager/list',
      icon: icons.ReadOutlined,
      target: false
    },
   
  ]
};

export default Courses;
