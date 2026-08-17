import React, { useState, useRef } from 'react';
import './OptimizedImage.css';

/**
 * OptimizedImage – Drop-in replacement for <img> with:
 *  - lazy loading by default (loading="lazy")
 *  - decoding="async" so it never blocks the main thread
 *  - smooth fade-in once the image is fully loaded
 *  - `priority` prop for above-the-fold / hero images:
 *      loading="eager" + fetchpriority="high"
 *
 * Usage:
 *   <OptimizedImage src={myImg} alt="Description" />
 *   <OptimizedImage src={heroImg} alt="Hero" priority />
 *   <OptimizedImage src={img} alt="..." className="my-class" style={{ maxWidth: 600 }} />
 */
export default function OptimizedImage({
  src,
  alt,
  priority = false,
  className = '',
  style = {},
  width,
  height,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  const handleLoad = () => {
    setLoaded(true);
  };

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchpriority={priority ? 'high' : 'auto'}
      onLoad={handleLoad}
      className={`opt-img ${loaded ? 'opt-img--loaded' : ''} ${className}`}
      style={style}
      {...rest}
    />
  );
}
