import React from 'react';
import SearchBox from './SearchBox';
import '../../../styles/home-page-components-styles/search-bar/ExpandedSearchBox.css';

const ExpandedSearchBox = ({
  firstDestination,
  secondDestination,
  handleInputChange,
  suggestions,
  handleSuggestionClick,
  activeInput,
  onSwap,
  onClear,
  isExpanded
}) => {
  return (
    <section className="expanded-form">
      <SearchBox
        destination={firstDestination}
        handleInputChange={(e) => handleInputChange(e, 'first')}
        suggestions={activeInput === 'first' ? suggestions : []}
        handleSuggestionClick={handleSuggestionClick}
        showDirectionIcon={false}
        showXmarkIcon={true}
        showRotateIcon={false}
        onXmarkClick={onClear}
        className="expanded-search-input"
      />
      
      <SearchBox
        destination={secondDestination}
        handleInputChange={(e) => handleInputChange(e, 'second')}
        suggestions={activeInput === 'second' ? suggestions : []}
        handleSuggestionClick={handleSuggestionClick}
        inputType="second"
        placeholder="Край ..."
        showDirectionIcon={false}
        showXmarkIcon={false}
        showRotateIcon={true}
        onRotateClick={onSwap}
        style={{color: '1f50e0'}}
        className="expanded-search-input"
      />
      <hr className="separator"/>
    </section>
  );
};

export default ExpandedSearchBox;