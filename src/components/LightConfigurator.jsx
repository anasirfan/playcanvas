"use client";
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { FaChevronLeft, FaChevronRight, FaSave, FaShoppingCart, FaInfoCircle, FaQuestionCircle, FaSun, FaMoon, FaPlus, FaMinus, FaChevronDown, FaLightbulb, FaLayerGroup, FaRegLightbulb, FaPallet, FaCheck, FaUser } from "react-icons/fa";
import PlayCanvasViewer from "./PlayCanvasViewer";

import { useRouter } from "next/navigation";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Theme Toggle Component
const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <motion.button
      className={`fixed top-24 right-4 z-50 p-3 rounded-full shadow-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'}`}
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isDarkMode ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-indigo-600" />}
    </motion.button>
  );
};

// Light Type Component
const LightTypeSelector = ({ selectedType, onTypeChange, isDarkMode }) => {
  const types = [
    { id: "wall", name: "Wall Light", icon: "/images/configrenders/wall.jpg" },
    { id: "ceiling", name: "Ceiling Light", icon: "/images/configrenders/ceiling.jpg" },
    { id: "floor", name: "Floor Light", icon: "/images/configrenders/floor.jpg" },
  ];

  return (
    <motion.div 
      className={`mb-6 ${isDarkMode ? 'text-white' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-bold mb-3 font-['Amenti']">Light Type</h3>
      <div className="flex space-x-4">
        {types.map((type) => (
          <motion.div
            key={type.id}
            className={`relative cursor-pointer ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} p-2 rounded-lg`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onTypeChange(type.id)}
          >
            <div className={`w-20 h-20 rounded-lg overflow-hidden relative ${selectedType === type.id ? 'ring-2 ring-emerald-500 ring-offset-2' : ''}`}>
              <Image
                src={type.icon}
                alt={type.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-center text-sm mt-2">{type.name}</p>
            {selectedType === type.id && (
              <motion.div 
                className="absolute -bottom-1 left-0 right-0 h-1 bg-emerald-500 rounded-full"
                layoutId="activeTypeIndicator"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              ></motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const BaseTypeSelector = ({ baseType, onBaseTypeChange, isDarkMode, isVisible }) => {
  const baseTypes = [
    { id: "round", name: "Round Base" },
    { id: "rectangular", name: "Rectangular Base" }
  ];

  if (!isVisible) return null;

  return (
    <motion.div 
      className={`mb-6 ${isDarkMode ? 'text-white' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-bold mb-3 font-['Amenti']">Base Type</h3>
      <div className="flex space-x-4">
        {baseTypes.map((type) => (
          <motion.div
            key={type.id}
            className={`cursor-pointer p-3 rounded-lg ${baseType === type.id 
              ? isDarkMode ? 'bg-emerald-700' : 'bg-emerald-100'
              : isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onBaseTypeChange(type.id)}
          >
            <p className="text-center">{type.name}</p>
            {baseType === type.id && (
              <motion.div 
                className="h-1 bg-emerald-500 rounded-full mt-2"
                layoutId="baseTypeIndicator"
              ></motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
// System Selector Component
const SystemSelector = ({ selectedSystem, onSystemChange, isDarkMode, baseType }) => {
  // Define all available systems
  const allSystems = [
    { id: "bar", name: "Bar System" },
    { id: "ball", name: "Ball System" },
    { id: "universal", name: "Universal System" },
    { id: "chandeliers", name: "Chandeliers" },
  ];
  
  // Filter systems based on baseType - hide chandeliers when base is round
  const systems = baseType === 'round' 
    ? allSystems.filter(system => system.id !== 'chandeliers')
    : allSystems;

  return (
    <motion.div 
      className={`mb-6 ${isDarkMode ? 'text-white' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-bold mb-3 font-['Amenti']">Select System</h3>
      <div className="grid grid-cols-2 gap-4">
        {systems.map((system) => (
          <motion.div
            key={system.id}
            className={`cursor-pointer p-4 rounded-lg ${selectedSystem === system.id 
              ? isDarkMode ? 'bg-emerald-700' : 'bg-emerald-100'
              : isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSystemChange(system.id)}
          >
            <p className="text-center font-medium">{system.name}</p>
            {selectedSystem === system.id && (
              <motion.div 
                className="h-1 bg-emerald-500 rounded-full mt-2"
                layoutId="systemTypeIndicator"
              ></motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Light Amount Selector Component
const LightAmountSelector = ({ amount, onAmountChange, isDarkMode, lightType, baseType }) => {
  // Different amounts based on light type and base type
  const getAmountsForLightType = () => {
    switch(lightType) {
      case 'wall':
        return [1]; // Wall lights only have 1 option
      case 'floor':
        return [3]; // Floor lights have 1-3 options
      case 'ceiling':
        // If ceiling with rectangular base, only show 3 option
        return baseType === 'rectangular' ? [3] : [1, 3, 6, 24];
      default: // others
        return [1, 3, 6, 24];
    }
  };

  const amounts = getAmountsForLightType();

  return (
    <motion.div 
      className={`mb-6 ${isDarkMode ? 'text-white' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h3 className="text-lg font-bold mb-3 font-['Amenti']">Light Amount</h3>
      <div className="flex flex-wrap gap-3">
        {console.log("lighttype: ", lightType)}
        {amounts.map((num) => (
          
          <motion.div
            key={num}
            className={`w-20 h-20 rounded-full flex items-center justify-center cursor-pointer overflow-hidden ${amount === num
              ? "ring-4 ring-emerald-500 ring-offset-2 ring-offset-charleston-green shadow-xl"
              : isDarkMode 
                ? "bg-gray-700 hover:bg-gray-600" 
                : "bg-gray-200 hover:bg-gray-300"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAmountChange(num)}
            layout
          >
            {/* Use images instead of text with larger size */}
            <Image 
              src={`/images/configIcons/${lightType}/${num}.png`}
              alt={`${num} light${num > 1 ? 's' : ''}`}
              width={80}
              height={80}
              className="object-cover w-full h-full"
            />
          
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Light Design Selector Component
const LightDesignSelector = ({ selectedDesign, onDesignChange, isDarkMode }) => {
  const designs = [
    { id: 'bumble', name: 'Bumble', image: '/images/configOptions/1.png' },
    { id: 'radial', name: 'Radial', image: '/images/configOptions/2.png' },
    { id: 'fina', name: 'Fina', image: '/images/configOptions/3.png' },
    // { id: 'ico', name: 'Ico', image: '/images/configOptions/4.png' },
    { id: 'ripple', name: 'Ripple', image: '/images/configOptions/5.png' },
  ];
  
  const scrollContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // Update maxScroll when designs change
  useEffect(() => {
    if (scrollContainerRef.current) {
      setMaxScroll(
        scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
      );
    }
    
    // Add window resize listener
    const handleResize = () => {
      if (scrollContainerRef.current) {
        setMaxScroll(
          scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
        );
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [designs.length]);
  
  // Handle scroll
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };
  
  // Scroll controls
  const scrollToLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollToRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };
  
  // Mouse drag functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return (
    <motion.div 
      className={`mb-6 relative ${isDarkMode ? 'text-white' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-bold mb-3 font-['Amenti']">Select Pendant Design</h3>
      
      {/* Mobile swipe indicator */}
      <div className="md:hidden flex justify-center items-center mb-2">
        <div className={`flex items-center gap-2 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-200/70'} backdrop-blur-sm rounded-full px-3 py-1 text-xs animate-pulse`}>
          <FaChevronLeft className={`${isDarkMode ? 'text-white/70' : 'text-gray-600/70'} animate-pulse-slow`} />
          <span className={isDarkMode ? 'text-white/90' : 'text-gray-700/90'}>Swipe</span>
          <FaChevronRight className={`${isDarkMode ? 'text-white/70' : 'text-gray-600/70'} animate-pulse-slow`} />
        </div>
      </div>
      
      <div className="relative">
        <motion.button
          onClick={scrollToLeft}
          className={`absolute left-0 top-0 bottom-0 flex items-center justify-center w-12 z-10 bg-transparent ${
            scrollPosition <= 10 ? "opacity-30 cursor-not-allowed" : "opacity-100"
          }`}
          disabled={scrollPosition <= 10}
          whileTap={{ scale: 0.95 }}
        >
          <FaChevronLeft className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
        </motion.button>
        
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto hide-scrollbar py-4 px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          {designs.map((design) => (
            <motion.div
              key={design.id}
              className={`flex-shrink-0 cursor-pointer select-none mx-8`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onDesignChange(design.id)}
            >
              <div className={`w-24 h-24 rounded-full overflow-hidden relative ${selectedDesign === design.id ? 'ring-2 ring-emerald-500 ring-offset-2' : ''}`}>
                <Image
                  src={design.image}
                  alt={design.name}
                  fill
                  className="object-cover select-none"
                  draggable={false}
                />
              </div>
              <p className="text-center text-sm mt-2">{design.name}</p>
              {selectedDesign === design.id && (
                <motion.div 
                  className="h-1 bg-emerald-500 rounded-full mt-1 mx-auto w-12"
                  layoutId="designIndicator"
                ></motion.div>
              )}
            </motion.div>
          ))}
        </div>
        
        <motion.button
          onClick={scrollToRight}
          className={`absolute right-0 top-0 bottom-0 flex items-center justify-center w-12 z-10 bg-transparent ${
            scrollPosition >= maxScroll - 10 ? "opacity-30 cursor-not-allowed" : "opacity-100"
          }`}
          disabled={scrollPosition >= maxScroll - 10}
          whileTap={{ scale: 0.95 }}
        >
          <FaChevronRight className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-700'}`} />
        </motion.button>
      </div>
    </motion.div>
  );
};

// Multi-Select Pendant Configuration Component
const PendantConfigurator = ({ pendants, updatePendantDesign, isDarkMode }) => {

  // State for selected pendants and current design
  const [selectedPendants, setSelectedPendants] = useState([]);
  const [currentDesign, setCurrentDesign] = useState('bumble');
  const [showSelectionUI, setShowSelectionUI] = useState(false);

  // Scroll container ref for pendant selector
  const scrollContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  
  // Update maxScroll when pendants change
  useEffect(() => {
    if (scrollContainerRef.current) {
      setMaxScroll(
        scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
      );
    }
    
    // Add window resize listener
    const handleResize = () => {
      if (scrollContainerRef.current) {
        setMaxScroll(
          scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth
        );
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pendants.length]);
  
  // Handle scroll for pendant selector
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };
  
  // Scroll controls for pendant selector
  const scrollToLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollToRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };
  
  // Toggle pendant selection
  const togglePendantSelection = (index) => {
    if (selectedPendants.includes(index)) {
      setSelectedPendants(selectedPendants.filter(i => i !== index));
    } else {
      setSelectedPendants([...selectedPendants, index]);
    }
    
    // Show selection UI if at least one pendant is selected
    setShowSelectionUI(selectedPendants.length > 0 || !selectedPendants.includes(index));
  };
  
  // Select all pendants
  const selectAllPendants = () => {
    setSelectedPendants(pendants.map((_, index) => index));
    setShowSelectionUI(true);
  };
  
  // Clear all selections
  const clearSelections = () => {
    setSelectedPendants([]);
    setShowSelectionUI(false);
  };
  
  // Apply design to selected pendants
  const applyDesignToSelected = (designId) => {
    // Update current design state
    setCurrentDesign(designId);
    
    // Apply to all selected pendants at once by passing the array of indices
    updatePendantDesign(designId, selectedPendants);
    
    // Show toast notification
    toast.success(`Applied ${designId} design to ${selectedPendants.length} pendant${selectedPendants.length !== 1 ? 's' : ''}`, {
      position: "bottom-right",
      autoClose: 2000,
      theme: isDarkMode ? "dark" : "light"
    });
  };
  
  // Apply current design to all pendants
  const applyToAll = () => {
    // Create array of all pendant indices
    const allIndices = pendants.map((_, index) => index);
    
    // Apply design to all pendants at once
    updatePendantDesign(currentDesign, allIndices);
    
    // Show toast notification
    toast.success(`Applied ${currentDesign} design to all pendants`, {
      position: "bottom-right",
      autoClose: 2000,
      theme: isDarkMode ? "dark" : "light"
    });
  };
  
  return (
    <motion.div 
      className={`mt-6 pt-4 border-t ${isDarkMode ? 'border-gray-700 text-white' : 'border-gray-200'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold font-['Amenti']">Individual Pendant Configuration</h3>
        
        {/* Total pendants info */}
        <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {pendants.length} pendant{pendants.length !== 1 ? 's' : ''}
        </div>
      </div>
      
      {/* Instructions */}
      <div className={`mb-4 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Select one or multiple pendant locations to configure them together.
      </div>
      
      {/* Horizontal scrollable pendant selector */}
      <div className="relative mb-6">
        {/* Left scroll button - only visible when overflowing */}
        {maxScroll > 10 && (
          <motion.button
            onClick={scrollToLeft}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} shadow-md ${scrollPosition <= 10 ? 'opacity-40 cursor-not-allowed' : 'opacity-100'}`}
            disabled={scrollPosition <= 10}
            whileTap={{ scale: 0.95 }}
          >
            <FaChevronLeft />
          </motion.button>
        )}
        
        {/* Scrollable pendant selector */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto hide-scrollbar py-4 px-10"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onScroll={handleScroll}
        >
          {pendants.map((pendant, index) => (
            <motion.div 
              key={index}
              className={`flex-shrink-0 mx-2 cursor-pointer`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => togglePendantSelection(index)}
            >
              <div 
                className={`w-16 h-16 rounded-full flex items-center justify-center text-lg font-bold transition-all overflow-hidden relative ${selectedPendants.includes(index) 
                  ? 'ring-2 ring-emerald-500 ring-offset-2' 
                  : isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                {/* Background image of pendant design */}
                {pendant?.design && (
                  <div 
                    className="absolute inset-0 w-full h-full opacity-80"
                    style={{
                      backgroundImage: `url(/images/configOptions/${pendant.design === 'bumble' ? '1' : pendant.design === 'radial' ? '2' : pendant.design === 'fina' ? '3' : pendant.design === 'ico' ? '4' : '5'}.png)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }}
                  ></div>
                )}
                
                {/* Overlay for better text visibility */}
                <div className={`absolute inset-0 ${selectedPendants.includes(index) ? 'bg-emerald-500/70' : isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'}`}></div>
                
                {/* Pendant number */}
                <span className={`relative z-10 ${selectedPendants.includes(index) ? 'text-white' : isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  {index + 1}
                </span>
              </div>
              <div className="text-center text-xs mt-1">
                <span className="capitalize">{pendant?.design || 'bumble'}</span>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Right scroll button - only visible when overflowing */}
        {maxScroll > 10 && (
          <motion.button
            onClick={scrollToRight}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center rounded-full ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-800'} shadow-md ${scrollPosition >= maxScroll - 10 ? 'opacity-40 cursor-not-allowed' : 'opacity-100'}`}
            disabled={scrollPosition >= maxScroll - 10}
            whileTap={{ scale: 0.95 }}
          >
            <FaChevronRight />
          </motion.button>
        )}
      </div>
      
      {/* Selection controls */}
      <div className="flex justify-between mb-4">
        <button 
          onClick={selectAllPendants}
          className={`px-3 py-1 rounded-lg text-sm ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
        >
          Select All
        </button>
        
        {selectedPendants.length > 0 && (
          <button 
            onClick={clearSelections}
            className={`px-3 py-1 rounded-lg text-sm ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
          >
            Clear Selection ({selectedPendants.length})
          </button>
        )}
      </div>
      
      {/* Configuration UI */}
      {showSelectionUI && selectedPendants.length > 0 && (
        <motion.div 
          className={`p-4 rounded-lg mb-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-bold">
              Configure {selectedPendants.length === pendants.length ? 'All' : selectedPendants.length} Pendant{selectedPendants.length !== 1 ? 's' : ''}
            </h4>
            
            {selectedPendants.length < pendants.length && (
              <button 
                onClick={applyToAll}
                className="px-3 py-1 text-sm bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg"
              >
                Apply to All
              </button>
            )}
          </div>
          
          <div className="p-2">
            <LightDesignSelector 
              selectedDesign={currentDesign} 
              onDesignChange={applyDesignToSelected}
              isDarkMode={isDarkMode}
            />
          </div>
        </motion.div>
      )}
      
      {/* Show message when no pendants are selected */}
      {!showSelectionUI && (
        <div className={`p-4 rounded-lg text-center ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <p className="text-sm">Select one or more pendants above to configure them.</p>
        </div>
      )}
    </motion.div>
  );
};



// Cable Options Component
const CableOptions = ({ selectedCableColor, selectedCableLength, onCableChange, isDarkMode }) => {
  const cableColors = [
    { id: "black", name: "Black" },
    { id: "white", name: "White" }
  ];
  
  const cableLengths = [
    { id: "2mm", name: "2mm" },
    { id: "3mm", name: "3mm" },
    { id: "5mm", name: "5mm" }
  ];

  return (
    <motion.div 
      className={`mb-6 ${isDarkMode ? 'text-white' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className="text-lg font-bold mb-3 font-['Amenti']">Cable Options</h3>
      
      {/* Cable Color Selection */}
      <div className="mb-4">
        <h4 className="text-sm font-medium mb-2">Color</h4>
        <div className="flex space-x-3">
          {cableColors.map((color) => (
            <motion.div
              key={color.id}
              className={`cursor-pointer p-2 rounded-lg ${selectedCableColor === color.id 
                ? isDarkMode ? 'bg-gray-700 ring-2 ring-emerald-500' : 'bg-gray-100 ring-2 ring-emerald-500'
                : isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50 border border-gray-200'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCableChange(color.id, selectedCableLength)}
            >
              <div className="flex items-center space-x-2">
                <div 
                  className={`w-5 h-5 rounded-full ${color.id === 'black' ? 'bg-black' : 'bg-white border border-gray-300'}`}
                ></div>
                <span>{color.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Cable Length Selection */}
      <div>
        <h4 className="text-sm font-medium mb-2">Length</h4>
        <div className="flex space-x-3">
          {cableLengths.map((length) => (
            <motion.div
              key={length.id}
              className={`cursor-pointer py-2 px-4 rounded-lg ${selectedCableLength === length.id 
                ? isDarkMode ? 'bg-emerald-600 text-white' : 'bg-emerald-500 text-white'
                : isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50 border border-gray-200'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCableChange(selectedCableColor, length.id)}
            >
              {length.name}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Selected Configuration */}
      <div className={`mt-3 p-2 rounded text-sm ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <p>Selected: {selectedCableColor.charAt(0).toUpperCase() + selectedCableColor.slice(1)} cable, {selectedCableLength} length</p>
      </div>
    </motion.div>
  );
};

// Additional Information Section
const AdditionalInfo = ({ isDarkMode }) => {
  const [activeTab, setActiveTab] = useState('installation');
  
  // Installation steps animation reference
  const stepsRef = useRef(null);
  
  useEffect(() => {
    if (stepsRef.current && activeTab === 'installation') {
      const steps = stepsRef.current.querySelectorAll('.step-item');
      gsap.fromTo(steps, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [activeTab]);

  return (
    <motion.div 
      className={`mt-12 pt-12 ${isDarkMode ? 'border-t border-gray-700 text-white' : 'border-t border-gray-200'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-3xl font-bold mb-8 font-['Amenti'] text-center">
        Additional Information
      </h2>
      
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8 overflow-x-auto pb-2">
        <div className={`inline-flex rounded-lg p-1 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          {['installation', 'delivery', 'specifications', 'reviews'].map((tab) => (
            <motion.button
              key={tab}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${activeTab === tab 
                ? isDarkMode ? 'bg-emerald-700 text-white' : 'bg-emerald-500 text-white'
                : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab === 'installation' && 'Installation Guide'}
              {tab === 'delivery' && 'What\'s Included'}
              {tab === 'specifications' && 'Technical Specs'}
              {tab === 'reviews' && 'Customer Reviews'}
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Tab Content */}
      <div className={`rounded-xl shadow-lg overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Installation Guide */}
        {activeTab === 'installation' && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold mb-4 font-['Amenti'] text-emerald-500">Installation Guide</h3>
                <p className="mb-6">Our lights are designed for easy installation, but we recommend following these steps for best results:</p>
                
                <div ref={stepsRef} className="space-y-4">
                  {[
                    { step: 1, title: "Turn off power", desc: "Always ensure the power is off at the circuit breaker before beginning installation." },
                    { step: 2, title: "Mount the bracket", desc: "Secure the mounting bracket to the ceiling or wall junction box." },
                    { step: 3, title: "Connect the wires", desc: "Connect the fixture wires to your home wiring according to the included instructions." },
                    { step: 4, title: "Attach the fixture", desc: "Secure the light fixture to the mounting bracket." },
                    { step: 5, title: "Install bulbs & test", desc: "Install the bulbs and restore power to test the fixture." }
                  ].map((item) => (
                    <motion.div 
                      key={item.step}
                      className="step-item flex items-start gap-3"
                      whileHover={{ x: 5 }}
                    >
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${isDarkMode ? 'bg-emerald-700' : 'bg-emerald-100'}`}>
                        <span className={isDarkMode ? 'text-white' : 'text-emerald-700'}>{item.step}</span>
                      </div>
                      <div>
                        <h4 className="font-bold">{item.title}</h4>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <p className="text-sm">For detailed instructions, refer to the installation manual included with your purchase.</p>
                  <button className={`mt-4 px-4 py-2 rounded-lg flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                    <FaInfoCircle /> Download Installation PDF
                  </button>
                </div>
              </div>
              
              <div className="md:w-1/2 relative min-h-[300px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-700 opacity-20 rounded-lg"></div>
                <div className="p-6 relative z-10 h-full flex flex-col justify-center">
                  <h4 className="text-lg font-bold mb-2">Professional Installation</h4>
                  <p className="mb-4">For ceiling and wall lights, we recommend professional installation for the best results and safety.</p>
                  
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                    <h5 className="font-bold mb-2">Installation Requirements</h5>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Standard junction box</li>
                      <li>Basic electrical tools</li>
                      <li>Wire connectors (included)</li>
                      <li>Mounting hardware (included)</li>
                      <li>Screwdriver and pliers</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* What's Included */}
        {activeTab === 'delivery' && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold mb-4 font-['Amenti'] text-emerald-500">What's Included</h3>
                <p className="mb-6">Every LIMI light package contains everything you need for a complete installation:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {[
                    { title: "Light Fixture(s)", desc: "Your configured pendant light(s)" },
                    { title: "Mounting Hardware", desc: "Brackets, screws, and anchors" },
                    { title: "Power Cable", desc: "Your selected cable length and color" },
                    { title: "LED Bulbs", desc: "Energy-efficient smart bulbs" },
                    { title: "Installation Guide", desc: "Step-by-step instructions" },
                    { title: "Warranty Card", desc: "5-year manufacturer warranty" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                      whileHover={{ scale: 1.03 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <h4 className="font-bold">{item.title}</h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
                
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-emerald-50'} border-l-4 border-emerald-500`}>
                  <h4 className="font-bold mb-1">Shipping Information</h4>
                  <p className="text-sm">All orders are carefully packaged and shipped within 2-3 business days. Delivery typically takes 5-7 business days depending on your location.</p>
                </div>
              </div>
              
              <div className="md:w-1/2 relative min-h-[300px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 rounded-lg"></div>
                <div className="p-6 relative z-10 h-full flex flex-col justify-center">
                  <h4 className="text-lg font-bold mb-2">Package Contents</h4>
                  
                  <div className={`p-4 rounded-lg mb-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                    <h5 className="font-bold mb-2">Smart Features</h5>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Compatible with LIMI mobile app for remote control</li>
                      <li>Works with voice assistants (Alexa, Google Home)</li>
                      <li>Scheduling and automation capabilities</li>
                      <li>Color temperature and brightness control</li>
                    </ul>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                    <h5 className="font-bold mb-2">Care Instructions</h5>
                    <p className="text-sm mb-2">To maintain the beauty of your LIMI lights:</p>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>Clean with a soft, dry cloth</li>
                      <li>Avoid chemical cleaners</li>
                      <li>Dust regularly to maintain brightness</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Technical Specifications */}
        {activeTab === 'specifications' && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold mb-4 font-['Amenti'] text-emerald-500">Technical Specifications</h3>
                <p className="mb-6">LIMI lights are designed with premium materials and advanced technology:</p>
                
                <div className="space-y-4 mb-6">
                  {[
                    { title: "Bulb Type", value: "E26/E27 socket, LED smart bulbs included" },
                    { title: "Power", value: "9W - 12W per bulb (60W equivalent)" },
                    { title: "Voltage", value: "110-240V AC, 50/60Hz" },
                    { title: "Color Temperature", value: "2700K-6500K (adjustable)" },
                    { title: "Brightness", value: "800-1100 lumens per bulb" },
                    { title: "Connectivity", value: "Wi-Fi, Bluetooth" },
                    { title: "Materials", value: "Aircraft-grade aluminum, premium glass" },
                    { title: "Lifespan", value: "25,000+ hours" }
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex justify-between items-center border-b last:border-0 pb-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="font-medium">{item.title}</span>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{item.value}</span>
                    </motion.div>
                  ))}
                </div>
                
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-emerald-50'} border-l-4 border-emerald-500`}>
                  <h4 className="font-bold mb-1">Energy Efficiency</h4>
                  <p className="text-sm">LIMI lights are Energy Star certified, consuming up to 85% less energy than traditional incandescent bulbs while providing the same brightness.</p>
                </div>
              </div>
              
              <div className="md:w-1/2 relative min-h-[300px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-10 rounded-lg"></div>
                <div className="p-6 relative z-10 h-full flex flex-col justify-center">
                  <h4 className="text-lg font-bold mb-2">Socket & Bulb Information</h4>
                  
                  <div className={`p-4 rounded-lg mb-4 ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                    <h5 className="font-bold mb-2">Smart Bulb Features</h5>
                    <ul className="list-disc pl-5 space-y-2 text-sm">
                      <li>Full color spectrum (16 million colors)</li>
                      <li>Adjustable white temperature (warm to cool)</li>
                      <li>Dimmable from 1% to 100%</li>
                      <li>Scene presets for different moods and activities</li>
                      <li>Energy usage monitoring</li>
                    </ul>
                  </div>
                  
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                    <h5 className="font-bold mb-2">Dimensions</h5>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="font-medium">Pendant Size:</p>
                        <p>Diameter: 120mm - 200mm</p>
                        <p>Height: 140mm - 180mm</p>
                      </div>
                      <div>
                        <p className="font-medium">Cable Length:</p>
                        <p>Standard: 2m</p>
                        <p>Extended: 3m, 5m</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Customer Reviews */}
        {activeTab === 'reviews' && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <h3 className="text-xl font-bold mb-4 font-['Amenti'] text-emerald-500">Customer Reviews</h3>
                
                <div className="flex items-center mb-6">
                  <div className="flex text-yellow-400 text-2xl">
                    {"★★★★★".split("").map((star, i) => (
                      <span key={i}>{star}</span>
                    ))}
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-xl">4.9/5</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Based on 128 reviews</p>
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  {[
                    { name: "Jane D.", rating: 5, comment: "The configurator made it so easy to visualize exactly what I wanted. The lights look even better in person!" },
                    { name: "Mark T.", rating: 5, comment: "Exceptional quality and the smart features work flawlessly with my home system. The app is intuitive and reliable." },
                    { name: "Sarah L.", rating: 4, comment: "Beautiful design and excellent build quality. Installation was straightforward with the included instructions." }
                  ].map((review, index) => (
                    <motion.div 
                      key={index}
                      className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}
                      whileHover={{ scale: 1.02 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold">{review.name}</h4>
                        <div className="flex text-yellow-400">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                      </div>
                      <p className={`text-sm italic ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>"{review.comment}"</p>
                    </motion.div>
                  ))}
                </div>
                
                <button className={`px-4 py-2 rounded-lg flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}>
                  View All Reviews
                </button>
              </div>
              
              <div className="md:w-1/2 relative min-h-[300px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-10 rounded-lg"></div>
                <div className="p-6 relative z-10 h-full flex flex-col justify-center">
                  <h4 className="text-lg font-bold mb-4">Customer Satisfaction</h4>
                  
                  <div className="space-y-3 mb-6">
                    {[
                      { label: "Overall Quality", percentage: 98 },
                      { label: "Smart Features", percentage: 96 },
                      { label: "Ease of Installation", percentage: 92 },
                      { label: "Customer Service", percentage: 97 }
                    ].map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{item.label}</span>
                          <span>{item.percentage}%</span>
                        </div>
                        <div className={`w-full h-2 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                          <motion.div 
                            className="h-full rounded-full bg-emerald-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${item.percentage}%` }}
                            transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                          ></motion.div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100'}`}>
                    <h5 className="font-bold mb-2">Awards & Recognition</h5>
                    <ul className="list-disc pl-5 space-y-1 text-sm">
                      <li>2024 Design Innovation Award</li>
                      <li>Smart Home Product of the Year</li>
                      <li>Energy Efficiency Excellence</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// Main Component
const LightConfigurator = () => {
  // Redux setup
  
  const router = useRouter();

  // State for configuration options
  // Always use dark mode
  const isDarkMode = true;
  const [lightType, setLightType] = useState('ceiling');
  const [lightAmount, setLightAmount] = useState(lightType === 'ceiling' ? 1 : lightType === 'floor' ? 3 : 1);
  const [lightDesign, setLightDesign] = useState('radial');
  const [cableColor, setCableColor] = useState('black');
  const [cableLength, setCableLength] = useState('1.5m');
  const [pendants, setPendants] = useState([]);
  const [totalPrice, setTotalPrice] = useState('0.00');
  const [productSlug, setProductSlug] = useState(null);
  const [productOptions, setProductOptions] = useState({});
  
  // State for save configuration modal
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [configName, setConfigName] = useState('');
  
  // State for mobile UI
  const [activeTab, setActiveTab] = useState('type');
  
  // State for animations
  const [scrollY, setScrollY] = useState(0);
  const [animatedElements, setAnimatedElements] = useState([]);
  const [baseType, setBaseType] = useState('round');
  const [configurationType, setConfigurationType] = useState('individualize'); // 'individualize' or 'systems'
  const [selectedSystem, setSelectedSystem] = useState('bar');

// System change handler
const handleSystemChange = (system) => {
  setSelectedSystem(system);
  
  // Send message to iframe
  const iframe = document.getElementById('playcanvas-app');
  if (iframe && iframe.contentWindow) {
    iframe.contentWindow.postMessage(`system:${system}`, "*");
    
    // Also send base type if ceiling light
    if (lightType === 'ceiling') {
      iframe.contentWindow.postMessage(`base_type:${baseType}`, "*");
    }
  }
  
  toast.info(`System changed to ${system}`, {
    position: "bottom-right",
    autoClose: 1500,
    theme: isDarkMode ? "dark" : "light"
  });
};

// Configuration type change handler
const handleConfigurationTypeChange = (type) => {
  setConfigurationType(type);
  
  // Send appropriate messages based on configuration type
  const iframe = document.getElementById('playcanvas-app');
  if (iframe && iframe.contentWindow) {
    if (type === 'systems') {
      // When switching to systems, first send light_amount:1
      iframe.contentWindow.postMessage(`light_amount:1`, "*");
      iframe.contentWindow.postMessage(`pendant_design:product_2`, "*");
      
      
      // Then send system message
      iframe.contentWindow.postMessage(`system:${selectedSystem}`, "*");
      
      // Also send base type if ceiling light
      if (lightType === 'ceiling') {
        iframe.contentWindow.postMessage(`base_type:${baseType}`, "*");
      }
    } else {
      // If switching to individualize, send all pendant configurations
      iframe.contentWindow.postMessage(`light_amount:${lightAmount}`, "*");
      
      // Send pendant designs
      pendants.forEach((pendant) => {
        if (pendant.id < lightAmount) {
          const design = pendant.design || lightDesign;
          const productId = design === 'bumble' ? 'product_1' : 
                         design === 'radial' ? 'product_2' : 
                         design === 'fina' ? 'product_3' : 
                         design === 'ico' ? 'product_4' : 'product_5';
          
          iframe.contentWindow.postMessage(`pendant_${pendant.id}:${productId}`, "*");
        }
      });
    }
  }
};

// Base type change handler
const handleBaseTypeChange = (type) => {
  setBaseType(type);
  
  // If changing to rectangular and in individualize mode, force light amount to 3
  if (configurationType === 'individualize' && type === 'rectangular' && lightAmount !== 3) {
    setLightAmount(3);
  }
  
  // Send message to iframe
  const iframe = document.getElementById('playcanvas-app');
  if (iframe && iframe.contentWindow) {
    // Always send base type
    iframe.contentWindow.postMessage(`base_type:${type}`, "*");
    
    // Check which configuration type is selected
    if (configurationType === 'individualize') {
      // For individualize mode, send pendant configurations
      const newLightAmount = type === 'rectangular' ? 3 : lightAmount;
      iframe.contentWindow.postMessage(`light_amount:${newLightAmount}`, "*");
      
      // Send pendant designs
      pendants.forEach((pendant) => {
        if (pendant.id < newLightAmount) {
          const design = pendant.design || lightDesign;
          const productId = design === 'bumble' ? 'product_1' : 
                         design === 'radial' ? 'product_2' : 
                         design === 'fina' ? 'product_3' : 
                         design === 'ico' ? 'product_4' : 'product_5';
          
          iframe.contentWindow.postMessage(`pendant_${pendant.id}:${productId}`, "*");
        }
      });
    } else {
      // For systems mode, send the selected system
      if(type === 'round'){
        iframe.contentWindow.postMessage(`light_amount:1`, "*");
        iframe.contentWindow.postMessage(`pendant_design:product_2`, "*");
      }
      
      // Always send system message regardless of base type
      iframe.contentWindow.postMessage(`system:${selectedSystem}`, "*");
      
      // If chandelier option is selected and base type changes, make sure it's still visible
      if (selectedSystem === 'chandeliers') {
        // Ensure chandelier option remains visible for rectangular base
        iframe.contentWindow.postMessage(`show_chandelier:true`, "*");
      }
    }
  }
};
  
  // Refs
  const previewBoxRef = useRef(null);
  const configuratorRef = useRef(null);

  // Listen for app:ready1 message from PlayCanvas iframe
  useEffect(() => {
    const handleMessage = (event) => {
      // Check if the message is from our iframe
      if (event.data === 'app:ready1') {
        console.log('PlayCanvas app is ready');
        // Remove the loader when app is ready

        
        // Show notification that app is ready
        toast.success("3D Preview Ready", {
          position: "bottom-right",
          autoClose: 2000,
          theme: "dark"
        });
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
  
  // Parse URL parameters on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const productParam = params.get('product');
      const optionsParam = params.get('options');
      
      if (productParam) {
        setProductSlug(productParam);
        
        // You could fetch product data based on slug here
        // For now, we'll just set a default configuration based on product type
        if (productParam.includes('pendant')) {
          setLightType('pendant');
          setLightDesign('bumble');
        } else if (productParam.includes('wall')) {
          setLightType('wall');
        } else if (productParam.includes('floor')) {
          setLightType('floor');
        }
        
        // If options are provided in URL, parse and apply them
        if (optionsParam) {
          try {
            const options = JSON.parse(decodeURIComponent(optionsParam));
            setProductOptions(options);
            
            // Apply options to configurator
            if (options.design) setLightDesign(options.design);
            if (options.amount) setLightAmount(parseInt(options.amount));
            if (options.cableColor) setCableColor(options.cableColor);
            if (options.cableLength) setCableLength(options.cableLength);
          } catch (error) {
            console.error('Error parsing options from URL:', error);
          }
        }
        
        // Show notification that configuration was loaded from product
        toast.info(`Configuration loaded from ${productParam.replace(/-/g, ' ')}`, {
          position: "bottom-right",
          autoClose: 3000,
          theme: isDarkMode ? "dark" : "light"
        });
      }
    }
  }, [isDarkMode]);

  // Initialize pendants when amount changes
  // Store pendant configurations for each light amount
  const [pendantConfigurations, setPendantConfigurations] = useState({});

  // Initialize pendants only once and store configurations for each amount
  useEffect(() => {
    // Check if we already have configurations for all possible light amounts
    const hasAllConfigurations = [1, 3, 6, 24].every(amount => 
      pendantConfigurations[amount] !== undefined
    );

    if (!hasAllConfigurations) {
      // Create initial configurations for all possible light amounts
      const initialConfigurations = {};
      
      [1, 3, 6, 24].forEach(amount => {
        // Only generate if we don't already have a configuration for this amount
        if (pendantConfigurations[amount] === undefined) {
          initialConfigurations[amount] = Array.from({ length: amount }, (_, i) => ({
            id: i,
            design: i === 0 ? lightDesign : ['bumble', 'radial', 'fina', 'ripple'][Math.floor(Math.random() * 4)],
            color: '#50C878'
          }));
        } else {
          // Keep existing configuration
          initialConfigurations[amount] = pendantConfigurations[amount];
        }
      });
      
      // Update the configurations state
      setPendantConfigurations(initialConfigurations);
      
      // Set the initial pendants based on current light amount
      if (initialConfigurations[lightAmount]) {
        setPendants(initialConfigurations[lightAmount]);
      }
    }
  }, []); // Empty dependency array - only run on initial mount

  // Update pendants when light amount changes
  useEffect(() => {
    // If we have a saved configuration for this amount, use it
    if (pendantConfigurations[lightAmount]) {
      setPendants(pendantConfigurations[lightAmount]);
      
      // Send pendant configurations to iframe
      const iframe = document.getElementById('playcanvas-app');
      if (iframe && iframe.contentWindow) {
        // First send light type and amount
        iframe.contentWindow.postMessage(`light_type:${lightType}`, "*");
        iframe.contentWindow.postMessage(`light_amount:${lightAmount}`, "*");
        
        // Send pendant designs
        if (lightAmount === 1) {
          // For single pendant, send the global design
          const design = pendantConfigurations[lightAmount][0]?.design || lightDesign;
          const productId = design === 'bumble' ? 'product_1' : 
                           design === 'radial' ? 'product_2' : 
                           design === 'fina' ? 'product_3' : 
                           design === 'ico' ? 'product_4' : 'product_5';
          
          iframe.contentWindow.postMessage(`pendant_design:${productId}`, "*");
        } else {
          // For multiple pendants, send each pendant's design with proper ID
          setTimeout(() => {
            pendantConfigurations[lightAmount].forEach((pendant) => {
              const design = pendant.design;
              const productId = design === 'bumble' ? 'product_1' : 
                              design === 'radial' ? 'product_2' : 
                              design === 'fina' ? 'product_3' : 
                              design === 'ico' ? 'product_4' : 'product_5';
              
              console.log(`Initial send: pendant_${pendant.id}:${productId} for design ${design}`);
              iframe.contentWindow.postMessage(`pendant_${pendant.id}:${productId}`, "*");
            });
          }, 100); // Small delay to ensure light_amount is processed first
        }
      }
    }
  }, [lightAmount, lightType]);

  // Calculate price whenever configuration changes
  useEffect(() => {
    // Base price calculation
    const basePrice = 195;
    const typeMultiplier = lightType === "floor" ? 1.2 : lightType === "wall" ? 1.1 : 1;
    
    // Calculate price based on individual pendant designs
    let totalDesignPrice = 0;
    pendants.forEach(pendant => {
      const designPrice = pendant.design === "fina" || pendant.design === "bumble" ? 20 : 0;
      totalDesignPrice += basePrice + designPrice;
    });
    
    // Cable price
    const cableLengthPrice = cableLength === "5mm" ? 15 : cableLength === "3mm" ? 8 : 0;
    
    const calculatedPrice = (totalDesignPrice * typeMultiplier) + cableLengthPrice;
    setTotalPrice(calculatedPrice.toFixed(2));
  }, [lightType, pendants, cableColor, cableLength]);

  // Enhanced animations for preview box and other elements
  useEffect(() => {
    if (previewBoxRef.current) {
      // Register ScrollTrigger plugin
      gsap.registerPlugin(ScrollTrigger);
      
      // Animate preview box
      gsap.fromTo(
        previewBoxRef.current,
        { opacity: 0, y: 20, rotationY: -5 },
        { 
          opacity: 1, 
          y: 0, 
          rotationY: 0,
          duration: 1.2, 
          ease: "power3.out",
          clearProps: "rotationY" // Clear rotation after animation to prevent rendering issues
        }
      );
      
      // Collect all animatable elements
      const elements = document.querySelectorAll('.animate-on-scroll');
      setAnimatedElements(Array.from(elements));
      
      // Create parallax effect for preview box
      ScrollTrigger.create({
        trigger: configuratorRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          if (previewBoxRef.current) {
            // Subtle rotation based on scroll position
            gsap.to(previewBoxRef.current, {
              rotationY: self.progress * 5 - 2.5,
              rotationX: self.progress * 3 - 1.5,
              duration: 0.5,
              ease: 'power1.out'
            });
          }
        }
      });
      
      // Add floating animation to key elements
      gsap.to('.floating-element', {
        y: '-10px',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        stagger: 0.2
      });
      
      // Create staggered animations for list items
      gsap.from('.stagger-item', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.2)',
        scrollTrigger: {
          trigger: '.stagger-container',
          start: 'top 80%',
        }
      });
    }
    
    // Add scroll listener for parallax effects
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // ScrollTrigger for pinning - separate effect to refresh when pendants change
  useEffect(() => {
    let pinInstance;
    
    // Wait a bit for DOM to update with new pendants
    const timer = setTimeout(() => {
      if (previewBoxRef.current && configuratorRef.current) {
        // Create pinning with ScrollTrigger
        const previewSection = document.getElementById('light-configurator');
        
        if (previewSection) {
          // Kill any existing instance first
          if (pinInstance) pinInstance.kill();
          
          // Use CSS sticky positioning instead of GSAP pinning
          // This avoids the opacity flickering issues
          ScrollTrigger.create({
            trigger: previewSection,
            start: "top top",
            endTrigger: "#pricing-section",
            end: "top bottom",
            invalidateOnRefresh: true,
            onRefresh: () => {
              // Force refresh when ScrollTrigger updates
              if (previewBoxRef.current) {
                previewBoxRef.current.style.visibility = 'visible';
              }
            }
          });
          
          // Force a refresh of all ScrollTriggers
          ScrollTrigger.refresh();
        }
      }
    }, 100); // Short delay to ensure DOM is updated
    
    // Cleanup on unmount or when dependencies change
    return () => {
      clearTimeout(timer);
      if (pinInstance) pinInstance.kill();
    };
  }, [pendants.length, lightAmount]); // Refresh when pendants or light amount changes

  // Apply animations to the configurator
  const applyConfiguratorAnimations = () => {
    if (configuratorRef.current) {
      gsap.fromTo(
        configuratorRef.current,
        { opacity: 0.9 },
        { 
          opacity: 1, 
          duration: 0.5,
          ease: 'power2.inOut'
        }
      );
    }
  };

  // Handle light type change
  const handleLightTypeChange = (type) => {
    setLightType(type);
    
    // Determine if we need to update light amount for ceiling type
    const newAmount = type === 'ceiling' && lightAmount !== 1 ? 1 : lightAmount;
    
    // If type is ceiling, update the state if needed
    if (type === 'ceiling' && lightAmount !== 1) {
      setLightAmount(newAmount);
    }

    if (type === 'wall') {
      // For wall lights, set amount to 1 and design to 'radial'
      setLightAmount(1);
      setLightDesign('radial');
      // Emit the design change event
      handleLightDesignChange('radial');
    } else if (type === 'floor') {
      // For floor lights, set amount to 3 and design to 'radial'
      setLightAmount(3);
      setLightDesign('radial');
      // Emit the design change event
      handleLightDesignChange('radial');
    } else  if (type === 'ceiling' && lightAmount !== 1) {
      setLightAmount(newAmount);
    }
    
    // Send comprehensive message to PlayCanvas with all current configuration
    const iframe = document.getElementById('playcanvas-app');
    if (iframe && iframe.contentWindow) {
      // Send light type message
      iframe.contentWindow.postMessage(`light_type:${type}`, "*");
      
      // Send current light amount
      iframe.contentWindow.postMessage(`light_amount:${newAmount}`, "*");
      
      // Get the current pendants or create new ones if needed
      const currentPendants = pendants.length === newAmount ? pendants : 
        Array.from({ length: newAmount }, (_, i) => ({
          id: i,
          design: i === 0 ? lightDesign : ['bumble', 'radial', 'fina', 'ico', 'ripple'][Math.floor(Math.random() * 5)],
          color: '#50C878'
        }));
      
      // Send current pendant design(s)
      if (newAmount === 1) {
        // For single pendant, send the global design
        const design = currentPendants[0]?.design || lightDesign;
        const productId = design === 'bumble' ? 'product_1' : 
                         design === 'radial' ? 'product_2' : 
                         design === 'fina' ? 'product_3' : 
                         design === 'ico' ? 'product_4' : 'product_5';
        
        iframe.contentWindow.postMessage(`pendant_design:${productId}`, "*");
      } else {
        // For multiple pendants, send each pendant's design with their ID
        currentPendants.forEach((pendant) => {
          if (pendant.id < newAmount) { // Only send for the actual number of pendants
            const design = pendant.design || lightDesign;
            const productId = design === 'bumble' ? 'product_1' : 
                            design === 'radial' ? 'product_2' : 
                            design === 'fina' ? 'product_3' : 
                            design === 'ico' ? 'product_4' : 'product_5';
            
            iframe.contentWindow.postMessage(`pendant_${pendant.id}:${productId}`, "*");
          }
        });
      }
      
      // Send cable information
      iframe.contentWindow.postMessage(`cable_color:${cableColor}`, "*");
      iframe.contentWindow.postMessage(`cable_length:${cableLength}`, "*");
    }
    
    toast.info(`Light type changed to ${type}`, {
      position: "bottom-right",
      autoClose: 1500,
      theme: isDarkMode ? "dark" : "light"
    });
  };

  // Handle light amount change
  const handleLightAmountChange = (amount) => {
    setLightAmount(amount);
    
    // Check if we already have a configuration for this amount
    if (pendantConfigurations[amount]) {
      // Use the saved configuration
      setPendants(pendantConfigurations[amount]);
    } else {
      // Create updated pendants array based on new amount with proper IDs and unique designs
      let updatedPendants = [...pendants];
      
      if (amount > pendants.length) {
        // Add new pendants with randomized designs and proper IDs
        const designOptions = ['bumble', 'radial', 'fina', 'ico', 'ripple'];
        
        for (let i = pendants.length; i < amount; i++) {
          // Use a different random design for each new pendant
          const randomDesign = designOptions[Math.floor(Math.random() * designOptions.length)];
          
          updatedPendants.push({
            id: i,
            design: randomDesign, 
            color: '#50C878'
          });
        }
      } else if (amount < pendants.length) {
        // Remove excess pendants
        updatedPendants = updatedPendants.slice(0, amount);
      }
      
      // If only one pendant, update its design to match the global design
      if (amount === 1 && updatedPendants.length > 0 && lightDesign) {
        updatedPendants[0] = {
          ...updatedPendants[0],
          id: 0,
          design: lightDesign
        };
      }
      
      // Make sure all pendants have proper IDs and unique designs
      updatedPendants = updatedPendants.map((pendant, index) => ({
        ...pendant,
        id: pendant.id !== undefined ? pendant.id : index
      }));
      
      // Update the pendants state - important to do this before sending messages
      setPendants(updatedPendants);
      
      // Save this configuration for future use
      setPendantConfigurations(prev => ({
        ...prev,
        [amount]: updatedPendants
      }));
    }
    
    // Send comprehensive messages to PlayCanvas
    const iframe = document.getElementById('playcanvas-app');
    if (iframe && iframe.contentWindow) {
      // First send light amount message
      iframe.contentWindow.postMessage(`light_amount:${amount}`, "*");
      
      // Then send current light type
      iframe.contentWindow.postMessage(`light_type:${lightType}`, "*");
      
      // Get the current pendants (either from saved config or newly created)
      const currentPendants = pendantConfigurations[amount] || pendants;
      
      // Send pendant design information based on amount
      if (amount === 1) {
        // For single pendant, send the global design
        const design = currentPendants[0]?.design || lightDesign;
        const productId = design === 'bumble' ? 'product_1' : 
                         design === 'radial' ? 'product_2' : 
                         design === 'fina' ? 'product_3' : 
                         design === 'ico' ? 'product_4' : 'product_5';
        
        iframe.contentWindow.postMessage(`pendant_design:${productId}`, "*");
      } else {
        // For multiple pendants, send each pendant's design with proper ID
        // Add a small delay to ensure the messages are processed correctly
        setTimeout(() => {
          currentPendants.forEach((pendant) => {
            if (pendant.id < amount) { // Only send for the actual number of pendants
              const design = pendant.design || lightDesign;
              const productId = design === 'bumble' ? 'product_1' : 
                              design === 'radial' ? 'product_2' : 
                              design === 'fina' ? 'product_3' : 
                              design === 'ico' ? 'product_4' : 'product_5';
              
              console.log(`Sending pendant_${pendant.id}:${productId} for design ${design}`);
              iframe.contentWindow.postMessage(`pendant_${pendant.id}:${productId}`, "*");
            }
          });
          
          // Send cable information after pendant designs
          iframe.contentWindow.postMessage(`cable_color:${cableColor}`, "*");
          iframe.contentWindow.postMessage(`cable_length:${cableLength}`, "*");
        }, 100); // Small delay to ensure light_amount is processed first
        return; // Exit early since we're handling cable info in the timeout
      }
      
      // Send cable information (only for single pendant case)
      iframe.contentWindow.postMessage(`cable_color:${cableColor}`, "*");
      iframe.contentWindow.postMessage(`cable_length:${cableLength}`, "*");
    }
    
    toast.info(`Light amount changed to ${amount}`, {
      position: "bottom-right",
      autoClose: 1500,
      theme: isDarkMode ? "dark" : "light"
    });
  };
  
  // Handle light design change
  const handleLightDesignChange = (design, pendantIndex = null) => {
    // For single pendant mode or global design change
    if (pendantIndex === null) {
      // Update default design
      setLightDesign(design);
      
      // If only one pendant, update its design too
      if (lightAmount === 1 && pendants.length > 0) {
        const updatedPendants = [...pendants];
        updatedPendants[0] = {
          ...updatedPendants[0],
          design: design
        };
        setPendants(updatedPendants);
        
        // Update the stored configuration for single pendant
        setPendantConfigurations(prev => ({
          ...prev,
          1: updatedPendants
        }));
      }
      
      // Send message to PlayCanvas
      const iframe = document.getElementById('playcanvas-app');
      if (iframe && iframe.contentWindow) {
        // Format: pendant_design:product_1 (where product_1 corresponds to the design)
        const productId = design === 'bumble' ? 'product_1' : 
                         design === 'radial' ? 'product_2' : 
                         design === 'fina' ? 'product_3' : 
                         design === 'ico' ? 'product_4' : 'product_5';
        
        iframe.contentWindow.postMessage(`pendant_design:${productId}`, "*");
      }
      
      toast.info(`Light design changed to ${design}`, {
        position: "bottom-right",
        autoClose: 1500,
        theme: isDarkMode ? "dark" : "light"
      });
    }
    // For specific pendant update (used by PendantConfigurator)
    else if (typeof pendantIndex === 'number' && pendantIndex >= 0 && pendantIndex < pendants.length) {
      // Update specific pendant design
      const updatedPendants = [...pendants];
      if (updatedPendants[pendantIndex]) {
        updatedPendants[pendantIndex] = {
          ...updatedPendants[pendantIndex],
          design: design
        };
        setPendants(updatedPendants);
        
        // Update the stored configuration for current light amount
        setPendantConfigurations(prev => ({
          ...prev,
          [lightAmount]: updatedPendants
        }));
        
        // Send message to PlayCanvas
        const iframe = document.getElementById('playcanvas-app');
        if (iframe && iframe.contentWindow) {
          // Format: pendant_0:product_1 (where product_1 corresponds to the design)
          const productId = design === 'bumble' ? 'product_1' : 
                           design === 'radial' ? 'product_2' : 
                           design === 'fina' ? 'product_3' : 
                           design === 'ico' ? 'product_4' : 'product_5';
          
          iframe.contentWindow.postMessage(`pendant_${pendantIndex}:${productId}`, "*");
        }
      }
    }
    // For array of pendant indices (multi-select)
    else if (Array.isArray(pendantIndex) && pendantIndex.length > 0) {
      const updatedPendants = [...pendants];
      const validIndices = pendantIndex.filter(idx => idx >= 0 && idx < pendants.length);
      
      // Update all selected pendants
      validIndices.forEach(idx => {
        if (updatedPendants[idx]) {
          updatedPendants[idx] = {
            ...updatedPendants[idx],
            design: design
          };
        }
      });
      
      setPendants(updatedPendants);
      
      // Update the stored configuration for current light amount
      setPendantConfigurations(prev => ({
        ...prev,
        [lightAmount]: updatedPendants
      }));
      
      // Send individual messages to PlayCanvas for each pendant
      const iframe = document.getElementById('playcanvas-app');
      if (iframe && iframe.contentWindow) {
        // Send separate messages for each pendant update
        validIndices.forEach(idx => {
          // Format: pendant_0:product_1 (where product_1 corresponds to the design)
          const productId = design === 'bumble' ? 'product_1' : 
                           design === 'radial' ? 'product_2' : 
                           design === 'fina' ? 'product_3' : 
                           design === 'ico' ? 'product_4' : 'product_5';
          
          iframe.contentWindow.postMessage(`pendant_${idx}:${productId}`, "*");
        });
      }
    }
  };

  // Handle cable options change
  const handleCableChange = (type, value) => {
    if (type === 'color') {
      setCableColor(value);
      
      // Send message to PlayCanvas
      const iframe = document.getElementById('playcanvas-app');
      // if (iframe && iframe.contentWindow) {
      //   iframe.contentWindow.postMessage(`cable_color:${value}`, "*");
      // }
      
      toast.info(`Cable color changed to ${value}`, {
        position: "bottom-right",
        autoClose: 1500,
        theme: isDarkMode ? "dark" : "light"
      });
    } else if (type === 'length') {
      setCableLength(value);
      
      // Send message to PlayCanvas
      const iframe = document.getElementById('playcanvas-app');
      if (iframe && iframe.contentWindow) {
        // iframe.contentWindow.postMessage(`cable_length:${value}`, "*");
      }
      
      toast.info(`Cable length changed to ${value}`, {
        position: "bottom-right",
        autoClose: 1500,
        theme: isDarkMode ? "dark" : "light"
      });
    }
  };

  // State for save configuration modal
  const [isSaving, setIsSaving] = useState(false);

  // Save configuration with name
  const handleSaveWithName = () => {
    if (!configName.trim()) {
      toast.error("Please enter a configuration name", {
        position: "bottom-right",
        autoClose: 2000,
        theme: isDarkMode ? "dark" : "light"
      });
      return;
    }

    setIsSaving(true);
    const iframe = document.getElementById('playcanvas-app');
    
    if (iframe && iframe.contentWindow) {
      // Set up message listener for the response
      const handleMessage = (event) => {
        // Check the message type to ensure it's the response we want
        if (event.data && event.data.type === 'configuration_saved') {
          console.log('Configuration saved:', event.data);
          
          // Show success toast
          toast.success(`Configuration "${configName}" saved successfully!`, {
            position: "bottom-right",
            autoClose: 2000,
            theme: isDarkMode ? "dark" : "light"
          });
          
          // Reset form and close modal
          setConfigName('');
          setShowSaveModal(false);
          setIsSaving(false);
          
          // Clean up the event listener
          window.removeEventListener('message', handleMessage);
        }
      };
      
      // Add the event listener
      window.addEventListener('message', handleMessage);
      
      // Send save configuration message to PlayCanvas
      iframe.contentWindow.postMessage({ 
        type: 'save_configuration',
        data: {
          name: configName.trim(),
          timestamp: new Date().toISOString()
        }
      }, '*');
      
      // Set a timeout to clean up the listener if no response is received
      setTimeout(() => {
        window.removeEventListener('message', handleMessage);
        setIsSaving(false);
      }, 5000);
    } else {
      console.error('Could not find PlayCanvas iframe');
      setIsSaving(false);
      toast.error("Failed to save configuration", {
        position: "bottom-right",
        autoClose: 2000,
        theme: isDarkMode ? "dark" : "light"
      });
    }
  };

  // Open save configuration modal
 

  // Save Configuration Modal
  const SaveConfigModal = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${!showSaveModal ? 'hidden' : ''}`}>
      <div className="bg-[#2B2D2F] rounded-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4 text-white">Save Configuration</h3>
        <input
          type="text"
          value={configName}
          onChange={(e) => setConfigName(e.target.value)}
          placeholder="Enter configuration name"
          className="w-full p-3 rounded-lg bg-[#3A3D42] text-white placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-[#50C878]"
          onKeyDown={(e) => e.key === 'Enter' && handleSaveWithName()}
        />
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => {
              setSaveModalOpen(false);
              setConfigName('');
            }}
            className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors"
            disabled={isSaving}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveWithName}
            className="px-4 py-2 rounded-lg bg-[#50C878] text-white hover:bg-[#3da861] transition-colors flex items-center"
            disabled={isSaving || !configName.trim()}
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );

  // Add to cart

  // Customer support
  const openSupportChat = () => {
    toast.info("Support chat would open here", {
      position: "bottom-right",
      autoClose: 2000,
      theme: isDarkMode ? "dark" : "light"
    });
  };



  return (
    <section 
      id="light-configurator" 
      ref={configuratorRef}
      className="py-16 bg-charleston-green text-gray-100 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-emerald/10 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-40 right-10 w-40 h-40 bg-eton-blue/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-emerald/10 rounded-full blur-2xl animate-float-fast"></div>
      {/* No Theme Toggle - Using Dark Theme Only */}
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-3 font-['Amenti']">
            LIMI Light Configurator
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-400">
            Design your perfect lighting solution. Customize every aspect and visualize in real-time.
          </p>
        </motion.div>

        <div className="flex flex-col items-center lg:flex-row gap-8">
          {/* Preview Box (Left Side - Sticky) */}
          <motion.div 
            className="lg:w-2/5"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Wrapper div for pinning */}
            <div ref={previewBoxRef} className="sticky top-24 " >
              <div 
                className="bg-charleston-green-dark rounded-xl shadow-2xl overflow-hidden aspect-square relative animate-glow"
                style={{
                  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 0 15px rgba(80, 200, 120, 0.2)',
                }}
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald/10 via-eton-blue/5 to-transparent pointer-events-none z-[1]"></div>
              {/* PlayCanvas 3D Viewer */}
              <PlayCanvasViewer 
                config={{
                  lightType,
                  lightAmount,
                  lightDesign,
                  cableColor,
                  cableLength,
                  pendants
                }}
                isDarkMode={isDarkMode}
                className="w-full h-full"
              />
              
              {/* Enhanced Interactive Skeleton Loader - Only shown until app:ready1 message is received */}
             
              
              {/* Overlay to prevent interaction issues during loading */}
              <div className="absolute inset-0 pointer-events-none z-10"></div>
              </div>
            </div>
          </motion.div>

          {/* Configuration Panel (Right Side) */}
          <motion.div 
            className="lg:w-3/5 bg-charleston-green-dark/90 backdrop-blur-sm rounded-xl shadow-2xl p-6 flex flex-col relative overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              boxShadow: '0 15px 35px -10px rgba(0, 0, 0, 0.5), 0 0 15px rgba(80, 200, 120, 0.1)',
              borderTop: '1px solid rgba(80, 200, 120, 0.2)',
              borderLeft: '1px solid rgba(80, 200, 120, 0.1)'
            }}
          >
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-eton-blue/5 rounded-full blur-xl"></div>
            <h3 className="text-2xl font-bold mb-6 font-['Amenti'] relative z-10 animate-float-slow">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald to-eton-blue-dark">Configure Your Light</span>
            </h3>
            
            {/* Mobile Tabs - Only visible on mobile */}
            <div className="md:hidden mb-6 relative z-10">
              <div className="flex border-b border-charleston-green-light overflow-x-auto hide-scrollbar">
                <motion.button 
                  onClick={() => setActiveTab('type')}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 ${activeTab === 'type' 
                    ? 'text-emerald border-emerald border-b-2' 
                    : 'text-gray-400 border-transparent'}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.span 
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: activeTab === 'type' ? 1 : 0.8 }}
                    className="flex items-center gap-1"
                  >
                    <FaLightbulb className={activeTab === 'type' ? 'text-emerald' : 'text-gray-500'} />
                    Light Type
                  </motion.span>
                </motion.button>
                <button 
                  onClick={() => setActiveTab('amount')}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 ${activeTab === 'amount' 
                    ? 'text-emerald border-emerald border-b-2' 
                    : 'text-gray-400 border-transparent'}`}
                >
                  <motion.span 
                    initial={{ opacity: 0.8 }}
                    animate={{ opacity: activeTab === 'amount' ? 1 : 0.8 }}
                    className="flex items-center gap-1"
                  >
                    <FaLayerGroup className={activeTab === 'amount' ? 'text-emerald' : 'text-gray-500'} />
                    Light Amount
                  </motion.span>
                </button>
                {lightAmount > 1 && (
                  <button 
                    onClick={() => setActiveTab('pendants')}
                    className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 ${activeTab === 'pendants' 
                      ? 'text-emerald border-emerald border-b-2' 
                      : 'text-gray-400 border-transparent'}`}
                  >
                    <motion.span 
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: activeTab === 'pendants' ? 1 : 0.8 }}
                      className="flex items-center gap-1"
                    >
                      <FaRegLightbulb className={activeTab === 'pendants' ? 'text-emerald' : 'text-gray-500'} />
                      Pendants
                    </motion.span>
                  </button>
                )}
                {lightAmount === 1 && (
                  <button 
                    onClick={() => setActiveTab('design')}
                    className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 ${activeTab === 'design' 
                      ? 'text-emerald border-emerald border-b-2' 
                      : 'text-gray-400 border-transparent'}`}
                  >
                    <motion.span 
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: activeTab === 'design' ? 1 : 0.8 }}
                      className="flex items-center gap-1"
                    >
                      <FaPallet className={activeTab === 'design' ? 'text-emerald' : 'text-gray-500'} />
                      Design
                    </motion.span>
                  </button>
                )}
              </div>
            </div>
            
            {/* Configuration Options Container */}
            <div className="flex-1">
              {/* Desktop View - All components stacked */}
              <div className="hidden md:block stagger-container">
                <LightTypeSelector 
                  selectedType={lightType} 
                  onTypeChange={handleLightTypeChange} 
                  isDarkMode={isDarkMode} 
                />
                <BaseTypeSelector 
                  baseType={baseType}
                  onBaseTypeChange={handleBaseTypeChange}
                  isDarkMode={isDarkMode}
                  isVisible={lightType === 'ceiling'}
                />
                
                {/* Configuration Type Tabs */}
                <div className="mb-6">
                  <div className="flex border-b border-gray-700 mb-4">
                    <button
                      className={`py-2 px-4 font-medium ${configurationType === 'individualize' 
                        ? 'text-emerald-500 border-b-2 border-emerald-500' 
                        : 'text-gray-400 hover:text-white'}`}
                      onClick={() => handleConfigurationTypeChange('individualize')}
                    >
                      Individualize
                    </button>
                    <button
                      className={`py-2 px-4 font-medium ${configurationType === 'systems' 
                        ? 'text-emerald-500 border-b-2 border-emerald-500' 
                        : 'text-gray-400 hover:text-white'}`}
                      onClick={() => handleConfigurationTypeChange('systems')}
                    >
                      Systems
                    </button>
                  </div>
                  
                  {configurationType === 'individualize' ? (
                    <LightAmountSelector 
                      amount={lightAmount} 
                      onAmountChange={handleLightAmountChange} 
                      isDarkMode={isDarkMode}
                      lightType={lightType}
                      baseType={baseType}
                    />
                  ) : (
                    <SystemSelector
                      selectedSystem={selectedSystem}
                      onSystemChange={handleSystemChange}
                      isDarkMode={isDarkMode}
                      baseType={baseType}
                    />
                  )}
                </div>
                
                {configurationType === 'individualize' && (
                  lightAmount === 1 ? (
                    <LightDesignSelector 
                      selectedDesign={lightDesign} 
                      onDesignChange={handleLightDesignChange} 
                      isDarkMode={isDarkMode} 
                    />
                  ) : (
                    <PendantConfigurator 
                      pendants={pendants} 
                      updatePendantDesign={handleLightDesignChange} 
                      isDarkMode={isDarkMode} 
                    />
                  )
                )}
              </div>
              
              {/* Mobile View - Tabbed components */}
              <div className="md:hidden">
                {activeTab === 'type' && (
                  <>
                    <LightTypeSelector 
                      selectedType={lightType} 
                      onTypeChange={(type) => {
                        handleLightTypeChange(type);
                        // Auto-advance to base type if ceiling, otherwise to amount
                        setActiveTab(type === 'ceiling' ? 'base' : 'amount');
                      }} 
                      isDarkMode={isDarkMode} 
                    />
                  </>
                )}
                
                {activeTab === 'base' && (
                  <>
                    <BaseTypeSelector 
                      baseType={baseType}
                      onBaseTypeChange={(type) => {
                        handleBaseTypeChange(type);
                        // Auto-advance to config type tab
                        setActiveTab('configType');
                      }}
                      isDarkMode={isDarkMode}
                      isVisible={lightType === 'ceiling'}
                    />
                  </>
                )}
                
                {activeTab === 'configType' && (
                  <>
                    <div className="mb-6">
                      <div className="flex border-b border-gray-700 mb-4">
                        <button
                          className={`py-2 px-4 font-medium ${configurationType === 'individualize' 
                            ? 'text-emerald-500 border-b-2 border-emerald-500' 
                            : 'text-gray-400 hover:text-white'}`}
                          onClick={() => {
                            handleConfigurationTypeChange('individualize');
                            setActiveTab('amount');
                          }}
                        >
                          Individualize
                        </button>
                        <button
                          className={`py-2 px-4 font-medium ${configurationType === 'systems' 
                            ? 'text-emerald-500 border-b-2 border-emerald-500' 
                            : 'text-gray-400 hover:text-white'}`}
                          onClick={() => {
                            handleConfigurationTypeChange('systems');
                            setActiveTab('systems');
                          }}
                        >
                          Systems
                        </button>
                      </div>
                    </div>
                  </>
                )}
                
                {activeTab === 'systems' && (
                  <SystemSelector
                    selectedSystem={selectedSystem}
                    onSystemChange={handleSystemChange}
                    isDarkMode={isDarkMode}
                  />
                )}
                
                {activeTab === 'amount' && (
                  <LightAmountSelector 
                    amount={lightAmount} 
                    onAmountChange={(amount) => {
                      handleLightAmountChange(amount);
                      // Auto-advance to appropriate next tab
                      setActiveTab(amount === 1 ? 'design' : 'pendants');
                    }} 
                    isDarkMode={isDarkMode}
                    lightType={lightType}
                    baseType={baseType}
                  />
                )}
                
                {activeTab === 'design' && lightAmount === 1 && (
                  <LightDesignSelector 
                    selectedDesign={lightDesign} 
                    onDesignChange={handleLightDesignChange} 
                    isDarkMode={isDarkMode} 
                  />
                )}
                
                {activeTab === 'pendants' && lightAmount > 1 && (
                  <PendantConfigurator 
                    pendants={pendants} 
                    updatePendantDesign={handleLightDesignChange} 
                    isDarkMode={isDarkMode} 
                  />
                )}
              </div>
            
            {/* Cable Options hidden as requested */}
            
            </div>
            
            {/* Customer Support - Outside scrollable area */}
            <div className="mt-8 mb-4 pt-4 border-t border-gray-700/50 relative z-10">
              <motion.button 
                onClick={openSupportChat}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-dark to-eton-blue-dark p-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-emerald/20"
                whileHover={{ scale: 1.02, boxShadow: '0 5px 15px rgba(80, 200, 120, 0.3)' }}
                whileTap={{ scale: 0.98 }}
              >
                <FaQuestionCircle className="text-white" /> 
                <span className="text-white font-medium">Have Questions? Chat with an Expert</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Price and Configuration Summary Section */}
        <motion.div 
          id="pricing-section"
          className={`w-full mt-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
            {/* Price Information */}
            <div className="md:w-1/3">
              <h3 className="text-xl font-bold mb-3 font-['Amenti']">Your Selection</h3>
              <div>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Price</p>
                <p className="text-3xl font-bold">€{totalPrice}</p>
              </div>
              <div className={`mt-3 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <p>Estimated delivery: 2-3 weeks</p>
                <p>Free shipping on orders over €500</p>
              </div>
            </div>
            
            {/* Configuration Summary */}
            <div className="md:w-2/3">
              <div className={`p-4 rounded-lg text-sm ${isDarkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                <h4 className="font-bold mb-2">Configuration Summary</h4>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Type:</span> 
                    <span className="capitalize">{lightType}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Amount:</span> 
                    <span>{lightAmount} pendant{lightAmount > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">Cable:</span> 
                    <span className="capitalize">{cableColor}, {cableLength}</span>
                  </div>
                  {lightAmount === 1 && (
                    <div className="flex items-center gap-1">
                      <span className="font-medium">Design:</span> 
                      <div className="flex items-center gap-1">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ 
                            backgroundImage: `url(/images/configOptions/${pendants[0]?.design === 'bumble' ? '1' : pendants[0]?.design === 'radial' ? '2' : pendants[0]?.design === 'fina' ? '3' : pendants[0]?.design === 'ico' ? '4' : '5'}.png)`,
                            backgroundSize: "cover"
                          }}
                        ></div>
                        <span className="capitalize">{pendants[0]?.design || 'bumble'}</span>
                      </div>
                    </div>
                  )}
                </div>
                
                {lightAmount > 1 && (
                  <div className="mt-2">
                    <p className="font-medium mb-1">Pendant Designs:</p>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                      {pendants.map((pendant, index) => (
                        <div key={index} className="flex items-center gap-1 text-xs">
                          <div 
                            className="w-3 h-3 rounded-full flex-shrink-0" 
                            style={{ 
                              backgroundImage: `url(/images/configOptions/${pendant.design === 'bumble' ? '1' : pendant.design === 'radial' ? '2' : pendant.design === 'fina' ? '3' : pendant.design === 'ico' ? '4' : '5'}.png)`,
                              backgroundSize: "cover"
                            }}
                          ></div>
                          <span>Pendant {index + 1}: {pendant.design}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-end mt-4 gap-3">
            <motion.button 
              onClick={handleSaveConfig}
              className={`flex items-center gap-2 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} px-4 py-2 rounded-lg transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSave /> Save Configuration
            </motion.button>
            <motion.button 
          
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaShoppingCart /> Add to Cart
            </motion.button>
          </div>
        </motion.div>
        
        {/* Additional Information Section */}
        {/* <AdditionalInfo isDarkMode={isDarkMode} /> */}
        
        {/* End marker for ScrollTrigger pinning */}
        <div id="configurator-end-marker"></div>
      </div>
      <ToastContainer />
      
      {/* Save Configuration Modal */}
  
    </section>
  );
  
  // Function to handle adding the current configuration to cart

  
  // Function to handle saving the current configuration
  function handleSaveConfig() {
    setShowSaveModal(true);
    setConfigName(`${lightType.charAt(0).toUpperCase() + lightType.slice(1)} Light Configuration`);
  }
  
  // Function to save configuration to Redux and PlayCanvas
  function saveConfigToRedux() {
    if (!configName.trim()) {
      toast.error('Please enter a name for your configuration', {
        position: "bottom-right",
        autoClose: 3000,
        theme: "dark"
      });
      return;
    }
    
    // Show loading state
    setIsSaving(true);
    
    // Get PlayCanvas iframe
    const iframe = document.getElementById('playcanvas-app');
    
    if (iframe && iframe.contentWindow) {
      // Set up message listener for the response
      const handleMessage = (event) => {
        // Check the message type to ensure it's the response we want
        if (event.data && event.data.type === 'configuration_saved') {
          console.log('Configuration saved to PlayCanvas:', event.data);
          
          // Close modal and show success notification
          setShowSaveModal(false);
          setIsSaving(false);
          
          toast.success('Configuration saved successfully!', {
            position: "bottom-right",
            autoClose: 3000,
            theme: "dark"
          });
          
          // Clean up the event listener
          window.removeEventListener('message', handleMessage);
        }
      };
      
      // Add the event listener
      window.addEventListener('message', handleMessage);
      
      try {
        // Send save configuration command
        iframe.contentWindow.postMessage('save_config', '*');
        
        // Send configuration name as a separate message
        iframe.contentWindow.postMessage(`name:${configName.trim()}`, '*');
        
        console.log('Sent save command and configuration name to iframe');
        
        // Set a timeout to clean up the listener if no response is received
        setTimeout(() => {
          window.removeEventListener('message', handleMessage);
          if (isSaving) {
            setIsSaving(false);
            console.warn('Timed out waiting for save confirmation from iframe');
          }
        }, 5000);
        
      } catch (error) {
        console.error('Error sending messages to iframe:', error);
        setIsSaving(false);
        toast.error("Failed to save configuration", {
          position: "bottom-right",
          autoClose: 3000,
          theme: "dark"
        });
      }
    } else {
      console.error('Could not find PlayCanvas iframe');
      setIsSaving(false);
      toast.error("3D preview not available", {
        position: "bottom-right",
        autoClose: 3000,
        theme: "dark"
      });
    }
  }
};

export default LightConfigurator;
