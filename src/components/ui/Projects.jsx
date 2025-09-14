import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Projects({ name, img, alt, type, year, tools, slug, isExternal, link }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const ProjectLink = ({ children, className }) => {
    if (isExternal) {
      return (
        <a
          target="_blank"
          rel="noreferrer"
          href={link}
          className={className}
        >
          {children}
        </a>
      );
    }
    
    return (
      <Link to={`/project/${slug}`} className={className}>
        {children}
      </Link>
    );
  };

  return (
    <div className="group bg-secondary-100">
      <ProjectLink className="img inline-block overflow-hidden duration-300 ease-out hover:rounded-3xl">
        <div className="relative overflow-hidden">
          <img
            className={`w-full duration-700 ease-in-out group-hover:scale-105 transition-opacity ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            src={img}
            alt={alt}
            width="800"
            height="600"
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Loading placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-secondary-800 animate-pulse" />
          )}
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-lg font-medium">
              {isExternal ? 'View Live Site' : 'View Case Study'}
            </span>
          </div>
        </div>
      </ProjectLink>

      <div className="mt-4 bg-secondary-100">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="rounded-full bg-transparent border border-secondary-600 flex justify-center items-center px-4 py-1 text-secondary-600 text-body-4 2xl:text-3xl">
            {year}
          </span>
          {tools.split(' • ').map((tool, index) => (
            <span
              key={index}
              className="rounded-full bg-transparent border border-secondary-600 flex justify-center items-center px-4 py-1 text-secondary-600 text-body-4 2xl:text-3xl"
            >
              {tool}
            </span>
          ))}
        </div>
        
        <div className="2xl:space-y-3">
          <ProjectLink>
            <h3 className="text-works-title 2xl:text-5xl font-medium uppercase text-primary-200 group-hover:text-accent-400 transition-colors duration-300">
              {name}
            </h3>
          </ProjectLink>
          <p className="text-body-2 2xl:text-4xl font-light text-primary-400">{type}</p>
        </div>
      </div>
    </div>
  );
}