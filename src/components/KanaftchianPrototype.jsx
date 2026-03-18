import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ════════════════════════════════════════════════════════════════
// KANAFTCHIAN.COM — ULTRA PREMIUM PROTOTYPE v2
// Multi-page · Cinematic Dark · Real Photos · Exact Slugs
// ════════════════════════════════════════════════════════════════

// ─── CDN Helper ─────────────────────────────────────────────
const CDN = "https://images.squarespace-cdn.com/content/v1/56ae587e60b5e9e25fc8f373";
const img = (id, fmt = "1000w") => `${CDN}/${id}?format=${fmt}`;

// ─── Image Database (real photos from kanaftchian.com) ──────
const IMAGES = {
  // Homepage hero background
  heroBg: `${CDN}/6e16dcb5-0a07-437c-8ee3-57b62a0b55df/photographe-bruxelles-shooting-photo-studio-corporate-evennementiel-mariage-belgique-2026.webp?format=2500w`,
  // Logos
  logoIcon: img("7b305682-8c58-4429-ac33-a7d6f0452df2/logo-hani-kanaftchian-header-optimized+%282%29.webp", "300w"),
  logo: img("a1eeb20c-f08c-4c35-b441-47f85e112f84/logo-banner-hani-kanaftchian.png", "500w"),
  logoBanner: img("a1eeb20c-f08c-4c35-b441-47f85e112f84/logo-banner-hani-kanaftchian.png", "1000w"),
  favicon: img("940294d1-d35c-4b59-9bd2-ad54b8019d02/favicon.ico", "100w"),
  // About
  aboutHero: img("ddc97ff2-1c9e-4cb1-82ca-6eff72b25f7e/hani-kanaftchian-a-propos-hero-1920.webp", "1500w"),
  aboutPortrait: img("6e0abe9b-13d9-4469-8999-2deb71bd73c2/hani-kanaftchian-bruxelles-portrait-professionnel-1280.webp", "1000w"),
  haniDetoured: img("57aa1bf5-a2f2-4955-b02e-ce1bd0eb35eb/portrait-photographe-bruxelles-hani-kanaftchian-de%CC%81toure%CC%81-2.png", "500w"),
  // Clients/Partners
  partners: img("d0072901-7c9d-4114-82e6-e9c6123904e5/partenaires-clients-photographe-professionnel-bruxelles_resultat-72.webp", "1440w"),
  // Studio
  studioMain: img("fb5bc9fb-2157-45db-8e18-c4844cda3da7/location-studio-light-corporate-brussels-leuven-belgium.jpg", "1500w"),
  studio: Array.from({length: 8}, (_, i) => img(`${["1629311461569-VBSXLENFDFQNT596PGOT/Hani+Kanaftchian+1.jpg","1629311461543-QW9HXZJUW686GX7APASQ/Hani+Kanaftchian+2.jpg","1629311463306-UUFUUGRAJ3HSGDRKB4R8/Hani+Kanaftchian+3.jpg","1629311463542-DZC9CKA0CMNEZ51X8LJB/Hani+Kanaftchian+4.jpg","1629311464988-L90589RQPYM7HIOFUV3E/Hani+Kanaftchian+5.jpg","1629311465356-0WF0MJZ29HZBYG7NZUCE/Hani+Kanaftchian+6.jpg","1629311466505-S2YXWN13PG2XC2HF6XWI/Hani+Kanaftchian+7.jpg","1629311467131-45Z328SI84SUB9CYE8NW/Hani+Kanaftchian+8.jpg"][i]}`, "800w")),
  // Portrait photos (selection)
  portrait: [
    img("0770f784-3001-4b2e-85e7-a40ba26bceb5/Hani+Kanaftchian+4.jpg", "800w"),
    img("2a616c6c-7069-4cc7-92dd-5b736f9f7617/Hani+Kanaftchian+5.jpg", "800w"),
    img("3dd4f2b2-11a0-44fc-ba47-4a50d619b3b0/Hani+Kanaftchian+6.jpg", "800w"),
    img("0aa6823c-dbb0-45d9-a09d-fdcbe1cf01dd/Hani+Kanaftchian+9.jpg", "800w"),
    img("3a199116-e367-48c6-81b3-6a3a5d755a24/Hani+Kanaftchian+10.jpg", "800w"),
    img("ab479d3e-4cd0-40d5-94a0-d3ec549809e2/Hani+Kanaftchian+13.jpg", "800w"),
    img("a7a98476-c5f9-4772-9ef0-7bdcf8278b27/Hani+Kanaftchian+15.jpg", "800w"),
    img("c4c98e7f-c33a-4be7-bb46-0c963e911e05/Hani+Kanaftchian+16.jpg", "800w"),
    img("ef86511e-770d-41cf-8be5-7362b1a77a1d/Hani+Kanaftchian+17.jpg", "800w"),
    img("7fa39f4c-75c4-4575-b9c2-6795f341233e/Hani+Kanaftchian+18.jpg", "800w"),
    img("157dbf9d-eaa5-467a-ba2b-4dc0e66a9bb9/Hani+Kanaftchian+19.jpg", "800w"),
    img("f0da2510-298d-4633-a28b-e8debfb735a0/Hani+Kanaftchian+20.jpg", "800w"),
    img("c324b061-5d0a-47eb-b110-d0f4f43c1a63/Hani+Kanaftchian+21.jpg", "800w"),
    img("c966f826-1402-465f-8e8b-8381131c5892/Hani+Kanaftchian+22.jpg", "800w"),
    img("1518440175481-4GMG0Y1FOUTEPO6ZVSNR/portrait-femme.jpg", "800w"),
    img("1518440173491-C8T1KLNZ5601WTQ7KLV1/portrait-beaute.jpg", "800w"),
    img("1535299717137-M2966YYUTGOPDUUTR2BA/Hani+Kanaftchian+53.jpg", "800w"),
    img("1518440158036-8HPOAZABTPYFTN8W8EDU/jean-claude-van-damme.jpg", "800w"),
    img("1518440196590-IN2ZW4GSDE10MX0OH0WJ/rim-k-enfant-soldat.jpg", "800w"),
    img("1518440171533-6VHM4TT15E1VW175W8KR/seance-photo-homme-bruxelles.jpg", "800w"),
  ],
  // Mariage photos (selection)
  mariage: [
    img("1462619502475-NM7GFK04K1XT441IN5UU/photographe-mariage-bruxelles.jpg", "1200w"),
    img("1540545287485-3KDQ8XN37RUB29ZOFZ5B/Hani+Kanaftchian+177.jpg", "800w"),
    img("1540545467524-MA495CP5F0CB2RM9T1NM/Hani+Kanaftchian+21.jpg", "800w"),
    img("1540544945838-ZRC5LF3GUFNYNJFKL9Q6/Hani+Kanaftchian+355.jpg", "800w"),
    img("1518439547695-7ZFWJQOTIK80NQFC1E3Q/couple-en-voiture.jpg", "800w"),
    img("1518439552039-HO1X2PEI51C1MRPV6GWW/baiser-coucher-de-soleil.jpg", "800w"),
    img("1518443069380-VL909L802378A2XUS7XM/photo-robe-de-mariee.jpg", "800w"),
    img("1518443064837-U7ITUZ0I8UQ7MPG97KR5/preparatifs-make-up.jpg", "800w"),
    img("1518439569982-718ON7GOWANUA619NBKW/couple-ciel-etoile.jpg", "800w"),
    img("1518439565955-A7ZCXGOGGD4J0H4Q1DXE/bride-light.jpg", "800w"),
    img("1518439611457-3INFGW8R4D8AVUROGZKJ/just-married.jpg", "800w"),
    img("1540545935633-JBYB5JV0Y31ET2H3YS46/wed-vegas.jpg", "800w"),
    img("1518439567962-IDEEBA4XGUSOR3B7WVAT/couple-seance-photo.jpg", "800w"),
    img("1518439597381-KY5272JA2RXOYBIBP8Y0/couple-mariage-bibliothe%CC%80que.jpg", "800w"),
    img("1518439625358-LOM2DHIGSV6MGZPIV6DZ/mariage-ballade.jpg", "800w"),
    img("1518439584777-RHXDNCX0R78OTOLYTMQV/alliances.jpg", "800w"),
  ],
  // More portrait page originals
  portraitPage: [
    img("1471090440503-GL0NM4YFICQ2QQ6NZMN4/portrait-femme-reflet.jpg", "1200w"),
    img("1535300105928-F5T5MK48N32JF274Y17M/Tiziana+DG2.jpg", "800w"),
    img("1535301593411-BHH00YI1ML412A8SPI1V/photoshoot-pro-bruxelles.jpg", "800w"),
    img("1518440214943-6LGPG5RR2NDUL0TTNR97/shooting-exterieur-naturel.jpg", "800w"),
    img("1518440181890-3BITZ2L7LP8024TVPNMB/seance-photo-a-la-mer.jpg", "800w"),
    img("1518440184015-K7M5HPYI2PMNOBL38BUS/couple-photo.jpg", "800w"),
    img("1518440209663-Y183E3AEMV8INB3ATHZY/shooting-fashion-girl-and-the-city-2.jpg", "800w"),
    img("1518440218712-TS7VQM2A0FS4SM3ZAJZU/seance-photo-de-famille.jpg", "800w"),
    img("1518440192328-6CD7AXDXEB6PO9YM0Q1G/photo-shoot-brussels.jpg", "800w"),
    img("1518440181630-2N7KPNXLT5TAMUKWXJV3/seance-photo-portrait-femme.jpg", "800w"),
    img("1518440179502-8CLXC8QU0622TUBKESEC/femme-sexy.jpg", "800w"),
    img("1518440200295-A9QOV0PHMQDJK3HRALK0/portrait-reflection.jpg", "800w"),
    img("1518440194658-G5E65AHV71C6KRNFAEUC/shooting-photo-modele.jpg", "800w"),
    img("1518440159812-QE6CUCOY0UEHM6CI8LP2/street-photography.jpg", "800w"),
    img("1518440162723-KPFFZP72JN1GKPNRCIQR/model-homme-coucher-de-soleil.jpg", "800w"),
    img("1518440165571-128QUC9WH4HPX8DNNLEN/male-model.jpg", "800w"),
    img("1518440166493-P0HGXSMWI7QJWBP2TK4E/model-homme.jpg", "800w"),
    img("1518440168751-HC1D6KOQSWG8VZXTENJY/seance-photo-saut.jpg", "800w"),
    img("1518440171006-A7UZ402EHEXGKWKLYPDB/portrait-enfant.jpg", "800w"),
    img("1518440174943-GCG6M2A85TYD6CNEEY66/portrait-femme-beaute.jpg", "800w"),
    img("1518440186140-QQP94L59DGPQHO1AXK87/homme-africain.jpg", "800w"),
    img("1518440189902-QN2FIZ46UNEMUTS5YN1X/noir-et-blanc-portrait.jpg", "800w"),
    img("1518440196453-FICJU1HOQ27SF4POQVDJ/photo-portrait.jpg", "800w"),
    img("1518440202073-KSBKSNU60EYQD147JLKA/seance-photo-enfant-naturel-3.jpg", "800w"),
    img("1518440205412-I1B9K7LUFNPWRJ0X2AK9/photo-de-couple-bois.jpg", "800w"),
    img("1518440210970-RBG7OW1RZVJFY6VLBQ8I/seance-photo-couple.jpg", "800w"),
    img("1518440213026-L479EZZNZEJSDLJA6O6H/shooting-fashion-girl-and-the-city.jpg", "800w"),
    img("1518440219521-Z67EB59ZEUSJNJ66UMY7/seance-photo-famille.jpg", "800w"),
  ],
  // Grossesse (18 photos)
  grossesse: [
    img("1535300836500-27IOQSAH3HVBVI0T3KND/grossesse-focus-ventre.jpg", "800w"),
    img("1518439972032-ZA0GVW7I5XMA4JD14X6G/seance-photo-naissance.jpg", "800w"),
    img("1491399748999-KGSO63I5M3KHVJ5GWAAO/seance-photo-grossesse-original.jpg", "800w"),
    img("1491399724700-Y2PIZXBJW3OB5LHGM6Q0/seance-photo-studio-bebe.jpg", "800w"),
    img("1491399725515-RPZJLS1FZQW03U5U1M9W/seance-photo-bebe.jpg", "800w"),
    img("1491399728159-E4ZSHGY3ETBYOK9PV9W3/petit-frere-grand-frere.jpg", "800w"),
    img("1491399728324-WRY4IY5XFW6Y8KLNJ6RT/grossesse-focus-ventre.jpg", "800w"),
    img("1491399732199-PO5WJXVPHHD8D2HKWCJR/grossesse-ventre-couple.jpg", "800w"),
    img("1491399732018-3IXPXRLQOP6Q87YGA5M9/photo-de-famille-grossesse.jpg", "800w"),
    img("1491399735590-2P191I98CZMK5UBTAZOW/seance-photo-grossesse-maman.jpg", "800w"),
    img("1491399735460-WDRDJOLIJ5GK3ROTUOWB/Shooting-grossesse-femme-seule.jpg", "800w"),
    img("1491399738761-L4CXTOV8Z2HFLMTD52VP/seance-photo-couple-grossesse.jpg", "800w"),
    img("1491399739464-VXW0622BE0WL2SB3F3OX/seance-photo-grossesse-details.jpg", "800w"),
    img("1491399741174-DVXL80JGPGUWL6017Y37/shooting-grossesse-ombre-chinoise.jpg", "800w"),
    img("1491399743374-XSMRJGKTUCFYP30JBNBX/seance-photo-grossesse.jpg", "800w"),
    img("1491399743189-81NV14R7B8DYDXTAT6XI/chaussures-bebe.jpg", "800w"),
    img("1491399749030-HBB026KQZO1E7TV1H9NM/shooting-grossesse-couple-2.jpg", "800w"),
    img("1491399750271-43S926OX0HQRJ1VFND4F/seance-photo-couple-grossesse-2.jpg", "800w"),
  ],
  // Paysages (54 photos — sélection de 24)
  paysages: [
    img("1fb8e1ae-b160-4112-a195-ca1528a42b14/Night-Skyline-2-imgg-gi3-fcrs8s6s.png", "1200w"),
    img("1518440027913-QMCBWHSLUYGZFQDEPLV7/tour-de-refroidissement-de-charleroi.jpg", "800w"),
    img("1491399428656-DBD23DL1DN1UPRZX40O4/death-valley.jpg", "800w"),
    img("1491399432890-B35WV8O6L684T7DKFQNI/port-d-anvers.jpg", "800w"),
    img("1491399433297-7LVCYAT3KVE0DITA4MZM/rabat-maroc-port.jpg", "800w"),
    img("1491399424688-AEFHU4P3O6J90W6RYKTX/koh-phangan-thailande.jpg", "800w"),
    img("1491399436373-HJYBKFJOER54K0N08ZQ7/langroud-iran-pole-kheshti.jpg", "800w"),
    img("1491399436662-C7JLGM62AAEU2LNHL6N4/cinquantenaire+german+unification.jpg", "800w"),
    img("1491399444371-FR4QSL08INE9HQMZ7BSQ/feux+d%27artifice.jpg", "800w"),
    img("1491399449615-NIJ0K4JJRV4MBE36OBT3/sunset+belgium.jpg", "800w"),
    img("1491399452722-YFJ7KRX9IRELPQPRXOQS/hallerbos.jpg", "800w"),
    img("1491399453468-KORQ16TYTE9VIOMHCX3W/hinterglemm-autriche.jpg", "800w"),
    img("1491399468600-NMXN1DCD651ZYBJKBZ3Q/Las+Vegas.jpg", "800w"),
    img("1491399469786-LJO27KHZVY6OSPTXPQKX/grand-canyon-arizona.jpg", "800w"),
    img("1491399472503-VLN89WWKLJCYTOJH5IXI/road-66-arizona.jpg", "800w"),
    img("1491399473142-YK29FRXCBPWO032A87Q3/malibu-los-angeles.jpg", "800w"),
    img("1491399477417-9G5L04TL3MDAPZAP0E60/dubai-view-5.jpg", "800w"),
    img("1491399481057-JDN6BCOXSUIXAL2GEMVF/dubai-view-4.jpg", "800w"),
    img("1491399486012-G9RGZ4SNYF86NRAPY63O/dubai-view.jpg", "800w"),
    img("1491399490191-KAFOKC798FAAH113HIAK/dubai-burj-khalifa.jpg", "800w"),
    img("1491399497257-YNGH3AEHIHM2YI9YQSHF/seychelles-plage-beach-2.jpg", "800w"),
    img("1491399504314-P4VNYSZJSWMHS1GC4H7T/seychelles-sunset.jpg", "800w"),
    img("1491399520558-FNPNXVJTE7096DJVU1T3/atomium-brussels.jpg", "800w"),
    img("1491399522636-7ONO2DWTNLPWAXPN8X42/grand-place-tapis-de-fleur.jpg", "800w"),
  ],
  // Studio portfolio (85 photos — sélection de 20)
  studioPortfolio: [
    img("1737837479707-MV34G0RKBDMYOLDHJKIM/seance-photo-studio-bruxelles.jpg", "1200w"),
    img("1548543591212-K4LLMZO7NYYZ4CERXKC9/Hani+Kanaftchian+1.jpg", "800w"),
    img("1548543580781-CLOIMDPG30BEEYVDW4YW/Hani+Kanaftchian+3.jpg", "800w"),
    img("1548543863420-ZO264W5S9KSWCKBDW60Q/Hani+Kanaftchian+41.jpg", "800w"),
    img("1548543882881-RJ13KCUWTWASTVHO4RI7/Hani+Kanaftchian+33.jpg", "800w"),
    img("1548543760984-EHJ5KGC84HS4A3MJ9KDS/Hani+Kanaftchian+37.jpg", "800w"),
    img("1548543853512-QD0UMWVU862URHEE96UR/Hani+Kanaftchian+13.jpg", "800w"),
    img("1548544036062-7B9SAVHLH19RIRLXCKZJ/Hani+Kanaftchian+31.jpg", "800w"),
    img("1540895014809-A9P2UW6XGS2YQ1PJY4HI/Hani+Kanaftchian+5.jpg", "800w"),
    img("1540894978764-N2ISJOBLAMWCBRJ4GSW7/Hani+Kanaftchian+13.jpg", "800w"),
    img("1535300511717-OIB7K0PYN6PJ30RWMJ65/Tiziana+DG1.jpg", "800w"),
    img("1518439755399-NOW43FFSYNQ92JPTFAGQ/seance-photo-studio-bruxelles.jpg", "800w"),
    img("1535298825046-N9TZYHT4U95CHPY9SLYH/Hani+Kanaftchian+31.jpg", "800w"),
    img("1518439768610-Z19QVIZHPEHFC8986EDB/portrait-turban-studio.jpg", "800w"),
    img("1518439776078-GHP9PPLIMY1JTB0XO5LU/portrait-tiziana.jpg", "800w"),
    img("1535298598318-QK100HE9B2AQ2GDTTQH0/Hani+Kanaftchian+41.jpg", "800w"),
    img("1518439752141-L0G31H3ZPIT9EXT5953U/portrait-femme-studio-bruxelles.jpg", "800w"),
    img("1518439770556-K4IVGHW02J8XQ7W5JCB3/danseuse-ballet-seance-photo-studio.jpg", "800w"),
    img("1518439777636-8GWM50H8KA20GUPQRMI8/miss-bruxeles-elisabeth.jpg", "800w"),
    img("1518439790177-IRKZAJRWSLCAL4MJYHB1/shooting-studio-portrait-corporate-business.jpg", "800w"),
  ],
  // Vidéos (Vimeo embeds)
  videos: [
    "https://player.vimeo.com/video/345748295?h=93094b7741",
    "https://player.vimeo.com/video/585373992?h=d1e6663da1",
    "https://player.vimeo.com/video/236737434",
    "https://player.vimeo.com/video/251327047",
  ],
};

