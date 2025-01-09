import React, { useState } from 'react';

const HorizontalBarChart = ({ ratings }) => {
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const [hoveredLegend, setHoveredLegend] = useState(null);

  const ratingColors = {
    exceptional: "#20a749", 
    recommended: "#0d6efd", 
    meh: "#ff9800",        
    skip: "#f44336",        
  };

  const orderedRatings = ['exceptional', 'recommended', 'meh', 'skip'].map(title => {
    return ratings.find(rating => rating.title.toLowerCase() === title);
  });

 
  const totalPercent = orderedRatings.reduce((sum, rating) => sum + (rating?.percent || 0), 0);

  return (
    <div className="container bgTransparent p-0">
      <div className="d-flex justify-content-between align-items-center mb-3">
       
      </div>
      <div className="progress bg-transparent"
        style={{ height: '3rem', width: '100%', position: 'relative' }}
      >
        {orderedRatings.map((rating) => {
          const width = rating?.percent || 0;  
          const color = ratingColors[rating?.title.toLowerCase()] || '#007bff';  

          return (
            <div
              key={rating?.id}
              className="progress-bar"
              style={{
                width: `${width}%`,
                backgroundColor: (hoveredSegment === rating?.title || hoveredLegend === rating?.title)
                  ? lightenColor(color)
                  : color,
                transition: 'background-color 0.3s ease',
                position: 'relative',
              }}
              onMouseEnter={() => setHoveredSegment(rating?.title)}
              onMouseLeave={() => setHoveredSegment(null)}
            />
          );
        })}
      </div>

    
      <div className="legend mt-3 bgTransparent">
        {['exceptional', 'recommended', 'meh', 'skip'].map((ratingTitle) => {
          const rating = orderedRatings.find(r => r?.title.toLowerCase() === ratingTitle); 
          const color = ratingColors[ratingTitle];
          return (
            <div
              key={ratingTitle}
              className={`legend-item ${hoveredLegend === ratingTitle ? 'highlighted' : ''}`}
              style={{ 
                display: 'inline-block', 
                marginRight: '10px', 
                cursor: 'pointer', 
                backgroundColor: 'transparent', 
                color: hoveredLegend === ratingTitle ? ratingColors[ratingTitle] : '#fafffd' }}
              onMouseEnter={() => setHoveredLegend(ratingTitle)}  
              onMouseLeave={() => setHoveredLegend(null)}  
            >
              <span
                style={{
                  marginRight: '5px',
                  backgroundColor: color,
                  padding: '5px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  width: '15px',
                  height: '15px',
                }}
              ></span>
              {ratingTitle}: {Math.round(rating?.percent || 0)}%
            </div>
          );
        })}
      </div>
    </div>
  );
};

const lightenColor = (color) => {
  const hexToRgb = (hex) => {
    let r = 0, g = 0, b = 0;
    hex = hex.replace(/^#/, '');
    if (hex.length === 6) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
    return [r, g, b];
  };

  const rgbToHex = (r, g, b) => {
    return '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase();
  };

  const [r, g, b] = hexToRgb(color);
  const lighten = 40;
  const newR = Math.min(255, r + lighten);
  const newG = Math.min(255, g + lighten);
  const newB = Math.min(255, b + lighten);

  return rgbToHex(newR, newG, newB);
};

export default HorizontalBarChart;
