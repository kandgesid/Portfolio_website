import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import Section from './Section';
import { CONTACT_DETAILS } from '../constants';
import type { ContactInfo } from '../types';
import { EMAILJS_CONFIG } from '../config/emailjs';

const ContactCard: React.FC<{ item: ContactInfo }> = ({ item }) => (
  <a href={item.href} target="_blank" rel="noopener noreferrer" className="group relative bg-slate-800/60 backdrop-blur-sm p-6 rounded-lg border border-slate-700 flex items-center gap-4 transition-all duration-300 hover:border-zinc-300/50 hover:scale-[1.03] hover:shadow-2xl hover:shadow-zinc-500/10 overflow-hidden">
    <div className="absolute inset-[-15px] bg-zinc-300/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
    <div className="text-zinc-300">
      <item.icon className="w-8 h-8" />
    </div>
    <div>
      <h3 className="text-2xl font-bold text-white">{item.title}</h3>
      <p className="text-lg text-slate-400">{item.value}</p>
    </div>
  </a>
);

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    // Initialize EmailJS with proper error handling
    try {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
      console.log('EmailJS initialized successfully with key:', EMAILJS_CONFIG.PUBLIC_KEY);
    } catch (error) {
      console.error('Failed to initialize EmailJS:', error);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      console.log('Sending email with config:', {
        serviceId: EMAILJS_CONFIG.SERVICE_ID,
        templateId: EMAILJS_CONFIG.TEMPLATE_ID,
        publicKey: EMAILJS_CONFIG.PUBLIC_KEY
      });

      // Method 1: Try sendForm method (more reliable)
      if (formRef.current) {
        console.log('Using sendForm method...');
        try {
          const result = await emailjs.sendForm(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            formRef.current,
            EMAILJS_CONFIG.PUBLIC_KEY
          );
          console.log('✅ EmailJS sendForm success:', result);
          setSubmitStatus('success');
          setFormData({ name: '', email: '', message: '' });
          return;
        } catch (formError: any) {
          console.error('❌ sendForm failed, trying send method:', formError);
        }
      }

      // Method 2: Fallback to send method
      console.log('Using send method...');
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: EMAILJS_CONFIG.TO_EMAIL,
        reply_to: formData.email
      };

      console.log('Template params:', templateParams);

      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );
      
      console.log('✅ EmailJS send success:', result);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error('EmailJS error details:', error);
      console.error('Error type:', typeof error);
      console.error('Error message:', error?.message || 'Unknown error');
      console.error('Error status:', error?.status || 'No status');
      console.error('Error text:', error?.text || 'No error text');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name === 'from_name' ? 'name' : e.target.name === 'from_email' ? 'email' : 'message']: e.target.value
    }));
  };



  return (
    <div className="group relative bg-slate-800/60 backdrop-blur-sm p-6 rounded-lg border border-slate-700 transition-all duration-300 hover:border-zinc-300/50 hover:scale-[1.02] hover:shadow-2xl hover:shadow-zinc-500/10 overflow-hidden">
      <div className="absolute inset-[-15px] bg-zinc-300/10 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Send Message</h3>
      
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="from_name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-400/20 transition-all duration-300"
            placeholder="Your name"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="from_email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-400/20 transition-all duration-300"
            placeholder="your.email@example.com"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={4}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-400/20 transition-all duration-300 resize-none"
            placeholder="Your message..."
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-zinc-600/50 text-white font-semibold py-3 px-6 rounded-lg hover:bg-zinc-500/70 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        
        {submitStatus === 'success' && (
          <div className="text-center p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-green-400 text-sm font-medium">✨ Message sent successfully!</p>
            <p className="text-green-300 text-xs mt-1">I'll get back to you soon.</p>
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="text-center p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm font-medium">⚠️ Failed to send message</p>
            <p className="text-red-300 text-xs mt-1">Please check your connection and try again.</p>
          </div>
        )}
      </form>
    </div>
  );
};

const Contact: React.FC = () => {
  return (
    <Section id="contact" title="Get In Touch">
      <p className="max-w-2xl mx-auto text-center text-xl text-slate-300 mb-12">
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Contact Cards - LinkedIn and GitHub */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-6">
            {CONTACT_DETAILS.map((item, index) => (
              <ContactCard key={index} item={item} />
            ))}
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="lg:col-span-1">
          <ContactForm />
        </div>
      </div>
    </Section>
  );
};

export default Contact;