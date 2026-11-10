import React, { isValidElement, ReactNode } from 'react';

interface RollingTextProps {
  children: ReactNode;
  className?: string;
}

export function RollingText({ children, className = '' }: RollingTextProps) {
  // First pass: count total items so we can stagger from the tail end
  let totalItems = 0;
  
  React.Children.forEach(children, (child) => {
    if (typeof child === 'string' || typeof child === 'number') {
      totalItems += child.toString().length;
    } else if (isValidElement(child)) {
      totalItems += 1;
    }
  });
  
  let currentIndex = 0;
  
  const processNode = (node: ReactNode): ReactNode => {
    if (typeof node === 'string' || typeof node === 'number') {
      const str = node.toString();
      return (
        <span className="inline-flex">
          {str.split('').map((char, i) => {
            // Forward index so the left side animates first
            const delay = `${currentIndex * 0.015}s`;
            currentIndex++;
            return (
              <span
                key={i}
                className="relative inline-flex flex-col items-center justify-center transition-transform transform-gpu duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[100%] group-data-[active=true]:-translate-y-[100%]"
                style={{ transitionDelay: delay }}
              >
                <span className="flex items-center justify-center whitespace-pre">{char === ' ' ? '\u00A0' : char}</span>
                <span className="absolute top-[100%] flex items-center justify-center whitespace-pre" aria-hidden="true">{char === ' ' ? '\u00A0' : char}</span>
              </span>
            );
          })}
        </span>
      );
    }
    if (isValidElement(node)) {
       const delay = `${currentIndex * 0.015}s`;
       currentIndex++;
       return (
          <span
            key={`el-${currentIndex}`}
            className="relative inline-flex flex-col items-center justify-center transition-transform transform-gpu duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[100%] group-data-[active=true]:-translate-y-[100%]"
            style={{ transitionDelay: delay }}
          >
            <span className="flex items-center justify-center">{node}</span>
            <span className="absolute top-[100%] flex items-center justify-center" aria-hidden="true">{node}</span>
          </span>
       );
    }
    return node;
  };

  return (
    <span className={`relative inline-flex overflow-hidden items-center h-[1.15em] leading-none ${className}`}>
      {React.Children.map(children, processNode)}
    </span>
  );
}
