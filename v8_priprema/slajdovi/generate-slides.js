const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10" x 5.625"
pres.author = "Eldina Delalic";
pres.title = "V8 - Uvod u React";

// ============ COLOR PALETTE (React-themed) ============
const COLORS = {
  dark: "20232A",       // React dark navy
  accent: "61DAFB",     // React cyan
  accentDark: "2C7D96",
  textDark: "1A1A1A",
  textMuted: "6C757D",
  bg: "FFFFFF",
  bgSoft: "F7F9FC",
  codeBg: "F4F4F4",
  codeText: "24292E",
  keyword: "D73A49",
  string: "032F62",
  comment: "6A737D",
  white: "FFFFFF",
};

const FONTS = {
  header: "Calibri",
  body: "Calibri",
  code: "Consolas",
};

// ============ HELPERS ============

function addAccentBar(slide) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.15, h: 5.625,
    fill: { color: COLORS.accent },
    line: { type: "none" },
  });
}

function addFooter(slide, pageNum) {
  slide.addText(`DWS 2025-2026  ·  Vježba 8`, {
    x: 0.4, y: 5.3, w: 6, h: 0.25,
    fontSize: 9, color: COLORS.textMuted, fontFace: FONTS.body,
  });
  slide.addText(`${pageNum}`, {
    x: 9.3, y: 5.3, w: 0.4, h: 0.25,
    fontSize: 9, color: COLORS.textMuted, fontFace: FONTS.body,
    align: "right",
  });
}

function addTitle(slide, title) {
  slide.addText(title, {
    x: 0.5, y: 0.3, w: 9, h: 0.7,
    fontSize: 32, bold: true, color: COLORS.dark,
    fontFace: FONTS.header, margin: 0,
  });
}

function codeBlock(slide, code, opts) {
  const { x, y, w, h } = opts;
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: COLORS.codeBg },
    line: { type: "none" },
  });
  slide.addText(code, {
    x: x + 0.15, y: y + 0.1, w: w - 0.3, h: h - 0.2,
    fontSize: opts.fontSize || 12, fontFace: FONTS.code,
    color: COLORS.codeText, valign: "top", margin: 0,
  });
}

// ============ SLIDE 1: TITLE ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.dark };

  // React cyan accent circle (decorative)
  s.addShape(pres.shapes.OVAL, {
    x: 7.5, y: -1.5, w: 4, h: 4,
    fill: { color: COLORS.accent, transparency: 85 },
    line: { type: "none" },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 8, y: -1, w: 3, h: 3,
    fill: { color: COLORS.accent, transparency: 70 },
    line: { type: "none" },
  });

  s.addText("Vježba 8", {
    x: 0.7, y: 1.5, w: 8, h: 0.7,
    fontSize: 24, color: COLORS.accent, fontFace: FONTS.header, margin: 0,
  });
  s.addText("Uvod u React", {
    x: 0.7, y: 2.1, w: 8.5, h: 1.2,
    fontSize: 54, bold: true, color: COLORS.white, fontFace: FONTS.header, margin: 0,
  });
  s.addText("i moderni JavaScript", {
    x: 0.7, y: 3.2, w: 8.5, h: 0.6,
    fontSize: 24, color: "CCCCCC", fontFace: FONTS.header, italic: true, margin: 0,
  });

  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 4.3, w: 1.5, h: 0,
    line: { color: COLORS.accent, width: 2 },
  });
  s.addText("DWS 2025-2026  ·  PMF", {
    x: 0.7, y: 4.45, w: 8, h: 0.3,
    fontSize: 13, color: "AAAAAA", fontFace: FONTS.body, margin: 0,
  });
  s.addText("Eldina Delalić", {
    x: 0.7, y: 4.8, w: 8, h: 0.3,
    fontSize: 13, color: "AAAAAA", fontFace: FONTS.body, margin: 0,
  });
}

// ============ SLIDE 2: AGENDA ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "Šta ćemo danas");

  const agenda = [
    "Šta je React i zašto ga koristimo",
    "Moderni JavaScript – osvježenje",
    "Vite – postavljanje React projekta",
    "JSX – spoj HTML-a i JavaScript-a",
    "Prva komponenta",
    "Props i odnos roditelj-dijete",
    "Mini zadatak",
  ];

  agenda.forEach((item, i) => {
    const y = 1.3 + i * 0.5;
    s.addShape(pres.shapes.OVAL, {
      x: 0.7, y: y + 0.05, w: 0.35, h: 0.35,
      fill: { color: COLORS.accent }, line: { type: "none" },
    });
    s.addText(`${i + 1}`, {
      x: 0.7, y: y + 0.05, w: 0.35, h: 0.35,
      fontSize: 13, bold: true, color: COLORS.dark,
      fontFace: FONTS.body, align: "center", valign: "middle", margin: 0,
    });
    s.addText(item, {
      x: 1.25, y: y, w: 8, h: 0.45,
      fontSize: 18, color: COLORS.textDark, fontFace: FONTS.body,
      valign: "middle", margin: 0,
    });
  });

  addFooter(s, 2);
}

// ============ SLIDE 3: ŠTA JE REACT ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "Šta je React?");

  const points = [
    { text: "JavaScript biblioteka za gradnju korisničkih interfejsa", options: { bullet: true, breakLine: true } },
    { text: "Razvio Facebook (Meta) – 2013. godine", options: { bullet: true, breakLine: true } },
    { text: "Open source – besplatan za upotrebu", options: { bullet: true, breakLine: true } },
    { text: "Danas najpopularnija biblioteka za frontend", options: { bullet: true, breakLine: true } },
    { text: "Omogućava pisanje reusable komponenti (UI dijelova)", options: { bullet: true } },
  ];
  s.addText(points, {
    x: 0.7, y: 1.3, w: 8.5, h: 3,
    fontSize: 18, color: COLORS.textDark, fontFace: FONTS.body,
    paraSpaceAfter: 10,
  });

  // Pull quote / note
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 4.5, w: 8.5, h: 0.6,
    fill: { color: COLORS.bgSoft }, line: { type: "none" },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 4.5, w: 0.08, h: 0.6,
    fill: { color: COLORS.accent }, line: { type: "none" },
  });
  s.addText("Nije framework (kao Angular) – biblioteka koja radi jednu stvar: gradi UI.", {
    x: 0.95, y: 4.5, w: 8.2, h: 0.6,
    fontSize: 13, italic: true, color: COLORS.textMuted,
    fontFace: FONTS.body, valign: "middle", margin: 0,
  });

  addFooter(s, 3);
}

