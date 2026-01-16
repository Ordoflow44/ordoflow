import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarCheck2, Trophy, Wallet, ChevronRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getImageUrl, IMAGES } from '@/lib/supabase'

export default function HomePage() {
  return (
    <>
      <Navbar />
      
      <main>
        {/* HERO SECTION */}
        <section className="lg:pt-48 lg:pb-32 overflow-hidden pt-32 pb-20 relative">
          {/* Background Effects */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-grid pointer-events-none z-0" />
          <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-brand-purple rounded-full blur-[120px] opacity-10 pointer-events-none" />

          <div className="z-10 grid lg:grid-cols-2 gap-12 max-w-7xl mx-auto px-6 relative items-center">
            {/* Left Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-xs font-medium mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-purple opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-purple" />
                </span>
                Nowoczesna Automatyzacja Biznesu
              </div>
              
              <h1 className="leading-[1.1] lg:text-7xl text-4xl font-semibold text-white tracking-tight mb-6">
                Ja automatyzuję procesy.{' '}
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-purple to-white">
                  Ty skalujesz biznes.
                </span>
              </h1>
              
              <p className="leading-relaxed text-lg font-light text-zinc-300 max-w-xl mb-8 md:text-xl">
                Zamień chaos operacyjny w zyskowny system. Wdrażam automatyzację i AI, 
                które realnie oszczędzają czas i pieniądze. Strategiczne rozwiązania 
                od praktyka biznesu, nie teoretyka.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://cal.com/maciej-kanikowski-ordoflow/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  Umów Bezpłatną Konsultację
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
                <Link href="/#case-studies" className="btn-secondary">
                  Zobacz Case Study
                </Link>
              </div>
            </div>

            {/* Right - Hero Image */}
            <div className="lg:h-[500px] flex select-none w-full h-[400px] relative items-center justify-center">
              <Image
                src={getImageUrl(IMAGES.hero)}
                alt="Automatyzacja procesów - przepływ danych"
                fill
                className="object-contain scale-110"
                priority
              />
            </div>
          </div>
        </section>

        {/* PROBLEM SECTION */}
        <section className="border-y bg-zinc-900/20 border-white/5 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16 text-center">
              <h2 className="lg:text-4xl text-3xl font-semibold text-white tracking-tight mb-4">
                Czy Twoja firma też ugrzęzła w mikrozarządzaniu?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Problem Card 1 */}
              <div className="group hover-card bg-zinc-900/40 border border-white/5 rounded-2xl p-8">
                <Image
                  src={getImageUrl(IMAGES.paloneBudget)}
                  alt="Przepalanie marży"
                  width={104}
                  height={104}
                  className="w-26 h-26 mx-auto mb-4 icon-glow-orange"
                />
                <h3 className="text-xl font-medium text-white text-center mb-3">
                  Przepalanie marży
                </h3>
                <p className="text-base font-light text-zinc-300">
                  Płacisz wykwalifikowanym pracownikom za kopiowanie danych między 
                  tabelkami, zamiast za pracę, która przynosi zysk.
                </p>
              </div>

              {/* Problem Card 2 */}
              <div className="group hover-card bg-zinc-900/40 border border-white/5 rounded-2xl p-8">
                <Image
                  src={getImageUrl(IMAGES.crush)}
                  alt="Szklany sufit"
                  width={104}
                  height={104}
                  className="w-26 h-26 mx-auto mb-4 icon-glow-orange"
                />
                <h3 className="text-xl font-medium text-white text-center mb-3">
                  Szklany sufit
                </h3>
                <p className="text-base font-light text-zinc-300">
                  Chcesz skalować biznes, ale operacyjnie nie jesteś w stanie obsłużyć 
                  2x więcej klientów bez zatrudniania armii nowych ludzi.
                </p>
              </div>

              {/* Problem Card 3 */}
              <div className="group hover-card bg-zinc-900/40 border border-white/5 rounded-2xl p-8">
                <Image
                  src={getImageUrl(IMAGES.puzzleGlowa)}
                  alt="Syndrom Kopiuj-Wklej"
                  width={104}
                  height={104}
                  className="w-26 h-26 mx-auto mb-4 icon-glow-orange"
                />
                <h3 className="text-xl font-medium text-white text-center mb-3">
                  Syndrom Kopiuj-Wklej
                </h3>
                <p className="text-base font-light text-zinc-300">
                  Marnujesz cenne godziny na powtarzalne odpisywanie na te same pytania. 
                  Zamiast domykać kluczowe deale, toniesz w bieżączce.
                </p>
              </div>

              {/* Problem Card 4 */}
              <div className="group hover-card bg-zinc-900/40 border border-white/5 rounded-2xl p-8">
                <Image
                  src={getImageUrl(IMAGES.zegar)}
                  alt="Dziurawy lejek"
                  width={104}
                  height={104}
                  className="w-26 h-26 mx-auto mb-4 icon-glow-orange"
                />
                <h3 className="text-xl font-medium text-white text-center mb-3">
                  Dziurawy lejek
                </h3>
                <p className="text-base font-light text-zinc-300">
                  Zapomniane faktury, zgubione leady i pomyłki w zamówieniach. 
                  Przez brak systemu tracisz klientów gotowych zapłacić.
                </p>
              </div>

              {/* Problem Card 5 */}
              <div className="group hover-card bg-zinc-900/40 border border-white/5 rounded-2xl p-8">
                <Image
                  src={getImageUrl(IMAGES.tablet)}
                  alt="Kosztowna Rotacja"
                  width={104}
                  height={104}
                  className="w-26 h-26 mx-auto mb-4 icon-glow-orange"
                />
                <h3 className="text-xl font-medium text-white text-center mb-3">
                  Kosztowna Rotacja
                </h3>
                <p className="text-base font-light text-zinc-300">
                  Pracownicy odchodzą, zabierając know-how ze sobą. Tracisz tygodnie 
                  na drogie szkolenia nowych osób, które bez procedur są zagubione.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTION BRIDGE SECTION */}
        <section className="flex py-32 relative items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-purple/10 via-brand-bg to-brand-bg pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="md:text-5xl lg:text-6xl leading-tight text-4xl font-semibold text-white tracking-tight mb-8">
              Nie potrzebujesz więcej pracowników.{' '}
              <span className="text-brand-purple">Potrzebujesz systemu.</span>
            </h2>
            <p className="md:text-xl leading-relaxed text-lg font-light text-zinc-400 max-w-2xl mx-auto">
              Większość firm próbuje walczyć z chaosem, zatrudniając kolejnych asystentów. 
              Ja rozwiązuję go, budując{' '}
              <span className="text-white font-medium">cyfrowych pracowników</span>, 
              którzy pracują 24/7. Jako przedsiębiorca z 15-letnim stażem, nie patrzę w kod. 
              Patrzę w Twój rachunek zysków i strat (P&L).
            </p>
          </div>
        </section>

        {/* CASE STUDIES SECTION */}
        <section id="case-studies" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <Trophy className="w-8 h-8 text-brand-purple mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-zinc-200">
                Systemy, które realnie działają
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Case Study 1 */}
              <div className="group hover-card bg-zinc-900/40 border border-white/5 rounded-2xl p-8">
                <Image
                  src={getImageUrl(IMAGES.iconBlyskawica)}
                  alt="Cyfrowy Onboarding"
                  width={104}
                  height={104}
                  className="w-26 h-26 mx-auto mb-4 icon-glow-purple"
                />
                <h3 className="text-xl font-medium text-white text-center mb-3">
                  Cyfrowy Onboarding
                </h3>
                <p className="text-base font-light text-zinc-300">
                  Zamiast tracić tygodnie na ręczne szkolenie każdego nowego pracownika, 
                  dajesz mu dostęp do interaktywnego systemu, który wdraża go krok po kroku.{' '}
                  <span className="text-brand-purple font-medium">
                    WYNIK: Nowy pracownik gotowy w 7 dni, nie 3 miesiące.
                  </span>
                </p>
              </div>

              {/* Case Study 2 */}
              <div className="group hover-card bg-zinc-900/40 border border-white/5 rounded-2xl p-8">
                <Image
                  src={getImageUrl(IMAGES.puzzlePolaczone)}
                  alt="Asystent Sprzedaży 24/7"
                  width={104}
                  height={104}
                  className="w-26 h-26 mx-auto mb-4 icon-glow-purple"
                />
                <h3 className="text-xl font-medium text-white text-center mb-3">
                  Asystent Sprzedaży 24/7
                </h3>
                <p className="text-base font-light text-zinc-300">
                  AI, które natychmiast reaguje na wpadające leady, kwalifikuje klientów 
                  i umawia spotkania w Twoim kalendarzu.{' '}
                  <span className="text-brand-purple font-medium">
                    WYNIK: 100% obsłużonych zapytań w czasie poniżej 1 minuty.
                  </span>
                </p>
              </div>

              {/* Case Study 3 */}
              <div className="group hover-card bg-zinc-900/40 border border-white/5 rounded-2xl p-8">
                <Image
                  src={getImageUrl(IMAGES.puzzlePolaczone)}
                  alt="Integracja Narzędzi"
                  width={104}
                  height={104}
                  className="w-26 h-26 mx-auto mb-4 icon-glow-purple"
                />
                <h3 className="text-xl font-medium text-white text-center mb-3">
                  Integracja Narzędzi
                </h3>
                <p className="text-base font-light text-zinc-300">
                  Nie musisz zmieniać oprogramowania na nowe. Sprawiamy, że Twój obecny CRM, 
                  Excel i bank zaczynają ze sobą rozmawiać.{' '}
                  <span className="text-brand-purple font-medium">
                    WYNIK: Koniec z ręcznym przepisywaniem danych.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="about" className="relative w-full min-h-[800px] flex items-center overflow-hidden border-y border-white/5 py-32">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={getImageUrl(IMAGES.maciejTlo)}
              alt="Maciej Kanikowski"
              fill
              className="object-cover select-none pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent from-[45%] via-black/80 to-black" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 w-full">
            {/* Spacer for image */}
            <div className="hidden lg:block lg:col-span-5" />

            {/* Content */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              {/* About Card */}
              <div className="backdrop-blur-3xl bg-zinc-950/80 p-10 rounded-[2.5rem] border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                <h2 className="text-4xl font-semibold text-white tracking-tight mb-6 leading-tight">
                  Jestem przedsiębiorcą, który rozumie technologię.
                </h2>
                <div className="md:text-base leading-relaxed text-sm font-normal text-zinc-300 max-w-2xl">
                  <p className="mb-5">
                    Doświadczenie zdobywałem w największych{' '}
                    <span className="text-white font-medium">światowych korporacjach</span>, 
                    a od 15 lat prowadzę własne firmy.
                  </p>
                  <p className="mb-5">
                    Wiem, że nie potrzebujesz skomplikowanego kodu – potrzebujesz rozwiązań, które{' '}
                    <span className="text-purple-400 font-medium">uwolnią Twój czas</span>, 
                    ograniczą koszty i{' '}
                    <span className="text-purple-400 font-medium">zwiększą marżę</span>.
                  </p>
                  <p>
                    Nie jestem programistą, który gubi się w technicznych detalach. 
                    Patrzę na biznes z Twojej perspektywy:{' '}
                    <span className="text-white font-medium">identyfikuję wąskie gardła</span>{' '}
                    i dostarczam gotowe, zyskowne systemy.
                  </p>
                </div>

                <div className="mt-10 flex items-center gap-4">
                  <Image
                    src={getImageUrl(IMAGES.maciejTablet)}
                    alt="Maciej Kanikowski"
                    width={56}
                    height={56}
                    className="w-14 h-14 object-cover border-purple-500/50 border rounded-full shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                  />
                  <div>
                    <p className="text-white font-medium text-lg">Maciej Kanikowski</p>
                    <p className="text-purple-400 text-[10px] font-medium tracking-[0.2em] uppercase drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
                      Founder & Automation Architect
                    </p>
                  </div>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="overflow-hidden bg-zinc-950/90 border border-white/20 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-3xl">
                <div className="grid grid-cols-2 text-sm">
                  {/* Header */}
                  <div className="p-6 border-b border-r border-white/10 bg-white/5 text-white/50">
                    <p className="text-[10px] uppercase tracking-[0.2em] mb-1">Typowy Informatyk</p>
                    <div className="h-0.5 w-8 bg-zinc-800 rounded-full" />
                  </div>
                  <div className="p-6 border-b border-white/10 bg-purple-600/20 relative shadow-[inset_0_0_20px_rgba(168,85,247,0.2)]">
                    <span className="absolute top-0 right-0 bg-purple-600 text-[9px] text-white px-3 py-1 rounded-bl-xl font-bold tracking-widest uppercase">
                      Polecane
                    </span>
                    <p className="text-white font-semibold mb-1 text-base">Ja (Twój Partner)</p>
                    <div className="h-0.5 w-8 bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,1)] rounded-full" />
                  </div>

                  {/* Row 1 */}
                  <div className="p-4 md:p-6 border-b border-r border-white/10 text-white/60 font-light italic flex items-center gap-3 text-xs md:text-sm">
                    <span className="text-red-500 text-xl not-italic drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">✕</span>
                    Mówi o API i serwerach
                  </div>
                  <div className="flex gap-3 md:gap-4 font-medium text-white bg-purple-500/10 border-white/10 border-b p-4 md:p-6 items-center shadow-[inset_0_0_20px_rgba(168,85,247,0.2)]">
                    <Image
                      src={getImageUrl(IMAGES.checkbox)}
                      alt="Check"
                      width={40}
                      height={40}
                      className="w-10 h-10 md:w-12 md:h-12 icon-glow-purple flex-shrink-0"
                    />
                    <span className="text-xs md:text-sm">Mówię o marży i zyskach</span>
                  </div>

                  {/* Row 2 */}
                  <div className="p-4 md:p-6 border-b border-r border-white/10 text-white/60 font-light italic flex items-center gap-3 text-xs md:text-sm">
                    <span className="text-red-500 text-xl not-italic drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">✕</span>
                    Buduje od zera (6 msc)
                  </div>
                  <div className="p-4 md:p-6 border-b border-white/10 text-white font-medium flex items-center gap-3 md:gap-4 bg-purple-500/10 shadow-[inset_0_0_20px_rgba(168,85,247,0.2)]">
                    <Image
                      src={getImageUrl(IMAGES.checkbox)}
                      alt="Check"
                      width={40}
                      height={40}
                      className="w-10 h-10 md:w-12 md:h-12 icon-glow-purple flex-shrink-0"
                    />
                    <span className="text-xs md:text-sm">Łączę gotowe klocki w kilka dni</span>
                  </div>

                  {/* Row 3 */}
                  <div className="p-4 md:p-6 border-r border-white/10 text-white/60 font-light italic flex items-center gap-3 text-xs md:text-sm">
                    <span className="text-red-500 text-xl not-italic drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]">✕</span>
                    Zostawia czarną skrzynkę
                  </div>
                  <div className="flex font-medium text-white bg-purple-500/10 p-4 md:p-6 pb-8 md:pb-10 gap-3 md:gap-4 items-center min-h-full shadow-[inset_0_0_20px_rgba(168,85,247,0.2)]">
                    import Image from 'next/image'
                    <Image
                      src="https://ydpkhdwqkbxifgnlwtrq.supabase.co/storage/v1/object/public/Images/checkbox.png"
                      alt="Check"
                      width={40}
                      height={40}
                      className="w-10 h-10 md:w-12 md:h-12 icon-glow-purple flex-shrink-0"
                      unoptimized
                    />
                    <span className="leading-tight text-xs md:text-sm">Otrzymujesz instrukcję i opiekę</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight text-center mb-16">
              Prosty proces. Konkretne wyniki.
            </h2>

            {/* Timeline */}
            <div className="grid md:grid-cols-4 gap-4 mb-16">
              {/* Step 1 */}
              <div className="relative p-6 rounded-xl border border-white/5 bg-zinc-900/30">
                <div className="text-brand-purple font-mono text-xs mb-3">01</div>
                <h4 className="text-white font-medium mb-2">Audyt i Diagnoza</h4>
                <p className="text-xs text-zinc-500">30 min rozmowy</p>
                <div className="hidden md:block absolute top-1/2 -right-2.5 transform -translate-y-1/2 z-10 text-zinc-700">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative p-6 rounded-xl border border-white/5 bg-zinc-900/30">
                <div className="text-brand-purple font-mono text-xs mb-3">02</div>
                <h4 className="text-white font-medium mb-2">Plan i Wycena</h4>
                <p className="text-xs text-zinc-500">Fixed Price</p>
                <div className="hidden md:block absolute top-1/2 -right-2.5 transform -translate-y-1/2 z-10 text-zinc-700">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative p-6 rounded-xl border border-white/5 bg-zinc-900/30">
                <div className="text-brand-purple font-mono text-xs mb-3">03</div>
                <h4 className="text-white font-medium mb-2">Budowa</h4>
                <p className="text-xs text-zinc-500">Sprint No-Code</p>
                <div className="hidden md:block absolute top-1/2 -right-2.5 transform -translate-y-1/2 z-10 text-zinc-700">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>

              {/* Step 4 */}
              <div className="p-6 rounded-xl border border-white/5 bg-zinc-900/30">
                <div className="text-brand-purple font-mono text-xs mb-3">04</div>
                <h4 className="text-white font-medium mb-2">Przekazanie</h4>
                <p className="text-xs text-zinc-500">i Szkolenie</p>
              </div>
            </div>

            {/* Pricing Box */}
            <div className="max-w-2xl mx-auto rounded-2xl p-[1px] bg-gradient-to-r from-zinc-800 via-brand-purple to-zinc-800">
              <div className="bg-brand-card rounded-2xl p-8 text-center">
                <span className="inline-block p-3 rounded-full bg-brand-purple/10 text-brand-purple mb-4">
                  <Wallet className="w-6 h-6" />
                </span>
                <p className="text-lg font-medium text-white mb-2">Jasne zasady finansowe</p>
                <p className="font-light text-zinc-400">
                  Projekty szyte na miarę – ustalane po audycie
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section id="contact" className="py-24 relative overflow-hidden border-t border-white/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-purple rounded-full blur-[150px] opacity-10 pointer-events-none" />

          <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl lg:text-5xl font-semibold text-white tracking-tight mb-6">
              Sprawdźmy, czy mogę Ci pomóc.
            </h2>
            <p className="text-lg text-zinc-400 font-light mb-10">
              Wybierz dogodny termin w kalendarzu na bezpłatną konsultację wstępną.
            </p>
            <a
              href="https://cal.com/maciej-kanikowski-ordoflow/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base py-4 shadow-lg shadow-purple-900/20"
            >
              Otwórz Kalendarz
              <CalendarCheck2 className="ml-2 w-5 h-5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
