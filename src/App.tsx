/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ChevronUp, 
  Send, 
  X, 
  Layout, 
  Home, 
  Truck, 
  Flag, 
  Square,
  Sparkles,
  MessageCircle,
  Bot,
  Loader2,
  ArrowRight,
  ExternalLink,
  Phone
} from 'lucide-react';
import { cn } from './lib/utils';
import { chatWithGemini } from './services/aiService';
import ReactMarkdown from 'react-markdown';

const SERVICES = [
  { id: 'fachadas', title: 'Fachadas', icon: Layout, description: 'Fachadas em ACM, PVC e Lona com iluminação LED.', image: 'https://picsum.photos/seed/fachada/1200/800' },
  { id: 'residencial', title: 'Adesivagem Residencial', icon: Home, description: 'Decoração de interiores, vidros e paredes.', image: 'https://picsum.photos/seed/residencial/1200/800' },
  { id: 'veiculos', title: 'Adesivagem de Veículos', icon: Truck, description: 'Frotas, carros e motos com adesivos premium.', image: 'https://picsum.photos/seed/veiculos/1200/800' },
  { id: 'banners', title: 'Banners e Faixas', icon: Flag, description: 'Impressão digital em alta resolução.', image: 'https://picsum.photos/seed/banners/1200/800' },
  { id: 'placas', title: 'Placas PVC e ACM', icon: Square, description: 'Sinalização interna e externa de alta durabilidade.', image: 'https://picsum.photos/seed/placas/1200/800' },
];