// ============ SLIDE 4: ZAŠTO REACT ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "Zašto React?");

  // Left column
  s.addText("Prednosti", {
    x: 0.7, y: 1.3, w: 4, h: 0.4,
    fontSize: 18, bold: true, color: COLORS.accentDark, fontFace: FONTS.header, margin: 0,
  });
  const prednosti = [
    { text: "Ogromna zajednica", options: { bullet: true, breakLine: true } },
    { text: "Mnogo resursa i biblioteka", options: { bullet: true, breakLine: true } },
    { text: "Velika tržišna potražnja", options: { bullet: true, breakLine: true } },
    { text: "Jednostavan koncept komponenti", options: { bullet: true, breakLine: true } },
    { text: "Brz (Virtual DOM)", options: { bullet: true } },
  ];
  s.addText(prednosti, {
    x: 0.7, y: 1.8, w: 4.2, h: 3,
    fontSize: 15, color: COLORS.textDark, fontFace: FONTS.body,
    paraSpaceAfter: 6,
  });

  // Right column
  s.addText("Ko ga koristi", {
    x: 5.2, y: 1.3, w: 4, h: 0.4,
    fontSize: 18, bold: true, color: COLORS.accentDark, fontFace: FONTS.header, margin: 0,
  });
  const korisnici = [
    { text: "Meta (Facebook, Instagram, WhatsApp)", options: { bullet: true, breakLine: true } },
    { text: "Netflix", options: { bullet: true, breakLine: true } },
    { text: "Airbnb", options: { bullet: true, breakLine: true } },
    { text: "Uber", options: { bullet: true, breakLine: true } },
    { text: "Dropbox", options: { bullet: true, breakLine: true } },
    { text: "Shopify", options: { bullet: true, breakLine: true } },
    { text: "Discord", options: { bullet: true } },
  ];
  s.addText(korisnici, {
    x: 5.2, y: 1.8, w: 4.2, h: 3,
    fontSize: 15, color: COLORS.textDark, fontFace: FONTS.body,
    paraSpaceAfter: 4,
  });

  addFooter(s, 4);
}

// ============ SLIDE 5: SPA vs MPA ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "SPA vs MPA");

  // Left card - MPA
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 1.3, w: 4.2, h: 3.4,
    fill: { color: COLORS.bgSoft }, line: { type: "none" },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 1.3, w: 4.2, h: 0.08,
    fill: { color: COLORS.textMuted }, line: { type: "none" },
  });
  s.addText("MPA", {
    x: 0.9, y: 1.45, w: 4, h: 0.4,
    fontSize: 22, bold: true, color: COLORS.dark, fontFace: FONTS.header, margin: 0,
  });
  s.addText("Multi Page App", {
    x: 0.9, y: 1.85, w: 4, h: 0.3,
    fontSize: 12, italic: true, color: COLORS.textMuted, fontFace: FONTS.body, margin: 0,
  });
  s.addText([
    { text: "Svaki klik = novi zahtjev serveru", options: { bullet: true, breakLine: true } },
    { text: "Server šalje novi HTML", options: { bullet: true, breakLine: true } },
    { text: "Cijela stranica se reloada", options: { bullet: true, breakLine: true } },
    { text: "Primjer: klasični PHP/Django sajtovi", options: { bullet: true } },
  ], {
    x: 0.9, y: 2.25, w: 3.9, h: 2.3,
    fontSize: 13, color: COLORS.textDark, fontFace: FONTS.body,
    paraSpaceAfter: 6,
  });

  // Right card - SPA
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.1, y: 1.3, w: 4.2, h: 3.4,
    fill: { color: COLORS.bgSoft }, line: { type: "none" },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.1, y: 1.3, w: 4.2, h: 0.08,
    fill: { color: COLORS.accent }, line: { type: "none" },
  });
  s.addText("SPA", {
    x: 5.3, y: 1.45, w: 4, h: 0.4,
    fontSize: 22, bold: true, color: COLORS.dark, fontFace: FONTS.header, margin: 0,
  });
  s.addText("Single Page App", {
    x: 5.3, y: 1.85, w: 4, h: 0.3,
    fontSize: 12, italic: true, color: COLORS.accentDark, fontFace: FONTS.body, margin: 0,
  });
  s.addText([
    { text: "Jedna HTML stranica", options: { bullet: true, breakLine: true } },
    { text: "JS dinamički mijenja sadržaj", options: { bullet: true, breakLine: true } },
    { text: "Nema reload-a cijele stranice", options: { bullet: true, breakLine: true } },
    { text: "Brže, bolji UX", options: { bullet: true, breakLine: true } },
    { text: "React, Vue, Angular", options: { bullet: true } },
  ], {
    x: 5.3, y: 2.25, w: 3.9, h: 2.3,
    fontSize: 13, color: COLORS.textDark, fontFace: FONTS.body,
    paraSpaceAfter: 6,
  });

  s.addText("React gradi SPA aplikacije.", {
    x: 0.7, y: 4.85, w: 8.5, h: 0.3,
    fontSize: 13, italic: true, color: COLORS.accentDark, fontFace: FONTS.body,
    align: "center", margin: 0,
  });

  addFooter(s, 5);
}

