# Ordoflow - Strona z blogiem i panelem admina

## 🚀 Szybki start

### 1. Sklonuj repozytorium
```bash
git clone https://github.com/TWOJ-USERNAME/ordoflow.git
cd ordoflow
```

### 2. Zainstaluj zależności
```bash
npm install
```

### 3. Skonfiguruj Supabase

1. Wejdź do panelu Supabase
2. Przejdź do **SQL Editor**
3. Skopiuj zawartość pliku `supabase/schema.sql`
4. Wklej i uruchom (kliknij "Run")

### 4. Skonfiguruj zmienne środowiskowe

Utwórz plik `.env.local` w głównym katalogu:

```env
NEXT_PUBLIC_SUPABASE_URL=https://ydpkhdwqkbxifgnlwtrq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=twoj_klucz_anon
ADMIN_PASSWORD=twoje_haslo_do_panelu
```

### 5. Uruchom lokalnie
```bash
npm run dev
```

Strona będzie dostępna na `http://localhost:3000`

---

## 📁 Struktura projektu

```
ordoflow/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Landing page
│   │   ├── blog/
│   │   │   ├── page.tsx       # Lista artykułów
│   │   │   └── [slug]/page.tsx # Pojedynczy artykuł
│   │   ├── admin/
│   │   │   ├── page.tsx       # Logowanie
│   │   │   ├── dashboard/     # Dashboard
│   │   │   ├── articles/      # Zarządzanie artykułami
│   │   │   ├── seo/           # Dashboard SEO
│   │   │   └── settings/      # Ustawienia
│   │   └── api/               # API endpoints
│   ├── components/            # Komponenty React
│   ├── lib/                   # Biblioteki i helpery
│   └── types/                 # TypeScript types
├── supabase/
│   └── schema.sql             # Schema bazy danych
└── public/                    # Pliki statyczne
```

---

## 🔐 Panel Admina

- URL: `https://ordoflow.pl/admin`
- Hasło: zdefiniowane w `ADMIN_PASSWORD`

### Funkcje:
- ✅ Dashboard ze statystykami
- ✅ Tworzenie i edycja artykułów
- ✅ SEO meta tagi i FAQ (dla AI Overviews)
- ✅ Zarządzanie kategoriami i tagami
- 🔜 Integracja z Google Search Console
- 🔜 Integracja z Google Analytics 4

---

## 🖼️ Obrazki

Obrazki są hostowane w Supabase Storage w buckecie `images`.

URL obrazka: `https://ydpkhdwqkbxifgnlwtrq.supabase.co/storage/v1/object/public/images/NAZWA_PLIKU`

Dostępne obrazki:
- `Logo.png` - logo Ordoflow
- `Przeplyw.webp` - grafika hero
- `Maciej_tlo.png` - tło sekcji About
- `Maciej_tablet.png` - avatar
- Ikony sekcji problemów i case studies

---

## 🌐 Deploy na Vercel

### 1. Połącz repozytorium
1. Wejdź na [vercel.com](https://vercel.com)
2. Kliknij "Add New Project"
3. Zaimportuj repozytorium `ordoflow` z GitHub

### 2. Skonfiguruj zmienne środowiskowe
W Vercel → Settings → Environment Variables dodaj:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `ADMIN_PASSWORD`

### 3. Podepnij domenę
W Vercel → Settings → Domains:
1. Dodaj `ordoflow.pl`
2. Skopiuj rekordy DNS
3. W panelu Cyberfolks zmień DNS na podane przez Vercel

---

## 📊 SEO i AI Overviews

Każdy artykuł ma:
- Meta title i description
- Structured data (JSON-LD Article)
- FAQ schema dla AI Overviews
- Open Graph i Twitter cards

---

## 🛠️ Rozwój

### Dodanie integracji GA4/GSC

W pliku `src/app/layout.tsx` dodaj skrypt GA:

```tsx
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
  `}
</Script>
```

---

## 📝 Licencja

Projekt prywatny - Ordoflow © 2024
