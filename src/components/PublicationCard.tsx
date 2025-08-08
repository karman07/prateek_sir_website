import { motion } from 'framer-motion';
import { COLORS } from '@/constants/colors';

const PublicationCard = ({ publication, idx }: { publication: any, idx: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: idx * 0.05 }}
      className="group p-6 border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition-all bg-white/80 backdrop-blur-sm hover:-translate-y-1"
    >
      <h3
        className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors"
        style={{ color: COLORS.textPrimary2 }}
      >
        {publication.title}
      </h3>
      <p className="text-sm text-slate-600 mb-1">{publication.authors}</p>
      <p className="text-sm text-slate-500 italic">{publication.journal}</p>
      <div className="mt-3 text-xs text-slate-500 flex flex-wrap gap-2">
        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full">{publication.year}</span>
        {publication.volume && (
          <span className="px-2 py-1 bg-slate-50 text-slate-600 rounded-full">
            Vol {publication.volume}
          </span>
        )}
        {publication.issue && (
          <span className="px-2 py-1 bg-slate-50 text-slate-600 rounded-full">
            Issue {publication.issue}
          </span>
        )}
        {publication.pages && (
          <span className="px-2 py-1 bg-slate-50 text-slate-600 rounded-full">
            pp. {publication.pages}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default PublicationCard;