// ============ SLIDE 6: KOMPONENTE ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "Komponente");

  s.addText("React aplikacija = stablo komponenti", {
    x: 0.7, y: 1.2, w: 8.5, h: 0.35,
    fontSize: 16, italic: true, color: COLORS.textMuted, fontFace: FONTS.body, margin: 0,
  });

  // Simple tree diagram using boxes
  function box(x, y, w, h, text, color) {
    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w, h,
      fill: { color: color || COLORS.accent },
      line: { type: "none" },
    });
    s.addText(text, {
      x, y, w, h,
      fontSize: 12, bold: true, color: COLORS.dark,
      fontFace: FONTS.code, align: "center", valign: "middle", margin: 0,
    });
  }

  function line(x1, y1, x2, y2) {
    s.addShape(pres.shapes.LINE, {
      x: x1, y: y1, w: x2 - x1, h: y2 - y1,
      line: { color: COLORS.textMuted, width: 1 },
    });
  }

  // Tree
  box(4, 1.75, 1.8, 0.4, "<App>");
  line(4.9, 2.15, 3, 2.6);
  line(4.9, 2.15, 7, 2.6);
  box(2, 2.6, 2, 0.4, "<Header>", "D1F1FA");
  box(6, 2.6, 2, 0.4, "<Main>", "D1F1FA");
  line(7, 3, 5.5, 3.5);
  line(7, 3, 8.5, 3.5);
  box(4.3, 3.5, 2.4, 0.4, "<StudentList>", "E8F5E9");
  box(7.5, 3.5, 2, 0.4, "<Footer>", "E8F5E9");
  line(5.5, 3.9, 5.5, 4.3);
  box(4.3, 4.3, 2.4, 0.4, "<StudentCard>", "FFF3E0");

  // Points on the left
  s.addText([
    { text: "Samostalan dio UI-a", options: { bullet: true, breakLine: true } },
    { text: "Može se ponovo koristiti", options: { bullet: true, breakLine: true } },
    { text: "Svoje podatke i logiku", options: { bullet: true } },
  ], {
    x: 0.7, y: 2.6, w: 3, h: 2,
    fontSize: 13, color: COLORS.textDark, fontFace: FONTS.body,
    paraSpaceAfter: 8,
  });

  s.addText("Razmišljaj o komponentama kao o LEGO kockicama.", {
    x: 0.7, y: 4.95, w: 8.5, h: 0.3,
    fontSize: 12, italic: true, color: COLORS.textMuted, fontFace: FONTS.body,
    align: "center", margin: 0,
  });

  addFooter(s, 6);
}

// ============ SLIDE 7: DEKLARATIVNO VS IMPERATIVNO ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "Deklarativno vs Imperativno");

  // Left: imperative
  s.addText("Imperativno (vanilla JS)", {
    x: 0.7, y: 1.2, w: 4.2, h: 0.3,
    fontSize: 14, bold: true, color: COLORS.dark, fontFace: FONTS.header, margin: 0,
  });
  s.addText('"KAKO" uraditi', {
    x: 0.7, y: 1.5, w: 4.2, h: 0.25,
    fontSize: 11, italic: true, color: COLORS.textMuted, fontFace: FONTS.body, margin: 0,
  });
  codeBlock(s,
    `const el = document.getElementById("x");
el.innerHTML = "";
for (let i = 0; i < items.length; i++) {
  const div = document.createElement("div");
  div.textContent = items[i].name;
  el.appendChild(div);
}`,
    { x: 0.7, y: 1.85, w: 4.2, h: 2.7, fontSize: 10 }
  );

  // Right: declarative
  s.addText("Deklarativno (React)", {
    x: 5.1, y: 1.2, w: 4.2, h: 0.3,
    fontSize: 14, bold: true, color: COLORS.accentDark, fontFace: FONTS.header, margin: 0,
  });
  s.addText('"ŠTA" želim vidjeti', {
    x: 5.1, y: 1.5, w: 4.2, h: 0.25,
    fontSize: 11, italic: true, color: COLORS.textMuted, fontFace: FONTS.body, margin: 0,
  });
  codeBlock(s,
    `<div>
  {items.map(item => (
    <div>{item.name}</div>
  ))}
</div>`,
    { x: 5.1, y: 1.85, w: 4.2, h: 2.7, fontSize: 11 }
  );

  s.addText("Ti opisuješ kako UI treba izgledati, React brine kako doći do tog stanja.", {
    x: 0.7, y: 4.75, w: 8.6, h: 0.3,
    fontSize: 12, italic: true, color: COLORS.textMuted, fontFace: FONTS.body,
    align: "center", margin: 0,
  });

  addFooter(s, 7);
}

// ============ SLIDE 8: VIRTUAL DOM ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "Virtual DOM");

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 1.2, w: 8.5, h: 0.7,
    fill: { color: COLORS.bgSoft }, line: { type: "none" },
  });
  s.addText([
    { text: "Problem: ", options: { bold: true, color: COLORS.dark } },
    { text: "Pristup pravom DOM-u je spor.", options: { breakLine: true } },
    { text: "Rješenje: ", options: { bold: true, color: COLORS.accentDark } },
    { text: "React drži kopiju DOM-a u memoriji (Virtual DOM)." },
  ], {
    x: 0.9, y: 1.2, w: 8.2, h: 0.7,
    fontSize: 14, color: COLORS.textDark, fontFace: FONTS.body, valign: "middle", margin: 0,
  });

  // Flow diagram
  const steps = [
    "Promjena stanja",
    "Kreiranje novog Virtual DOM-a",
    "Upoređivanje sa starim (diffing)",
    "Ažurira se SAMO ono što je promijenjeno",
  ];
  steps.forEach((step, i) => {
    const y = 2.2 + i * 0.55;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 2, y, w: 6, h: 0.4,
      fill: { color: i === 3 ? COLORS.accent : COLORS.bgSoft },
      line: { type: "none" },
    });
    s.addText(step, {
      x: 2, y, w: 6, h: 0.4,
      fontSize: 13, bold: i === 3, color: COLORS.dark,
      fontFace: FONTS.body, align: "center", valign: "middle", margin: 0,
    });
    if (i < steps.length - 1) {
      s.addText("↓", {
        x: 4.5, y: y + 0.4, w: 1, h: 0.15,
        fontSize: 14, color: COLORS.textMuted, fontFace: FONTS.body,
        align: "center", margin: 0,
      });
    }
  });

  s.addText("Zato je React brz – ne re-renderuje cijelu stranicu, samo delte.", {
    x: 0.7, y: 4.85, w: 8.5, h: 0.3,
    fontSize: 12, italic: true, color: COLORS.textMuted, fontFace: FONTS.body,
    align: "center", margin: 0,
  });

  addFooter(s, 8);
}

// ============ SLIDE 9: SECTION - MODERNI JS ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.dark };

  s.addShape(pres.shapes.LINE, {
    x: 3, y: 2.3, w: 4, h: 0,
    line: { color: COLORS.accent, width: 2 },
  });
  s.addText("SEKCIJA", {
    x: 0.5, y: 2, w: 9, h: 0.3,
    fontSize: 12, color: COLORS.accent, fontFace: FONTS.header,
    align: "center", charSpacing: 8, margin: 0,
  });
  s.addText("Moderni JavaScript", {
    x: 0.5, y: 2.5, w: 9, h: 0.8,
    fontSize: 48, bold: true, color: COLORS.white, fontFace: FONTS.header,
    align: "center", margin: 0,
  });
  s.addText("Osvježenje prije React-a", {
    x: 0.5, y: 3.3, w: 9, h: 0.4,
    fontSize: 18, italic: true, color: "AAAAAA", fontFace: FONTS.body,
    align: "center", margin: 0,
  });
}

