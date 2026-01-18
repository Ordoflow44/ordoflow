import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getImageUrl, IMAGES } from '@/lib/supabase'

// Komponent CTA używany pod każdą sekcją
function CTAButton({ variant = 'primary' }: { variant?: 'primary' | 'secondary' }) {
  if (variant === 'secondary') {
    return (
      <Link
        href="#contact"
        className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-purple-400 hover:text-white border border-purple-500/30 hover:border-purple-500 rounded-xl transition-all hover:bg-purple-500/10"
      >
        <span>Umów bezpłatną konsultację</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    )
  }
  
  return (
    <Link
      href="#contact"
      className="btn-primary group"
    >
      <span>Umów bezpłatną konsultację</span>
      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
    </Link>
  )
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      
      <main>
        {/* HERO SECTION */}
        <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 grid-bg opacity-50" />
          <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-purple-600 rounded-full blur-[150px] opacity-20" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500 rounded-full blur-[150px] opacity-10" />

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <div className="space-y-8">
                <div className="tag">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
                  </span>
                  Automatyzacja · AI · No-Code
                </div>

                <h1 className="font-display text-5xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                  Ja automatyzuję procesy.<br />
                  <span className="text-gradient">Ty skalujesz biznes.</span>
                </h1>

                <p className="text-xl lg:text-2xl text-gray-300 font-light leading-relaxed max-w-xl">
                  Zamień chaos operacyjny w zyskowny system. Wdrażam automatyzację i AI, 
                  które realnie oszczędzają czas i pieniądze.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <CTAButton />
                  <Link href="#case-studies" className="btn-secondary">
                    Zobacz Case Study
                  </Link>
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center">
                <Image
                  src={getImageUrl(IMAGES.hero)}
                  alt="Automatyzacja procesów biznesowych"
                  fill
                  className="object-contain animate-float"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* PROBLEMS SECTION */}
        <section className="relative py-24 border-y border-white/5 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent">
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-16 space-y-4">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">
                Czy Twoja firma też ugrzęzła w mikrozarządzaniu?
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Poznaj najczęstsze pułapki, które zabijają efektywność i marże
              </p>
            </div>

            {/* Problem Cards Grid - Row 1: 3 cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-8">
              {/* Card 1 */}
              <div className="group hover-card card h-full">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-32 h-32 mb-6 flex items-center justify-center">
                    <Image
                      src={getImageUrl(IMAGES.przepalanie)}
                      alt="Przepalanie marży"
                      width={128}
                      height={128}
                      className="w-full h-full object-contain img-glow-orange"
                    />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-4">
                    Przepalanie marży
                  </h3>
                  <p className="text-gray-400 leading-relaxed flex-grow">
                    Płacisz wykwalifikowanym pracownikom za kopiowanie danych między 
                    tabelkami, zamiast za pracę, która przynosi zysk.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group hover-card card h-full">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-32 h-32 mb-6 flex items-center justify-center">
                    <Image
                      src={getImageUrl(IMAGES.szklanySufit)}
                      alt="Szklany sufit"
                      width={128}
                      height={128}
                      className="w-full h-full object-contain img-glow-orange"
                    />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-4">
                    Szklany sufit
                  </h3>
                  <p className="text-gray-400 leading-relaxed flex-grow">
                    Chcesz skalować biznes, ale operacyjnie nie jesteś w stanie obsłużyć 
                    2x więcej klientów bez zatrudniania armii nowych ludzi.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group hover-card card h-full">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-32 h-32 mb-6 flex items-center justify-center">
                    <Image
                      src={getImageUrl(IMAGES.syndrom)}
                      alt="Syndrom Kopiuj-Wklej"
                      width={128}
                      height={128}
                      className="w-full h-full object-contain img-glow-orange"
                    />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-4">
                    Syndrom Kopiuj-Wklej
                  </h3>
                  <p className="text-gray-400 leading-relaxed flex-grow">
                    Marnujesz cenne godziny na powtarzalne odpisywanie na te same pytania. 
                    Zamiast domykać kluczowe deale, toniesz w bieżączce.
                  </p>
                </div>
              </div>
            </div>

            {/* Problem Cards Grid - Row 2: 2 cards centered */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
              {/* Card 4 */}
              <div className="group hover-card card h-full">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-32 h-32 mb-6 flex items-center justify-center">
                    <Image
                      src={getImageUrl(IMAGES.lejek)}
                      alt="Dziurawy lejek"
                      width={128}
                      height={128}
                      className="w-full h-full object-contain img-glow-orange"
                    />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-4">
                    Dziurawy lejek
                  </h3>
                  <p className="text-gray-400 leading-relaxed flex-grow">
                    Zapomniane faktury, zgubione leady i pomyłki w zamówieniach. 
                    Przez brak systemu tracisz klientów gotowych zapłacić.
                  </p>
                </div>
              </div>

              {/* Card 5 */}
              <div className="group hover-card card h-full">
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-32 h-32 mb-6 flex items-center justify-center">
                    <Image
                      src={getImageUrl(IMAGES.rotacja)}
                      alt="Kosztowna Rotacja"
                      width={128}
                      height={128}
                      className="w-full h-full object-contain img-glow-orange"
                    />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-4">
                    Kosztowna Rotacja
                  </h3>
                  <p className="text-gray-400 leading-relaxed flex-grow">
                    Pracownicy odchodzą, zabierając know-how. Tracisz tygodnie na drogie 
                    szkolenia nowych osób, które bez procedur są zagubione.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA pod sekcją */}
            <div className="text-center">
              <CTAButton />
            </div>
          </div>
        </section>

        {/* SOLUTION BRIDGE */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600 rounded-full blur-[200px] opacity-10" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Nie potrzebujesz więcej pracowników.<br />
              <span className="text-gradient">Potrzebujesz systemu.</span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-300 font-light leading-relaxed max-w-3xl mx-auto">
              Większość firm próbuje walczyć z chaosem, zatrudniając kolejnych asystentów. 
              Ja rozwiązuję go, budując{' '}
              <span className="text-white font-semibold">cyfrowych pracowników</span>, 
              którzy pracują 24/7. Jako przedsiębiorca z 15-letnim stażem, nie patrzę w kod. 
              Patrzę w Twój rachunek zysków i strat (P&L).
            </p>
            
            {/* CTA pod sekcją */}
            <div className="pt-4">
              <CTAButton />
            </div>
          </div>
        </section>

        {/* CASE STUDIES */}
        <section id="case-studies" className="py-24 bg-gradient-to-b from-transparent via-gray-900/20 to-transparent">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
              <div className="tag mx-auto">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
                <span>Sprawdzone Rozwiązania</span>
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">
                Systemy, które realnie działają
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Case Study 1 */}
              <div className="group hover-card gradient-border p-8 space-y-6 h-full flex flex-col">
                <div className="w-32 h-32 mx-auto flex items-center justify-center">
                  <Image
                    src={getImageUrl(IMAGES.onboarding)}
                    alt="Cyfrowy Onboarding"
                    width={128}
                    height={128}
                    className="w-full h-full object-contain img-glow"
                  />
                </div>
                <h3 className="font-display text-2xl font-bold text-white text-center">
                  Cyfrowy Onboarding
                </h3>
                <p className="text-gray-400 leading-relaxed flex-grow">
                  Zamiast tracić tygodnie na ręczne szkolenie każdego nowego pracownika, 
                  dajesz mu dostęp do interaktywnego systemu, który wdraża go krok po kroku.
                </p>
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-purple-400 font-semibold">
                    ✓ Nowy pracownik gotowy w 7 dni, nie 3 miesiące
                  </p>
                </div>
              </div>

              {/* Case Study 2 */}
              <div className="group hover-card gradient-border p-8 space-y-6 h-full flex flex-col">
                <div className="w-32 h-32 mx-auto flex items-center justify-center">
                  <Image
                    src={getImageUrl(IMAGES.asystent)}
                    alt="Asystent Sprzedaży 24/7"
                    width={128}
                    height={128}
                    className="w-full h-full object-contain img-glow"
                  />
                </div>
                <h3 className="font-display text-2xl font-bold text-white text-center">
                  Asystent Sprzedaży 24/7
                </h3>
                <p className="text-gray-400 leading-relaxed flex-grow">
                  AI, które natychmiast reaguje na wpadające leady, kwalifikuje klientów 
                  i umawia spotkania w Twoim kalendarzu.
                </p>
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-purple-400 font-semibold">
                    ✓ 100% obsłużonych zapytań w &lt; 1 minuty
                  </p>
                </div>
              </div>

              {/* Case Study 3 */}
              <div className="group hover-card gradient-border p-8 space-y-6 h-full flex flex-col">
                <div className="w-32 h-32 mx-auto flex items-center justify-center">
                  <Image
                    src={getImageUrl(IMAGES.integracja)}
                    alt="Integracja Narzędzi"
                    width={128}
                    height={128}
                    className="w-full h-full object-contain img-glow"
                  />
                </div>
                <h3 className="font-display text-2xl font-bold text-white text-center">
                  Integracja Narzędzi
                </h3>
                <p className="text-gray-400 leading-relaxed flex-grow">
                  Nie musisz zmieniać oprogramowania. Sprawiamy, że Twój obecny CRM, 
                  Excel i bank zaczynają ze sobą rozmawiać.
                </p>
                <div className="pt-4 border-t border-gray-800">
                  <p className="text-purple-400 font-semibold">
                    ✓ Koniec z ręcznym przepisywaniem danych
                  </p>
                </div>
              </div>
            </div>

            {/* CTA pod sekcją */}
            <div className="text-center">
              <CTAButton />
            </div>
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section id="about" className="relative py-32 overflow-hidden border-y border-white/5">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={getImageUrl(IMAGES.maciejTlo)}
              alt="Maciej Kanikowski"
              fill
              className="object-cover opacity-70"
            />
            {/* Gradient odwrócony - postać (lewa strona) widoczna, prawa przyciemniona */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0A0A0F]/70 to-[#0A0A0F]" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/40 via-transparent to-[#0A0A0F]/40" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left: Empty space for image */}
              <div className="hidden lg:block lg:col-span-5" />

              {/* Right: Content */}
              <div className="lg:col-span-7 space-y-8">
                {/* Main Card */}
                <div className="card-glass p-10 space-y-6">
                  <h2 className="font-display text-4xl lg:text-5xl font-bold text-white leading-tight">
                    Jestem przedsiębiorcą, który rozumie technologię.
                  </h2>

                  <div className="space-y-5 text-gray-300 text-lg leading-relaxed">
                    <p>
                      Doświadczenie zdobywałem w największych{' '}
                      <span className="text-white font-semibold">światowych korporacjach</span>, 
                      a od 15 lat prowadzę własne firmy.
                    </p>
                    <p>
                      Wiem, że nie potrzebujesz skomplikowanego kodu — potrzebujesz rozwiązań, które{' '}
                      <span className="text-purple-400 font-semibold">uwolnią Twój czas</span>, 
                      ograniczą koszty i{' '}
                      <span className="text-purple-400 font-semibold">zwiększą marżę</span>.
                    </p>
                    <p>
                      Nie jestem programistą, który gubi się w technicznych detalach. 
                      Patrzę na biznes z Twojej perspektywy:{' '}
                      <span className="text-white font-semibold">identyfikuję wąskie gardła</span>{' '}
                      i dostarczam gotowe, zyskowne systemy.
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-800">
                    <Image
                      src={getImageUrl(IMAGES.maciejTablet)}
                      alt="Maciej Kanikowski"
                      width={64}
                      height={64}
                      className="w-16 h-16 rounded-full object-cover border-2 border-purple-500 glow-purple"
                    />
                    <div>
                      <p className="text-white font-bold text-xl">Maciej Kanikowski</p>
                      <p className="text-purple-400 text-sm font-mono uppercase tracking-wider">
                        Founder & Automation Architect
                      </p>
                    </div>
                  </div>
                </div>

                {/* Comparison Table */}
                <div className="card-glass overflow-hidden">
                  <div className="grid grid-cols-2 text-sm">
                    {/* Header Row */}
                    <div className="p-6 border-b border-r border-gray-800 bg-gray-900/50">
                      <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Typowy Informatyk</p>
                      <div className="h-1 w-12 bg-gray-700 rounded-full" />
                    </div>
                    <div className="p-6 border-b border-gray-800 bg-purple-600/10 relative">
                      <span className="absolute top-0 right-0 bg-purple-600 text-white text-xs px-3 py-1 rounded-bl-xl font-bold">
                        POLECANE
                      </span>
                      <p className="text-white font-bold text-lg mb-2">Ja (Twój Partner)</p>
                      <div className="h-1 w-12 bg-purple-500 rounded-full glow-purple" />
                    </div>

                    {/* Row 1 */}
                    <div className="p-6 border-b border-r border-gray-800 flex items-center gap-3 text-gray-500">
                      <span className="text-red-500 text-2xl">✕</span>
                      <span>Mówi o API i serwerach</span>
                    </div>
                    <div className="p-6 border-b border-gray-800 bg-purple-500/5 flex items-center gap-3">
                      <Image
                        src={getImageUrl(IMAGES.checkbox)}
                        alt="Check"
                        width={24}
                        height={24}
                        className="w-6 h-6 img-glow"
                      />
                      <span className="text-white font-medium">Mówię o marży i zyskach</span>
                    </div>

                    {/* Row 2 */}
                    <div className="p-6 border-b border-r border-gray-800 flex items-center gap-3 text-gray-500">
                      <span className="text-red-500 text-2xl">✕</span>
                      <span>Buduje od zera (6 msc)</span>
                    </div>
                    <div className="p-6 border-b border-gray-800 bg-purple-500/5 flex items-center gap-3">
                      <Image
                        src={getImageUrl(IMAGES.checkbox)}
                        alt="Check"
                        width={24}
                        height={24}
                        className="w-6 h-6 img-glow"
                      />
                      <span className="text-white font-medium">Łączę gotowe klocki w kilka dni</span>
                    </div>

                    {/* Row 3 */}
                    <div className="p-6 border-r border-gray-800 flex items-center gap-3 text-gray-500">
                      <span className="text-red-500 text-2xl">✕</span>
                      <span>Zostawia czarną skrzynkę</span>
                    </div>
                    <div className="p-6 bg-purple-500/5 flex items-center gap-3">
                      <Image
                        src={getImageUrl(IMAGES.checkbox)}
                        alt="Check"
                        width={24}
                        height={24}
                        className="w-6 h-6 img-glow"
                      />
                      <span className="text-white font-medium">Otrzymujesz instrukcję i opiekę</span>
                    </div>
                  </div>
                </div>

                {/* CTA pod sekcją */}
                <div className="text-center pt-4">
                  <CTAButton />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-30" />
          
          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 space-y-4">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white">
                Prosty proces. Konkretne wyniki.
              </h2>
              <p className="text-xl text-gray-400">
                Od diagnozy do wdrożenia w 4 prostych krokach
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {/* Step 1 */}
              <div className="relative group">
                <div className="h-full bg-gradient-to-b from-purple-900/20 to-gray-900/40 border-2 border-purple-500/30 hover:border-purple-500 rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-5xl font-bold text-gradient">01</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">
                    Audyt i Diagnoza
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    Analizuję Twoje procesy i identyfikuję miejsca, gdzie tracisz czas i pieniądze.
                  </p>
                  <div className="inline-flex items-center gap-2 text-purple-400 font-mono text-sm">
                    <span>30 min rozmowy</span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group">
                <div className="h-full bg-gradient-to-b from-purple-900/20 to-gray-900/40 border-2 border-purple-500/30 hover:border-purple-500 rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-5xl font-bold text-gradient">02</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">
                    Plan i Wycena
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    Przygotowuję szczegółowy plan działania z jasną wyceną. Bez ukrytych kosztów.
                  </p>
                  <div className="inline-flex items-center gap-2 text-purple-400 font-mono text-sm">
                    <span>Fixed Price</span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative group">
                <div className="h-full bg-gradient-to-b from-purple-900/20 to-gray-900/40 border-2 border-purple-500/30 hover:border-purple-500 rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-5xl font-bold text-gradient">03</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">
                    Budowa
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    Wdrażam system używając sprawdzonych narzędzi No-Code. Szybko i efektywnie.
                  </p>
                  <div className="inline-flex items-center gap-2 text-purple-400 font-mono text-sm">
                    <span>Sprint 7-14 dni</span>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative group">
                <div className="h-full bg-gradient-to-b from-cyan-900/20 to-gray-900/40 border-2 border-cyan-500/30 hover:border-cyan-500 rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display text-5xl font-bold text-gradient">04</span>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white mb-3">
                    Przekazanie
                  </h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    Szkolę Ciebie i Twój zespół. Dostarczam dokumentację i zapewniam wsparcie.
                  </p>
                  <div className="inline-flex items-center gap-2 text-cyan-400 font-mono text-sm">
                    <span>+ Dokumentacja</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing CTA */}
            <div className="max-w-3xl mx-auto mb-12">
              <div className="gradient-border p-1">
                <div className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-12 text-center space-y-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-purple-600/20 flex items-center justify-center glow-purple">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white">
                    Jasne zasady finansowe
                  </h3>
                  <p className="text-xl text-gray-400 max-w-xl mx-auto leading-relaxed">
                    Projekty szyte na miarę — ustalane po audycie.<br />
                    Bez ukrytych kosztów. Płacisz tylko za efekty.
                  </p>
                  <div className="flex flex-wrap gap-4 justify-center pt-4">
                    <div className="flex items-center gap-2 text-purple-400">
                      <Check className="w-5 h-5" />
                      <span>Fixed Price</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-400">
                      <Check className="w-5 h-5" />
                      <span>Bez Subskrypcji</span>
                    </div>
                    <div className="flex items-center gap-2 text-purple-400">
                      <Check className="w-5 h-5" />
                      <span>ROI Gwarantowane</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA pod sekcją */}
            <div className="text-center">
              <CTAButton />
            </div>
          </div>
        </section>

        {/* CONTACT FORM SECTION */}
        <section id="contact" className="relative py-32 overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600 rounded-full blur-[200px] opacity-20" />

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-10">
            <h2 className="font-display text-4xl lg:text-6xl font-bold text-white leading-tight">
              Sprawdźmy, czy mogę Ci pomóc.
            </h2>
            <p className="text-xl lg:text-2xl text-gray-400 font-light max-w-2xl mx-auto">
              Wybierz dogodny termin w kalendarzu na bezpłatną konsultację wstępną.
            </p>
            
            {/* Przycisk prowadzący do Cal.com */}
            <a
              href="https://cal.com/maciej-kanikowski-ordoflow/analiza-waskich-gardel?overlayCalendar=true"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 px-10 py-5 text-lg font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition-all glow-purple-intense shadow-2xl shadow-purple-900/30"
            >
              <span>Umów bezpłatną konsultację</span>
              <svg className="group-hover:translate-x-1 transition-transform" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <path d="m9 16 2 2 4-4" />
              </svg>
            </a>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto">
              <div className="text-center space-y-2">
                <div className="text-4xl font-display font-bold text-gradient">15+</div>
                <p className="text-gray-400">Lat doświadczenia</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl font-display font-bold text-gradient">100%</div>
                <p className="text-gray-400">Zadowolonych klientów</p>
              </div>
              <div className="text-center space-y-2">
                <div className="text-4xl font-display font-bold text-gradient">7-14</div>
                <p className="text-gray-400">Dni do wdrożenia</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
