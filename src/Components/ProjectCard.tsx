"use client";

import Image from "next/image";
import Link from "next/link";

type Project = {
  id: number;
  title: string;
  description: string;
  images?: string;
  tech: string[];
  github?: string;
  live?: string;
};

interface Props {
  project: Project;
}

const fallbackImage =
  "https://images.pexels.com/photos/975771/pexels-photo-975771.jpeg";

export default function ProjectCard({ project }: Props) {
  const imageSrc = project.images ?? fallbackImage;

  return (
    <div className="w-full max-w-sm h-full flex flex-col bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative w-full h-56 sm:h-64 md:h-72 flex-shrink-0">
        <Image
          src={imageSrc}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-4 gap-3">
        <h2 className="text-xl font-bold text-gray-800">{project.title}</h2>

        {/* Tech Tags */}
        <div className="flex flex-wrap gap-2">
          {Array.isArray(project.tech) &&
            project.tech.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium text-indigo-700 bg-indigo-100 rounded-full"
              >
                {tech}
              </span>
            ))}
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed flex-grow">
          {project.description}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-auto">
          <Link
            href={project.github || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 text-center py-2 rounded-md text-sm font-semibold transition ${
              project.github
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
            onClick={(e) => !project.github && e.preventDefault()}
          >
            GitHub
          </Link>

          <Link
            href={project.live || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex-1 text-center py-2 rounded-md text-sm font-semibold transition ${
              project.live
                ? "bg-indigo-600 text-white hover:bg-indigo-500"
                : "bg-indigo-300 text-gray-100 cursor-not-allowed"
            }`}
            onClick={(e) => !project.live && e.preventDefault()}
          >
            Live Demo
          </Link>
        </div>
      </div>
    </div>
  );
}
