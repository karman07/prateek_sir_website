import React from 'react';
import { Podcast } from '@/contexts/PodcastContext';
import { motion } from 'framer-motion';
import { Mic, MapPin, CalendarDays } from 'lucide-react';

const iconSize = 20;

const PodcastCard: React.FC<{ podcast: Podcast; idx: number }> = ({ podcast, idx }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: idx * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-md p-5 w-full max-w-md border border-slate-200 hover:shadow-lg transition duration-300 flex flex-col gap-3"
    >
      {/* Topic */}
      <div className="flex items-start gap-2 text-slate-800 min-h-[48px]">
        <Mic size={iconSize} className="text-blue-600 mt-0.5 shrink-0" />
        <h3 className="text-sm font-medium leading-snug line-clamp-2 overflow-hidden text-ellipsis">
          {podcast.topic}
        </h3>
      </div>

      {/* Location */}
      <div className="flex items-start gap-2 text-slate-600 text-sm min-h-[40px]">
        <MapPin size={iconSize} className="text-rose-500 mt-0.5 shrink-0" />
        <p className="leading-snug line-clamp-1 overflow-hidden text-ellipsis">
          {podcast.place}
        </p>
      </div>

      {/* Date */}
      <div className="flex items-start gap-2 text-slate-600 text-sm min-h-[32px]">
        <CalendarDays size={iconSize} className="text-emerald-600 mt-0.5 shrink-0" />
        <p className="leading-snug line-clamp-1 overflow-hidden text-ellipsis">
          {podcast.date}
        </p>
      </div>
    </motion.div>
  );
};

export default PodcastCard;