// ─── Site Config ────────────────────────────────────────────
const SITE = {
  name: "Kanaftchian",
  tagline: "Ce qui se vit avant ce qui se voit.",
  phone: "+32 485 87 88 42",
  email: "hani@kanaftchian.com",
  address: "Rue Vanderkindere 524, 1180 Bruxelles",
  hours: "Lun–Sam : 9h–18h",
};

// ─── Design Tokens ──────────────────────────────────────────
const C = {
  bg: "#050507", bgAlt: "#0A0A0F", surface: "#111116", surfaceHover: "#18181F",
  border: "#1A1A24", borderLight: "#2A2A38",
  text: "#E8E8F0", textMuted: "#8888A0", textDim: "#55556A",
  accent: "#C8A87C", accentLight: "#E0C9A0", accentDim: "#8B7355",
  white: "#FFFFFF",
};
const F = {
  display: "'Playfair Display', Georgia, serif",
  body: "'Inter', -apple-system, sans-serif",
};

// ─── Routes matching kanaftchian.com exactly ────────────────
const ROUTES = {
  "/": "home",
  "/portrait": "portrait",
  "/mariage": "mariage",
  "/grossesse": "grossesse",
  "/studio": "studioPortfolio",
  "/paysages": "paysages",
  "/videaste-bruxelles": "video",
  "/tarifs-photographe": "tarifs",
  "/studio-photo-bruxelles": "studioPage",
  "/avis-clients-google": "references",
  "/a-propos": "about",
  "/contact": "contact",
  "/reservation-shooting-photo": "reservation",
  "/photos": "photos",
};

