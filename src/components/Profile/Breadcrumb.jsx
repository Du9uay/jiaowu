import React from 'react';

const Breadcrumb = ({ items }) => {
  console.log('Breadcrumb component rendering with items:', items);

  return (
    <nav className="breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="breadcrumb-item">
          {index < items.length - 1 ? (
            <>
              <span>{item}</span>
              <span className="breadcrumb-separator">/</span>
            </>
          ) : (
            <span className="breadcrumb-current">{item}</span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb; 