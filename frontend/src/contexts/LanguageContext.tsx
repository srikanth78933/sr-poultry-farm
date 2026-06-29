"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "en" | "te" | "kn" | "ta";

export const LANG_LABELS: Record<Lang, string> = {
  en: "English",
  te: "తెలుగు",
  kn: "ಕನ್ನಡ",
  ta: "தமிழ்",
};

const T = {
  en: {
    nav: { home: "Home", chickens: "Our Natu Kodi", farm: "Our Farm", buy: "How to Buy", visit: "Farm Visit", franchise: "Franchise", whyUs: "Why Choose Us", contact: "Contact" },
    hero: {
      badge: "Pure Country Chicken · Raised Naturally",
      title1: "SR NATU KODI",
      title2: "FARMS",
      sub: "Pure Country Chicken\nRaised Naturally",
      tag: "Traditional Taste  |  Natural Farming  |  Farm Fresh",
      desc: "Authentic Natu Kodi raised in open farms with natural feeding, fresh water, free roaming, healthy environment and traditional farming methods.",
      btnView: "View Natu Kodi",
      btnBook: "Book Farm Visit",
      btnCall: "Call Now",
      btnWA: "WhatsApp",
      raisedWith: "Raised naturally with:",
    },
    features: [
      { title: "Natural Feeding", desc: "Grains, greens & natural feed" },
      { title: "Fresh Water", desc: "Clean water always available" },
      { title: "Free Roaming", desc: "Open pasture environment" },
      { title: "No Hormones", desc: "Zero artificial growth methods" },
      { title: "Traditional", desc: "Authentic farming practices" },
    ],
    story: {
      eyebrow: "Our Story",
      title: "Why SR Natu Kodi Farms?",
      desc: "We raise Natu Kodi the way nature intended — free to roam under open skies, fed on natural grains and fresh water, grown slowly with patience. No factory cages. No artificial methods. Just honest, traditional farming that brings out the authentic taste country chicken is loved for.",
      points: [
        "Naturally raised birds on open pasture",
        "Free movement under open sky",
        "Traditional food practices & natural feed",
        "No artificial growth hormones",
        "Fresh, healthy country chicken",
        "Direct farm-to-customer experience",
      ],
      quote: "Village taste, right to your home.",
    },
    products: {
      eyebrow: "Our Collection",
      title: "Natu Kodi Collection",
      desc: "Each bird naturally raised and priced per kilogram. Visit the farm, choose your bird, watch it weighed live — pay for what you see.",
    },
    visitCta: {
      eyebrow: "Farm Visit",
      title: "Come See For Yourself",
      desc: "Book a free farm visit. Walk the pasture, meet the birds, and choose your Natu Kodi the traditional way. No advance payment required.",
      btn: "Book Farm Visit",
      note: "Free visit · No advance payment · Live weighing",
    },
    trust: {
      eyebrow: "Our Promise",
      title: "From Our Farm\nTo Your Family",
      points: [
        { title: "Quality", desc: "Every bird raised to the highest natural standards — healthy, active, slow-grown." },
        { title: "Trust", desc: "Transparent pricing — live weigh at the farm. You pay only for actual weight." },
        { title: "Transparency", desc: "Visit the farm, choose your exact bird, see everything before you pay." },
        { title: "Natural Farming", desc: "No hormones, no shortcuts, no factory methods. Just honest country poultry." },
      ],
    },
    franchise: {
      eyebrow: "Business Opportunity",
      title: "Start Your Own\nSR Natu Kodi Franchise",
      desc: "Build your own business with authentic farm-raised Natu Kodi birds and eggs. We support every franchise partner with supply, training and ongoing guidance.",
      supplyTitle: "We supply franchise partners with:",
      supply: ["Pure Natu Kodi birds", "Fresh farm eggs", "Quality farm products", "Business guidance & training"],
      options: [
        { n: "01", title: "SR Natu Kodi Birds Franchise", desc: "Supply and sell authentic live Natu Kodi birds in your locality." },
        { n: "02", title: "Meat & Eggs Franchise", desc: "Operate a fresh Natu Kodi meat and farm egg retail outlet." },
        { n: "03", title: "Retail Outlet Franchise", desc: "Set up a branded SR Natu Kodi retail store in your area." },
        { n: "04", title: "Your Own Enterprise", desc: "Full business setup with branding, training and ongoing support." },
      ],
      btn: "Apply For Franchise",
      btnNote: "via WhatsApp · Quick response",
    },
    contact: {
      eyebrow: "Get In Touch",
      title: "Contact Us",
      callTitle: "Call / WhatsApp",
      emailTitle: "Email",
      locTitle: "Location",
      loc: "S. Nadimpalli Village, Somala Mandalam\nAnnamayya District, Andhra Pradesh 517257",
      followTitle: "Follow Us",
    },
    footer: {
      tagline: "Pure Taste. Natural Farming.",
      loc: "Andhra Pradesh, India",
    },
  },
  te: {
    nav: { home: "హోమ్", chickens: "నాటు కోడి", farm: "మా ఫార్మ్", buy: "కొనుగోలు", visit: "సందర్శన", franchise: "ఫ్రాంచైజ్", whyUs: "ఎందుకు మేము", contact: "సంప్రదించు" },
    hero: {
      badge: "స్వచ్ఛమైన నాటు కోడి · సహజంగా పెంచబడినది",
      title1: "SR నాటు కోడి",
      title2: "ఫార్మ్స్",
      sub: "స్వచ్ఛమైన నాటు కోడి\nసహజంగా పెంచబడినది",
      tag: "సంప్రదాయ రుచి  |  సహజ వ్యవసాయం  |  తాజా ఫార్మ్",
      desc: "సహజ ఆహారం, తాజా నీరు, స్వేచ్ఛగా తిరగడం, ఆరోగ్యకరమైన వాతావరణంతో పెంచబడిన అసలైన నాటు కోడి.",
      btnView: "నాటు కోడి చూడండి",
      btnBook: "ఫార్మ్ సందర్శన బుక్",
      btnCall: "ఇప్పుడు కాల్ చేయండి",
      btnWA: "వాట్సాప్",
      raisedWith: "సహజంగా పెంచిన విధానాలు:",
    },
    features: [
      { title: "సహజ ఆహారం", desc: "ధాన్యాలు, ఆకుకూరలు" },
      { title: "తాజా నీరు", desc: "స్వచ్ఛమైన నీరు" },
      { title: "స్వేచ్ఛగా తిరగడం", desc: "తెరిచిన మేత" },
      { title: "హార్మోన్లు లేవు", desc: "కృత్రిమ పద్ధతులు లేవు" },
      { title: "సంప్రదాయం", desc: "అసలైన వ్యవసాయం" },
    ],
    story: {
      eyebrow: "మా కథ",
      title: "SR నాటు కోడి ఫార్మ్స్ ఎందుకు?",
      desc: "మేము నాటు కోడిని ప్రకృతి చెప్పిన విధంగా పెంచుతాము — తెరిచిన ఆకాశం కింద స్వేచ్ఛగా తిరగడం, సహజ ధాన్యాలు తినడం, నెమ్మదిగా పెరగడం. ఫ్యాక్టరీ పంజరాలు లేవు. కృత్రిమ పద్ధతులు లేవు. నిజాయితీగా సంప్రదాయ వ్యవసాయం.",
      points: [
        "తెరిచిన మేత పైన సహజంగా పెంచిన పక్షులు",
        "తెరిచిన ఆకాశం కింద స్వేచ్ఛగా కదలడం",
        "సంప్రదాయ ఆహార పద్ధతులు మరియు సహజ మేత",
        "కృత్రిమ వృద్ధి హార్మోన్లు లేవు",
        "తాజా, ఆరోగ్యకరమైన నాటు కోడి",
        "నేరుగా ఫార్మ్ నుండి కస్టమర్‌కు అనుభవం",
      ],
      quote: "గ్రామ రుచి, మీ ఇంటికి.",
    },
    products: { eyebrow: "మా సేకరణ", title: "నాటు కోడి సేకరణ", desc: "ప్రతి పక్షి కిలో ధరలో అమ్ముతారు. ఫార్మ్ సందర్శించి, మీ పక్షిని ఎంచుకుని, జీవితో తూకం వేయండి." },
    visitCta: { eyebrow: "ఫార్మ్ సందర్శన", title: "మీరే వచ్చి చూడండి", desc: "ఉచిత ఫార్మ్ సందర్శన బుక్ చేయండి. ముందు చెల్లింపు అవసరం లేదు.", btn: "ఫార్మ్ సందర్శన బుక్", note: "ఉచిత సందర్శన · ముందు చెల్లింపు లేదు · జీవితో తూకం" },
    trust: { eyebrow: "మా వాగ్దానం", title: "మా ఫార్మ్ నుండి\nమీ కుటుంబానికి", points: [{ title: "నాణ్యత", desc: "ప్రతి పక్షి అత్యున్నత సహజ ప్రమాణాలతో పెంచబడింది." }, { title: "విశ్వాసం", desc: "పారదర్శక ధర — ఫార్మ్‌లో జీవితో తూకం. అసలు బరువుకే చెల్లించండి." }, { title: "పారదర్శకత", desc: "ఫార్మ్ సందర్శించి, మీ పక్షిని ఎంచుకుని, చెల్లించే ముందు అన్నీ చూడండి." }, { title: "సహజ వ్యవసాయం", desc: "హార్మోన్లు లేవు, నాన్-స్టాప్ ఫ్యాక్టరీ పద్ధతులు లేవు." }] },
    franchise: {
      eyebrow: "వ్యాపార అవకాశం", title: "SR నాటు కోడి\nఫ్రాంచైజ్ ప్రారంభించండి", desc: "నాటు కోడి పక్షులు మరియు గుడ్లతో మీ స్వంత వ్యాపారం నిర్మించండి.",
      supplyTitle: "మేము ఫ్రాంచైజ్ భాగస్వాములకు సరఫరా చేస్తాము:", supply: ["స్వచ్ఛమైన నాటు కోడి పక్షులు", "తాజా ఫార్మ్ గుడ్లు", "నాణ్యమైన ఫార్మ్ ఉత్పత్తులు", "వ్యాపార మార్గదర్శకత్వం & శిక్షణ"],
      options: [{ n: "01", title: "SR నాటు కోడి పక్షులు ఫ్రాంచైజ్", desc: "మీ ప్రాంతంలో అసలైన నాటు కోడి అమ్మండి." }, { n: "02", title: "మాంసం & గుడ్ల ఫ్రాంచైజ్", desc: "తాజా నాటు కోడి మాంసం మరియు గుడ్ల రిటైల్ షాప్." }, { n: "03", title: "రిటైల్ అవుట్‌లెట్ ఫ్రాంచైజ్", desc: "SR నాటు కోడి బ్రాండ్ రిటైల్ స్టోర్ నిర్వహించండి." }, { n: "04", title: "మీ స్వంత వ్యాపారం", desc: "బ్రాండింగ్, శిక్షణ మరియు నిరంతర మద్దతుతో పూర్తి వ్యాపార సెటప్." }],
      btn: "ఫ్రాంచైజ్‌కు దరఖాస్తు చేయండి", btnNote: "వాట్సాప్ ద్వారా · త్వరిత ప్రతిస్పందన",
    },
    contact: { eyebrow: "సంప్రదించండి", title: "మాతో మాట్లాడండి", callTitle: "కాల్ / వాట్సాప్", emailTitle: "ఇమెయిల్", locTitle: "స్థానం", loc: "S. నాదింపల్లి గ్రామం, సోమాల మండలం\nఅన్నమయ్య జిల్లా, ఆంధ్రప్రదేశ్ 517257", followTitle: "అనుసరించండి" },
    footer: { tagline: "స్వచ్ఛమైన రుచి. సహజ వ్యవసాయం.", loc: "ఆంధ్రప్రదేశ్, భారతదేశం" },
  },
  kn: {
    nav: { home: "ಮನೆ", chickens: "ನಾಟು ಕೋಡಿ", farm: "ನಮ್ಮ ಫಾರ್ಮ್", buy: "ಖರೀದಿ", visit: "ಫಾರ್ಮ್ ಭೇಟಿ", franchise: "ಫ್ರಾಂಚೈಸ್", whyUs: "ನಾವೇಕೆ", contact: "ಸಂಪರ್ಕ" },
    hero: {
      badge: "ಶುದ್ಧ ನಾಟು ಕೋಡಿ · ಸ್ವಾಭಾವಿಕವಾಗಿ ಸಾಕಿದ",
      title1: "SR ನಾಟು ಕೋಡಿ",
      title2: "ಫಾರ್ಮ್ಸ್",
      sub: "ಶುದ್ಧ ನಾಟು ಕೋಡಿ\nಸ್ವಾಭಾವಿಕವಾಗಿ ಸಾಕಿದ",
      tag: "ಸಾಂಪ್ರದಾಯಿಕ ರುಚಿ  |  ನೈಸರ್ಗಿಕ ಕೃಷಿ  |  ಫಾರ್ಮ್ ತಾಜಾ",
      desc: "ನೈಸರ್ಗಿಕ ಆಹಾರ, ತಾಜಾ ನೀರು, ಮುಕ್ತ ಓಡಾಟ, ಆರೋಗ್ಯಕರ ವಾತಾವರಣ ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಕೃಷಿ ವಿಧಾನಗಳೊಂದಿಗೆ ಬೆಳೆಸಿದ ನಿಜವಾದ ನಾಟು ಕೋಡಿ.",
      btnView: "ನಾಟು ಕೋಡಿ ನೋಡಿ",
      btnBook: "ಫಾರ್ಮ್ ಭೇಟಿ ಬುಕ್",
      btnCall: "ಈಗ ಕಾಲ್ ಮಾಡಿ",
      btnWA: "ವಾಟ್ಸ್‌ಆ್ಯಪ್",
      raisedWith: "ನೈಸರ್ಗಿಕ ಸಾಕಣೆ ವಿಧಾನಗಳು:",
    },
    features: [{ title: "ನೈಸರ್ಗಿಕ ಆಹಾರ", desc: "ಧಾನ್ಯ ಮತ್ತು ಸೊಪ್ಪು" }, { title: "ತಾಜಾ ನೀರು", desc: "ಶುದ್ಧ ನೀರು" }, { title: "ಮುಕ್ತ ಓಡಾಟ", desc: "ತೆರೆದ ಮೇವು" }, { title: "ಹಾರ್ಮೋನ್ ಇಲ್ಲ", desc: "ಕೃತಕ ವಿಧಾನ ಇಲ್ಲ" }, { title: "ಸಾಂಪ್ರದಾಯಿಕ", desc: "ಅಸಲು ಕೃಷಿ" }],
    story: { eyebrow: "ನಮ್ಮ ಕಥೆ", title: "SR ನಾಟು ಕೋಡಿ ಫಾರ್ಮ್ಸ್ ಏಕೆ?", desc: "ಪ್ರಕೃತಿ ಸೂಚಿಸಿದಂತೆ ನಾಟು ಕೋಡಿ ಸಾಕುತ್ತೇವೆ — ಮುಕ್ತ ಆಕಾಶದಡಿ, ನೈಸರ್ಗಿಕ ಆಹಾರ, ನಿಧಾನ ಬೆಳವಣಿಗೆ.", points: ["ತೆರೆದ ಮೇವಿನಲ್ಲಿ ನೈಸರ್ಗಿಕ ಸಾಕಣೆ", "ತೆರೆದ ಆಕಾಶದಡಿ ಮುಕ್ತ ಚಲನೆ", "ಸಾಂಪ್ರದಾಯಿಕ ಆಹಾರ ಅಭ್ಯಾಸ", "ಕೃತಕ ಹಾರ್ಮೋನ್ ಇಲ್ಲ", "ತಾಜಾ ಮತ್ತು ಆರೋಗ್ಯಕರ ನಾಟು ಕೋಡಿ", "ನೇರ ಫಾರ್ಮ್-ಗ್ರಾಹಕ ಅನುಭವ"], quote: "ಹಳ್ಳಿ ರುಚಿ, ನಿಮ್ಮ ಮನೆಗೆ." },
    products: { eyebrow: "ನಮ್ಮ ಸಂಗ್ರಹ", title: "ನಾಟು ಕೋಡಿ ಸಂಗ್ರಹ", desc: "ಫಾರ್ಮ್ ಭೇಟಿ ಮಾಡಿ, ಪಕ್ಷಿ ಆರಿಸಿ, ನೇರ ತೂಕ ಮಾಡಿ." },
    visitCta: { eyebrow: "ಫಾರ್ಮ್ ಭೇಟಿ", title: "ನೀವೇ ಬಂದು ನೋಡಿ", desc: "ಉಚಿತ ಫಾರ್ಮ್ ಭೇಟಿ ಬುಕ್ ಮಾಡಿ. ಮುಂಗಡ ಪಾವತಿ ಬೇಡ.", btn: "ಫಾರ್ಮ್ ಭೇಟಿ ಬುಕ್", note: "ಉಚಿತ ಭೇಟಿ · ಮುಂಗಡ ಪಾವತಿ ಇಲ್ಲ · ನೇರ ತೂಕ" },
    trust: { eyebrow: "ನಮ್ಮ ಭರವಸೆ", title: "ನಮ್ಮ ಫಾರ್ಮ್‌ನಿಂದ\nನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೆ", points: [{ title: "ಗುಣಮಟ್ಟ", desc: "ಪ್ರತಿ ಪಕ್ಷಿ ಅತ್ಯುನ್ನತ ನೈಸರ್ಗಿಕ ಮಾನದಂಡದಲ್ಲಿ." }, { title: "ವಿಶ್ವಾಸ", desc: "ಪಾರದರ್ಶಕ ಬೆಲೆ — ನೇರ ತೂಕ, ನೋಡಿದ್ದಕ್ಕೆ ಪಾವತಿ." }, { title: "ಪಾರದರ್ಶಕತೆ", desc: "ಫಾರ್ಮ್ ಭೇಟಿ, ಪಕ್ಷಿ ಆರಿಸಿ, ಪಾವತಿ ಮೊದಲು ಎಲ್ಲ ನೋಡಿ." }, { title: "ನೈಸರ್ಗಿಕ ಕೃಷಿ", desc: "ಯಾವುದೇ ಹಾರ್ಮೋನ್ ಇಲ್ಲ — ಪ್ರಾಮಾಣಿಕ ಕೋಳಿ." }] },
    franchise: { eyebrow: "ವ್ಯಾಪಾರ ಅವಕಾಶ", title: "SR ನಾಟು ಕೋಡಿ\nಫ್ರಾಂಚೈಸ್ ಪ್ರಾರಂಭಿಸಿ", desc: "ನಾಟು ಕೋಡಿ ಪಕ್ಷಿಗಳು ಮತ್ತು ಮೊಟ್ಟೆಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಸ್ವಂತ ವ್ಯಾಪಾರ ನಿರ್ಮಿಸಿ.", supplyTitle: "ನಾವು ಒದಗಿಸುವುದು:", supply: ["ಶುದ್ಧ ನಾಟು ಕೋಡಿ ಪಕ್ಷಿಗಳು", "ತಾಜಾ ಮೊಟ್ಟೆಗಳು", "ಗುಣಮಟ್ಟದ ಉತ್ಪನ್ನಗಳು", "ವ್ಯಾಪಾರ ಮಾರ್ಗದರ್ಶನ"], options: [{ n: "01", title: "ನಾಟು ಕೋಡಿ ಪಕ್ಷಿ ಫ್ರಾಂಚೈಸ್", desc: "ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ನಾಟು ಕೋಡಿ ಮಾರಿ." }, { n: "02", title: "ಮಾಂಸ & ಮೊಟ್ಟೆ ಫ್ರಾಂಚೈಸ್", desc: "ತಾಜಾ ಮಾಂಸ ಮತ್ತು ಮೊಟ್ಟೆ ಅಂಗಡಿ." }, { n: "03", title: "ರಿಟೇಲ್ ಔಟ್‌ಲೆಟ್ ಫ್ರಾಂಚೈಸ್", desc: "SR ಬ್ರಾಂಡ್ ರಿಟೇಲ್ ಸ್ಟೋರ್ ನಡೆಸಿ." }, { n: "04", title: "ನಿಮ್ಮ ಸ್ವಂತ ಉದ್ಯಮ", desc: "ತರಬೇತಿ ಮತ್ತು ಬೆಂಬಲದೊಂದಿಗೆ ಪೂರ್ಣ ವ್ಯಾಪಾರ." }], btn: "ಫ್ರಾಂಚೈಸ್‌ಗೆ ಅರ್ಜಿ", btnNote: "ವಾಟ್ಸ್‌ಆ್ಯಪ್ ಮೂಲಕ" },
    contact: { eyebrow: "ಸಂಪರ್ಕಿಸಿ", title: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ", callTitle: "ಕಾಲ್ / ವಾಟ್ಸ್‌ಆ್ಯಪ್", emailTitle: "ಇಮೇಲ್", locTitle: "ಸ್ಥಳ", loc: "S. ನಾದಿಂಪಲ್ಲಿ ಗ್ರಾಮ, ಸೋಮಾಲ ಮಂಡಲ\nಅನ್ನಮಯ್ಯ ಜಿಲ್ಲೆ, ಆಂಧ್ರಪ್ರದೇಶ 517257", followTitle: "ಅನುಸರಿಸಿ" },
    footer: { tagline: "ಶುದ್ಧ ರುಚಿ. ನೈಸರ್ಗಿಕ ಕೃಷಿ.", loc: "ಆಂಧ್ರಪ್ರದೇಶ, ಭಾರತ" },
  },
  ta: {
    nav: { home: "முகப்பு", chickens: "நாட்டு கோடி", farm: "எங்கள் பண்ணை", buy: "வாங்குவது", visit: "பண்ணை பார்வை", franchise: "உரிமை", whyUs: "ஏன் நாங்கள்", contact: "தொடர்பு" },
    hero: {
      badge: "தூய நாட்டு கோடி · இயற்கையாக வளர்க்கப்பட்டது",
      title1: "SR நாட்டு கோடி",
      title2: "ஃபார்ம்ஸ்",
      sub: "தூய நாட்டு கோடி\nஇயற்கையாக வளர்க்கப்பட்டது",
      tag: "பாரம்பரிய சுவை  |  இயற்கை விவசாயம்  |  பண்ணை புதியது",
      desc: "இயற்கை உணவு, சுத்தமான நீர், சுதந்திர ஓட்டம், ஆரோக்கியமான சூழல் மற்றும் பாரம்பரிய விவசாய முறைகளுடன் வளர்க்கப்பட்ட நாட்டு கோடி.",
      btnView: "நாட்டு கோடி பார்க்க",
      btnBook: "பண்ணை பார்வை முன்பதிவு",
      btnCall: "இப்போது அழைக்கவும்",
      btnWA: "வாட்ஸ்அப்",
      raisedWith: "இயற்கை வளர்ப்பு முறைகள்:",
    },
    features: [{ title: "இயற்கை உணவு", desc: "தானியங்கள் & கீரை" }, { title: "சுத்த நீர்", desc: "தூய நீர்" }, { title: "சுதந்திர ஓட்டம்", desc: "திறந்த மேய்ச்சல்" }, { title: "ஹார்மோன் இல்லை", desc: "செயற்கை இல்லை" }, { title: "பாரம்பரியம்", desc: "உண்மையான விவசாயம்" }],
    story: { eyebrow: "எங்கள் கதை", title: "SR நாட்டு கோடி ஃபார்ம்ஸ் ஏன்?", desc: "இயற்கை சொல்வதுபோல் நாட்டு கோடி வளர்க்கிறோம் — திறந்த வானத்தின் கீழ் சுதந்திரமாக, இயற்கை உணவு, மெதுவான வளர்ச்சி.", points: ["திறந்த மேய்ச்சலில் இயற்கையாக வளர்க்கப்பட்ட பறவைகள்", "திறந்த வானின் கீழ் சுதந்திர இயக்கம்", "பாரம்பரிய உணவு பழக்கங்கள்", "செயற்கை ஹார்மோன்கள் இல்லை", "புதிய மற்றும் ஆரோக்கியமான நாட்டு கோடி", "நேரடி பண்ணை-வாடிக்கையாளர் அனுபவம்"], quote: "கிராம சுவை, உங்கள் வீட்டிற்கு." },
    products: { eyebrow: "எங்கள் தொகுப்பு", title: "நாட்டு கோடி தொகுப்பு", desc: "பண்ணை பார்வையிட்டு பறவை தேர்ந்தெடுத்து நேரடியாக எடை பாருங்கள்." },
    visitCta: { eyebrow: "பண்ணை பார்வை", title: "நீங்களே வந்து பாருங்கள்", desc: "இலவச பண்ணை பார்வை முன்பதிவு செய்யுங்கள். முன் கட்டணம் இல்லை.", btn: "பண்ணை பார்வை முன்பதிவு", note: "இலவச பார்வை · முன் கட்டணம் இல்லை · நேரடி எடை" },
    trust: { eyebrow: "எங்கள் உறுதிமொழி", title: "எங்கள் பண்ணையிலிருந்து\nஉங்கள் குடும்பத்திற்கு", points: [{ title: "தரம்", desc: "ஒவ்வொரு பறவையும் உயர்ந்த இயற்கை தரத்தில் வளர்க்கப்படுகிறது." }, { title: "நம்பிக்கை", desc: "வெளிப்படையான விலை — நேரடி எடை, பார்த்தது செலுத்துங்கள்." }, { title: "வெளிப்படைத்தன்மை", desc: "பண்ணை பார்வையிட்டு, பறவை தேர்ந்தெடுங்கள், எல்லாவற்றையும் பாருங்கள்." }, { title: "இயற்கை விவசாயம்", desc: "ஹார்மோன்கள் இல்லை — நேர்மையான கோழி வளர்ப்பு." }] },
    franchise: { eyebrow: "வணிக வாய்ப்பு", title: "SR நாட்டு கோடி\nஃபிராஞ்சைஸ் தொடங்குங்கள்", desc: "நாட்டு கோடி பறவைகள் மற்றும் முட்டைகளுடன் உங்கள் சொந்த வணிகம் கட்டமைக்கவும்.", supplyTitle: "நாங்கள் வழங்குவோம்:", supply: ["தூய நாட்டு கோடி பறவைகள்", "புதிய பண்ணை முட்டைகள்", "தரமான தயாரிப்புகள்", "வணிக வழிகாட்டுதல்"], options: [{ n: "01", title: "நாட்டு கோடி பறவை ஃபிராஞ்சைஸ்", desc: "உங்கள் பகுதியில் நாட்டு கோடி விற்கவும்." }, { n: "02", title: "இறைச்சி & முட்டை ஃபிராஞ்சைஸ்", desc: "புதிய இறைச்சி மற்றும் முட்டை சில்லறை கடை." }, { n: "03", title: "சில்லறை விற்பனை ஃபிராஞ்சைஸ்", desc: "SR பிராண்ட் சில்லறை கடை நடத்தவும்." }, { n: "04", title: "உங்கள் சொந்த நிறுவனம்", desc: "பயிற்சி மற்றும் ஆதரவுடன் முழு வணிக அமைப்பு." }], btn: "ஃபிராஞ்சைஸ்க்கு விண்ணப்பிக்கவும்", btnNote: "வாட்ஸ்அப் மூலம் · விரைவான பதில்" },
    contact: { eyebrow: "தொடர்பு", title: "எங்களை தொடர்பு கொள்ளுங்கள்", callTitle: "அழைப்பு / வாட்ஸ்அப்", emailTitle: "மின்னஞ்சல்", locTitle: "இடம்", loc: "S. நாதிம்பல்லி கிராமம், சோமாலா மண்டலம்\nஅன்னமய்யா மாவட்டம், ஆந்திர பிரதேசம் 517257", followTitle: "பின்தொடரவும்" },
    footer: { tagline: "தூய சுவை. இயற்கை விவசாயம்.", loc: "ஆந்திர பிரதேசம், இந்தியா" },
  },
} as const;

export type Translations = typeof T["en"];

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = localStorage.getItem("sr_lang") as Lang | null;
    if (saved && ["en", "te", "kn", "ta"].includes(saved)) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("sr_lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: T[lang] as Translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be inside LanguageProvider");
  return ctx;
}
