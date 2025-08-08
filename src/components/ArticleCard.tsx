"use client";
import React from "react";
import { motion } from "framer-motion";
import { COLORS } from "@/constants/colors";
import { BookOpen } from "lucide-react";

type Props = {
  article: {
    year: number;
    authors: string;
    title: string;
    publication: string;
    monthYear: string;
  };
  idx: number;
};

const getYearColor = (year: number) => {
  if (year >= 2020) return "from-blue-500 to-indigo-500";
  if (year >= 2010) return "from-blue-500 to-indigo-500";
  if (year >= 2000) return "from-blue-500 to-indigo-500";
  return "from-slate-500 to-gray-600";
};

const ArticleCard: React.FC<Props> = ({ article, idx }) => {
  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden shadow-lg bg-white select-none pointer-events-none"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
    >
      {/* Left Accent Bar */}
      <div
        className={`absolute top-0 left-0 h-full w-2 bg-gradient-to-b ${getYearColor(
          article.year
        )}`}
      />

      {/* Content */}
      <div className="p-5 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="text-slate-500" size={20} />
          <span className="text-xs font-semibold text-slate-500">
            {article.monthYear} • {article.year}
          </span>
        </div>

        <h3
          className="text-lg font-bold mb-3 leading-snug"
          style={{ color: COLORS.textPrimary2 }}
        >
          {article.title}
        </h3>

        <p className="text-sm text-slate-600 flex-1">
          <strong>Authors:</strong> {article.authors}
        </p>
        <p className="text-sm text-slate-600 mt-1">
          <strong>Publication:</strong> {article.publication}
        </p>
      </div>
    </motion.div>
  );
};

export default ArticleCard;