export default function App() {
  const [activeGallery, setActiveGallery] = useState<string | null>(null);
  const [activeFAQ, setActiveFAQ] = useState<{ title: string, content: string } | null>(null);
  const [showAIConsultant, setShowAIConsultant] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'bot', text: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      let botResponse = '';
      setChatMessages(prev => [...prev, { role: 'bot', text: '' }]);
      
      const stream = chatWithGemini(userMsg, []);
      for await (const chunk of stream) {
        botResponse += chunk;
        setChatMessages(prev => {
          const newMsgs = [...prev];
          newMsgs[newMsgs.length - 1].text = botResponse;
          return newMsgs;
        });
      }
    } catch (error) {
      console.error(error);
      setChatMessages(prev => [...prev, { role: 'bot', text: 'Desculpe, tive um problema ao processar sua mensagem.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] bg-[radial-gradient(circle_at_center,_#0f172a_0%,_#020617_100%)] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* Immersive Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-600/15 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/15 blur-[120px] rounded-full animate-pulse-slow" />
        <div className="absolute top-[30%] left-[20%] w-[40%] h-[40%] bg-blue-400/10 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* Hero Section - Extraordinary Entrance */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <motion.div 
          style={{ opacity, scale }}
          className="max-w-7xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            {/* Extraordinary Logo */}
            <div className="relative w-56 h-56 md:w-80 md:h-80 mb-12 group">
              <div className="absolute inset-0 bg-blue-600/20 blur-[60px] rounded-full group-hover:bg-blue-600/40 transition-all duration-700" />
              <motion.div
                animate={{ rotateY: [0, 10, 0, -10, 0], rotateX: [0, 5, 0, -5, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_50px_rgba(37,99,235,0.4)]">
                  <defs>
                    <linearGradient id="cube-top-hero" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7dd3fc" />
                      <stop offset="100%" stopColor="#38bdf8" />
                    </linearGradient>
                    <linearGradient id="cube-front-hero" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#1e40af" />
                    </linearGradient>
                    <linearGradient id="cube-side-hero" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1d4ed8" />
                      <stop offset="100%" stopColor="#1e3a8a" />
                    </linearGradient>
                  </defs>
                  <path d="M50 20 L80 35 L50 50 L20 35 Z" fill="url(#cube-top-hero)" />
                  <path d="M20 35 L50 50 L50 85 L20 70 Z" fill="url(#cube-front-hero)" />
                  <path d="M50 50 L80 35 L80 70 L50 85 Z" fill="url(#cube-side-hero)" />
                  <path d="M45 85 Q50 95 55 85 L50 80 Z" fill="#1e3a8a" opacity="0.6" />
                </svg>
              </motion.div>
            </div>

            <h1 className="text-7xl md:text-[10rem] font-black text-white mb-16 tracking-tighter leading-none select-none">
              Rogério<span className="text-blue-500 text-glow">Visual</span>
            </h1>

            {/* Navigation Buttons - Premium Glassmorphism */}
            <div className="flex flex-wrap justify-center gap-6 mt-4">
              {[
                { label: 'Início', action: scrollToTop },
                { label: 'Serviços', action: () => scrollToSection('servicos') },
                { label: 'Dúvidas', action: () => scrollToSection('duvidas') }
              ].map((btn) => (
                <motion.button 
                  key={btn.label}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={btn.action}
                  className="px-12 py-5 glass text-white rounded-full font-bold transition-all text-xl shadow-2xl"
                >
                  {btn.label}
                </motion.button>
              ))}
              <motion.a 
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(37,99,235,0.4)' }}
                whileTap={{ scale: 0.95 }}
                href="https://wa.me/5519992219448" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-12 py-5 bg-blue-600 text-white rounded-full font-bold transition-all text-xl shadow-xl shadow-blue-600/20 flex items-center gap-3"
              >
                <Phone size={24} />
                Contato
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent" />
        </motion.div>
      </section>

      {/* Dúvidas Section - Extraordinary Interaction */}
      <section id="duvidas" className="py-32 px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Prestação de Serviços', content: 'Atendemos exclusivamente a região de **São João da Boa Vista - SP**, garantindo agilidade e qualidade no suporte local.', icon: Truck },
              { title: 'Valores', content: 'Trabalhamos com preços competitivos e materiais de alta qualidade:\n\n• **Lona:** R$ 100/m²\n• **Adesivo:** R$ 100/m²\n• **PVC Adesivado:** R$ 100/m²\n• **ACM:** R$ 100/m²', icon: Sparkles },
              { title: 'Serviço Leva e Tráz', content: 'Oferecemos comodidade para nossos clientes. Para o serviço de coleta e entrega, por favor **verificar disponibilidade** e taxas para sua localização específica.', icon: ExternalLink }
            ].map((faq, i) => (
              <motion.button
                key={faq.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveFAQ({ title: faq.title, content: faq.content })}
                className="group relative p-12 bg-blue-600 border border-blue-400/30 rounded-[2.5rem] text-center hover:bg-blue-500 transition-all shadow-2xl shadow-blue-900/40 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <faq.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-white text-2xl font-black mb-4 tracking-tight">
                    {faq.title}
                  </h3>
                  <p className="text-blue-100/80 text-sm font-medium">Toque para saber mais detalhes</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Premium Grid */}
      <section id="servicos" className="py-40 px-6 relative">
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <motion.h2 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter"
            >
              Nossos <span className="text-blue-500">Serviços</span>
            </motion.h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto font-medium">Excelência em cada detalhe, transformando ambientes e marcas com tecnologia de ponta.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {SERVICES.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className="group relative bg-[#0f172a] border border-white/5 rounded-[3rem] p-10 hover:border-blue-500/40 transition-all cursor-pointer overflow-hidden shadow-2xl"
                onClick={() => setActiveGallery(service.id)}
              >
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <service.icon size={120} />
                </div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-blue-500/20 transition-colors">
                    <service.icon className="text-blue-500" size={32} />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-4 tracking-tight">{service.title}</h3>
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">{service.description}</p>
                  <div className="flex items-center gap-3 text-blue-500 font-bold text-sm group-hover:gap-5 transition-all">
                    Explorar Projetos <ArrowRight size={18} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Elegant & Minimal */}
      <footer className="py-24 px-6 border-t border-white/5 bg-[#020617] relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <path d="M50 20 L80 35 L50 50 L20 35 Z" fill="#38bdf8" />
                  <path d="M20 35 L50 50 L50 85 L20 70 Z" fill="#2563eb" />
                  <path d="M50 50 L80 35 L80 70 L50 85 Z" fill="#1e40af" />
                </svg>
              </div>
              <span className="text-2xl font-black text-white tracking-tighter">RogérioVisual</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">Excelência em Comunicação Visual desde 2026.</p>
          </div>
          <div className="flex gap-10 text-slate-400 font-bold text-sm">
            <button onClick={scrollToTop} className="hover:text-white transition-colors">Início</button>
            <button onClick={() => scrollToSection('servicos')} className="hover:text-white transition-colors">Serviços</button>
            <button onClick={() => scrollToSection('duvidas')} className="hover:text-white transition-colors">Dúvidas</button>
          </div>
          <div className="text-slate-500 text-xs font-bold tracking-widest uppercase">
            São João da Boa Vista - SP
          </div>
        </div>
      </footer>

      {/* Extraordinary Gallery Modal */}
      <AnimatePresence>
        {activeGallery && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveGallery(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-[#0f172a] rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(37,99,235,0.2)]"
            >
              <button 
                onClick={() => setActiveGallery(null)}
                className="absolute top-8 right-8 z-10 p-3 glass text-white rounded-full hover:bg-white/20 transition-all"
              >
                <X size={28} />
              </button>
              
              <div className="p-12 md:p-20">
                <div className="flex items-center gap-4 mb-12">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                    <Sparkles className="text-blue-500" size={24} />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                    {SERVICES.find(s => s.id === activeGallery)?.title}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[1, 2, 3, 4].map(i => (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.02 }}
                      className="aspect-video bg-slate-800 rounded-[2rem] overflow-hidden border border-white/5 relative group"
                    >
                      <img 
                        src={`https://picsum.photos/seed/${activeGallery}-${i}/1200/800`} 
                        alt="Gallery item"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
                        <span className="text-white font-bold text-lg">Projeto Realizado #{i}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Extraordinary FAQ Modal */}
      <AnimatePresence>
        {activeFAQ && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveFAQ(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-xl bg-[#0f172a] rounded-[3rem] overflow-hidden border border-white/10 p-12 shadow-[0_0_100px_rgba(37,99,235,0.2)]"
            >
              <button 
                onClick={() => setActiveFAQ(null)}
                className="absolute top-8 right-8 z-10 p-2 glass text-white rounded-full hover:bg-white/20 transition-all"
              >
                <X size={24} />
              </button>
              
              <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-8">
                <Sparkles className="text-blue-500" size={32} />
              </div>
              <h2 className="text-3xl font-black text-white mb-8 tracking-tight">{activeFAQ.title}</h2>
              <div className="text-slate-300 text-lg leading-relaxed whitespace-pre-line font-medium">
                <div className="prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{activeFAQ.content}</ReactMarkdown>
                </div>
              </div>
              <button 
                onClick={() => setActiveFAQ(null)}
                className="mt-12 w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black transition-all text-lg shadow-xl shadow-blue-600/20"
              >
                Entendido
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-10 left-10 z-50 flex flex-col gap-4">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="w-16 h-16 glass-dark text-white rounded-full flex items-center justify-center transition-all shadow-2xl border border-white/10"
          title="Voltar ao topo"
        >
          <ChevronUp size={32} />
        </motion.button>
      </div>

      {/* AI Project Consultant - The Extraordinary AI Integration */}
      <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end gap-6">
        <AnimatePresence>
          {showAIConsultant && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 30, scale: 0.9, filter: 'blur(10px)' }}
              className="w-[90vw] md:w-[450px] h-[650px] bg-[#0f172a]/95 backdrop-blur-2xl border border-white/10 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden"
            >
              <div className="p-8 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-between">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center animate-pulse">
                    <Bot size={28} />
                  </div>
                  <div>
                    <span className="block font-black text-lg leading-none">Consultor IA</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-70">RogérioVisual Expert</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAIConsultant(false)} 
                  className="w-10 h-10 glass text-white rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
                {chatMessages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                    <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center">
                      <Sparkles className="text-blue-500 animate-pulse" size={40} />
                    </div>
                    <div>
                      <h4 className="text-white font-black text-xl mb-2">Como posso elevar sua marca?</h4>
                      <p className="text-slate-400 text-sm font-medium px-6">
                        Sou o assistente especializado da RogérioVisual. Posso te dar ideias de fachadas, adesivagem e materiais.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-2 w-full">
                      {[
                        "Ideias para fachada de loja",
                        "Qual o melhor material para banners?",
                        "Dicas de adesivagem de frotas"
                      ].map(suggestion => (
                        <button 
                          key={suggestion}
                          onClick={() => {
                            setChatInput(suggestion);
                            // Auto-send could be added here
                          }}
                          className="p-3 glass rounded-2xl text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 transition-all"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {chatMessages.map((msg, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i} 
                    className={cn(
                      "max-w-[85%] p-5 rounded-[2rem] text-sm font-medium leading-relaxed shadow-lg",
                      msg.role === 'user' 
                        ? "bg-blue-600 text-white ml-auto rounded-tr-none" 
                        : "bg-white/5 text-slate-200 mr-auto rounded-tl-none border border-white/5"
                    )}
                  >
                    <div className="prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="bg-white/5 text-slate-200 p-5 rounded-[2rem] rounded-tl-none w-16 flex justify-center border border-white/5">
                    <Loader2 className="animate-spin text-blue-500" size={20} />
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-8 border-t border-white/5 flex gap-3 bg-black/20">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Descreva seu projeto..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-medium focus:outline-none focus:border-blue-500/50 transition-all placeholder:text-slate-600"
                />
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSendMessage}
                  disabled={isTyping || !chatInput.trim()}
                  className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white hover:bg-blue-500 transition-all disabled:opacity-50 shadow-xl shadow-blue-600/20"
                >
                  <Send size={24} />
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button 
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowAIConsultant(!showAIConsultant)}
          className="w-20 h-20 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center shadow-[0_20px_50px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-all relative group"
        >
          <div className="absolute inset-0 bg-white/20 rounded-[2rem] animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
          {showAIConsultant ? <X size={32} /> : <MessageCircle size={32} />}
        </motion.button>
      </div>
    </div>
  );
}
