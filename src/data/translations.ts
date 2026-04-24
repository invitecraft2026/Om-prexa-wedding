export type Lang = "en" | "gu";

export const translations = {
  en: {
    invite: "You are cordially invited to",
    aSacredUnion: "A Sacred Union",
    dateRange: "May 7 – 9, 2026",
    tapButton: "✦ TAP TO OPEN ✦",
    skip: "Skip →",
    monogram: "O & P",
    brideGroom: "Om & Prexa",
    heroSubtitle: "Two souls, one destiny — bound by love, blessed by the divine.",
    countdownLabel: ["Days", "Hours", "Minutes", "Seconds"],
    scratchHint: "Scratch to reveal the sacred date ✨",
    scratchReveal: "Shubh Lagna",
    scratchDate: "Saturday, 9th May 2026",
    celebrationsTitle: "The Celebrations",
    celebrationsSubtitle: "Three days of joy, ritual and love",
    day1: "Thursday, May 7",
    day2: "Friday, May 8",
    day3: "Saturday, May 9",
    day3Sub: "Wedding Day",
    galleryTitle: "Moments",
    gallerySubtitle: "Glimpses of our journey",
    venuesTitle: "Sacred Venues",
    mainVenueBadge: "Main Venue",
    directionsBtn: "📍 Get Directions",
    closing: "With love and blessings, we await your presence",
    samvat: "Vikram Samvat 2082",
    lang: "EN",
    timeLabel: "Time",
    eventLabel: "Event",
    locationLabel: "Location",
  },
  gu: {
    invite: "આપને સાદર આમંત્રણ છે",
    aSacredUnion: "પવિત્ર સંગમ",
    dateRange: "૭ – ૯ મે, ૨૦૨૬",
    tapButton: "✦ ખોલવા માટે સ્પર્શ કરો ✦",
    skip: "છોડો →",
    monogram: "ખ ને દે",
    brideGroom: "ઓમ અને પ્રેક્સા",
    heroSubtitle: "બે આત્મા, એક ભાગ્ય — પ્રેમ અને ઈશ્વરના આશીર્વાદથી બંધાયેલ.",
    countdownLabel: ["દિવસ", "કલાક", "મિનિટ", "સેકન્ડ"],
    scratchHint: "પવિત્ર તારીખ જાણવા માટે ઘસો ✨",
    scratchReveal: "શુભ લગ્ન",
    scratchDate: "શનિવાર, ૯ મે ૨૦૨૬",
    celebrationsTitle: "ઉત્સવ",
    celebrationsSubtitle: "ત્રણ દિવસનો આનંદ, વિધિ અને પ્રેમ",
    day1: "ગુરુવાર, ૭ મે",
    day2: "શુક્રવાર, ૮ મે",
    day3: "શનિવાર, ૯ મે",
    day3Sub: "લગ્ન દિવસ",
    galleryTitle: "પળો",
    gallerySubtitle: "અમારી સફરની ઝલક",
    venuesTitle: "પવિત્ર સ્થળો",
    mainVenueBadge: "મુખ્ય સ્થળ",
    directionsBtn: "📍 દિશા મેળવો",
    closing: "પ્રેમ અને આશીર્વાદ સહ, અમે આપની ઉપસ્થિતિની પ્રતીક્ષા કરીએ છીએ",
    samvat: "વિક્રમ સંવત ૨૦૮૨",
    lang: "ગુ",
    timeLabel: "સમય",
    eventLabel: "પ્રસંગ",
    locationLabel: "સ્થળ",
  },
} as const;

export type Translation = (typeof translations)[Lang];

export const schedule: Record<
  "day1" | "day2" | "day3",
  { time: string; en: string; gu: string; locEn: string; locGu: string }[]
