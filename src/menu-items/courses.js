// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { DollarOutlined, LoginOutlined, PhoneOutlined, RocketOutlined,UnorderedListOutlined,EditOutlined } from '@ant-design/icons';

// icons
const icons = { DollarOutlined, LoginOutlined, PhoneOutlined, RocketOutlined, UnorderedListOutlined, EditOutlined };

// ==============================|| MENU ITEMS - PAGES ||============================== //

const Courses = {
  id: 'group-pages',
  title: <FormattedMessage id="Course Manager" />,
  type: 'group',
  children: [
    {
      id: 'list',
      title: <FormattedMessage id="Coures List" />,
      type: 'item',
      url: '/course-list',
      icon: icons.UnorderedListOutlined,
      target: false
    },
   
  ]
};

export default Courses;
