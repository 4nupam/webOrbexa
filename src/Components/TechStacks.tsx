"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
import Image from "next/image";

type TechStack = {
  id: number;
  tech?: string;
  images?: string;
};

export default function TechStacks() {
  const [techStacks, setTechStacks] = useState<TechStack[]>([]);

  useEffect(() => {
    const fetchTechStacks = async () => {
      const { data, error } = await supabase.from("techStack").select("*");
      if (error) {
        console.error("Error fetching tech stacks:", error.message);
      } else {
        setTechStacks(data || []);
      }
    };

    fetchTechStacks();
  }, []);

  return (
    <section className="w-full px-4 md:px-8 py-10 bg-transparent">
    

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {techStacks.map((stack, index) => (
          <motion.div
            key={stack.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            className="flex flex-col items-center p-4  hover:shadow-lg transition-shadow"
          >
            {stack.images ? (
              <Image
                src={stack.images}
                alt={stack.tech || "tech"}
                width={80}
                height={80}
                className="object-contain w-20 h-20"
              />
            ) : (
              <div className="w-20 h-20 bg-gray-300 rounded-full" />
            )}
            <span className="mt-3 text-sm sm:text-base text-center text-gray-700 dark:text-gray-200 font-medium">
              {stack.tech}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
