import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export default function OptimizedImage({ 
  src, 
  alt, 
  className, 
  priority = false,
  aspectRatio = 'auto',
  ...props 
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-gray-100", className)}>
      {!loaded && !error && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          "transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
          className
        )}
        style={{ aspectRatio }}
        {...props}
      />
    </div>
  );
}