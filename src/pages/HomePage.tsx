import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { useDemoData } from '../hooks/useDemoData';
import { CORE_SERVICES } from '../data/mockData';
import { SEED_LEADERSHIP } from '../data/seedData';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import {
  MessageSquareShare,
  Compass,
  FileCheck2,
  Users,
  Calendar,
  MapPin,
  ChevronRight,
  ArrowRight,
  Building,
  Send,
} from 'lucide-react';
import { IndustrialAdvantageSection, IndustryReferenceSection, PrimaryModulesSection } from '../components/common/HomeIndustrySections';
import { Reveal } from '../components/animations/Reveal';
import { TiltCard } from '../components/animations/TiltCard';
import { ParticleConstellation } from '../components/animations/ParticleConstellation';
import { Magnetic } from '../components/animations/Magnetic';

export const HomePage: React.FC = () => {
  const { language, t } = useLanguage();
  const { events } = useDemoData();

  // Helper to render service icon
  const renderServiceIcon = (iconName: string, color: string) => {
    switch (iconName) {
      case 'MessageSquareShare':
        return <MessageSquareShare className={`w-6 h-6 ${color}`} />;
      case 'Compass':
        return <Compass className={`w-6 h-6 ${color}`} />;
      case 'FileCheck2':
        return <FileCheck2 className={`w-6 h-6 ${color}`} />;
      case 'Users':
        return <Users className={`w-6 h-6 ${color}`} />;
      default:
        return <Building className={`w-6 h-6 ${color}`} />;
    }
  };

  const getServiceRoute = (id: string) => {
    switch (id) {
      case 'samvaad':
        return '/udyog-samvaad';
      case 'darshan':
        return '/udyog-darshan';
      case 'grievance':
        return '/grievance';
      case 'leadership':
        return '/meeting-request';
      default:
        return '/';
    }
  };

  const getServiceTitle = (item: (typeof CORE_SERVICES)[0]) => {
    if (language === 'mr') return item.titleMr;
    if (language === 'hi') return item.titleHi;
    return item.titleEn;
  };

  const getServiceDesc = (item: (typeof CORE_SERVICES)[0]) => {
    if (language === 'mr') return item.descriptionMr;
    if (language === 'hi') return item.descriptionHi;
    return item.descriptionEn;
  };

  const getServiceBadge = (item: (typeof CORE_SERVICES)[0]) => {
    if (language === 'mr') return item.badgeMr;
    if (language === 'hi') return item.badgeHi;
    return item.badgeEn;
  };

  const getServiceCta = (item: (typeof CORE_SERVICES)[0]) => {
    if (language === 'mr') return item.ctaTextMr;
    if (language === 'hi') return item.ctaTextHi;
    return item.ctaTextEn;
  };

  return (
    <div className="flex-1 bg-white font-devanagari text-[#111827]">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-[calc(100svh-7rem)] overflow-hidden bg-slate-950">
        <div className="absolute inset-0 overflow-hidden bg-slate-950" aria-hidden="true">
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="hero-background-video"
          >
            <source src="/videos/7A269378-DF97-4E82-BAA2-D44FD7E2E182.MP4" type="video/mp4" />
          </video>
        </div>

        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[68%] bg-linear-to-t from-slate-950/95 via-slate-950/55 to-transparent"
          aria-hidden="true"
        />

        <div className="absolute inset-x-0 bottom-0 z-20 px-4 pb-14 pt-24 text-center sm:px-6 sm:pb-16 lg:pb-20">
          <div className="mx-auto max-w-6xl">
            <h1 className="text-2xl font-bold leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)] sm:text-3xl lg:text-4xl 2xl:text-5xl">
              <span className="text-[#FDBA74]">
                {language === 'mr'
                  ? 'उद्योग प्रगतीसाठी माहिती, मार्गदर्शन आणि संवाद'
                  : language === 'hi'
                    ? 'उद्योग प्रगति के लिए जानकारी, मार्गदर्शन और संवाद'
                    : 'Information, guidance and dialogue for industry'}
              </span>
            </h1>

            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:text-base">
              {language === 'mr'
                ? 'औद्योगिक माहिती व मार्गदर्शन मिळवा, उद्योगांशी जोडा आणि अधिकृत सेवांसाठी संबंधित शासकीय स्रोत वापरा.'
                : language === 'hi'
                  ? 'औद्योगिक जानकारी और मार्गदर्शन पाएं, उद्योगों से जुड़ें और सरकारी सेवाओं के लिए संबंधित आधिकारिक स्रोत देखें।'
                  : 'Find industrial information, connect with businesses and use the relevant official sources for government services.'}
            </p>

            <Magnetic className="mt-6">
              <Link
                to="/association-registration"
                className="group inline-flex items-center gap-4 rounded-full border border-white/50 bg-white/10 py-2 pl-6 pr-2 text-sm font-bold text-white shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-md transition-all hover:border-[#FDBA74] hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FDBA74]"
              >
                <span>
                  {language === 'mr' ? 'आजच सहभागी व्हा' : language === 'hi' ? 'आज ही जुड़ें' : 'Join Today'}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E35914] text-white transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </Magnetic>
          </div>
        </div>

      </section>

      {/* Leadership Section */}
      <section className="py-14 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFF7ED] border border-[#FFEDD5] rounded-full shadow-2xs">
              <img src="/images/udyog-setu-lotus.png" alt="BJP lotus logo" className="w-5 h-5 rounded-full object-contain" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#E35914] font-label">
                {language === 'mr' ? 'नेतृत्व संदर्भ' : language === 'hi' ? 'नेतृत्व संदर्भ' : 'Leadership references'}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
              {t.leadership.heading}
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B]">
              {t.leadership.subheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {SEED_LEADERSHIP.map((leader, index) => {
              const name = language === 'mr' ? leader.nameMr : language === 'hi' ? leader.nameHi : leader.nameEn;
              const role = language === 'mr' ? leader.roleMr : language === 'hi' ? leader.roleHi : leader.roleEn;
              const note = language === 'mr' ? leader.messageMr : language === 'hi' ? leader.messageHi : leader.messageEn;

              return (
                <Reveal key={leader.id} variant="fade-up" delay={index * 120} duration={500}>
                  <TiltCard
                    maxTilt={5}
                    scale={1.02}
                    glare={true}
                    className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group h-full"
                  >
                    <div className="p-6 sm:p-7 space-y-5 flex flex-col items-center text-center">
                      {/* Portrait first, followed by leader details */}
                      <div className="relative flex justify-center w-full">
                        <img
                          src={leader.image}
                          alt={name}
                          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover object-top ring-4 ring-[#FFF7ED] shadow-md group-hover:scale-105 transition-transform duration-300"
                        />

                        {/* Official BJP Emblem in Card */}
                        <div className="absolute top-0 right-0 shrink-0 p-1 bg-white rounded-full border border-[#FED7AA] shadow-2xs animate-float" title="भारतीय जनता पार्टी (BJP)">
                          <img
                            src="/images/bjp-logo.png"
                            alt="BJP"
                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-contain"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-bold text-lg sm:text-xl text-[#111827] leading-tight font-devanagari">
                          {name}
                        </h3>
                        <p className="text-xs sm:text-sm font-semibold text-[#E35914] font-label">
                          {role}
                        </p>
                      </div>

                      <p className="w-full text-xs sm:text-sm text-[#334155] leading-relaxed border-l-3 border-[#136938] pl-3.5 bg-[#F8FAFC]/80 p-3 rounded-r-lg text-left">
                        {note}
                      </p>
                    </div>

                    <div className="bg-[#F8FAFC] px-6 py-3.5 border-t border-[#E2E8F0] flex items-center justify-between text-xs">
                      <span className="text-[#64748B] text-[11px] font-label flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E35914]"></span>
                        {language === 'en' ? 'Meeting Request' : language === 'hi' ? 'भेंट समन्वय' : 'भेट समन्वय'}
                      </span>
                      <Link
                        to={`/meeting-request?leader=${leader.id}`}
                        className="text-[#E35914] font-bold hover:underline inline-flex items-center gap-1 group/btn"
                      >
                        <span>{language === 'en' ? 'Meeting request' : language === 'hi' ? 'भेंट अनुरोध' : 'भेट विनंती'}</span>
                        <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <IndustrialAdvantageSection language={language} />

      <PrimaryModulesSection language={language} />

      {/* Existing engagement and support features */}
      <section id="services" className="py-16 bg-[#F8FAFC]">
        <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="inline-block text-xs font-semibold px-3 py-1 bg-[#FFF7ED] text-[#E35914] rounded-full uppercase tracking-wider font-label">
              {language === 'mr'
                ? 'उद्योग संवाद व सहाय्य'
                : language === 'hi'
                ? 'उद्योग संवाद और सहायता'
                : 'Industry dialogue and support'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
              {language === 'mr'
                ? 'विद्यमान उद्योग संवाद सुविधा'
                : language === 'hi'
                ? 'मौजूदा उद्योग संवाद सुविधाएं'
                : 'Existing industry engagement services'}
            </h2>
            <p className="text-sm text-[#64748B]">
              {language === 'mr'
                ? 'उद्योग संवाद, क्षेत्रीय भेटी, तक्रार नोंद, बैठक विनंती आणि इतर विद्यमान सेवा.'
                : language === 'hi'
                ? 'उद्योग संवाद, क्षेत्रीय दौरे, शिकायत दर्ज करना, बैठक अनुरोध और अन्य मौजूदा सेवाएं।'
                : 'Existing dialogue forums, visits, grievance entry, meeting requests and related services.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_SERVICES.map((service, idx) => {
              const iconColor = {
                primary: 'text-[#E35914]',
                secondary: 'text-[#136938]',
                tertiary: 'text-[#F59E0B]',
              }[service.accentColor];

              const iconBg = {
                primary: 'bg-[#FFF7ED]',
                secondary: 'bg-[#F0FDF4]',
                tertiary: 'bg-[#FFFBEB]',
              }[service.accentColor];

              const route = getServiceRoute(service.id);

              return (
                <Reveal key={service.id} variant="fade-up" delay={idx * 100} duration={500}>
                  <TiltCard maxTilt={5} scale={1.02} glare={true} className="h-full rounded-2xl">
                    <Card
                      accent={service.accentColor}
                      hoverEffect
                      className="flex flex-col justify-between h-full"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center transition-transform group-hover:scale-110`}>
                            {renderServiceIcon(service.iconName, iconColor)}
                          </div>
                          <Badge variant={service.accentColor === 'secondary' ? 'secondary' : 'primary'}>
                            {getServiceBadge(service)}
                          </Badge>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-[#111827]">
                            {getServiceTitle(service)}
                          </h3>
                          <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
                            {getServiceDesc(service)}
                          </p>
                        </div>
                      </div>

                      <div className="pt-6 mt-6 border-t border-[#E2E8F0]">
                        <Link to={route}>
                          <Button
                            variant={service.accentColor === 'primary' ? 'primary' : 'secondary'}
                            size="sm"
                            className="w-full justify-between"
                            icon={<ChevronRight className="w-4 h-4" />}
                            iconPosition="right"
                          >
                            {getServiceCta(service)}
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <IndustryReferenceSection language={language} />

      {/* Upcoming Events Section */}
      <section id="events" className="py-16 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="w-full max-w-[1560px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-semibold px-3 py-1 bg-[#FFFBEB] text-[#B45309] border border-[#FEF3C7] rounded-full uppercase tracking-wider font-label">
                {language === 'mr'
                  ? 'आगामी उद्योग उपक्रम'
                  : language === 'hi'
                  ? 'आगामी उद्योग कार्यक्रम'
                  : 'Upcoming Industry Events'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] mt-2">
                {language === 'mr'
                  ? 'उद्योग संवाद व परिषद वेळापत्रक'
                  : language === 'hi'
                  ? 'उद्योग संवाद एवं परिषद समय सारिणी'
                  : 'Conclaves, Visits & Summits'}
              </h2>
            </div>
            <Link to="/events">
              <Button variant="outlined" size="sm">
                {language === 'mr' ? 'सर्व कार्यक्रम पहा' : language === 'hi' ? 'सभी कार्यक्रम देखें' : 'View All Events'}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.slice(0, 3).map((event, idx) => {
              const title = language === 'mr' ? event.titleMr : language === 'hi' ? event.titleHi : event.titleEn;
              const location = language === 'mr' ? event.locationMr : language === 'hi' ? event.locationHi : event.locationEn;
              const category = language === 'mr' ? event.categoryMr : language === 'hi' ? event.categoryHi : event.categoryEn;

              return (
                <Reveal key={event.id} variant="zoom-in" delay={idx * 120} duration={500}>
                  <TiltCard maxTilt={5} scale={1.02} glare={true} className="h-full rounded-2xl">
                    <Card hoverEffect className="flex flex-col justify-between h-full border-slate-200/90 shadow-xs hover:shadow-lg transition-all">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-[#E35914] bg-[#FFF7ED] px-2.5 py-1 rounded font-devanagari">
                            {category}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <span className="text-[10px] text-[#136938] bg-[#F0FDF4] border border-[#DCFCE7] px-2 py-0.5 rounded font-label uppercase">
                              {language === 'mr' ? 'आगामी' : language === 'hi' ? 'आगामी' : 'Upcoming'}
                            </span>
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-[#111827] leading-snug">
                          {title}
                        </h3>

                        <div className="space-y-1.5 text-xs text-[#64748B] pt-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#136938]" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#E35914]" />
                            <span>{location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 mt-4 border-t border-[#E2E8F0]">
                        <Link to="/events">
                          <Button variant="outlined" size="sm" className="w-full">
                            {t.common.register}
                          </Button>
                        </Link>
                      </div>
                    </Card>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Association Registration CTA Section with Particle Constellation */}
      <section id="register" className="relative overflow-hidden py-16 bg-gradient-to-b from-white via-[#FFF7ED]/30 to-white border-t border-[#E2E8F0]">
        <ParticleConstellation
          className="pointer-events-none absolute inset-0 opacity-40"
          numParticles={24}
          maxDistance={110}
          particleColor="rgba(227, 89, 20, 0.4)"
          lineColor="rgba(227, 89, 20, 0.1)"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Reveal variant="fade-up" duration={500}>
            <span className="text-xs font-semibold px-3 py-1 bg-[#FFF7ED] text-[#E35914] border border-[#FFEDD5] rounded-full uppercase tracking-wider font-label">
              {language === 'mr'
                ? 'संघटना व उद्योजक नेटवर्क'
                : language === 'hi'
                ? 'संगठन एवं उद्यमी नेटवर्क'
                : 'Association & Industry Network'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#111827] tracking-tight mt-3">
              {language === 'mr'
                ? 'आपली औद्योगिक संघटना किंवा उद्योग आजच जोडा'
                : language === 'hi'
                ? 'अपना औद्योगिक संगठन या उद्योग आज ही जोड़ें'
                : 'Register Your Industrial Association or Enterprise Today'}
            </h2>
            <p className="text-sm sm:text-base text-[#475569] max-w-2xl mx-auto mt-2 leading-relaxed">
              {language === 'mr'
                ? 'जिल्हास्तरीय व क्लस्टर संघटनांसाठी थेट समन्वय, धोरणात्मक सल्लामसलत आणि जलद निवारण प्रणाली.'
                : language === 'hi'
                ? 'जिला व क्लस्टर संगठनों के लिए सीधा समन्वय, नीतिगत विमर्श और त्वरित निवारण प्रणाली।'
                : 'Direct coordination, policy dialogue, and fast-track grievance routing for industry associations.'}
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Magnetic>
                <Link to="/association-registration">
                  <Button variant="primary" size="lg" icon={<Send className="w-4 h-4" />}>
                    {t.nav.joinSetu}
                  </Button>
                </Link>
              </Magnetic>
              <Magnetic>
                <Link to="/meeting-request">
                  <Button variant="secondary" size="lg" icon={<Users className="w-4 h-4" />}>
                    {t.nav.meetingRequest}
                  </Button>
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};
