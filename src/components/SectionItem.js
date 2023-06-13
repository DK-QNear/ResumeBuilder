import React, { useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import SectionDescription from './SectionDescription';

const SectionItem = ({ section, index, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(section.name);
  const [toggle, setToggle] = useState(section.enabled);
  const [showDescription, setShowDescription] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (name !== section.name || toggle !== section.enabled) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [name, toggle, section.name, section.enabled, setIsChanged]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    onSave(section.id, name, toggle);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleInfo = () => {
    setShowDescription(!showDescription);
  };

  const handleDarkToggle = () => {
    setIsDark(!isDark); 
  };

  return (
    <Draggable draggableId={section.id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            backgroundColor: isDark ? '#bababa' : '#f7f7f7',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '4px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', width:'97vw' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <button onClick={handleDarkToggle} style={{ color: isDark ? '#fff' : '#555' }}>
                ☰
              </button>
              <button
                className="info-button"
                onClick={handleInfo}
                style={{
                  cursor: 'pointer',
                  padding: '6px',
                  border: 'none',
                  backgroundColor: '#f7f7f7',
                  fontSize: '18px',
                  color: '#555',
                  transition: 'color 0.3s',
                }}
              >
                ⓘ
              </button>
              {editing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    fontWeight: 'bold',
                    marginRight: '10px',
                  }}
                />
              ) : (
                <span style={{ fontWeight: 'bold', marginRight: '10px' }}>
                  {name}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {editing ? (
                <button
                  onClick={handleSave}
                  disabled={!isChanged}
                  style={{
                    cursor: 'pointer',
                    padding: '6px',
                    border: 'none',
                    backgroundColor: !isChanged ? '#ccc' : '#f7f7f7',
                    fontSize: '18px',
                    color: !isChanged ? '#999' : '#555',
                    transition: 'color 0.3s, background-color 0.3s',
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={handleEdit}
                  style={{
                    cursor: 'pointer',
                    padding: '6px',
                    border: 'none',
                    backgroundColor: '#f7f7f7',
                    fontSize: '18px',
                    color: '#555',
                    transition: 'color 0.3s',
                  }}
                >
                  ✎
                </button>
              )}
              <div
                className={`toggle-container ${toggle ? 'checked' : ''}`}
                onClick={handleToggle}
                style={{
                  display: 'flex',
                  cursor: 'pointer',
                  alignItems: 'center',
                  marginLeft: '10px',
                  transition: 'transform 0.3s',
                  transform: toggle ? 'translateX(20px)' : 'translateX(0)',
                }}
              >
                <div
                  className={`toggle-slider ${toggle ? 'checked' : ''}`}
                  style={{
                    width: '40px',
                    height: '20px',
                    borderRadius: '10px',
                    backgroundColor: toggle ? '#4caf50' : '#f44336',
                    transition: 'background-color 0.3s',
                  }}
                />
                <div
                  className={`toggle-handle ${toggle ? 'checked' : ''}`}
                  toggle={toggle}
                  style={{
                    position: 'relative',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: toggle ? '#4caf50' : '#f44336',
                    transition: 'background-color 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                >
                  {toggle ? '✓' : '✕'}
                </div>
              </div>
            </div>
          </div>
          {showDescription && (
            <SectionDescription description={section.description} />
          )}
        </div>
      )}
    </Draggable>
  );
};

export default SectionItem;
