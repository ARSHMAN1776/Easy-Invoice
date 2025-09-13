import React, { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

const ContactForm = ({ to = 'arshmanrasool75@gmail.com' }) => {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('Feedback from site');
  const [message, setMessage] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [options, setOptions] = useState([]);
  const [localThanks, setLocalThanks] = useState(false);

  const toggleOption = (opt) => {
    setOptions((prev) => (prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Require client email
    if (!clientEmail || !clientEmail.includes('@')) {
      try {
        toast({ title: 'Email required', description: 'Please enter a valid email so we can follow up.' });
      } catch (e) {
        // fallback
        alert('Please enter a valid email address');
      }
      return;
    }

    // Compose body including client email
    const parts = [
      `Name: ${name}`,
      `Client Email: ${clientEmail}`,
      `Options: ${options.join(', ')}`,
      '',
      message,
    ].join('%0D%0A');
    const body = encodeURIComponent(parts);
    const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;

    // Show toast and local confirmation then clear form
    try {
      toast({ title: 'Thanks!', description: 'Thanks for submitting feedback.' });
    } catch (e) {
      console.info('Feedback notification');
    }
    setLocalThanks(true);

    // Clear fields
    setName(''); setSubject('Feedback from site'); setMessage(''); setOptions([]); setClientEmail('');

    // Hide local thanks after a short time
    setTimeout(() => setLocalThanks(false), 3000);

    // Delay navigation to allow toast/local message to show
    setTimeout(() => {
      window.location.href = mailto; // open user's email client
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Contact / Send Feedback</h3>
      <label className="block mb-2">
        <span className="text-sm">Your name</span>
        <input value={name} onChange={(e) => setName(e.target.value)} className="w-full mt-1 p-2 border rounded" />
      </label>
      <label className="block mb-2">
        <span className="text-sm">Your email (required for follow-up)</span>
        <input value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} type="email" required className="w-full mt-1 p-2 border rounded" />
      </label>
      <label className="block mb-2">
        <span className="text-sm">Subject</span>
        <input value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full mt-1 p-2 border rounded" />
      </label>
      <label className="block mb-2">
        <span className="text-sm">Message</span>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="w-full mt-1 p-2 border rounded" />
      </label>

      <div className="mb-3">
        <span className="text-sm font-medium">Options</span>
        <div className="flex gap-3 mt-2">
          {['Template help', 'Currency support', 'PDF issues'].map((o) => (
            <label key={o} className="inline-flex items-center gap-2">
              <input type="checkbox" checked={options.includes(o)} onChange={() => toggleOption(o)} />
              <span className="text-sm">{o}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded">Send email</button>
        <button type="button" onClick={() => { setName(''); setSubject('Feedback from site'); setMessage(''); setOptions([]); setClientEmail(''); }} className="px-4 py-2 border rounded">Reset</button>
      </div>
      {localThanks && (
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800">Thanks for submitting feedback.</div>
      )}
    </form>
  );
};

export default ContactForm;
