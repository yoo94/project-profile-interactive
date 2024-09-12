'use client';
import { motion, AnimationControls } from 'framer-motion';

interface BackdropProps {
    backdropControl: AnimationControls;
}

const Backdrop: React.FC<BackdropProps> = ({ backdropControl }) => {
    return (
        <motion.div
            className="fixed w-full left-0 z-[1] top-16"
            initial={{ backdropFilter: "none", height: 0 }}
            animate={backdropControl}
            transition={{ duration: 0.2 }}
        />
    );
};

export default Backdrop;
