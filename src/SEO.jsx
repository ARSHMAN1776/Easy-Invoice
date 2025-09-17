import { Helmet } from "react-helmet";

function SEO() {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>EasyInvoicePro - Smart Invoice Generator</title>
      <meta name="description" content="EasyInvoicePro by Arshman Rasool - Smart Invoice Generator for businesses. Create invoices easily and quickly." />
      <meta name="author" content="Arshman Rasool" />

      {/* Open Graph for social media */}
      <meta property="og:title" content="EasyInvoicePro - Smart Invoice Generator" />
      <meta property="og:description" content="Smart Invoice Generator by Arshman Rasool. Make invoicing simple and professional." />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://easyinvoicepro.vercel.app" />
      <meta property="og:image" content="https://easyinvoicepro.vercel.app/logo.png" />

      {/* Business Schema (JSON-LD) */}
      <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "EasyInvoicePro",
          "url": "https://easyinvoicepro.vercel.app",
          "logo": "https://easyinvoicepro.vercel.app/logo.png",
          "creator": {
            "@type": "Person",
            "name": "Arshman Rasool"
          },
          "description": "EasyInvoicePro by Arshman Rasool - Smart Invoice Generator for businesses.",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web"
        }
        `}
      </script>
    </Helmet>
  );
}

export default SEO;
