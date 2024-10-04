// components/LoadingAnimation.tsx
import React from 'react';

const LoadingAnimation: React.FC = () => {
  return (
    <video autoPlay loop muted>
      <source src="/loading.webm" type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
};

export default LoadingAnimation;
