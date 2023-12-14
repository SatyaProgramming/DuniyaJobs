import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import Header from './Header';
import Sidebar from './Sidebar';
import Home from './Home';

function CompanyHome() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const openSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <Flex>
      <Sidebar isOpen={openSidebarToggle} openSidebar={openSidebar} />
      <Flex direction="column" flex="1">
        <Header openSidebar={openSidebar} />
        <Flex p={4} flex="1" overflow="auto">
          <Home />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default CompanyHome;
