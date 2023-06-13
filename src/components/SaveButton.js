import React from 'react';

const SaveButton = ({ isChanged }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      <button
        disabled={!isChanged}
        style={{
          cursor: 'pointer',
          padding: '6px',
          border: 'none',
          backgroundColor: !isChanged ? '#ccc' : '#bababa',
          fontSize: '18px',
          color: !isChanged ? '#999' : 'black',
          transition: 'color 0.3s, background-color 0.3s',
        }}
      >
        Save And Next
      </button>
    </div>
  );
};

export default SaveButton;
