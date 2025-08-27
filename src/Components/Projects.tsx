"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import ProjectCard from "./ProjectCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type Project = {
  id: number;
  name: string;
  desc: string;
  images?: string;
  techStack: string[];
  github?: string;
  liveDemo?: string;
};

type SupabaseProject = {
  id: number;
  title: string;
  description: string;
  images?: string;
  tech?: string[] | string | null;
  github?: string | null;
  live?: string | null;
};

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const pauseRef = useRef(false);
  const [projects, setProjects] = useState<Project[]>([]);

  // Auto-scroll function
  const autoScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container || pauseRef.current) return;

    if (container.scrollLeft >= container.scrollWidth / 2) {
      container.scrollLeft = 0;
    } else {
      container.scrollLeft += 0.5;
    }
    animationRef.current = requestAnimationFrame(autoScroll);
  }, []);

  // Fetch projects from Supabase
  const fetchProjects = useCallback(async () => {
    const { data, error } = await supabase.from("projects").select("*");

    if (error) {
      console.error("Error fetching projects:", error.message);
      return;
    }

    if (data) {
      const normalized: Project[] = data.map((item: SupabaseProject) => ({
        id: item.id,
        name: item.title,
        desc: item.description,
        images: item.images ?? undefined,
        techStack: Array.isArray(item.tech)
          ? item.tech
          : typeof item.tech === "string" && item.tech.trim() !== ""
          ? item.tech.split(",").map((t) => t.trim())
          : [],
        github: item.github ?? undefined,
        liveDemo: item.live ?? undefined,
      }));
      setProjects(normalized);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
    animationRef.current = requestAnimationFrame(autoScroll);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [fetchProjects, autoScroll]);

  // Manual scroll buttons
  const handleScroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    pauseRef.current = true;

    container.scrollBy({
      left: direction === "left" ? -350 : 350,
      behavior: "smooth",
    });

    setTimeout(() => (pauseRef.current = false), 1000);
  };

  return (
    <section className="relative w-full px-2 py-5 flex flex-col items-center">
      {/* Heading */}
      <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold mb-12">
        <span className="text-[var(--primary)] animate-pulse">Domination</span>
      
      </h2>

      {/* Scroll buttons */}
      <button
        onClick={() => handleScroll("left")}
        className="absolute left-3 top-[90%] -translate-y-1/2 bg-[var(--background)] p-2 rounded-full shadow-md hover:scale-110 transition"
      >
        <ChevronLeft className="text-[var(--text)] w-6 h-6" />
      </button>
      <button
        onClick={() => handleScroll("right")}
        className="absolute right-3 top-[90%] -translate-y-1/2 bg-[var(--background)] p-2 rounded-full shadow-md hover:scale-110 transition"
      >
        <ChevronRight className="text-[var(--text)] w-6 h-6" />
      </button>

      {/* Project list */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto no-scrollbar w-full py-2 scroll-smooth snap-x snap-mandatory"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="min-w-[85vw] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[400px] flex-shrink-0 snap-start"
          >
            <ProjectCard
              project={{
                id: project.id,
                title: project.name,
                description: project.desc,
                images: project.images,
                tech: project.techStack,
                github: project.github ?? "",
                live: project.liveDemo ?? "",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