// ============ SLIDE 10: MODERNI JS TEME ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "Šta ćemo proći");

  const temes = [
    ["let i const", "ne više var"],
    ["Arrow functions", "() => {}"],
    ["Template literals", "`Zdravo ${ime}`"],
    ["Destructuring", "const { a, b } = obj"],
    ["Spread / rest", "..."],
    ["Array metode", ".map(), .filter(), .find()"],
    ["Ternary operator", "a ? b : c"],
    ["Optional chaining", "obj?.a?.b"],
    ["Import / export", "moduli"],
  ];

  temes.forEach((t, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.7 + col * 4.5;
    const y = 1.3 + row * 0.7;

    s.addShape(pres.shapes.OVAL, {
      x, y: y + 0.05, w: 0.35, h: 0.35,
      fill: { color: COLORS.accent }, line: { type: "none" },
    });
    s.addText(`${i + 1}`, {
      x, y: y + 0.05, w: 0.35, h: 0.35,
      fontSize: 12, bold: true, color: COLORS.dark,
      fontFace: FONTS.body, align: "center", valign: "middle", margin: 0,
    });
    s.addText(t[0], {
      x: x + 0.5, y: y, w: 3.8, h: 0.25,
      fontSize: 14, bold: true, color: COLORS.textDark, fontFace: FONTS.body, margin: 0,
    });
    s.addText(t[1], {
      x: x + 0.5, y: y + 0.22, w: 3.8, h: 0.22,
      fontSize: 11, color: COLORS.textMuted, fontFace: FONTS.code, margin: 0,
    });
  });

  s.addText("Sve ovo ćemo vidjeti u svakom React projektu.", {
    x: 0.7, y: 4.85, w: 8.5, h: 0.3,
    fontSize: 12, italic: true, color: COLORS.textMuted, fontFace: FONTS.body,
    align: "center", margin: 0,
  });

  addFooter(s, 10);
}

// ============ SLIDE 11: LET I CONST ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "let i const");

  codeBlock(s,
    `const pi = 3.14;          // ne mijenja se
let brojac = 0;            // mijenja se
brojac = brojac + 1;       // OK

// const sprječava promjenu REFERENCE, ne sadržaja
const niz = [1, 2, 3];
niz.push(4);               // OK!`,
    { x: 0.7, y: 1.3, w: 8.5, h: 2.5, fontSize: 14 }
  );

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 4.1, w: 8.5, h: 0.7,
    fill: { color: COLORS.bgSoft }, line: { type: "none" },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 4.1, w: 0.08, h: 0.7,
    fill: { color: COLORS.accent }, line: { type: "none" },
  });
  s.addText([
    { text: "Pravilo: ", options: { bold: true, color: COLORS.dark } },
    { text: "Počni s const, prebaci u let samo ako treba." },
  ], {
    x: 0.95, y: 4.1, w: 8.2, h: 0.7,
    fontSize: 14, color: COLORS.textDark, fontFace: FONTS.body, valign: "middle", margin: 0,
  });

  addFooter(s, 11);
}

// ============ SLIDE 12: ARROW FUNCTIONS ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "Arrow functions");

  codeBlock(s,
    `// klasična funkcija
function saberi(a, b) { return a + b; }

// arrow function
const saberi = (a, b) => a + b;

// samo jedan parametar - ne trebaju zagrade
const kvadrat = n => n * n;

// bez parametara
const pozdravi = () => "Zdravo!";`,
    { x: 0.7, y: 1.3, w: 8.5, h: 3.2, fontSize: 13 }
  );

  s.addText("U React-u ih koristimo svuda – callbacks, event handleri, komponente.", {
    x: 0.7, y: 4.75, w: 8.5, h: 0.3,
    fontSize: 12, italic: true, color: COLORS.textMuted, fontFace: FONTS.body,
    align: "center", margin: 0,
  });

  addFooter(s, 12);
}

// ============ SLIDE 13: TEMPLATE LITERALS ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "Template literals");

  s.addText("Umjesto spajanja stringova sa +, koristimo backticks ( ` ).", {
    x: 0.7, y: 1.2, w: 8.5, h: 0.35,
    fontSize: 14, color: COLORS.textMuted, fontFace: FONTS.body, margin: 0,
  });

  codeBlock(s,
    `const ime = "Ana";
const godine = 20;

// staro
const poruka = "Zdravo, " + ime + "! Imaš " + godine + " godina.";

// novo
const poruka = \`Zdravo, \${ime}! Imaš \${godine} godina.\`;`,
    { x: 0.7, y: 1.7, w: 8.5, h: 2.6, fontSize: 12 }
  );

  s.addText([
    { text: "Varijable i izrazi idu u ${...}", options: { bullet: true, breakLine: true } },
    { text: "Mogu i višeredni stringovi", options: { bullet: true } },
  ], {
    x: 0.7, y: 4.45, w: 8.5, h: 0.7,
    fontSize: 14, color: COLORS.textDark, fontFace: FONTS.body,
    paraSpaceAfter: 4,
  });

  addFooter(s, 13);
}

// ============ SLIDE 14: DESTRUCTURING ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "Destructuring");

  s.addText("Izvlačenje vrijednosti iz objekta ili niza u varijable.", {
    x: 0.7, y: 1.2, w: 8.5, h: 0.3,
    fontSize: 13, color: COLORS.textMuted, fontFace: FONTS.body, italic: true, margin: 0,
  });

  codeBlock(s,
    `const student = { ime: "Ana", godine: 20 };

// staro
const ime = student.ime;

// novo
const { ime, godine } = student;`,
    { x: 0.7, y: 1.6, w: 4.2, h: 2.5, fontSize: 11 }
  );

  s.addText("U parametrima funkcije", {
    x: 5.1, y: 1.6, w: 4.2, h: 0.3,
    fontSize: 13, bold: true, color: COLORS.accentDark, fontFace: FONTS.body, margin: 0,
  });
  s.addText("(ovo ćemo koristiti za props!)", {
    x: 5.1, y: 1.9, w: 4.2, h: 0.25,
    fontSize: 11, italic: true, color: COLORS.textMuted, fontFace: FONTS.body, margin: 0,
  });
  codeBlock(s,
    `function prikazi({ ime, godine }) {
  return \`\${ime}, \${godine}\`;
}

prikazi({ ime: "Ana", godine: 20 });`,
    { x: 5.1, y: 2.2, w: 4.2, h: 1.9, fontSize: 11 }
  );

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 4.4, w: 8.6, h: 0.6,
    fill: { color: COLORS.bgSoft }, line: { type: "none" },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 4.4, w: 0.08, h: 0.6,
    fill: { color: COLORS.accent }, line: { type: "none" },
  });
  s.addText("Destructuring ćemo koristiti u SVAKOJ React komponenti za props.", {
    x: 0.95, y: 4.4, w: 8.3, h: 0.6,
    fontSize: 13, italic: true, color: COLORS.textDark, fontFace: FONTS.body, valign: "middle", margin: 0,
  });

  addFooter(s, 14);
}

