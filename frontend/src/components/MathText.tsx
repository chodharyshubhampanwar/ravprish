import React from "react";
import katex from "katex";
import "katex/dist/katex.min.css";

interface MathTextProps {
  content: string;
  displayMode?: boolean;
  className?: string;
}

export const MathText: React.FC<MathTextProps> = ({
  content,
  className = "",
}) => {
  const processMathText = (text: string) => {
    // Split text by math delimiters $$ or $
    const parts = text.split(/(\$\$|\$)/g);
    let isInMath = false;
    let isDisplayMath = false;

    return parts.map((part, index) => {
      if (part === "$$") {
        isInMath = !isInMath;
        isDisplayMath = true;
        return null;
      } else if (part === "$") {
        isInMath = !isInMath;
        isDisplayMath = false;
        return null;
      }

      if (isInMath) {
        try {
          const html = katex.renderToString(part, {
            displayMode: isDisplayMath,
            throwOnError: false,
          });
          return (
            <span key={index} dangerouslySetInnerHTML={{ __html: html }} />
          );
        } catch (e) {
          console.error("Error rendering math:", e);
          return part;
        }
      }

      return part;
    });
  };

  return <div className={className}>{processMathText(content)}</div>;
};

export default MathText;