const MENU = [
  { label: "Accueil", slug: "/" },
  {
    label: "Portfolio", slug: "/photos", children: [
      { label: "Portrait", slug: "/portrait" },
      { label: "Studio", slug: "/studio" },
      { label: "Mariage", slug: "/mariage" },
      { label: "Grossesse", slug: "/grossesse" },
      { label: "Paysages", slug: "/paysages" },
      { label: "Vidéos", slug: "/videaste-bruxelles" },
    ]
  },
  { label: "Tarifs", slug: "/tarifs-photographe" },
  { label: "Studio", slug: "/studio-photo-bruxelles" },
  { label: "Références", slug: "/avis-clients-google" },
  { label: "À Propos", slug: "/a-propos" },
  { label: "Contact", slug: "/contact" },
];

const SERVICES_LIST = [
  { title: "Mariage", slug: "/mariage", icon: "💍" },
  { title: "Portrait", slug: "/portrait", icon: "📸" },
  { title: "Couple", slug: "/mariage", icon: "💑" },
  { title: "Studio", slug: "/studio", icon: "🎬" },
  { title: "Grossesse", slug: "/grossesse", icon: "🤰" },
  { title: "Photo de famille", slug: "/portrait", icon: "👨‍👩‍👧‍👦" },
  { title: "Évènement", slug: "/photos", icon: "🎉" },
  { title: "Soirée", slug: "/photos", icon: "🌙" },
  { title: "Corporate", slug: "/studio", icon: "🏢" },
  { title: "Photo sportive", slug: "/photos", icon: "⚡" },
  { title: "Immobilier", slug: "/photos", icon: "🏠" },
  { title: "Visite virtuelle", slug: "/photos", icon: "🔄" },
  { title: "Workshop", slug: "/contact", icon: "📚" },
  { title: "Vidéo", slug: "/videaste-bruxelles", icon: "🎥" },
];

const TESTIMONIALS = [
  { text: "C'était une chouette expérience. Le rendu des photos a largement dépassé nos attentes. Il nous a très bien guidés, que ce soit pour les poses ou les regards face à la caméra. Nous referons appel à lui sans hésiter !", author: "Estefane Silva", time: "il y a 4 mois" },
  { text: "Franchement, Hani est un photographe incroyable! Dès qu'on arrive dans son studio, super joli d'ailleurs, on se sent tout de suite à l'aise. Il a su capturer des photos magnifiques de moi, et je me reconnais vraiment dedans.", author: "Amandine Burhin", time: "il y a un an" },
  { text: "Hani est un professionnel talentueux. Il a pris le temps de nous mettre en confiance et de nous donner des conseils. Les photos Haute résolution nous ont été livrées sans délai ! Une excellente adresse.", author: "Bénédicte de Formanoir", time: "" },
  { text: "Un sans faute aussi bien humainement que professionnellement parlant! On sent la passion de la profession à chaque seconde et un très beau résultat! Merci d'avoir créé des souvenirs qui resteront à vie.", author: "Mégane Forner", time: "" },
];

// ════════════════════════════════════════════════════════════════
// HOOKS
// ════════════════════════════════════════════════════════════════

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return y;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ════════════════════════════════════════════════════════════════
// MICRO COMPONENTS
// ════════════════════════════════════════════════════════════════

function FadeIn({ children, delay = 0, y = 40, style = {} }) {
  const [ref, vis] = useInView(0.1);
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily: F.body, fontSize: 11, letterSpacing: 5,
      textTransform: "uppercase", color: C.accent, marginBottom: 20, fontWeight: 500,
    }}>{children}</div>
  );
}

function SectionTitle({ children, style = {} }) {
  return (
    <h2 style={{
      fontFamily: F.display, fontSize: "clamp(32px, 4.5vw, 56px)",
      fontWeight: 300, color: C.text, lineHeight: 1.15, margin: 0, ...style,
    }}>{children}</h2>
  );
}

function Accent({ children }) {
  return <span style={{ fontStyle: "italic", color: C.accent, fontWeight: 400 }}>{children}</span>;
}

function GoldButton({ children, onClick, variant = "filled", style = {} }) {
  const [hov, setHov] = useState(false);
  const filled = variant === "filled";
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        padding: "16px 40px",
        background: filled ? (hov ? C.accentLight : C.accent) : (hov ? C.accent : "transparent"),
        border: filled ? "none" : `1px solid ${hov ? C.accent : C.borderLight}`,
        borderRadius: 0, cursor: "pointer",
        fontFamily: F.body, fontSize: 11, letterSpacing: 3, textTransform: "uppercase",
        color: (filled || hov) ? C.bg : C.textMuted,
        fontWeight: 600, transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
        ...style,
      }}
    >{children}</button>
  );
}

function PhotoCard({ src, alt = "", aspect = "3/4", onClick }) {
  const [hov, setHov] = useState(false);
  const [loaded, setLoaded] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position: "relative", aspectRatio: aspect, overflow: "hidden",
        cursor: onClick ? "pointer" : "default", background: C.surface,
      }}
    >
      <img
        src={src} alt={alt} loading="lazy"
        onLoad={() => setLoaded(true)}
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          transform: hov ? "scale(1.05)" : "scale(1)",
          opacity: loaded ? 1 : 0,
          transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1), opacity 0.6s ease",
        }}
      />
      {/* Shimmer placeholder */}
      {!loaded && (
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(110deg, ${C.surface} 30%, ${C.surfaceHover} 50%, ${C.surface} 70%)`,
          backgroundSize: "200% 100%",
          animation: "shimmer 1.5s infinite",
        }} />
      )}
      {hov && onClick && (
        <div style={{
          position: "absolute", inset: 0,
          background: `${C.bg}60`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "opacity 0.3s",
        }}>
          <div style={{
            width: 50, height: 50, borderRadius: "50%",
            border: `1.5px solid ${C.accent}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: C.accent, fontSize: 20,
          }}>+</div>
        </div>
      )}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// LIGHTBOX
// ════════════════════════════════════════════════════════════════