// ============ SLIDE 15: SPREAD I REST ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "Spread i rest  ( ... )");

  s.addText("Spread – raširi niz ili objekt", {
    x: 0.7, y: 1.2, w: 8.5, h: 0.3,
    fontSize: 14, bold: true, color: COLORS.accentDark, fontFace: FONTS.body, margin: 0,
  });
  codeBlock(s,
    `const a = [1, 2, 3];
const b = [...a, 4, 5];              // [1,2,3,4,5]

const s1 = { ime: "Ana" };
const s2 = { ...s1, godine: 20 };    // { ime, godine }`,
    { x: 0.7, y: 1.55, w: 8.6, h: 1.5, fontSize: 12 }
  );

  s.addText("Rest – skupi ostatak u niz", {
    x: 0.7, y: 3.2, w: 8.5, h: 0.3,
    fontSize: 14, bold: true, color: COLORS.accentDark, fontFace: FONTS.body, margin: 0,
  });
  codeBlock(s,
    `function suma(...brojevi) {
  return brojevi.reduce((a, b) => a + b, 0);
}
suma(1, 2, 3, 4); // 10`,
    { x: 0.7, y: 3.55, w: 8.6, h: 1.35, fontSize: 12 }
  );

  addFooter(s, 15);
}

// ============ SLIDE 16: ARRAY METODE ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "Array metode – map, filter, find");

  codeBlock(s,
    `const brojevi = [1, 2, 3, 4, 5];

brojevi.map(n => n * 2);        // [2,4,6,8,10]
brojevi.filter(n => n > 2);     // [3,4,5]
brojevi.find(n => n === 3);     // 3`,
    { x: 0.7, y: 1.3, w: 8.5, h: 1.9, fontSize: 13 }
  );

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 3.3, w: 8.6, h: 0.6,
    fill: { color: COLORS.bgSoft }, line: { type: "none" },
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 3.3, w: 0.08, h: 0.6,
    fill: { color: COLORS.accent }, line: { type: "none" },
  });
  s.addText([
    { text: ".map() ", options: { bold: true, fontFace: FONTS.code } },
    { text: "je NAJVAŽNIJA – koristimo je za renderovanje listi u React-u." },
  ], {
    x: 0.95, y: 3.3, w: 8.3, h: 0.6,
    fontSize: 13, color: COLORS.textDark, fontFace: FONTS.body, valign: "middle", margin: 0,
  });

  s.addText("Primjer u React-u:", {
    x: 0.7, y: 4.0, w: 8.5, h: 0.3,
    fontSize: 13, bold: true, color: COLORS.accentDark, fontFace: FONTS.body, margin: 0,
  });
  codeBlock(s,
    `{studenti.map(s => <StudentCard ime={s.ime} />)}`,
    { x: 0.7, y: 4.3, w: 8.6, h: 0.5, fontSize: 12 }
  );

  addFooter(s, 16);
}

// ============ SLIDE 17: TERNARY I OPTIONAL CHAINING ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "Ternary i Optional chaining");

  s.addText("Ternary – kraći if/else", {
    x: 0.7, y: 1.2, w: 8.5, h: 0.3,
    fontSize: 14, bold: true, color: COLORS.accentDark, fontFace: FONTS.body, margin: 0,
  });
  codeBlock(s,
    `const status = godine >= 18 ? "punoljetan" : "maloljetan";

// u React-u za conditional rendering:
{ulogovan ? <p>Dobrodošli!</p> : <p>Prijavite se</p>}`,
    { x: 0.7, y: 1.55, w: 8.6, h: 1.5, fontSize: 12 }
  );

  s.addText("Optional chaining – sigurno pristupanje svojstvima", {
    x: 0.7, y: 3.2, w: 8.5, h: 0.3,
    fontSize: 14, bold: true, color: COLORS.accentDark, fontFace: FONTS.body, margin: 0,
  });
  codeBlock(s,
    `const grad = student?.adresa?.grad;  // undefined, ne puca`,
    { x: 0.7, y: 3.55, w: 8.6, h: 0.7, fontSize: 13 }
  );

  s.addText("Koristi se kad radiš sa podacima iz backend-a koji možda još nisu stigli.", {
    x: 0.7, y: 4.4, w: 8.5, h: 0.3,
    fontSize: 12, italic: true, color: COLORS.textMuted, fontFace: FONTS.body,
    align: "center", margin: 0,
  });

  addFooter(s, 17);
}

// ============ SLIDE 18: IMPORT / EXPORT ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "Import / Export");

  codeBlock(s,
    `// utils.js
export const PI = 3.14;                        // named
export default function hello() {}              // default

// app.js
import hello, { PI } from "./utils.js";`,
    { x: 0.7, y: 1.3, w: 8.5, h: 2, fontSize: 13 }
  );

  s.addText([
    { text: "Default export", options: { bold: true, color: COLORS.dark, breakLine: true } },
    { text: "jedan po fajlu, bez { } pri importu", options: { color: COLORS.textDark, breakLine: true } },
    { text: " ", options: { breakLine: true } },
    { text: "Named export", options: { bold: true, color: COLORS.dark, breakLine: true } },
    { text: "više po fajlu, u { } pri importu", options: { color: COLORS.textDark, breakLine: true } },
    { text: " ", options: { breakLine: true } },
    { text: "React komponente", options: { bold: true, color: COLORS.dark, breakLine: true } },
    { text: "export-uju se kao default", options: { color: COLORS.textDark } },
  ], {
    x: 0.7, y: 3.5, w: 8.5, h: 1.5,
    fontSize: 12, fontFace: FONTS.body,
  });

  addFooter(s, 18);
}

