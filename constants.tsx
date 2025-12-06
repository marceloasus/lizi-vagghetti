
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  MessageCircle, 
  CreditCard, 
  Calendar,
  Sparkles,
  Users,
  User,
  Heart
} from 'lucide-react';
import { LinkCardItem, SocialLink } from './types';

// Dark cosmic/gold background for the header area
export const HEADER_BG_IMAGE = "https://images.unsplash.com/photo-1506318137071-a8bcbf6755dd?q=80&w=2070&auto=format&fit=crop";

export const PROFILE = {
  name: "Lizi Väghetti",
  handle: "@apometriaserdelluz",
  title: "Especialista em Apometria Multidimensional",
  role: "Mentora Espiritual",
  avatarUrl: "https://i.ibb.co/gbc3t0vP/logo.jpg", // Logo atualizada
  portraitUrl: "https://i.ibb.co/zW3cRgYT/photo.jpg", // Foto do Sobre Mim
};

export const ABOUT_TEXT = {
  welcome: "Olá, ser de luz! ✨",
  paragraphs: [
    "Sou Lizi Väghetti, Mentora Espiritual, Psicoterapeuta Holística e especialista em Apometria Multidimensional. Minha missão é guiar almas no despertar da consciência e na reconexão com sua essência divina.",
    "Através da egrégora da Aurora e de técnicas de cura vibracional, auxilio no desbloqueio de traumas, limpeza energética e alinhamento espiritual. Meu trabalho une ciência e espiritualidade para promover um reencontro profundo com o seu Eu Superior.",
    "Seja muito bem-vindo(a) a este espaço de cura e transformação. Estou aqui para caminhar ao seu lado."
  ]
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'whatsapp',
    icon: MessageCircle,
    url: 'https://wa.me/message/EHUCFGZBKSH4L1',
    label: 'WhatsApp',
  },
  {
    id: 'instagram',
    icon: Instagram,
    url: 'https://www.instagram.com/apometriaserdelluz/',
    label: 'Instagram',
  },
  {
    id: 'facebook',
    icon: Facebook,
    url: '#',
    label: 'Facebook',
  },
  {
    id: 'youtube',
    icon: Youtube,
    url: '#',
    label: 'YouTube',
  }
];

export const LINKS: LinkCardItem[] = [
  {
    id: 'about',
    title: 'Sobre Mim',
    subtitle: 'Minha jornada e missão',
    url: '#',
    icon: User,
    featured: true,
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp',
    subtitle: 'Fale comigo diretamente',
    url: 'https://wa.me/message/EHUCFGZBKSH4L1',
    icon: MessageCircle,
    featured: false,
  },
  {
    id: 'grupo-aurora',
    title: 'Grupo Despertar da Aurora',
    subtitle: 'Comunidade exclusiva',
    url: 'https://chat.whatsapp.com/FMB0eKRZpA7ImbANIkw9QC?mode=hqrc',
    icon: Users,
  },
  {
    id: 'grupo-meditacao',
    title: 'Grupo Meditação',
    subtitle: 'Práticas e elevação',
    url: 'https://chat.whatsapp.com/E2epmtNEMZQC1IVT1VS4um',
    icon: Users,
  },
  {
    id: 'grupo-cosmica',
    title: 'Grupo Corrente Cósmica',
    subtitle: 'Egrégora de luz',
    url: 'https://chat.whatsapp.com/E1pGHXM2Y2kHB1RIivm6KJ?',
    icon: Users,
  },
  {
    id: 'instagram',
    title: 'Instagram',
    subtitle: '@apometriaserdelluz',
    url: 'https://www.instagram.com/apometriaserdelluz/',
    icon: Instagram,
  },
  {
    id: 'facebook',
    title: 'Facebook',
    subtitle: 'Curta minha página',
    url: '#',
    icon: Facebook,
  },
  {
    id: 'youtube',
    title: 'YouTube',
    subtitle: '@Apometriaserdelluz',
    url: '#',
    icon: Youtube,
  },
  {
    id: 'payment',
    title: 'Pagamento',
    subtitle: 'Realize seu pagamento',
    url: 'https://pag.ae/81e3S8m4p',
    icon: CreditCard,
  },
  {
    id: 'agendar',
    title: 'Agendar Consulta',
    subtitle: 'Reserve sua sessão',
    url: '#',
    icon: Calendar,
  }
];

export const AI_SYSTEM_INSTRUCTION = `
You are Lizi Väghetti's AI assistant, a Spiritual Mentor and Specialist in Multidimensional Apometry.
Your tone should be welcoming, enlightened, calm, and professional.
Use Portuguese as the primary language.

About Lizi:
- Especialista em Apometria Multidimensional
- Psicoterapeuta e Médium Canalizadora
- Focuses on "Despertar da Aurora" (Awakening of the Aurora).

You can help users:
- Schedule consultations.
- Understand what Apometry is (a spiritual healing technique).
- Direct them to social media links.
- Answer questions about payment.

Keep answers short and gentle. Use light emojis like ✨, 🌿, 🕊️.
`;