function Lightbox({ images, index, onClose, onNav }) {
  useEffect(() => {
    const h = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNav(1);
      if (e.key === "ArrowLeft") onNav(-1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, onNav]);

  if (index < 0) return null;

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 10000,
      background: `${C.bg}F5`, backdropFilter: "blur(30px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      animation: "fadeIn 0.3s ease",
    }}>
      <img
        src={images[index]} alt=""
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "85vw", maxHeight: "85vh", objectFit: "contain",
          boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
        }}
      />
      {/* Nav arrows */}
      {[[-1, "←", "left: 20px"], [1, "→", "right: 20px"]].map(([dir, arrow, pos]) => (
        <button
          key={dir}
          onClick={(e) => { e.stopPropagation(); onNav(dir); }}
          style={{
            position: "absolute", top: "50%", transform: "translateY(-50%)",
            [pos.split(":")[0]]: pos.split(":")[1],
            background: `${C.surface}CC`, border: `1px solid ${C.border}`,
            width: 50, height: 50, borderRadius: "50%",
            color: C.text, fontSize: 18, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >{arrow}</button>
      ))}
      {/* Counter */}
      <div style={{
        position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)",
        fontFamily: F.body, fontSize: 13, color: C.textMuted, letterSpacing: 2,
      }}>{index + 1} / {images.length}</div>
      {/* Close */}
      <button onClick={onClose} style={{
        position: "absolute", top: 24, right: 24,
        background: "none", border: "none", color: C.text,
        fontSize: 28, cursor: "pointer", fontWeight: 300,
      }}>✕</button>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════
// NAVIGATION
// ════════════════════════════════════════════════════════════════

function Nav({ currentSlug, navigate, scrollY }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const scrolled = scrollY > 60;

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 5000,
      padding: scrolled ? "10px 40px" : "20px 40px",
      background: scrolled ? `${C.bg}F0` : "transparent",
      backdropFilter: scrolled ? "blur(24px) saturate(1.2)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
      transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      {/* Logo — image réelle */}
      <div onClick={() => navigate("/")} style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
        <img
          src={IMAGES.logo}
          alt="Hani Kanaftchian — Photographe Bruxelles"
          style={{
            height: scrolled ? 32 : 40,
            width: "auto",
            objectFit: "contain",
            transition: "height 0.5s cubic-bezier(0.22,1,0.36,1)",
            filter: "brightness(1.15)",
          }}
        />
      </div>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
        {MENU.map((item) => (
          <div
            key={item.slug}
            style={{ position: "relative" }}
            onMouseEnter={() => item.children && setOpenDropdown(item.slug)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button
              onClick={() => navigate(item.slug)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "10px 14px",
                fontFamily: F.body, fontSize: 11, fontWeight: 500,
                letterSpacing: 2, textTransform: "uppercase",
                color: currentSlug === item.slug ? C.accent : C.textMuted,
                transition: "color 0.3s",
                position: "relative",
              }}
              onMouseEnter={(e) => e.target.style.color = C.accent}
              onMouseLeave={(e) => { if (currentSlug !== item.slug) e.target.style.color = C.textMuted; }}
            >
              {item.label}
              {currentSlug === item.slug && (
                <span style={{
                  position: "absolute", bottom: 4, left: "50%",
                  transform: "translateX(-50%)", width: 16, height: 1.5,
                  background: C.accent,
                }} />
              )}
            </button>

            {/* Dropdown */}
            {item.children && openDropdown === item.slug && (
              <div style={{
                position: "absolute", top: "100%", left: 0,
                background: C.surface, border: `1px solid ${C.border}`,
                padding: "8px 0", minWidth: 180,
                animation: "slideDown 0.2s ease",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
              }}>
                {item.children.map((child) => (
                  <button
                    key={child.slug}
                    onClick={() => { navigate(child.slug); setOpenDropdown(null); }}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      padding: "10px 20px", background: "none", border: "none",
                      fontFamily: F.body, fontSize: 12, color: C.textMuted,
                      cursor: "pointer", letterSpacing: 1, transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => { e.target.style.color = C.accent; e.target.style.paddingLeft = "24px"; }}
                    onMouseLeave={(e) => { e.target.style.color = C.textMuted; e.target.style.paddingLeft = "20px"; }}
                  >{child.label}</button>
                ))}
              </div>
            )}
          </div>
        ))}

        <GoldButton onClick={() => navigate("/reservation-shooting-photo")} style={{ marginLeft: 16, padding: "10px 24px", fontSize: 10 }}>
          Réserver
        </GoldButton>
      </div>
    </nav>
  );
}

// ════════════════════════════════════════════════════════════════
// FOOTER
// ════════════════════════════════════════════════════════════════