// ============ SLIDE 19: SECTION - REACT U PRAKSI ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.dark };

  s.addShape(pres.shapes.LINE, {
    x: 3, y: 2.3, w: 4, h: 0,
    line: { color: COLORS.accent, width: 2 },
  });
  s.addText("SEKCIJA", {
    x: 0.5, y: 2, w: 9, h: 0.3,
    fontSize: 12, color: COLORS.accent, fontFace: FONTS.header,
    align: "center", charSpacing: 8, margin: 0,
  });
  s.addText("React u praksi", {
    x: 0.5, y: 2.5, w: 9, h: 0.8,
    fontSize: 48, bold: true, color: COLORS.white, fontFace: FONTS.header,
    align: "center", margin: 0,
  });
  s.addText("Vite, JSX, komponente, props", {
    x: 0.5, y: 3.3, w: 9, h: 0.4,
    fontSize: 18, italic: true, color: "AAAAAA", fontFace: FONTS.body,
    align: "center", margin: 0,
  });
}

// ============ SLIDE 20: VITE SETUP ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "Vite – setup projekta");

  s.addText("Alat za pokretanje modernih frontend projekata. Brz, jednostavan, preporučen.", {
    x: 0.7, y: 1.2, w: 8.5, h: 0.3,
    fontSize: 13, italic: true, color: COLORS.textMuted, fontFace: FONTS.body, margin: 0,
  });

  codeBlock(s,
    `npm create vite@latest frontend -- --template react
cd frontend
npm install
npm run dev`,
    { x: 0.7, y: 1.6, w: 8.6, h: 1.4, fontSize: 14 }
  );

  s.addText("Struktura projekta", {
    x: 0.7, y: 3.2, w: 8.5, h: 0.3,
    fontSize: 14, bold: true, color: COLORS.accentDark, fontFace: FONTS.body, margin: 0,
  });

  s.addText([
    { text: "index.html", options: { bold: true, fontFace: FONTS.code, color: COLORS.dark } },
    { text: "   – jedina HTML stranica", options: { breakLine: true } },
    { text: "src/main.jsx", options: { bold: true, fontFace: FONTS.code, color: COLORS.dark } },
    { text: "   – entry point", options: { breakLine: true } },
    { text: "src/App.jsx", options: { bold: true, fontFace: FONTS.code, color: COLORS.dark } },
    { text: "   – glavna komponenta", options: { breakLine: true } },
    { text: "package.json", options: { bold: true, fontFace: FONTS.code, color: COLORS.dark } },
    { text: "   – dependencies i skripte" },
  ], {
    x: 0.7, y: 3.55, w: 8.6, h: 1.5,
    fontSize: 12, color: COLORS.textDark, fontFace: FONTS.body,
    paraSpaceAfter: 2,
  });

  addFooter(s, 20);
}

// ============ SLIDE 21: JSX ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "JSX – šta je?");

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 1.2, w: 8.5, h: 0.5,
    fill: { color: COLORS.accent, transparency: 85 }, line: { type: "none" },
  });
  s.addText("JSX = JavaScript + HTML sintaksa", {
    x: 0.7, y: 1.2, w: 8.5, h: 0.5,
    fontSize: 16, bold: true, color: COLORS.dark, fontFace: FONTS.header,
    align: "center", valign: "middle", margin: 0,
  });

  codeBlock(s,
    `function App() {
  const ime = "Ana";
  return (
    <div>
      <h1>Zdravo, {ime}!</h1>
    </div>
  );
}`,
    { x: 0.7, y: 1.85, w: 8.6, h: 2.2, fontSize: 13 }
  );

  s.addText([
    { text: "Nije HTML – prevodi se u JS pozive", options: { bullet: true, breakLine: true } },
    { text: "Dozvoljava pisanje \"HTML-a\" unutar JS-a", options: { bullet: true, breakLine: true } },
    { text: "{...} unutar JSX-a = bilo koji JS izraz", options: { bullet: true } },
  ], {
    x: 0.7, y: 4.2, w: 8.5, h: 1,
    fontSize: 13, color: COLORS.textDark, fontFace: FONTS.body,
    paraSpaceAfter: 4,
  });

  addFooter(s, 21);
}

// ============ SLIDE 22: JSX vs HTML ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "JSX vs HTML");

  const tableData = [
    [
      { text: "HTML", options: { bold: true, color: COLORS.white, fill: { color: COLORS.textMuted }, align: "center" } },
      { text: "JSX", options: { bold: true, color: COLORS.white, fill: { color: COLORS.accentDark }, align: "center" } },
    ],
    [
      { text: `class="card"`, options: { fontFace: FONTS.code } },
      { text: `className="card"`, options: { fontFace: FONTS.code, bold: true } },
    ],
    [
      { text: `for="email"`, options: { fontFace: FONTS.code } },
      { text: `htmlFor="email"`, options: { fontFace: FONTS.code, bold: true } },
    ],
    [
      { text: `onclick="..."`, options: { fontFace: FONTS.code } },
      { text: `onClick={...}`, options: { fontFace: FONTS.code, bold: true } },
    ],
    [
      { text: `<br>`, options: { fontFace: FONTS.code } },
      { text: `<br />  (samozatvoren)`, options: { fontFace: FONTS.code, bold: true } },
    ],
    [
      { text: `više root elemenata OK`, options: {} },
      { text: `jedan root  ili  <>...</>`, options: { bold: true } },
    ],
    [
      { text: `atributi su stringovi`, options: {} },
      { text: `JS izrazi u {...}`, options: { bold: true } },
    ],
  ];

  s.addTable(tableData, {
    x: 0.7, y: 1.3, w: 8.6, h: 3.3,
    fontSize: 12, fontFace: FONTS.body,
    border: { pt: 0.5, color: "DDDDDD" },
    colW: [4.3, 4.3],
  });

  addFooter(s, 22);
}

