import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const posts = [
    { id: 1, title: 'Designing Clear Receipts', excerpt: 'Tips and best practices for creating receipts that customers actually understand.' },
    { id: 2, title: 'Optimizing Invoicing Workflows', excerpt: 'Small automation steps that save hours for small businesses.' },
    { id: 3, title: 'Accessibility in Financial Documents', excerpt: 'Making receipts readable for everyone: font choices, contrast, and structure.' },
    { id: 4, title: 'Custom Templates 101', excerpt: 'How to create and reuse templates for different business needs.' },
    { id: 5, title: 'Localisation & Currency', excerpt: 'Supporting multiple currencies and formats for global customers.' },
    { id: 6, title: 'Printing and PDF Tips', excerpt: 'Ensuring PDFs look the same across devices and printers.' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Blog</h1>
        <p className="text-muted-foreground">Insights and articles about invoicing, receipts, and small-business tools.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {posts.map((p) => (
            <article key={p.id} className="p-6 bg-white rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold mb-2">{p.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{p.excerpt}</p>
              <Link to="#" className="text-primary hover:underline">Read more</Link>
            </article>
          ))}
        </div>

        <aside className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="font-semibold mb-3">Categories</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Design</li>
            <li>PDF & Printing</li>
            <li>Templates</li>
            <li>Localization</li>
            <li>Accessibility</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Blog;
