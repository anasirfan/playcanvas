'use client';
import { useState, useEffect, useRef } from 'react';

const PlayCanvasViewer = ({ 
  config = {}, 
  isDarkMode,
  className = ''
}) => {
  const iframeRef = useRef(null);
  const [hasError, setHasError] = useState(false);
  const [appReady, setAppReady] = useState(false);
  
  // Listen for messages from the PlayCanvas iframe
  useEffect(() => {
    const handleMessage = (event) => {
      // Check if the message is from our iframe
      if (event.data === 'app:ready1') {
        console.log('PlayCanvas app is ready');
    
        // Send default selections after app is ready
        sendDefaultSelections();
      }
    };
    
    window.addEventListener('message', handleMessage);
    
    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);
  
  // Send default selections when app is ready
  const sendDefaultSelections = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      // Only send default selections if they're not provided in the config
      if (!config.lightType && !config.lightAmount && !config.lightDesign) {
        // Default selections
        iframeRef.current.contentWindow.postMessage("light_type:ceiling", "*");
        iframeRef.current.contentWindow.postMessage("light_amount:1", "*");
        iframeRef.current.contentWindow.postMessage("pendant_design:product_2", "*");
      } else {
        // Send configurations from props instead of defaults
        sendConfigToPlayCanvas(config);
      }
    }
  };
  
  // Handle iframe load event
  useEffect(() => {
    const handleIframeLoad = () => {
      try {
        if (iframeRef.current && iframeRef.current.contentWindow) {
          // Set initial quality
          iframeRef.current.contentWindow.postMessage("highdis", "*");
        }
      } catch (error) {
        console.error("Error during iframe load:", error);
        setHasError(true);
      }
    };

    const handleIframeError = () => {
      console.error("Failed to load PlayCanvas iframe");
      setHasError(true);
    };

    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
      iframe.addEventListener('error', handleIframeError);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener('load', handleIframeLoad);
        iframe.removeEventListener('error', handleIframeError);
      }
    };
  }, []);


  // Function to send configuration to PlayCanvas
  const sendConfigToPlayCanvas = (config) => {
    try {
      if (!iframeRef.current || !iframeRef.current.contentWindow || !config) return;
      
      // Only send configurations if the app is ready or we're forcing it
      // Send light type
      if (config.lightType) {
        iframeRef.current.contentWindow.postMessage(`light_type:${config.lightType}`, "*");
      }
      
      // Send light amount
      if (config.lightAmount !== undefined && config.lightAmount !== null) {
        iframeRef.current.contentWindow.postMessage(`light_amount:${config.lightAmount}`, "*");
      }
      
      // // Send cable options
      // if (config.cableColor) {
      //   iframeRef.current.contentWindow.postMessage(`cable_color:${config.cableColor}`, "*");
      // }
      
      // if (config.cableLength) {
      //   iframeRef.current.contentWindow.postMessage(`cable_length:${config.cableLength}`, "*");
      // }
      
      // Send pendant configurations if available
      if (config.pendants && Array.isArray(config.pendants)) {
        config.pendants.forEach((pendant, index) => {
          if (pendant && pendant.design) {
            iframeRef.current.contentWindow.postMessage(`pendant_${index}_design:${pendant.design}`, "*");
          }
          if (pendant && pendant.color) {
            iframeRef.current.contentWindow.postMessage(`pendant_${index}_color:${pendant.color}`, "*");
          }
        });
      }
      
      // Send global design if single pendant
      if (config.lightAmount === 1 && config.lightDesign) {
        if(config.lightDesign === 'radial'){
          config.lightDesign = 'product_2';
        }
        iframeRef.current.contentWindow.postMessage(`pendant_design:${config.lightDesign}`, "*");
      }
    } catch (error) {
      console.error("Error sending configuration to PlayCanvas:", error);
      setHasError(true);
    }
  };

  return (
    <div className={`w-full h-full relative ${className}`}>
      {/* Only render iframe if not in error state */}
      {!hasError && (
        <iframe 
          id="playcanvas-app"
          ref={iframeRef}
          src="https://playcanv.as/e/p/EStPW85C/"
          className="w-full h-full border-0"
          title="LIMI Light Configurator 3D Preview"
          allow="accelerometer; autoplay; camera; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center p-6 rounded-lg bg-white dark:bg-gray-700 shadow-lg max-w-md">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>3D Preview Unavailable</h3>
            <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>We're unable to load the 3D preview at this time. Please try refreshing the page or check your connection.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayCanvasViewer;