// ============ SLIDE 23: KOMPONENTA = FUNKCIJA ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "Komponenta = funkcija");

  s.addText("Komponenta u React-u je obična JavaScript funkcija koja vraća JSX.", {
    x: 0.7, y: 1.2, w: 8.5, h: 0.3,
    fontSize: 13, italic: true, color: COLORS.textMuted, fontFace: FONTS.body, margin: 0,
  });

  codeBlock(s,
    `function Pozdrav() {
  return <h1>Zdravo, svijete!</h1>;
}

export default Pozdrav;`,
    { x: 0.7, y: 1.6, w: 8.6, h: 1.7, fontSize: 14 }
  );

  s.addText("Pravila", {
    x: 0.7, y: 3.45, w: 8.5, h: 0.3,
    fontSize: 14, bold: true, color: COLORS.accentDark, fontFace: FONTS.body, margin: 0,
  });

  s.addText([
    { text: "Ime komponente MORA počinjati velikim slovom", options: { bullet: true, breakLine: true } },
    { text: "Vraća jedan JSX element", options: { bullet: true, breakLine: true } },
    { text: "Koristi se kao HTML tag:  <Pozdrav />", options: { bullet: true, breakLine: true } },
    { text: "Svaka komponenta u svom fajlu (.jsx)", options: { bullet: true } },
  ], {
    x: 0.7, y: 3.8, w: 8.6, h: 1.3,
    fontSize: 13, color: COLORS.textDark, fontFace: FONTS.body,
    paraSpaceAfter: 4,
  });

  addFooter(s, 23);
}

// ============ SLIDE 24: PROPS ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "Props – prosljeđivanje podataka");

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 1.2, w: 8.6, h: 0.4,
    fill: { color: COLORS.bgSoft }, line: { type: "none" },
  });
  s.addText([
    { text: "Props ", options: { bold: true, color: COLORS.dark } },
    { text: '= "properties" – podaci iz roditelja u dijete.' },
  ], {
    x: 0.9, y: 1.2, w: 8.4, h: 0.4,
    fontSize: 13, color: COLORS.textDark, fontFace: FONTS.body, valign: "middle", margin: 0,
  });

  // Dijete
  s.addText("// DIJETE", {
    x: 0.7, y: 1.75, w: 4.2, h: 0.25,
    fontSize: 11, color: COLORS.comment, fontFace: FONTS.code, margin: 0,
  });
  codeBlock(s,
    `function StudentCard({ ime, godine }) {
  return (
    <div>
      <h2>{ime}</h2>
      <p>{godine} godina</p>
    </div>
  );
}`,
    { x: 0.7, y: 2.05, w: 4.2, h: 2.3, fontSize: 11 }
  );

  // Roditelj
  s.addText("// RODITELJ", {
    x: 5.1, y: 1.75, w: 4.2, h: 0.25,
    fontSize: 11, color: COLORS.comment, fontFace: FONTS.code, margin: 0,
  });
  codeBlock(s,
    `function App() {
  return (
    <StudentCard
      ime="Ana"
      godine={20}
    />
  );
}`,
    { x: 5.1, y: 2.05, w: 4.2, h: 2.3, fontSize: 11 }
  );

  s.addText("Stringovi → u \" \"    ·    brojevi/varijable/boolean → u { }", {
    x: 0.7, y: 4.55, w: 8.6, h: 0.3,
    fontSize: 12, italic: true, color: COLORS.accentDark, fontFace: FONTS.body,
    align: "center", margin: 0,
  });

  addFooter(s, 24);
}

// ============ SLIDE 25: PROPS PRAVILA ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "Props – pravila");

  const rules = [
    { title: "Read-only", desc: "Dijete NE SMIJE mijenjati props." },
    { title: "Stringovi u \" \", ostalo u { }", desc: "<Card ime=\"Ana\" godine={20} aktivan={true} />" },
    { title: "Destructuring u potpisu", desc: "function Card({ ime, godine }) { ... }" },
    { title: "Jednosmjerni tok", desc: "Samo odozgo nadolje (roditelj → dijete)." },
  ];

  rules.forEach((r, i) => {
    const y = 1.3 + i * 0.85;
    s.addShape(pres.shapes.OVAL, {
      x: 0.7, y: y + 0.05, w: 0.45, h: 0.45,
      fill: { color: COLORS.accent }, line: { type: "none" },
    });
    s.addText(`${i + 1}`, {
      x: 0.7, y: y + 0.05, w: 0.45, h: 0.45,
      fontSize: 16, bold: true, color: COLORS.dark,
      fontFace: FONTS.body, align: "center", valign: "middle", margin: 0,
    });
    s.addText(r.title, {
      x: 1.3, y: y, w: 8, h: 0.3,
      fontSize: 15, bold: true, color: COLORS.dark, fontFace: FONTS.body, margin: 0,
    });
    s.addText(r.desc, {
      x: 1.3, y: y + 0.3, w: 8, h: 0.4,
      fontSize: 12, color: COLORS.textMuted,
      fontFace: r.title.includes("Destructuring") || r.title.includes("\" \"") ? FONTS.code : FONTS.body,
      margin: 0,
    });
  });

  addFooter(s, 25);
}

// ============ SLIDE 26: KOMPOZICIJA ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "Kompozicija komponenti");

  s.addText("Roditelj može renderovati više djece.", {
    x: 0.7, y: 1.2, w: 8.5, h: 0.3,
    fontSize: 13, italic: true, color: COLORS.textMuted, fontFace: FONTS.body, margin: 0,
  });

  codeBlock(s,
    `function App() {
  return (
    <div>
      <Header naslov="Moja aplikacija" />
      <StudentCard ime="Ana" godine={20} />
      <StudentCard ime="Marko" godine={22} />
      <Footer />
    </div>
  );
}`,
    { x: 0.7, y: 1.6, w: 8.6, h: 2.7, fontSize: 13 }
  );

  s.addText("Komponente se spajaju i grade složene UI-e iz jednostavnih dijelova.", {
    x: 0.7, y: 4.5, w: 8.5, h: 0.3,
    fontSize: 12, italic: true, color: COLORS.accentDark, fontFace: FONTS.body,
    align: "center", margin: 0,
  });

  addFooter(s, 26);
}

// ============ SLIDE 27: SECTION - MINI ZADATAK ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.dark };

  s.addShape(pres.shapes.LINE, {
    x: 3, y: 2.3, w: 4, h: 0,
    line: { color: COLORS.accent, width: 2 },
  });
  s.addText("VJEŽBA", {
    x: 0.5, y: 2, w: 9, h: 0.3,
    fontSize: 12, color: COLORS.accent, fontFace: FONTS.header,
    align: "center", charSpacing: 8, margin: 0,
  });
  s.addText("Mini zadatak", {
    x: 0.5, y: 2.5, w: 9, h: 0.8,
    fontSize: 48, bold: true, color: COLORS.white, fontFace: FONTS.header,
    align: "center", margin: 0,
  });
  s.addText("Vrijeme je za kodiranje", {
    x: 0.5, y: 3.3, w: 9, h: 0.4,
    fontSize: 18, italic: true, color: "AAAAAA", fontFace: FONTS.body,
    align: "center", margin: 0,
  });
}

