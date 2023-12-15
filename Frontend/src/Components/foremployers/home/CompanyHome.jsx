import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';

function CompanyHome() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(<Home />);
  const openSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const handleSidebarLinkClick = (component) => {
    setCurrentComponent(component);
  };

  return (
    <Flex>
      <Sidebar isOpen={openSidebarToggle} openSidebar={openSidebar} handleLinkClick={handleSidebarLinkClick} />
      <Flex direction="column" flex="1">
        <Header openSidebar={openSidebar} />
        <Flex p={4} flex="1" overflow="auto">
        {currentComponent}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default CompanyHome;