function Footer({ navigate }) {
  const FooterLink = ({ label, slug, href }) => (
    <div
      onClick={() => href ? window.open(href, "_blank") : navigate(slug)}
      style={{
        fontFamily: F.body,
        fontSize: 13,
        color: C.textMuted,
        padding: "5px 0",
        cursor: "pointer",
        transition: "color 0.3s",
      }}
      onMouseEnter={(e) => e.target.style.color = C.text}
      onMouseLeave={(e) => e.target.style.color = C.textMuted}
    >
      {label}
    </div>
  );

  return (
    <footer style={{ padding: "80px 40px 32px", background: C.bg, borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: 48 }}>
        {/* Brand & Tagline */}
        <div>
          <img
            src={IMAGES.logo}
            alt="Kanaftchian"
            style={{ height: 40, width: "auto", marginBottom: 16, objectFit: "contain" }}
          />
          <p style={{ fontFamily: F.body, fontSize: 14, color: C.textDim, lineHeight: 1.7, maxWidth: 280 }}>
            Photographe professionnel à Bruxelles.<br />{SITE.tagline}
          </p>
        </div>

        {/* Main Navigation */}
        <div>
          <div style={{ fontFamily: F.body, fontSize: 10, color: C.accent, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Navigation</div>
          <FooterLink label="Accueil" slug="/" />
          <FooterLink label="Portfolio" slug="/photos" />
          <FooterLink label="Tarifs" slug="/tarifs-photographe" />
          <FooterLink label="Studio" slug="/studio-photo-bruxelles" />
          <FooterLink label="Références" slug="/avis-clients-google" />
          <FooterLink label="À Propos" slug="/a-propos" />
          <FooterLink label="Contact" slug="/contact" />
          <FooterLink label="Réserver" slug="/reservation-shooting-photo" />
        </div>

        {/* Portfolio Services */}
        <div>
          <div style={{ fontFamily: F.body, fontSize: 10, color: C.accent, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Portfolio</div>
          <FooterLink label="Portrait" slug="/portrait" />
          <FooterLink label="Mariage" slug="/mariage" />
          <FooterLink label="Studio" slug="/studio" />
          <FooterLink label="Grossesse" slug="/grossesse" />
          <FooterLink label="Paysages" slug="/paysages" />
          <FooterLink label="Vidéos" slug="/videaste-bruxelles" />
        </div>

        {/* Social Media */}
        <div>
          <div style={{ fontFamily: F.body, fontSize: 10, color: C.accent, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Réseaux</div>
          <FooterLink label="Instagram" href="https://www.instagram.com/kanaftchian/" />
          <FooterLink label="Facebook" href="https://www.facebook.com/kanaftchian" />
          <FooterLink label="YouTube" href="https://www.youtube.com/@HaniKanaftchian" />
        </div>

        {/* Contact */}
        <div>
          <div style={{ fontFamily: F.body, fontSize: 10, color: C.accent, letterSpacing: 3, textTransform: "uppercase", marginBottom: 16 }}>Contact</div>
          <div
            onClick={() => window.location.href = `tel:${SITE.phone.replace(/\s/g, "")}`}
            style={{
              fontFamily: F.body,
              fontSize: 13,
              color: C.textMuted,
              padding: "5px 0",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => e.target.style.color = C.text}
            onMouseLeave={(e) => e.target.style.color = C.textMuted}
          >
            {SITE.phone}
          </div>
          <div
            onClick={() => window.location.href = `mailto:${SITE.email}`}
            style={{
              fontFamily: F.body,
              fontSize: 13,
              color: C.textMuted,
              padding: "5px 0",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => e.target.style.color = C.text}
            onMouseLeave={(e) => e.target.style.color = C.textMuted}
          >
            {SITE.email}
          </div>
          <div style={{ marginTop: 8, lineHeight: 1.5, fontFamily: F.body, fontSize: 13, color: C.textMuted }}>
            {SITE.address}
          </div>
          <div style={{ marginTop: 4, fontFamily: F.body, fontSize: 13, color: C.textMuted }}>
            {SITE.hours}
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 48, paddingTop: 20, borderTop: `1px solid ${C.border}`,
        display: "flex", justifyContent: "space-between",
        fontFamily: F.body, fontSize: 11, color: C.textDim,
      }}>
        <span>© 2026 Hani Kanaftchian Photography. Tous droits réservés.</span>
        <span>
          Orchestré par{" "}
          <span
            onClick={() => window.open("https://weblevel.pro", "_blank")}
            style={{ color: C.accent, cursor: "pointer", transition: "color 0.3s" }}
            onMouseEnter={(e) => e.target.style.color = C.text}
            onMouseLeave={(e) => e.target.style.color = C.accent}
          >
            KANEXIO
          </span>
        </span>
      </div>
    </footer>
  );
}

// ════════════════════════════════════════════════════════════════
// PAGE: HOME
// ════════════════════════════════════════════════════════════════

function HomePage({ navigate }) {
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const scrollY = useScrollY();

  useEffect(() => { setHeroLoaded(true); }, []);
  useEffect(() => {
    const t = setInterval(() => setCurrentTestimonial((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${IMAGES.heroBg})`,
          backgroundSize: "cover", backgroundPosition: "center",
          transform: `scale(${1 + scrollY * 0.0003}) translateY(${scrollY * 0.15}px)`,
          transition: "transform 0.1s linear",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(180deg, ${C.bg}60 0%, ${C.bg}90 50%, ${C.bg}F5 100%)`,
        }} />

        <div style={{
          position: "relative", zIndex: 10, height: "100%",
          display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
          textAlign: "center", padding: "0 40px",
          opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(50px)",
          transition: "all 1.4s cubic-bezier(0.22,1,0.36,1) 0.2s",
        }}>
          <div style={{
            fontFamily: F.body, fontSize: 11, letterSpacing: 8,
            textTransform: "uppercase", color: C.accent, marginBottom: 32,
          }}>
            📍 Studio Uccle, Bruxelles
          </div>

          {/* H1 SEO — requête principale */}
          <h1 style={{
            fontFamily: F.display, fontSize: "clamp(48px, 8vw, 110px)",
            fontWeight: 300, color: C.white, lineHeight: 1.05, margin: 0,
            letterSpacing: -2,
          }}>
            Photographe <Accent>Bruxelles</Accent>
          </h1>

          {/* Tagline cinématique — visuellement impactante mais en H2 pour le SEO */}
          <h2 style={{
            fontFamily: F.display, fontSize: "clamp(20px, 3vw, 36px)",
            fontWeight: 300, color: `${C.textMuted}CC`, lineHeight: 1.4, margin: 0,
            marginTop: 20, fontStyle: "italic", letterSpacing: 1,
          }}>
            Ce qui se vit avant ce qui se voit.
          </h2>

          <p style={{
            fontFamily: F.body, fontSize: 15, color: C.textMuted,
            marginTop: 28, maxWidth: 480, lineHeight: 1.8, fontWeight: 300,
          }}>
            Portrait · Mariage · Corporate · Évènement<br />
            Studio photo à Uccle & Heverlee
          </p>

          <div style={{ display: "flex", gap: 16, marginTop: 48 }}>
            <GoldButton onClick={() => navigate("/reservation-shooting-photo")}>Réserver une séance</GoldButton>
            <GoldButton onClick={() => navigate("/photos")} variant="outline">Découvrir le portfolio ↓</GoldButton>
          </div>

          {/* Rating badge */}
          <div style={{
            marginTop: 56, display: "flex", alignItems: "center", gap: 12,
            padding: "12px 24px", background: `${C.surface}80`, borderRadius: 100,
            border: `1px solid ${C.border}`,
          }}>
            <span style={{ fontFamily: F.display, fontSize: 20, color: C.accent, fontWeight: 500 }}>4.9</span>
            <span style={{ color: "#F5C518", fontSize: 14 }}>★★★★★</span>
            <span style={{ fontFamily: F.body, fontSize: 12, color: C.textMuted }}>· 450+ avis</span>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
          zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          opacity: scrollY > 100 ? 0 : 1, transition: "opacity 0.5s",
        }}>
          <span style={{ fontFamily: F.body, fontSize: 9, color: C.textDim, letterSpacing: 4, textTransform: "uppercase" }}>Scroll</span>
          <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom, ${C.textDim}, transparent)`, animation: "scrollPulse 2s ease infinite" }} />
        </div>
      </section>

      {/* ── VIDEO/INTRO ── */}
      <section style={{ padding: "100px 40px", background: C.bg }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <SectionLabel>Qui se trouve derrière l'objectif ?</SectionLabel>
            <p style={{ fontFamily: F.body, fontSize: 17, color: C.textMuted, lineHeight: 1.8, maxWidth: 700, margin: "24px auto 40px" }}>
              Si nous ne nous connaissons pas encore, commençons par les présentations à travers cette vidéo qui vous emmènera en voyage dans mon univers.
            </p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div style={{
              position: "relative", aspectRatio: "16/9", background: C.surface,
              overflow: "hidden", borderRadius: 2,
            }}>
              <iframe
                src="https://www.youtube.com/embed/BQI02ASMMgk?rel=0&modestbranding=1&color=white"
                style={{ width: "100%", height: "100%", border: "none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Hani Kanaftchian — Photographe Bruxelles"
                loading="lazy"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── STUDIO TEASER ── */}
      <section style={{ padding: "100px 40px", background: C.bgAlt, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <FadeIn>
            <div style={{ position: "relative" }}>
              <img src={IMAGES.studioMain} alt="Studio photo Bruxelles" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover" }} />
              <div style={{
                position: "absolute", bottom: -16, right: -16, padding: "20px 28px",
                background: C.bg, border: `1px solid ${C.accent}30`,
              }}>
                <div style={{ fontFamily: F.body, fontSize: 10, color: C.accent, letterSpacing: 3, textTransform: "uppercase" }}>Bruxelles & Leuven</div>
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <SectionLabel>Studio photo à Bruxelles</SectionLabel>
            <SectionTitle>Un espace de <Accent>création</Accent> sans limites</SectionTitle>
            <p style={{ fontFamily: F.body, fontSize: 15, color: C.textMuted, lineHeight: 1.8, marginTop: 24 }}>
              En tant que photographe, je vous accueille dans mes studios photo modernes et chaleureux, situés à Bruxelles et à Heverlee.
            </p>
            <div style={{ marginTop: 36 }}>
              <GoldButton onClick={() => navigate("/studio-photo-bruxelles")} variant="outline">Découvrir le studio</GoldButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "100px 40px", background: C.bg, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <SectionLabel>Ils ont adoré l'expérience ★★★★★</SectionLabel>
            <div style={{ fontFamily: F.display, fontSize: 64, color: C.accent, opacity: 0.2, lineHeight: 1, marginTop: 32 }}>"</div>
            <div style={{ position: "relative", minHeight: 180 }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} style={{
                  position: i === currentTestimonial ? "relative" : "absolute",
                  top: 0, left: 0, right: 0,
                  opacity: i === currentTestimonial ? 1 : 0,
                  transform: i === currentTestimonial ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)",
                }}>
                  <p style={{ fontFamily: F.display, fontSize: 21, fontWeight: 300, fontStyle: "italic", color: C.text, lineHeight: 1.7 }}>
                    {t.text}
                  </p>
                  <div style={{ marginTop: 28 }}>
                    <div style={{ fontFamily: F.body, fontSize: 13, color: C.accent, fontWeight: 500 }}>{t.author}</div>
                    {t.time && <div style={{ fontFamily: F.body, fontSize: 12, color: C.textDim, marginTop: 4 }}>{t.time}</div>}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 40 }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setCurrentTestimonial(i)} style={{
                  width: i === currentTestimonial ? 28 : 8, height: 3, borderRadius: 2,
                  border: "none", background: i === currentTestimonial ? C.accent : C.textDim,
                  cursor: "pointer", padding: 0, transition: "all 0.4s",
                }} />
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section style={{ padding: "80px 40px", background: C.bgAlt, borderTop: `1px solid ${C.border}` }}>
        <FadeIn>
          <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
            <SectionLabel>Références clients</SectionLabel>
            <p style={{ fontFamily: F.body, fontSize: 14, color: C.textMuted, marginBottom: 40 }}>
              Les marques et entreprises qui m'ont fait confiance
            </p>
            <img src={IMAGES.partners} alt="Clients" style={{ width: "100%", maxWidth: 700, opacity: 0.7, filter: "grayscale(100%) brightness(1.5)" }} />
          </div>
        </FadeIn>
      </section>

      {/* ── PORTFOLIO PREVIEW ── */}
      <section style={{ padding: "100px 40px", background: C.bg, borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <FadeIn>
            <SectionLabel>Portfolio photo récent</SectionLabel>
            <SectionTitle>
              Photographe à <Accent>Bruxelles</Accent>
            </SectionTitle>
            <p style={{ fontFamily: F.body, fontSize: 15, color: C.textMuted, marginTop: 16, maxWidth: 600, lineHeight: 1.7 }}>
              Du portrait artistique aux shootings corporate, découvrez une sélection de mes dernières créations photographiques.
            </p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4, marginTop: 60 }}>
            {IMAGES.portrait.slice(0, 8).map((src, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <PhotoCard src={src} aspect={i % 3 === 0 ? "3/4" : "4/5"} onClick={() => navigate("/portrait")} />
              </FadeIn>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 48 }}>
            <GoldButton onClick={() => navigate("/photos")} variant="outline">Explorer tout le portfolio</GoldButton>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "120px 40px", background: C.bgAlt, borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
        <FadeIn>
          <SectionTitle style={{ fontSize: "clamp(32px, 5vw, 60px)" }}>
            Envie de vivre <Accent>l'expérience</Accent> ?
          </SectionTitle>
          <p style={{ fontFamily: F.body, fontSize: 16, color: C.textMuted, marginTop: 20, lineHeight: 1.7 }}>
            Que ce soit pour une séance en solo, en couple, en famille ou pour un projet professionnel,<br />
            je serais ravi de vous recevoir dans mon studio à Bruxelles.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 40, flexWrap: "wrap" }}>
            <GoldButton onClick={() => navigate("/reservation-shooting-photo")}>📸 Réservez votre prochaine séance →</GoldButton>
          </div>
          <div style={{ display: "flex", gap: 40, justifyContent: "center", marginTop: 32, fontFamily: F.body, fontSize: 13, color: C.textDim }}>
            <span>📍 Studio photo à Bruxelles</span>
            <span>⏱️ Réponse sous 24h</span>
          </div>
        </FadeIn>
      </section>
    </>
  );
}

// ════════════════════════════════════════════════════════════════
// PAGE: PORTFOLIO / GALLERY (reusable)
// ════════════════════════════════════════════════════════════════

function GalleryPage({ navigate, title, subtitle, description, images, heroImage }) {
  const [lightboxIdx, setLightboxIdx] = useState(-1);

  return (
    <>
      {/* Hero */}
      <section style={{ position: "relative", height: "60vh", overflow: "hidden" }}>
        <img src={heroImage || images[0]} alt="" style={{
          width: "100%", height: "100%", objectFit: "cover", opacity: 0.4,
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to bottom, ${C.bg}80, ${C.bg}F0)`,
          display: "flex", flexDirection: "column", justifyContent: "flex-end",
          padding: "60px 40px",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
            <SectionLabel>{subtitle || "Portfolio"}</SectionLabel>
            <h1 style={{
              fontFamily: F.display, fontSize: "clamp(36px, 5vw, 64px)",
              fontWeight: 300, color: C.text, margin: 0,
            }}>{title}</h1>
            {description && (
              <p style={{ fontFamily: F.body, fontSize: 16, color: C.textMuted, marginTop: 16, maxWidth: 600, lineHeight: 1.7 }}>
                {description}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section style={{ padding: "60px 40px 100px", background: C.bg }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 4,
          }}>
            {images.map((src, i) => (
              <FadeIn key={i} delay={Math.min(i * 0.04, 0.4)}>
                <PhotoCard
                  src={src}
                  aspect={i % 5 === 0 ? "4/5" : i % 7 === 0 ? "4/3" : "3/4"}
                  onClick={() => setLightboxIdx(i)}
                />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 40px", background: C.bgAlt, borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
        <FadeIn>
          <SectionTitle>Envie d'une séance <Accent>unique</Accent> ?</SectionTitle>
          <div style={{ marginTop: 32 }}>
            <GoldButton onClick={() => navigate("/reservation-shooting-photo")}>Réserver maintenant</GoldButton>
          </div>
        </FadeIn>
      </section>

      <Lightbox
        images={images}
        index={lightboxIdx}
        onClose={() => setLightboxIdx(-1)}
        onNav={(dir) => setLightboxIdx((p) => (p + dir + images.length) % images.length)}
      />
    </>
  );
}

// ════════════════════════════════════════════════════════════════
// PAGE: TARIFS
// ════════════════════════════════════════════════════════════════

function TarifsPage({ navigate }) {
  const [hoveredService, setHoveredService] = useState(null);
  return (
    <>
      <section style={{ padding: "160px 40px 40px", background: C.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <SectionLabel>Découvrez les prix par type de séance</SectionLabel>
            <SectionTitle>Les <Accent>tarifs</Accent></SectionTitle>
            <p style={{ fontFamily: F.body, fontSize: 15, color: C.textMuted, marginTop: 16 }}>
              Découvrez l'ensemble des services
            </p>
          </FadeIn>
        </div>
      </section>

      <section style={{ padding: "40px 40px 80px", background: C.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 3 }}>
            {SERVICES_LIST.map((s, i) => (
              <FadeIn key={i} delay={i * 0.04}>
                <div
                  onClick={() => navigate(s.slug)}
                  onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(null)}
                  style={{
                    padding: "36px 24px", cursor: "pointer",
                    background: hoveredService === i ? C.surfaceHover : C.surface,
                    borderBottom: hoveredService === i ? `2px solid ${C.accent}` : `2px solid transparent`,
                    transition: "all 0.4s",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontSize: 32, marginBottom: 16 }}>{s.icon}</div>
                  <div style={{
                    fontFamily: F.display, fontSize: 17, fontWeight: 400, color: C.text,
                  }}>{s.title}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Quote */}
          <FadeIn>
            <div style={{ marginTop: 80, textAlign: "center", padding: "60px 40px", borderTop: `1px solid ${C.border}` }}>
              <p style={{ fontFamily: F.display, fontSize: 22, fontStyle: "italic", color: C.textMuted, fontWeight: 300, lineHeight: 1.7 }}>
                "Ce que la photographie reproduit à l'infini n'a lieu qu'une fois."
              </p>
              <p style={{ fontFamily: F.body, fontSize: 13, color: C.accent, marginTop: 16, letterSpacing: 2 }}>ROLAND BARTHES</p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

// ════════════════════════════════════════════════════════════════
// PAGE: STUDIO
// ════════════════════════════════════════════════════════════════

function StudioPage({ navigate }) {
  return (
    <>
      <section style={{ position: "relative", height: "60vh", overflow: "hidden" }}>
        <img src={IMAGES.studioMain} alt="Studio" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to bottom, ${C.bg}60, ${C.bg}F0)`,
          display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "60px 40px",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
            <SectionLabel>Démarquez-vous</SectionLabel>
            <h1 style={{ fontFamily: F.display, fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, color: C.text, margin: 0 }}>
              Le <Accent>Studio</Accent>
            </h1>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 40px", background: C.bg }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontFamily: F.display, fontSize: 32, fontWeight: 300, color: C.text }}>
              Un studio photo dans un style <Accent>Feng Shui</Accent> ?
            </h2>
            <p style={{ fontFamily: F.body, fontSize: 16, color: C.textMuted, lineHeight: 1.8, marginTop: 24 }}>
              Dans un cadre spacieux, chaleureux et contemporain, les studios intègrent chacun un plateau de 130m² pour vous offrir un service de location d'un espace dédié à la photographie et à la vidéo. Les lieux sont adaptables et utilisables dans leur ensemble pour tous types de projets : mode, beauté, coiffure, produits, publicité, entreprise, presse, tournage vidéo et évènementiel.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Studio gallery */}
      <section style={{ padding: "0 40px 100px", background: C.bg }}>
        <div style={{ maxWidth: 1400, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4 }}>
            {IMAGES.studio.map((src, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <PhotoCard src={src} aspect="4/3" />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 40px", background: C.bgAlt, borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
        <FadeIn>
          <SectionTitle>Envie de <Accent>louer</Accent> le studio ?</SectionTitle>
          <div style={{ marginTop: 32 }}>
            <GoldButton onClick={() => navigate("/contact")}>Nous contacter</GoldButton>
          </div>
        </FadeIn>
      </section>
    </>
  );
}

// ════════════════════════════════════════════════════════════════
// PAGE: ABOUT
// ════════════════════════════════════════════════════════════════

function AboutPage({ navigate }) {
  return (
    <>
      <section style={{ position: "relative", height: "60vh", overflow: "hidden" }}>
        <img src={IMAGES.aboutHero} alt="Hani" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }} />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to bottom, ${C.bg}60, ${C.bg}F0)`,
          display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "60px 40px",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
            <SectionLabel>Passionné, perfectionniste, à votre écoute depuis plus de 10 ans</SectionLabel>
            <h1 style={{ fontFamily: F.display, fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, color: C.text, margin: 0 }}>
              À propos — Hani <Accent>Kanaftchian</Accent>
            </h1>
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 40px", background: C.bg }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 80, alignItems: "start" }}>
          <FadeIn>
            <div style={{ position: "relative" }}>
              <img src={IMAGES.aboutPortrait} alt="Hani Kanaftchian" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover" }} />
              <div style={{
                position: "absolute", bottom: -20, right: -20,
                width: 160, height: 160, border: `1px solid ${C.accent}30`,
                background: C.bg, display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center",
              }}>
                <div style={{ fontFamily: F.display, fontSize: 44, color: C.accent, fontWeight: 300 }}>10+</div>
                <div style={{ fontFamily: F.body, fontSize: 10, color: C.textMuted, letterSpacing: 2, textTransform: "uppercase" }}>Années</div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h2 style={{ fontFamily: F.display, fontSize: 28, fontWeight: 300, color: C.accent }}>Observateur attentif…</h2>
            <p style={{ fontFamily: F.body, fontSize: 16, color: C.textMuted, lineHeight: 1.8, marginTop: 20 }}>
              Photographe professionnel, à 30 ans, Hani a fait de sa passion son métier. Curieux du monde qui l'entoure, il ne se promène jamais sans son appareil photo, profitant de la moindre occasion pour s'en servir.
            </p>
            <p style={{ fontFamily: F.body, fontSize: 16, color: C.textMuted, lineHeight: 1.8, marginTop: 16 }}>
              Un reflet, une ombre, une lumière particulière… Hani pose son œil d'artiste sur chaque chose et sublime la réalité.
            </p>

            <h3 style={{ fontFamily: F.display, fontSize: 24, fontWeight: 300, color: C.accent, marginTop: 40 }}>Capteur de lumière…</h3>
            <p style={{ fontFamily: F.body, fontSize: 16, color: C.textMuted, lineHeight: 1.8, marginTop: 16 }}>
              En extérieur ou en studio, Hani s'adapte à toutes les situations. Lieu, lumière, météo… Pour lui, pas de contraintes, seulement des défis à relever !
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 40 }}>
              {[
                { city: "Bruxelles", address: "Rue Vanderkindere 524, 1180" },
                { city: "Leuven (Heverlee)", address: "Studio disponible 7j/7" },
              ].map((s, i) => (
                <div key={i} style={{
                  padding: 24, background: C.surface, borderLeft: `2px solid ${C.accent}40`,
                }}>
                  <div style={{ fontFamily: F.display, fontSize: 17, color: C.text }}>{s.city}</div>
                  <div style={{ fontFamily: F.body, fontSize: 12, color: C.textDim, marginTop: 4 }}>{s.address}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 40, display: "flex", gap: 16 }}>
              <GoldButton onClick={() => navigate("/contact")}>Contact</GoldButton>
              <GoldButton onClick={() => navigate("/a-propos")} variant="outline">En savoir plus</GoldButton>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

// ════════════════════════════════════════════════════════════════
// PAGE: REFERENCES
// ════════════════════════════════════════════════════════════════

function ReferencesPage({ navigate }) {
  return (
    <>
      <section style={{ padding: "160px 40px 60px", background: C.bg }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <SectionLabel>Ils ont adoré l'expérience ★★★★★</SectionLabel>
            <SectionTitle>Avis clients <Accent>Google</Accent></SectionTitle>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 32 }}>
              <span style={{ fontFamily: F.display, fontSize: 56, color: C.accent }}>4.9</span>
              <div>
                <div style={{ color: "#F5C518", fontSize: 20 }}>★★★★★</div>
                <div style={{ fontFamily: F.body, fontSize: 13, color: C.textMuted }}>450+ avis vérifiés</div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section style={{ padding: "40px 40px 100px", background: C.bg }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {TESTIMONIALS.map((t, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ padding: 36, background: C.surface, borderLeft: `2px solid ${C.accent}30` }}>
                  <div style={{ color: "#F5C518", fontSize: 14, marginBottom: 16 }}>★★★★★</div>
                  <p style={{ fontFamily: F.body, fontSize: 15, color: C.textMuted, lineHeight: 1.7, fontStyle: "italic" }}>"{t.text}"</p>
                  <div style={{ marginTop: 20, fontFamily: F.body, fontSize: 13, color: C.accent, fontWeight: 500 }}>{t.author}</div>
                  {t.time && <div style={{ fontFamily: F.body, fontSize: 11, color: C.textDim, marginTop: 4 }}>{t.time}</div>}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ════════════════════════════════════════════════════════════════
// PAGE: CONTACT
// ════════════════════════════════════════════════════════════════

function ContactPage({ navigate }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const InputField = ({ label, field, type = "text" }) => (
    <div style={{ marginBottom: 20 }}>
      <label style={{ display: "block", fontFamily: F.body, fontSize: 10, color: C.accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{label}</label>
      <input
        type={type}
        value={form[field]}
        onChange={(e) => setForm({ ...form, [field]: e.target.value })}
        style={{
          width: "100%",
          padding: "14px 16px",
          background: C.bgAlt,
          border: `1px solid ${C.border}`,
          borderRadius: 0,
          color: C.text,
          fontFamily: F.body,
          fontSize: 15,
          outline: "none",
          boxSizing: "border-box",
          transition: "border 0.3s",
        }}
        onFocus={(e) => e.target.style.borderColor = C.accent}
        onBlur={(e) => e.target.style.borderColor = C.border}
      />
    </div>
  );

  const handleSubmit = () => {
    const subject = `Demande de contact - ${form.service || "Sans prestation"}`;
    const body = `Nom: ${form.name}\nEmail: ${form.email}\nTéléphone: ${form.phone}\nPrestation: ${form.service}\n\nMessage:\n${form.message}`;
    window.location.href = `mailto:hani@kanaftchian.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section style={{ padding: "160px 40px 100px", background: C.bg, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
        <FadeIn>
          <SectionLabel>Contact</SectionLabel>
          <SectionTitle>Parlons de votre <Accent>projet</Accent></SectionTitle>
          <div style={{ width: 50, height: 1, background: C.accent, margin: "36px 0" }} />

          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: F.body, fontSize: 10, color: C.accent, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>Téléphone</div>
            <div
              onClick={() => window.location.href = `tel:${SITE.phone.replace(/\s/g, "")}`}
              style={{
                fontFamily: F.body,
                fontSize: 16,
                color: C.text,
                fontWeight: 300,
                cursor: "pointer",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => e.target.style.color = C.accent}
              onMouseLeave={(e) => e.target.style.color = C.text}
            >
              {SITE.phone}
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: F.body, fontSize: 10, color: C.accent, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>Email</div>
            <div
              onClick={() => window.location.href = "mailto:hani@kanaftchian.com"}
              style={{
                fontFamily: F.body,
                fontSize: 16,
                color: C.text,
                fontWeight: 300,
                cursor: "pointer",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => e.target.style.color = C.accent}
              onMouseLeave={(e) => e.target.style.color = C.text}
            >
              hani@kanaftchian.com
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: F.body, fontSize: 10, color: C.accent, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>Studio Bruxelles</div>
            <div style={{ fontFamily: F.body, fontSize: 16, color: C.text, fontWeight: 300 }}>
              {SITE.address}
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <div style={{ fontFamily: F.body, fontSize: 10, color: C.accent, letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>Horaires</div>
            <div style={{ fontFamily: F.body, fontSize: 16, color: C.text, fontWeight: 300 }}>
              {SITE.hours}
            </div>
          </div>

          <div style={{ marginTop: 60, marginBottom: 32 }}>
            <div style={{ fontFamily: F.body, fontSize: 10, color: C.accent, letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>Localisation</div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.2498885793817!2d4.366157!3d50.8096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3e0e0e0e0e0e1%3A0x0!2sRue%20Vanderkindere%20524%2C%201180%20Bruxelles!5e0!3m2!1sfr!2sbe!4v1234567890"
              width="100%"
              height="300"
              style={{ border: `1px solid ${C.border}`, filter: "invert(90%) hue-rotate(180deg) brightness(0.9) contrast(0.9)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div style={{ padding: 40, background: C.surface }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "60px 20px" }}>
                <div style={{ fontFamily: F.display, fontSize: 28, color: C.accent, marginBottom: 16 }}>✓</div>
                <h3 style={{ fontFamily: F.display, fontSize: 24, fontWeight: 400, color: C.text, margin: "0 0 12px" }}>Merci !</h3>
                <p style={{ fontFamily: F.body, fontSize: 14, color: C.textMuted }}>
                  Votre message a été envoyé. Je vous répondrai sous 24h.
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: F.display, fontSize: 24, fontWeight: 400, color: C.text, margin: "0 0 32px" }}>
                  Demande de contact
                </h3>
                <InputField label="Nom complet" field="name" />
                <InputField label="Email" field="email" type="email" />
                <InputField label="Téléphone" field="phone" type="tel" />
                <div style={{ marginBottom: 20 }}>
                  <label style={{
                    display: "block",
                    fontFamily: F.body,
                    fontSize: 10,
                    color: C.accent,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}>
                    Prestation
                  </label>
                  <select
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: C.bgAlt,
                      border: `1px solid ${C.border}`,
                      color: C.text,
                      fontFamily: F.body,
                      fontSize: 15,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  >
                    <option value="">Sélectionnez...</option>
                    {SERVICES_LIST.map((s) => <option key={s.title} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 28 }}>
                  <label style={{
                    display: "block",
                    fontFamily: F.body,
                    fontSize: 10,
                    color: C.accent,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}>
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: C.bgAlt,
                      border: `1px solid ${C.border}`,
                      color: C.text,
                      resize: "vertical",
                      fontFamily: F.body,
                      fontSize: 15,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                    onFocus={(e) => e.target.style.borderColor = C.accent}
                    onBlur={(e) => e.target.style.borderColor = C.border}
                  />
                </div>
                <GoldButton onClick={handleSubmit} style={{ width: "100%" }}>
                  Envoyer ma demande
                </GoldButton>
              </>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════
// PAGE: RESERVATION
// ════════════════════════════════════════════════════════════════

function ReservationPage({ navigate }) {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  return (
    <>
      <section style={{ padding: "160px 40px 100px", background: C.bg, minHeight: "100vh" }}>
        <FadeIn>
          <SectionLabel>Réservation en ligne</SectionLabel>
          <SectionTitle>Réservez votre <Accent>séance photo</Accent></SectionTitle>

          {/* SimplyBook.me Iframe */}
          <div style={{ maxWidth: 1200, margin: "60px auto", position: "relative", minHeight: 600 }}>
            {!iframeLoaded && (
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 10,
              }}>
                <div style={{
                  width: 50,
                  height: 50,
                  border: `3px solid ${C.border}`,
                  borderTop: `3px solid ${C.accent}`,
                  borderRadius: "50%",
                  animation: "spin 1s linear infinite",
                }} />
              </div>
            )}
            <div style={{
              background: C.surface,
              borderRadius: 4,
              overflow: "hidden",
              minHeight: 600,
              display: iframeLoaded ? "block" : "none",
            }}>
              <iframe
                src="https://hanikanaftchian.simplybook.it/v2/#book"
                style={{
                  width: "100%",
                  height: "600px",
                  border: "none",
                  display: "block",
                }}
                onLoad={() => setIframeLoaded(true)}
                title="SimplyBook.me - Réservation"
              />
            </div>
          </div>

          {/* Info Cards */}
          <div style={{
            maxWidth: 1200,
            margin: "80px auto 0",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 32,
          }}>
            <FadeIn delay={0.1}>
              <div style={{
                padding: 40,
                background: C.surface,
                border: `1px solid ${C.border}`,
                textAlign: "center",
              }}>
                <div style={{
                  fontFamily: F.display,
                  fontSize: 28,
                  color: C.accent,
                  marginBottom: 12,
                }}>
                  📍
                </div>
                <h4 style={{
                  fontFamily: F.display,
                  fontSize: 16,
                  color: C.text,
                  margin: "0 0 12px",
                }}>
                  Studio Bruxelles
                </h4>
                <p style={{
                  fontFamily: F.body,
                  fontSize: 13,
                  color: C.textMuted,
                  margin: 0,
                  lineHeight: 1.6,
                }}>
                  {SITE.address}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div style={{
                padding: 40,
                background: C.surface,
                border: `1px solid ${C.border}`,
                textAlign: "center",
              }}>
                <div style={{
                  fontFamily: F.display,
                  fontSize: 28,
                  color: C.accent,
                  marginBottom: 12,
                }}>
                  ✓
                </div>
                <h4 style={{
                  fontFamily: F.display,
                  fontSize: 16,
                  color: C.text,
                  margin: "0 0 12px",
                }}>
                  Réponse rapide
                </h4>
                <p style={{
                  fontFamily: F.body,
                  fontSize: 13,
                  color: C.textMuted,
                  margin: 0,
                }}>
                  Je vous recontacterai sous 24h
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.3}>
              <div
                onClick={() => window.location.href = `tel:${SITE.phone.replace(/\s/g, "")}`}
                style={{
                  padding: 40,
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = C.accent;
                  e.currentTarget.style.background = `${C.accent}10`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = C.border;
                  e.currentTarget.style.background = C.surface;
                }}
              >
                <div style={{
                  fontFamily: F.display,
                  fontSize: 28,
                  color: C.accent,
                  marginBottom: 12,
                }}>
                  ☎️
                </div>
                <h4 style={{
                  fontFamily: F.display,
                  fontSize: 16,
                  color: C.text,
                  margin: "0 0 12px",
                }}>
                  Téléphone
                </h4>
                <p style={{
                  fontFamily: F.body,
                  fontSize: 13,
                  color: C.textMuted,
                  margin: 0,
                }}>
                  {SITE.phone}
                </p>
              </div>
            </FadeIn>
          </div>
        </FadeIn>
      </section>
    </>
  );
}

// ════════════════════════════════════════════════════════════════
// PLACEHOLDER PAGE (for pages not yet fully designed)
// ════════════════════════════════════════════════════════════════

function VideoPage({ navigate }) {
  return (
    <>
      <section style={{ padding: "160px 40px 40px", background: C.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <SectionLabel>Production et tournage vidéo</SectionLabel>
            <SectionTitle>Des vidéos <Accent>captivantes</Accent></SectionTitle>
            <p style={{ fontFamily: F.body, fontSize: 16, color: C.textMuted, marginTop: 16, maxWidth: 700, lineHeight: 1.7 }}>
              Corporate · Entreprise · Événement · Interview · Mariage · Clip musical — nous créons le message audiovisuel que vous souhaitez communiquer.
            </p>
          </FadeIn>
        </div>
      </section>
      <section style={{ padding: "40px 40px 100px", background: C.bg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {IMAGES.videos.map((vimeoUrl, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ position: "relative", aspectRatio: "16/9", background: C.surface, overflow: "hidden" }}>
                <iframe
                  src={vimeoUrl}
                  style={{ width: "100%", height: "100%", border: "none" }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={`Video ${i + 1}`}
                />
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
      <section style={{ padding: "80px 40px", background: C.bgAlt, borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
        <FadeIn>
          <SectionTitle>Un projet <Accent>vidéo</Accent> en tête ?</SectionTitle>
          <div style={{ marginTop: 32 }}>
            <GoldButton onClick={() => navigate("/contact")}>Discutons-en</GoldButton>
          </div>
        </FadeIn>
      </section>
    </>
  );
}

function PlaceholderPage({ title, navigate }) {
  return (
    <section style={{ padding: "160px 40px 100px", background: C.bg, minHeight: "100vh", textAlign: "center" }}>
      <FadeIn>
        <SectionLabel>En construction</SectionLabel>
        <SectionTitle>{title}</SectionTitle>
        <p style={{ fontFamily: F.body, fontSize: 16, color: C.textMuted, marginTop: 24 }}>
          Cette page sera disponible dans la version Astro finale.
        </p>
        <div style={{ marginTop: 40 }}>
          <GoldButton onClick={() => navigate("/")}>Retour à l'accueil</GoldButton>
        </div>
      </FadeIn>
    </section>
  );
}

// ════════════════════════════════════════════════════════════════
// MAIN APP
// ════════════════════════════════════════════════════════════════

export default function KanaftchianUltraPremium() {
  const [currentSlug, setCurrentSlug] = useState("/");
  const scrollY = useScrollY();

  const navigate = useCallback((slug) => {
    setCurrentSlug(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const currentRoute = ROUTES[currentSlug] || "home";

  const renderPage = () => {
    switch (currentRoute) {
      case "home":
        return <HomePage navigate={navigate} />;
      case "portrait":
        return <GalleryPage navigate={navigate}
          title="Séance photo portrait"
          subtitle="Démarquez-vous"
          description="Un portrait réussi ne se limite pas à une simple image ; c'est une expression de votre personnalité et de votre unicité."
          images={[...IMAGES.portrait, ...IMAGES.portraitPage]}
          heroImage={IMAGES.portraitPage[0]}
        />;
      case "mariage":
        return <GalleryPage navigate={navigate}
          title="Photographe de mariage"
          subtitle="Portfolio mariage"
          description="Je vous propose une approche moderne de la photographie de mariage en mêlant photo-reportage et photos d'art."
          images={IMAGES.mariage}
          heroImage={IMAGES.mariage[0]}
        />;
      case "studioPortfolio":
        return <GalleryPage navigate={navigate}
          title="Photos en studio"
          subtitle="Portfolio studio"
          description="Séances photo réalisées dans notre studio de Bruxelles avec éclairage professionnel."
          images={IMAGES.studioPortfolio}
          heroImage={IMAGES.studioPortfolio[0]}
        />;
      case "tarifs":
        return <TarifsPage navigate={navigate} />;
      case "studioPage":
        return <StudioPage navigate={navigate} />;
      case "references":
        return <ReferencesPage navigate={navigate} />;
      case "about":
        return <AboutPage navigate={navigate} />;
      case "contact":
        return <ContactPage navigate={navigate} />;
      case "reservation":
        return <ReservationPage navigate={navigate} />;
      case "photos":
        return <GalleryPage navigate={navigate}
          title="Portfolio complet"
          subtitle="Explorez l'univers"
          description="Du portrait artistique aux shootings corporate, découvrez l'ensemble de mes créations."
          images={[...IMAGES.portrait, ...IMAGES.mariage.slice(0, 8), ...IMAGES.portraitPage, ...IMAGES.grossesse.slice(0, 6), ...IMAGES.paysages.slice(0, 8), ...IMAGES.studioPortfolio.slice(0, 8)]}
        />;
      case "grossesse":
        return <GalleryPage navigate={navigate}
          title="Photos de grossesse"
          subtitle="Immortalisez ce moment unique"
          description="Séance photo grossesse en studio ou en extérieur. Capturez la beauté de ce moment unique avec douceur et élégance."
          images={IMAGES.grossesse}
          heroImage={IMAGES.grossesse[0]}
        />;
      case "paysages":
        return <GalleryPage navigate={navigate}
          title="Paysages"
          subtitle="La nature dans toute sa majesté"
          description="De Bruxelles à Dubai, des Seychelles à l'Arizona — une collection de paysages capturés aux quatre coins du monde."
          images={IMAGES.paysages}
          heroImage={IMAGES.paysages[0]}
        />;
      case "video":
        return <VideoPage navigate={navigate} />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div style={{ background: C.bg, color: C.text, minHeight: "100vh", fontFamily: F.body }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: ${C.bg}; overflow-x: hidden; }
        ::selection { background: ${C.accent}30; color: ${C.white}; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; }
        ::-webkit-scrollbar-thumb:hover { background: ${C.accent}60; }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        @keyframes scrollPulse { 0%,100% { opacity:.3; transform:scaleY(1); } 50% { opacity:.8; transform:scaleY(1.4); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        img { user-select: none; -webkit-user-drag: none; }
      `}</style>

      <Nav currentSlug={currentSlug} navigate={navigate} scrollY={scrollY} />
      {renderPage()}
      <Footer navigate={navigate} />
    </div>
  );
}