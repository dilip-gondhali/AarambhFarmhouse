import React, { useState } from 'react';
import { Trees } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  loading?: 'lazy' | 'eager';
  objectPosition?: string;
}

export const ResilientImage: React.FC<ResilientImageProps> = ({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle,
  loading = 'lazy',
  objectPosition,
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#183D2B] via-[#23533B] to-[#607D50] text-[#F8F5EC] p-6 text-center"
        role="img"
        aria-label={alt}
      >
        <Trees className="w-8 h-8 mb-3 opacity-80" strokeWidth={1.5} />
        <p className="font-serif text-lg tracking-wide">
          {fallbackTitle || 'Aarambh Farmhouse Staycation & Resort'}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      style={objectPosition ? { objectPosition } : undefined}
      className={className}
    />
  );
};
