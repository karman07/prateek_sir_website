import React from "react";
import { motion } from "framer-motion";
import { COLORS } from "@/constants/colors";
import { Calendar, MapPin, Building2, Info } from "lucide-react";
import type { Conference } from "@/contexts/ConferencesContext";

const getYearColor = (year: number) => {
  if (year >= 2020) return "from-blue-500 to-indigo-500";
  if (year >= 2010) return "from-blue-500 to-indigo-500";
  if (year >= 2000) return "from-blue-500 to-indigo-500";
  return "from-blue-500 to-indigo-500";
};

const ConferenceCard: React.FC<{ conference: Conference; idx: number }> = ({ conference, idx }) => {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md select-none pointer-events-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
    >
      {/* Gradient accent bar */}
      <div
        className={`absolute top-0 left-0 h-full w-2 bg-gradient-to-b ${getYearColor(
          conference.year
        )}`}
      />

      {/* Card content */}
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <Calendar size={16} /> {conference.year}
        </div>

        <h2
          className="text-lg font-bold leading-snug"
          style={{ color: COLORS.textPrimary2 }}
        >
          {conference.title}
        </h2>

        <p className="text-sm text-slate-600">
          <strong>Authors:</strong> {conference.authors}
        </p>

        {conference.venue && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Building2 size={16} />
            <span>
              <strong>Venue:</strong> {conference.venue}
            </span>
          </div>
        )}

        {conference.location && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <MapPin size={16} />
            <span>
              <strong>Location:</strong> {conference.location}
            </span>
          </div>
        )}

        {conference.details && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Info size={16} />
            <span>{conference.details}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ConferenceCard;
