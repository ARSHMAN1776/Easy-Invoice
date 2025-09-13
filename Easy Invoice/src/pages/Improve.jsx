import React from 'react';
import ContactForm from '../components/ContactForm';

const Improve = () => {
  const improvements = [
    { id: 1, title: 'Cleaner Templates', description: 'We standardized templates to make them easier to customize and print.' },
    { id: 2, title: 'Flexible Currency Support', description: 'Add or remove currencies via a single utils file without touching templates.' },
    { id: 3, title: 'PDF Export Improvements', description: 'Better PDF generation with consistent layout and font sizing across templates.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-4">How We Improve This Page</h1>
        <p className="text-muted-foreground mb-6">Our goal is to make the billing experience fast, clear, and customizable for small businesses. Below are recent and planned improvements.</p>

        <div className="space-y-4">
          {improvements.map((it) => (
            <div key={it.id} className="p-4 bg-white rounded shadow-sm">
              <h3 className="font-semibold">{it.title}</h3>
              <p className="text-sm text-muted-foreground">{it.description}</p>
            </div>
          ))}
        </div>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-3">Want to contribute?</h2>
          <p className="text-muted-foreground">Open a PR or file an issue with ideas — we welcome improvements that keep the core stable.</p>
        </section>
      </div>

      <aside>
        <ContactForm to="arshmanrasool75@gmail.com" />
        <div className="mt-6 text-sm text-muted-foreground">
          <p className="text-left lg:text-right">For any query: <a href="mailto:arshmanrasool75@gmail.com" className="text-primary underline">arshmanrasool75@gmail.com</a></p>
        </div>
      </aside>
    </div>
  );
};

export default Improve;
