import React, { useState, useEffect } from 'react';
import SectionList from './components/SectionList';
import SaveButton from './components/SaveButton';

const App = () => {
  const [sections, setSections] = useState([

    { id: 1, name: 'Profile Summary', enabled: true, description: 'Description of Profile section' },
    { id: 2, name: 'Academic and Cocurricular Achievements', enabled: true, description: 'Description of academic and cocurricular achievement section' },
    { id: 3, name: 'Summer Internship Experience', enabled: true, description: 'Description of summer internship section' },
    { id: 4, name: 'Work Experience', enabled: true, description: 'Description of work experience section' },
    { id: 5, name: 'Projects', enabled: true, description: 'Description of projects section' },
    { id: 6, name: 'Certifications', enabled: true, description: 'Description of certifications section' },
    { id: 7, name: 'Leadership Positions', enabled: true, description: 'Description of leadership positions section' },
    { id: 8, name: 'Extracurricular', enabled: true, description: 'Description of extracurricular section' },
    { id: 9, name: 'Education', enabled: true, description: 'Description of education section' },

  ]);

  const [isChanged, setIsChanged] = useState(false);

  const handleSortEnd = (updatedSections) => {
    setSections(updatedSections);
    setIsChanged(true);
  };

  const handleSave = (sectionId, name, toggle) => {
   
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        return {
          ...section,
          name,
          enabled: toggle,
        };
      }
      return section;
    });

    setSections(updatedSections);
    setIsChanged(false);
  };

  useEffect(() => {
    const hasChanges = sections.some(
      (section) => section.name !== section.originalName || section.enabled !== section.originalEnabled
    );
    setIsChanged(hasChanges);
  }, [sections]);

  return (
    <div>
      <h2 style={{textAlign:'center'}}>Select your Sections</h2>
     <SectionList sections={sections} onSortEnd={handleSortEnd} onSave={handleSave} setIsChanged={setIsChanged} />
      <SaveButton isChanged={isChanged} />
    </div>
  );
};

export default App;
