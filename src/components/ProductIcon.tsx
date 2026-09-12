import React from 'react';
import {
  Code2,
  Bot,
  LayoutTemplate,
  Server,
  Workflow,
  Database,
  BookOpen,
  BrainCircuit,
  CheckCircle2,
  Mic,
  Cpu,
  Command,
  Sparkles,
  Terminal,
  Palette,
  GraduationCap,
  LayoutGrid,
  Zap,
  Globe,
  Layers,
  Box,
  Video,
  CheckSquare,
  Shield,
  Mail,
  LucideProps,
} from 'lucide-react';

interface ProductIconProps extends LucideProps {
  name: string;
}

export const ProductIcon: React.FC<ProductIconProps> = ({ name, ...props }) => {
  switch (name) {
    case 'Code2':
      return <Code2 {...props} />;
    case 'Bot':
      return <Bot {...props} />;
    case 'LayoutTemplate':
      return <LayoutTemplate {...props} />;
    case 'Server':
      return <Server {...props} />;
    case 'Workflow':
      return <Workflow {...props} />;
    case 'Database':
      return <Database {...props} />;
    case 'BookOpen':
      return <BookOpen {...props} />;
    case 'BrainCircuit':
      return <BrainCircuit {...props} />;
    case 'CheckCircle2':
      return <CheckCircle2 {...props} />;
    case 'Mic':
      return <Mic {...props} />;
    case 'Cpu':
      return <Cpu {...props} />;
    case 'Command':
      return <Command {...props} />;
    case 'Sparkles':
      return <Sparkles {...props} />;
    case 'Terminal':
      return <Terminal {...props} />;
    case 'Palette':
      return <Palette {...props} />;
    case 'GraduationCap':
      return <GraduationCap {...props} />;
    case 'LayoutGrid':
      return <LayoutGrid {...props} />;
    case 'Zap':
      return <Zap {...props} />;
    case 'Globe':
      return <Globe {...props} />;
    case 'Box':
      return <Box {...props} />;
    case 'Video':
      return <Video {...props} />;
    case 'CheckSquare':
      return <CheckSquare {...props} />;
    case 'Shield':
      return <Shield {...props} />;
    case 'Mail':
      return <Mail {...props} />;
    default:
      return <Layers {...props} />;
  }
};
