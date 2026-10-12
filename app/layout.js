import Script from "next/script";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://odonto.atriomarketing.site"),
  title: "Átrio · Sites para clínicas odontológicas que aparecem no Google",
  description:
    "Criação de sites com SEO profissional para clínicas odontológicas. Sites rápidos, modernos e otimizados para o paciente encontrar sua clínica no Google.",
  keywords:
    "site para clínica odontológica, site para dentista, site odontologia com SEO, marketing para dentista, site para consultório odontológico, Átrio Marketing",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://odonto.atriomarketing.site",
    title: "Átrio · Sites para clínicas odontológicas que aparecem no Google",
    description:
      "Sites rápidos e com SEO profissional para clínicas odontológicas serem encontradas por pacientes.",
    siteName: "Átrio",
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: "#0E1116",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* Meta Pixel Code */}
        <Script id="facebook-pixel">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '5403951239830409');
            fbq('track', 'PageView');
          `}
        </Script>

        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=5403951239830409&ev=PageView&noscript=1"
          />
        </noscript>

        {/* End Meta Pixel Code */}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JHV36SF6QF"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-JHV36SF6QF');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}
