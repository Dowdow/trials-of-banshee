import React, { useState } from 'react';
import OrbitLanding from '../ui/OrbitLanding';
import Trials from '../ui/Trials';

export default function IndexPage() {
  const [showOrbitLanding, setShowOrbitLanding] = useState(true);

  const handleOrbitLandingEnd = () => {
    setShowOrbitLanding(false);
  };

  if (showOrbitLanding) {
    return <OrbitLanding onEnd={handleOrbitLandingEnd} />;
  }

  return <Trials />;
}
