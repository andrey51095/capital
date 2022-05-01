import React from 'react'
import { Navigation } from "baseui/side-navigation";
import { useLocation, useNavigate } from 'react-router-dom';
import { Block } from 'baseui/block';

import {routes} from '../../constants';

const navItems = [
  { title: 'Create Money Bundle', itemId: routes.createMoneyBundle },
  { title: 'Money Bundles', itemId: routes.moneyBundles },
];

const SideNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavChange = ({ event, item }) => {
    event.preventDefault();
    navigate(item.itemId)
}

  return (
    <Block height="100%" backgroundColor="primary50">
      <Navigation
        items={navItems}
        activeItemId={location.pathname}
        onChange={handleNavChange}
      />
    </Block>)
 }
export default SideNav;