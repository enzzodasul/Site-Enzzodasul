import React, { useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { BookingRequest } from '../../types';
import { bookingService } from '../../services/bookingService';
import { Send, CheckCircle2, MessageSquare, PhoneCall } from 'lucide-react';

export const BookingSection: React.FC = () => {
  const [formData, setFormData] = useState<BookingRequest>({
    name: '',
    companyOrEvent: '',
    city: '',
    date: '',
    eventType: 'Festival',
    estimatedAudience: '1.000 - 5.000',
    whatsapp: '',
    instagram: '',
    message: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string>('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await bookingService.submitBookingRequest(formData);
      if (res.success) {
        setSubmitted(true);
        setFeedbackMsg(res.message);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="py-20 sm:py-28 relative">
      <div className="max-w-site mx-auto px-4 sm:px-6">
        <SectionHeading
          tag="CONTATO PROFISSIONAL"
          title="BOOK ENZZO DA SUL"
          subtitle="Leve a experiência futurista e contagiante do show de Enzzo da Sul para o seu festival, evento ou casa de shows."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Info Side */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <Card className="p-6 sm:p-8 flex flex-col gap-6 bg-gradient-to-br from-surface via-surface to-accent/10 border-accent/30">
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono text-accent uppercase font-bold tracking-widest">
                  // DIRETO DA PRODUÇÃO
                </span>
                <h3 className="text-2xl font-display font-black uppercase text-text">
                  CONTRATAÇÃO DE SHOWS
                </h3>
              </div>

              <p className="text-sm text-text-muted leading-relaxed">
                Nossa equipe de produção e booking está pronta para alinhar datas, rider técnico, logística e especificações para tornar a apresentação inesquecível.
              </p>

              <div className="flex flex-col gap-4 pt-4 border-t border-surface-border text-xs font-mono">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-accent/15 text-accent">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-text-dim block">E-MAIL OFICIAL</span>
                    <span className="text-text font-bold">booking@enzzodasul.com</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                    <PhoneCall className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-text-dim block">WHATSAPP BOOKING</span>
                    <span className="text-text font-bold">+55 (51) 99999-0000</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <Card className="p-6 sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-display font-bold uppercase text-text">
                    Solicitação Recebida!
                  </h3>
                  <p className="text-sm text-text-muted max-w-md">
                    {feedbackMsg}
                  </p>
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        companyOrEvent: '',
                        city: '',
                        date: '',
                        eventType: 'Festival',
                        estimatedAudience: '1.000 - 5.000',
                        whatsapp: '',
                        instagram: '',
                        message: '',
                      });
                    }}
                    className="mt-4"
                  >
                    Enviar Outra Solicitação
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-text-muted uppercase">Nome do Contratante *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Seu nome completo"
                        className="w-full px-4 py-2.5 bg-surface text-text rounded-lg border border-surface-border focus:border-accent focus:outline-none text-sm font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-text-muted uppercase">Empresa / Evento *</label>
                      <input
                        type="text"
                        name="companyOrEvent"
                        required
                        value={formData.companyOrEvent}
                        onChange={handleChange}
                        placeholder="Nome do evento ou produtora"
                        className="w-full px-4 py-2.5 bg-surface text-text rounded-lg border border-surface-border focus:border-accent focus:outline-none text-sm font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-text-muted uppercase">Cidade & Estado *</label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Ex: Porto Alegre / RS"
                        className="w-full px-4 py-2.5 bg-surface text-text rounded-lg border border-surface-border focus:border-accent focus:outline-none text-sm font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-text-muted uppercase">Data Pretendida *</label>
                      <input
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-surface text-text rounded-lg border border-surface-border focus:border-accent focus:outline-none text-sm font-sans"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-text-muted uppercase">Tipo de Evento</label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-surface text-text rounded-lg border border-surface-border focus:border-accent focus:outline-none text-sm font-sans"
                      >
                        <option value="Festival">Festival</option>
                        <option value="Casa de Shows">Casa de Shows</option>
                        <option value="Evento Privado">Evento Privado</option>
                        <option value="Corporativo">Corporativo</option>
                        <option value="Outro">Outro</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-text-muted uppercase">Público Estimado</label>
                      <select
                        name="estimatedAudience"
                        value={formData.estimatedAudience}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-surface text-text rounded-lg border border-surface-border focus:border-accent focus:outline-none text-sm font-sans"
                      >
                        <option value="Até 1.000">Até 1.000 pessoas</option>
                        <option value="1.000 - 5.000">1.000 a 5.000 pessoas</option>
                        <option value="5.000 - 15.000">5.000 a 15.000 pessoas</option>
                        <option value="+15.000">+15.000 pessoas</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-text-muted uppercase">WhatsApp com DDD *</label>
                      <input
                        type="tel"
                        name="whatsapp"
                        required
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="(00) 00000-0000"
                        className="w-full px-4 py-2.5 bg-surface text-text rounded-lg border border-surface-border focus:border-accent focus:outline-none text-sm font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-mono text-text-muted uppercase">Instagram do Evento</label>
                      <input
                        type="text"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                        placeholder="@seuevento"
                        className="w-full px-4 py-2.5 bg-surface text-text rounded-lg border border-surface-border focus:border-accent focus:outline-none text-sm font-sans"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-text-muted uppercase">Mensagem & Detalhes Adicionais</label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Descreva detalhes como orçamento, estrutura de palco, horários, etc."
                      className="w-full px-4 py-2.5 bg-surface text-text rounded-lg border border-surface-border focus:border-accent focus:outline-none text-sm font-sans"
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="glow"
                    size="lg"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'ENVIANDO SOLICITAÇÃO...' : 'SOLICITAR SHOW'}</span>
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
