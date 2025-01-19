import React, { useState, useEffect } from 'react';

const ScrollNav = ({ scrollTo, currentPage }) => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    setActiveSection(Math.round(currentPage));
  }, [currentPage]);

  return (
    <nav className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
      {[0, 1, 2, 3, 4, 5, 6].map((page) => (
        <button
          key={page}
          onClick={() => scrollTo(page)}
          className={`block w-3 h-3 mb-2 rounded-full transition-all duration-300 ${
            activeSection === page
              ? 'bg-blue-500 dark:bg-blue-400 scale-125'
              : 'bg-white dark:bg-gray-800 hover:bg-blue-300 dark:hover:bg-blue-600'
          } shadow-lg`}
          aria-label={`Scroll to section ${page + 1}`}
          aria-current={activeSection === page ? 'true' : 'false'}
        />
      ))}
    </nav>
  );
};

export default ScrollNav;