> = {
  day1: [
    { time: "09:00 AM", en: "Ganesh Sthapana", gu: "ગણેશ સ્થાપના", locEn: "Family Residence", locGu: "નિવાસસ્થાન" },
    { time: "09:30 AM", en: "Mataji ni Puja", gu: "માતાજી ની પૂજા ", locEn: "Family Residence", locGu: "નિવાસસ્થાન" },
    { time: "10:00 AM", en: "Mandap Muhurt", gu: "મંડપ મુહૂર્ત", locEn: "Family Residence", locGu: "નિવાસસ્થાન" },
    { time: "12:00 PM", en: "Lunch", gu: "ભોજન", locEn: "Janorvadi", locGu: "જનોરવાડી" },
    { time: "05:00 PM", en: "Haldi Ceremony", gu: "હલદી વિધિ", locEn: "Milan party plot", locGu: "મિલન પાર્ટી પ્લોટ" },
    { time: "06:30 PM", en: "Mameru", gu: "મામેરુ", locEn: "Milan party plot", locGu: "મિલન પાર્ટી પ્લોટ" },
    { time: "07:00 PM", en: "Dinner", gu: "રાત્રિભોજન", locEn: "Milan Party Plot", locGu: "મિલન પાર્ટી પ્લોટ" },
    { time: "09:30 PM", en: "Raas Garba", gu: "રાસ ગરબા", locEn: "Milan Party Plot", locGu: "મિલન પાર્ટી પ્લોટ" },
  ],
  day2: [
    { time: "09:00 AM", en: "Grah Shanti", gu: "ગ્રહ શાંતિ", locEn: "Family Residence", locGu: "નિવાસસ્થાન" },
    { time: "12:00 PM", en: "Lunch", gu: "ભોજન", locEn: "Janorvadi", locGu: "જનોરવાડી" },
    { time: "07:00 PM", en: "Dinner", gu: "રાત્રિભોજન", locEn: "Janorvadi", locGu: "જનોરવાડી" },
    { time: "08:00 PM", en: "Jaan Prasthan", gu: "જાન પ્રસ્થાન", locEn: "From Residence to Morbi", locGu: "નિવાસસ્થાનથી મોરબી" },
  ],
  day3: [
    {
      time: "12:30 PM",
      en: "Wedding Ceremony",
      gu: "લગ્ન વિધિ",
      locEn: "Radhe Marriage Hall, Canal Road, Morbi",
      locGu: "રાધે મેરેજ હોલ, કેનાલ રોડ, મોરબી",
    },
  ],
};

export const venues = [
  {
    nameEn: "Milan Party Plot",
    nameGu: "મિલન પાર્ટી પ્લોટ",
    addressEn: "Near Airport Circle, New VIP Road, Vadodara",
    addressGu: "એરપોર્ટ સર્કલ પાસે, ન્યૂ VIP રોડ, વડોદરા",
    eventsEn: "Dinner & Raas Garba — Day 1",
    eventsGu: "રાત્રિભોજન અને રાસ ગરબા — દિવસ ૧",
    mapsQuery: "Milan Party Plot, New VIP Road, Vadodara",
    featured: false,
    mapsLink:
      "https://www.google.com/maps/search/?api=1&query=Milan+Party+Plot+New+VIP+Road+Vadodara",
  },
  {
    nameEn: "Janorvadi",
    nameGu: "જનોરવાડી",
    addressEn: "Vadodara",
    addressGu: "વડોદરા",
    eventsEn: "Lunch & Dinner — Days 1 & 2",
    eventsGu: "ભોજન અને રાત્રિભોજન — દિવસ ૧ અને ૨",
    mapsQuery: "Janorvadi, Vadodara",
    featured: false,
    mapsLink:
      "https://maps.app.goo.gl/MLCSTcNRXv9vCZ5r7",
  },
  {
    nameEn: "Family Residence",
    nameGu: "કુટુંબ નિવાસ",
    addressEn:
      "C-236, Nathiba Nagar-2, Revadiya Duplex, Harni Road, Vadodara - 390022",
    addressGu:
      "સી-૨૩૬, નાથિબા નગર-૨, રેવાડિયા ડુપ્લેક્સ, હર્ણી રોડ, વડોદરા - ૩૯૦૦૨૨",
    eventsEn: "Family Residence & Guest Welcome",
    eventsGu: "કુટુંબ નિવાસ અને મહેમાન સ્વાગત",
    mapsQuery:
      "C-236 Nathiba Nagar-2 Revadiya Duplex Harni Road Vadodara 390022",
    featured: false,
    mapsLink:
      "https://maps.app.goo.gl/7QYBAyYhoPKdjV3CA",
  },
  {
    nameEn: "Radhe Marriage Hall",
    nameGu: "રાધે મેરેજ હોલ",
    addressEn: "Canal Road, Morbi",
    addressGu: "કેનાલ રોડ, મોરબી",
    eventsEn: "Wedding Ceremony — Main Event",
    eventsGu: "લગ્ન વિધિ — મુખ્ય પ્રસંગ",
    mapsQuery: "Radhe Marriage Hall, Canal Road, Morbi",
    featured: true,
    mapsLink:
      "https://www.google.com/maps/search/?api=1&query=Radhe+Marriage+Hall+Canal+Road+Morbi",
  },
];