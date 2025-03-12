import React from "react";
import { Feature } from "../features";

interface FeaturesSectionProps {
  features: Feature[];
}

const Features: React.FC<FeaturesSectionProps> = ({ features }) => {
  return (
    <section className="py-16">
      {features.map((feature, index) => (
        <div
          key={feature.id}
          className={`
            flex flex-col gap-8 py-16
            lg:flex-row lg:items-center lg:gap-16
            ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}
            ${feature.bgColor || "bg-white"}
          `}
        >
          {/* Text Content */}
          <div className="flex-1 space-y-6 px-4 lg:px-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {feature.heading}
              </h2>
              <p className="text-lg font-semibold text-gray-600">
                {feature.subheading}
              </p>
            </div>
            <p className="text-base leading-7 text-gray-600">
              {feature.description}
            </p>
          </div>

          {/* Image */}
          <div className="flex-1 flex items-center justify-center px-4 lg:px-8">
            <div className="w-full max-w-md h-auto">
              <img
                src={feature.image}
                alt={feature.heading}
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Features;