// ============ SLIDE 28: ZADATAK KNJIŽARA ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "Zadatak – Knjižara");

  s.addText("Napraviti aplikaciju koja prikazuje listu knjiga.", {
    x: 0.7, y: 1.2, w: 8.5, h: 0.3,
    fontSize: 14, italic: true, color: COLORS.textMuted, fontFace: FONTS.body, margin: 0,
  });

  s.addText("Zahtjevi", {
    x: 0.7, y: 1.65, w: 4.2, h: 0.3,
    fontSize: 14, bold: true, color: COLORS.accentDark, fontFace: FONTS.body, margin: 0,
  });
  s.addText([
    { text: "Komponenta BookCard sa props:", options: { bullet: { type: "number" }, breakLine: true } },
    { text: "    naslov, autor, godinaIzdanja, cijena", options: { fontFace: FONTS.code, color: COLORS.textMuted, breakLine: true } },
    { text: "U App.jsx prikazati najmanje 4 knjige", options: { bullet: { type: "number" }, breakLine: true } },
    { text: "Zaglavlje \"Dobrodošli u knjižaru\"", options: { bullet: { type: "number" }, breakLine: true } },
    { text: "Stilizovati kartice (border, padding)", options: { bullet: { type: "number" } } },
  ], {
    x: 0.7, y: 2, w: 4.3, h: 2.8,
    fontSize: 12, color: COLORS.textDark, fontFace: FONTS.body,
    paraSpaceAfter: 4,
  });

  s.addText("Bonus", {
    x: 5.2, y: 1.65, w: 4.2, h: 0.3,
    fontSize: 14, bold: true, color: COLORS.accentDark, fontFace: FONTS.body, margin: 0,
  });
  s.addText([
    { text: "Komponenta Header za naslov stranice", options: { bullet: true, breakLine: true } },
    { text: "Komponenta Footer sa kontaktom", options: { bullet: true } },
  ], {
    x: 5.2, y: 2, w: 4.2, h: 1.5,
    fontSize: 12, color: COLORS.textDark, fontFace: FONTS.body,
    paraSpaceAfter: 6,
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 3.3, w: 4.2, h: 1.5,
    fill: { color: COLORS.bgSoft }, line: { type: "none" },
  });
  s.addText("Savjet", {
    x: 5.35, y: 3.35, w: 4, h: 0.3,
    fontSize: 11, bold: true, color: COLORS.accentDark, fontFace: FONTS.body, margin: 0,
  });
  s.addText("Počni od jedne kartice. Kad radi, duplikuj je i promijeni props. Tek onda extract u komponentu.", {
    x: 5.35, y: 3.6, w: 3.95, h: 1.1,
    fontSize: 11, italic: true, color: COLORS.textMuted, fontFace: FONTS.body, margin: 0,
  });

  addFooter(s, 28);
}

// ============ SLIDE 29: PROVJERA ZNANJA ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.bg };
  addAccentBar(s);
  addTitle(s, "Šta treba znati na kraju v8");

  const checks = [
    "Šta je React i zašto se koristi",
    "Razlika SPA vs MPA",
    "Moderni JS: arrow, destructuring, spread, map/filter",
    "Setup Vite projekta",
    "JSX – šta je i razlike od HTML-a",
    "Kreiranje komponente",
    "Props – prosljeđivanje i destructuring",
    "Odnos roditelj – dijete",
  ];

  checks.forEach((c, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.7 + col * 4.5;
    const y = 1.3 + row * 0.65;

    s.addShape(pres.shapes.OVAL, {
      x, y: y + 0.05, w: 0.35, h: 0.35,
      fill: { color: COLORS.accent }, line: { type: "none" },
    });
    s.addText("✓", {
      x, y: y + 0.05, w: 0.35, h: 0.35,
      fontSize: 14, bold: true, color: COLORS.dark,
      fontFace: FONTS.body, align: "center", valign: "middle", margin: 0,
    });
    s.addText(c, {
      x: x + 0.5, y: y, w: 3.9, h: 0.45,
      fontSize: 13, color: COLORS.textDark, fontFace: FONTS.body,
      valign: "middle", margin: 0,
    });
  });

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.7, y: 4.7, w: 8.6, h: 0.4,
    fill: { color: COLORS.bgSoft }, line: { type: "none" },
  });
  s.addText("U v9 dodajemo interaktivnost: state, hookovi, forme, fetch.", {
    x: 0.7, y: 4.7, w: 8.6, h: 0.4,
    fontSize: 12, italic: true, color: COLORS.accentDark, fontFace: FONTS.body,
    align: "center", valign: "middle", margin: 0,
  });

  addFooter(s, 29);
}

// ============ SLIDE 30: KRAJ ============
{
  const s = pres.addSlide();
  s.background = { color: COLORS.dark };

  s.addShape(pres.shapes.OVAL, {
    x: -1.5, y: 3.5, w: 4, h: 4,
    fill: { color: COLORS.accent, transparency: 85 },
    line: { type: "none" },
  });

  s.addText("Hvala!", {
    x: 0.5, y: 1.8, w: 9, h: 1.2,
    fontSize: 72, bold: true, color: COLORS.white, fontFace: FONTS.header,
    align: "center", margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: 4, y: 3.1, w: 2, h: 0,
    line: { color: COLORS.accent, width: 2 },
  });
  s.addText("Pitanja?", {
    x: 0.5, y: 3.3, w: 9, h: 0.5,
    fontSize: 24, italic: true, color: COLORS.accent, fontFace: FONTS.body,
    align: "center", margin: 0,
  });
  s.addText("Nastavljamo s Vite setupom uživo.", {
    x: 0.5, y: 4.8, w: 9, h: 0.3,
    fontSize: 13, color: "AAAAAA", fontFace: FONTS.body,
    align: "center", margin: 0,
  });
}

// ============ SAVE ============
pres.writeFile({ fileName: "v8-slajdovi.pptx" }).then((fileName) => {
  console.log(`✓ Sačuvano: ${fileName}`);
});
