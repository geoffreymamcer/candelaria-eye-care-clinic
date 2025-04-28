import React from "react";
import FeaturesCard from "./FeatureCard";

function PortalFeatures() {
  return (
    <div className="featuresContainer">
      <FeaturesCard
        icon="📋"
        feature="Medical Records"
        description="Access your complete health history, test results, and treatment plans"
      />

      <FeaturesCard
        icon="🗩"
        feature="Health Assistant"
        description="Get instant answer to your eye concern with our AI assistant"
      />

      <FeaturesCard
        icon="👁️"
        feature="Color Vision Test"
        description="Perform a preliminary color vision test by yourself"
      />
    </div>
  );
}

export default PortalFeatures;
