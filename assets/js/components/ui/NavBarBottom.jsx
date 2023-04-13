import React from 'react';
import PropTypes from 'prop-types';

export default function NavBarBottom({ children }) {
  return (
    <nav className="fixed bottom-0 w-full h-10 md:h-14 px-4 flex justify-end items-center gap-4 bg-gray-dark/70">
      {children}
    </nav>
  );
}

NavBarBottom.propTypes = {
  children: PropTypes.node.isRequired,
};
