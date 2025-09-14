import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { Icon } from "@iconify/react";

// Images from public folder
const kindroHero = "/kindro-hero.png";
const mikasaPersona = "/mikasa-persona.png";
const ellenPersona = "/ellen-persona.png";
const userflow1 = "/userflow-1.png";
const userflow2 = "/userflow-2.png";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectDetail() {
  const { projectSlug } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPersona, setCurrentPersona] = useState(0);
  const navRef = useRef(null);
  const contentRef = useRef(null);

  // Project data
  const projectDetails = {
    "kindro": {
      name: "Kindro",
      subtitle: "A UI/UX CASE STUDY",
      type: "UX Research • Product Design • iOS App",
      year: "2023",
      tools: ["Figma", "User Research", "Prototyping", "iOS Design"],
      img: kindroHero,
      projectType: "Self-initiated",
      role: "UX design, UI design, research, illustration",
      platform: "iOS",
      designTools: "Figma"
    }
  };
  
  const project = projectDetails[projectSlug];

  useEffect(() => {
    document.body.style.backgroundColor = '#42805B';
    
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => {
      clearTimeout(timer);
      document.body.style.backgroundColor = '';
    };
  }, [projectSlug]);

  useEffect(() => {
    if (!isLoading && project) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      ScrollTrigger.create({
        trigger: contentRef.current,
        start: "300px top",
        onToggle: ({ isActive }) => {
          if (navRef.current) {
            gsap.to(navRef.current, {
              y: isActive ? 0 : -100,
              opacity: isActive ? 1 : 0,
              duration: 0.3,
              ease: "power2.out"
            });
          }
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoading, project]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#42805B'}}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white font-medium">Loading project...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#42805B'}}>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">
            Project Not Found
          </h1>
          <Link
            to="/"
            className="text-white hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleBackClick = () => {
    window.location.href = '/#works';
  };

  const handlePrototypeClick = () => {
    window.open('https://www.figma.com/proto/zhuqtA0GI5kR4KNu3dI9ll/Kindro?node-id=1-12373&p=f&t=tJvlZoAHL34mslBM-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A12373', '_blank');
  };

  return (
    <div className="min-h-screen text-white leading-relaxed" style={{backgroundColor: '#42805B'}}>

      {/* Sticky Navigation */}
      <nav 
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-8 py-4 -translate-y-full opacity-0"
        style={{backgroundColor: 'rgba(66, 128, 91, 0.95)'}}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <button
            onClick={handleBackClick}
            className="flex items-center space-x-2 text-white hover:text-gray-200 transition-colors duration-300 text-sm tracking-wide"
          >
            <Icon icon="mdi:arrow-left" className="text-lg" />
            <span>HOME</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main ref={contentRef} className="opacity-0">
        {/* Full Screen Kindro Image */}
        <section className="h-screen w-full relative overflow-hidden">
          <img
            src="/kindro.png"
            alt="Kindro case study overview"
            className="w-full h-full object-cover"
          />
        </section>

        {/* Project Info Section */}
        <section className="min-h-[60vh] flex items-center px-8 sm:px-12 max-w-7xl mx-auto">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Project Details */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium tracking-wider text-green-200 mb-2">TYPE</h3>
                  <p className="text-xl font-light">{project.projectType}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium tracking-wider text-green-200 mb-2">ROLE</h3>
                  <p className="text-xl font-light">{project.role}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium tracking-wider text-green-200 mb-2">PLATFORM</h3>
                  <p className="text-xl font-light">{project.platform}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium tracking-wider text-green-200 mb-2">DESIGN TOOLS</h3>
                  <p className="text-xl font-light">{project.designTools}</p>
                </div>
              </div>
            </div>

            {/* Right Side - Overview */}
            <div className="space-y-8">
              <h3 className="text-lg font-medium tracking-wider text-green-200 mb-2">OVERVIEW</h3>
              <p className="text-2xl font-light">
                Designing a platform for long-term, recurring care inside small, trusted circles.
              </p>
              
              <div className="pt-8">
                <button 
                  onClick={handlePrototypeClick}
                  className="bg-yellow-300 text-black px-8 py-4 text-lg font-medium tracking-wider hover:bg-yellow-400 transition-colors duration-300"
                >
                  EXPLORE PROTOTYPE →
                </button>
              </div>
            </div>
          </div>
        </section>



{/* Insights Section */}
<section className="py-24 px-8 sm:px-12 bg-white text-gray-800">
  <div className="max-w-6xl mx-auto text-center">
    <div className="relative mb-16">
      <div className="flex items-center justify-center mb-8">
        <div className="flex-1 h-px" style={{backgroundColor: '#42805B'}}></div>
        <h2 className="px-8 text-sm font-medium tracking-[0.3em] uppercase" style={{color: '#42805B'}}>
          INSIGHTS
        </h2>
        <div className="flex-1 h-px" style={{backgroundColor: '#42805B'}}></div>
      </div>
    </div>

    <div className="mb-12">
      <h3 className="text-4xl md:text-5xl font-light text-gray-900 leading-tight max-w-4xl mx-auto">
        Supporting loved ones consistently is harder than it appears.
      </h3>
    </div>

    <div className="max-w-4xl mx-auto mb-8 text-left">
      <p className="text-lg text-gray-700 leading-relaxed mb-8 text-justify">
        After my friend's house burned down in March of 2023, I noticed something about the way people support their loved ones during tough times. The first few days are full of GoFundMe donations, messages, flowers, and food, but over time, the support fades, even when the need is still there.
      </p>
      
      <p className="text-lg text-gray-700 leading-relaxed mb-8 text-justify">
        I realized I wasn't the only one noticing this pattern. In talking to friends who had supported loved ones through tough times, and those who had been on the receiving end, it became clear: helping consistently is hard. 
        People want to be there, but they forget, feel awkward, or simply don't know what's needed.
      </p>
      
      <p className="text-lg text-gray-700 leading-relaxed mb-8 text-justify">
        And thus, the question is raised.
      </p>
      
      <div className="border-l-4 border-green-600 pl-6 mb-8">
        <p className="text-xl text-gray-700 font-medium">
          What if there were a way to make support easy, thoughtful, and ongoing, without anyone feeling pressured or overwhelmed?
        </p>
      </div>
      
      <p className="text-lg text-gray-700 leading-relaxed text-justify">
        That gap inspired me to reach out to my acquaintance, Josh Bowman, and start designing <span className="font-bold text-green-600">Kindro</span>.
      </p>
    </div>
  </div>
</section>


{/* Research Section */}
<section className="py-16 px-8 sm:px-12 bg-white text-gray-800">
  <div className="max-w-7xl mx-auto space-y-12 text-center">
    <div className="relative mb-16">
      <div className="flex items-center justify-center mb-8">
        <div className="flex-1 h-px" style={{backgroundColor: '#42805B'}}></div>
        <h2 className="px-8 text-sm font-medium tracking-[0.3em] uppercase" style={{color: '#42805B'}}>
          RESEARCH QUESTION
        </h2>
        <div className="flex-1 h-px" style={{backgroundColor: '#42805B'}}></div>
      </div>
    </div>
    <p className="text-3xl md:text-4xl font-light text-gray-900 max-w-4xl mx-auto leading-tight mb-8">
      What makes giving and receiving support so difficult?
    </p>
    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 text-justify">
      Before creating the app, I first needed a broader understanding of the issue.
    </p>
    <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8 text-justify">
      I interviewed six people who had given support and four people who had experienced hardships, and each one shared that coordinating help and asking for support was far more time-consuming and emotionally complicated than expected.
    </p>
    
    <div className="max-w-4xl mx-auto mb-8">
      <h4 className="text-2xl font-medium text-gray-900 mb-8">Interviews and surveys revealed three major key insights:</h4>
      
      <div className="space-y-6 text-left max-w-3xl mx-auto">
        <div className="flex items-start space-x-4">
          <div className="w-4 h-4 rounded-full flex-shrink-0 mt-2" style={{backgroundColor: 'rgba(144, 238, 144, 0.8)'}}></div>
          <p className="text-lg text-gray-700 leading-relaxed text-justify flex-1">
            Emotional hesitation often prevents people from reaching out
          </p>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="w-4 h-4 rounded-full flex-shrink-0 mt-2" style={{backgroundColor: 'rgba(144, 238, 144, 0.8)'}}></div>
          <p className="text-lg text-gray-700 leading-relaxed text-justify flex-1">
            Support fades quickly when there are no reminders or structured follow-ups
          </p>
        </div>
        
        <div className="flex items-start space-x-4">
          <div className="w-4 h-4 rounded-full flex-shrink-0 mt-2" style={{backgroundColor: 'rgba(144, 238, 144, 0.8)'}}></div>
          <p className="text-lg text-gray-700 leading-relaxed text-justify flex-1">
            Practical support (like errands or childcare) is as valuable as emotional gestures
          </p>
        </div>
      </div>
    </div>
    
    <div className="max-w-4xl mx-auto text-left">
      <p className="text-lg text-gray-600 mb-16 text-justify">
        Personas are a useful way to keep these two groups with differing needs in mind going forward.
      </p>
      
      {/* Persona Images with Navigation - Made Much Larger */}
      <div className="relative max-w-5xl mx-auto mb-8">
        <div className="relative">
          <img
            src={currentPersona === 0 ? mikasaPersona : ellenPersona}
            alt={currentPersona === 0 ? "Mikasa Persona - Support Receiver" : "Ellen Persona - Support Giver"}
            className="w-full h-auto object-contain rounded-lg shadow-lg"
            style={{minHeight: '600px'}}
          />
          
          {/* Navigation arrows */}
          <button
            onClick={() => setCurrentPersona(currentPersona === 0 ? 1 : 0)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200"
          >
            <Icon icon="mdi:chevron-left" className="text-3xl text-gray-700" />
          </button>
          
          <button
            onClick={() => setCurrentPersona(currentPersona === 0 ? 1 : 0)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-3 shadow-lg transition-all duration-200"
          >
            <Icon icon="mdi:chevron-right" className="text-3xl text-gray-700" />
          </button>
        </div>
        
        {/* Persona indicator dots */}
        <div className="flex justify-center mt-6 space-x-3">
          <button
            onClick={() => setCurrentPersona(0)}
            className={`w-4 h-4 rounded-full transition-colors duration-200 ${
              currentPersona === 0 ? 'bg-green-600' : 'bg-gray-300'
            }`}
          />
          <button
            onClick={() => setCurrentPersona(1)}
            className={`w-4 h-4 rounded-full transition-colors duration-200 ${
              currentPersona === 1 ? 'bg-green-600' : 'bg-gray-300'
            }`}
          />
        </div>
        
        <p className="text-center text-sm text-gray-500 mt-3">
          {currentPersona === 0 ? "Mikasa - Support Receiver" : "Ellen - Support Giver"}
        </p>
      </div>
      
      <p className="text-lg text-gray-600 mb-8 text-justify">
        To start defining what my product should be and achieve, I needed to specify one main problem to solve for. Based on my primary persona's story, I set out my primary problem statement:
      </p>
      
      <div className="border-l-4 border-green-600 pl-6 mb-8">
        <p className="text-xl text-gray-700 font-medium">
          Mikasa is struggling not because she doesn't have people to support her, but because there is no structure to help her find proper support.
        </p>
      </div>
      
      <p className="text-lg text-gray-600 text-justify">
        So how can I create a solution that's appropriate, trustworthy, and has a place in the market?
      </p>
    </div>
  </div>
</section>

{/* Unique Selling Point Section */}
<section className="py-16 px-8 sm:px-12 bg-white text-gray-800">
  <div className="max-w-7xl mx-auto space-y-12">
    <div className="text-center">
      <div className="relative mb-16">
        <div className="flex items-center justify-center mb-8">
          <div className="flex-1 h-px" style={{backgroundColor: '#42805B'}}></div>
          <h2 className="px-8 text-sm font-medium tracking-[0.3em] uppercase" style={{color: '#42805B'}}>
            UNIQUE SELLING POINT
          </h2>
          <div className="flex-1 h-px" style={{backgroundColor: '#42805B'}}></div>
        </div>
      </div>
    </div>

    <div className="max-w-4xl mx-auto text-left space-y-8">
      <p className="text-lg text-gray-700 leading-relaxed text-justify">
        After conducting research, I was surprised to learn that there are no direct competitors. But perhaps I could learn from similar services in adjacent spaces. I audited two services that our target users typically go for:
      </p>
      
      {/* Competitive Analysis in structured format */}
      <div className="space-y-6">
        <div className="border-l-4 border-green-600 pl-6">
          <div className="flex items-start space-x-6">
            <div className="text-2xl font-medium text-gray-900 flex-shrink-0">1.</div>
            <div className="flex-1">
              <h4 className="text-xl font-medium text-gray-900 mb-2">GoFundMe</h4>
              <p className="text-lg text-gray-700 leading-relaxed text-justify" style={{lineHeight: '1.5rem', height: '3rem'}}>
                Proves useful for fundraising, but not ongoing support when people need consistent help.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-l-4 border-green-600 pl-6">
          <div className="flex items-start space-x-6">
            <div className="text-2xl font-medium text-gray-900 flex-shrink-0">2.</div>
            <div className="flex-1">
              <h4 className="text-xl font-medium text-gray-900 mb-2">Personal text messages or group chats</h4>
              <p className="text-lg text-gray-700 leading-relaxed text-justify" style={{lineHeight: '1.5rem', height: '3rem'}}>
                Great for quickly messaging people you know, yet can often be too noisy and lack structure.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-lg text-gray-700 leading-relaxed text-justify">
        To understand what features would serve my users best, I laid out a unique value proposition that addressed my personas' needs and frustrations:
      </p>
    </div>

    {/* Value Proposition - List Format */}
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6 text-left">
        <div className="flex items-start space-x-6">
          <div className="text-3xl flex-shrink-0">📝</div>
          <div className="flex-1">
            <h4 className="text-xl font-medium text-gray-900 mb-2">List and tailor support options</h4>
            <p className="text-lg text-gray-700 leading-relaxed text-justify" style={{lineHeight: '1.5rem', height: '3rem'}}>
              Receivers can share exactly what they need while supporters can pick what works best for them.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-6">
          <div className="text-3xl flex-shrink-0">👥</div>
          <div className="flex-1">
            <h4 className="text-xl font-medium text-gray-900 mb-2">Easily connect with your circle</h4>
            <p className="text-lg text-gray-700 leading-relaxed text-justify" style={{lineHeight: '1.5rem', height: '3rem'}}>
              Requests go directly to trusted family and friends, making support feel coordinated, not overwhelming.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-6">
          <div className="text-3xl flex-shrink-0">⏰</div>
          <div className="flex-1">
            <h4 className="text-xl font-medium text-gray-900 mb-2">Stay consistent with reminders</h4>
            <p className="text-lg text-gray-700 leading-relaxed text-justify" style={{lineHeight: '1.5rem', height: '3rem'}}>
              Receivers don't have to keep asking, and supporters get gentle nudges so help doesn't fade over time.
            </p>
          </div>
        </div>
        
        <div className="flex items-start space-x-6">
          <div className="text-3xl flex-shrink-0">📊</div>
          <div className="flex-1">
            <h4 className="text-xl font-medium text-gray-900 mb-2">Visual overview of care</h4>
            <p className="text-lg text-gray-700 leading-relaxed text-justify" style={{lineHeight: '1.5rem', height: '3rem'}}>
              Both sides see who's helping, what's covered, and where gaps remain, reducing stress.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        {/* User Flow Section */}
        <section className="py-16 px-8 sm:px-12 bg-white text-gray-800">
          <div className="max-w-7xl mx-auto space-y-12 text-center">
            <div className="relative mb-16">
              <div className="flex items-center justify-center mb-8">
                <div className="flex-1 h-px" style={{backgroundColor: '#42805B'}}></div>
                <h2 className="px-8 text-sm font-medium tracking-[0.3em] uppercase" style={{color: '#42805B'}}>
                  USER FLOW
                </h2>
                <div className="flex-1 h-px" style={{backgroundColor: '#42805B'}}></div>
              </div>
            </div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Based on the key needs of the users, I drafted a user flow for the iOS app.
            </p>
            
            <div className="relative w-full -mx-4 sm:-mx-8">
              <div className="overflow-x-auto" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
                <div className="flex w-max items-start">
                  <img
                    src={userflow1}
                    alt="User Flow Part 1"
                    className="h-96 md:h-[32rem] lg:h-[40rem] w-auto object-contain"
                  />
                  <img
                    src={userflow2}
                    alt="User Flow Part 2"
                    className="h-96 md:h-[32rem] lg:h-[40rem] w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        
{/* Wireframes Section */}
        <section className="py-16 px-8 sm:px-12 bg-white text-gray-800">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center">
              <div className="relative mb-16">
                <div className="flex items-center justify-center mb-8">
                  <div className="flex-1 h-px" style={{backgroundColor: '#42805B'}}></div>
                  <h2 className="px-8 text-sm font-medium tracking-[0.3em] uppercase" style={{color: '#42805B'}}>
                    WIREFRAMES
                  </h2>
                  <div className="flex-1 h-px" style={{backgroundColor: '#42805B'}}></div>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto text-left space-y-8">
              <p className="text-lg text-gray-700 leading-relaxed text-justify">
                I started with quick and messy hand-drawn sketches, where I quickly learned that there was too much information overwhelming the user at once. The use of handwritten sketches led to two key developments within the app.
              </p>

              <div className="space-y-8">
                <div className="border-l-4 border-green-600 pl-6">
                  <h4 className="text-xl font-medium text-gray-900 mb-3">
                    1. "Your Circle" should be at the center of the home page.
                  </h4>
                  <p className="text-lg text-gray-700 leading-relaxed text-justify">
                    For those who are struggling, just seeing the faces of their loved ones can really brighten their day. So even if it may not be their most used feature, all participants agreed to have their close circle as the main focal point.
                  </p>
                </div>

                <div className="border-l-4 border-green-600 pl-6">
                  <h4 className="text-xl font-medium text-gray-900 mb-3">
                    2. Tone Matters.
                  </h4>
                  <p className="text-lg text-gray-700 leading-relaxed text-justify">
                    It's designed for people to help their friends, relatives, and colleagues who are going through major life events—illness, death, etc. My original language and tone included exclamation points and wording like "My Wonderful Offers" or "Your Amazing Full Name," which at first I interpreted as a way to brighten their day, similar to the green avatars. Yet the user feedback was mixed. Thus, the language was changed to more compassionate, adult, and appropriate wording for people who might be going through the hardest thing they've ever faced.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Design Section */}
        <section className="py-16 px-8 sm:px-12 bg-gray-50 text-gray-800">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center">
              <div className="relative mb-16">
                <div className="flex items-center justify-center mb-8">
                  <div className="flex-1 h-px" style={{backgroundColor: '#42805B'}}></div>
                  <h2 className="px-8 text-sm font-medium tracking-[0.3em] uppercase" style={{color: '#42805B'}}>
                    VISUAL DESIGN
                  </h2>
                  <div className="flex-1 h-px" style={{backgroundColor: '#42805B'}}></div>
                </div>
              </div>
            </div>

            {/* Design Elements Image */}
            <div className="max-w-6xl mx-auto mb-12">
              <img
                src="/elements.png"
                alt="Kindro design elements including colors, typography, and UI components"
                className="w-full h-auto object-contain rounded-2xl shadow-lg"
              />
            </div>

            <div className="max-w-4xl mx-auto text-left space-y-8">
              <p className="text-lg text-gray-700 leading-relaxed text-justify">
                I used colors like earthy green to create a welcoming atmosphere, hinting at a fresh beginning and a new start. The lighter green provides a nice contrast and is primarily used for the friendly green blob avatars. The decision to include the green avatars was one of my hardest as a UI/UX designer, yet after conducting user interviews it was clear that users longed for a friendly sense of encouragement to brighten their day.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed text-justify">
                In terms of font choice, Plus Jakarta Sans serves as a friendly and organic display font, which works as both title and body text for consistency. Further, the use of rounded cards enhanced the theme of friendliness and calm.
              </p>
              
              <div className="text-center pt-8">
                <div className="relative mb-16">
                  <div className="flex items-center justify-center mb-8">
                    <div className="flex-1 h-px" style={{backgroundColor: '#42805B'}}></div>
                    <h2 className="px-8 text-sm font-medium tracking-[0.3em] uppercase" style={{color: '#42805B'}}>
                      INTERACTIVE PROTOTYPE
                    </h2>
                    <div className="flex-1 h-px" style={{backgroundColor: '#42805B'}}></div>
                  </div>
                </div>
                
                {/* Figma Prototype Embed */}
                <div className="w-full max-w-4xl mx-auto">
                  <div className="relative" style={{paddingBottom: '75%', height: 0}}>
                    <iframe
                      src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/proto/zhuqtA0GI5kR4KNu3dI9ll/Kindro?node-id=1-12373&p=f&t=xPEjLL4ts6ytkWq9-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A12373"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full border-0 rounded-2xl shadow-lg"
                      title="Kindro Interactive Prototype"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Outcome Section */}
        <section className="py-16 px-8 sm:px-12 bg-white text-gray-800">
          <div className="max-w-7xl mx-auto space-y-12">
            <div className="text-center">
              <div className="relative mb-16">
                <div className="flex items-center justify-center mb-8">
                  <div className="flex-1 h-px" style={{backgroundColor: '#42805B'}}></div>
                  <h2 className="px-8 text-sm font-medium tracking-[0.3em] uppercase" style={{color: '#42805B'}}>
                    OUTCOME
                  </h2>
                  <div className="flex-1 h-px" style={{backgroundColor: '#42805B'}}></div>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              {/* Success Statement */}
              <div className="text-center mb-12">
                <p className="text-xl font-medium text-gray-900 leading-relaxed text-left">
                  All participants could verbally describe their process and were able to complete the onboarding process, add their friends, schedule recurring support, and message with their loved ones.
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="space-y-8">
                <div className="border-l-4 border-green-600 pl-6">
                  <h4 className="text-xl font-medium text-gray-900 mb-3">
                    Takeaway – Research can be surprising
                  </h4>
                  <p className="text-lg text-gray-700 leading-relaxed text-justify">
                    As my first ever case study, I realized that what I thought was "obvious" often wasn't. For example, several testers weren't sure what a "circle" meant, even though I assumed that was intuitive. As a result, I changed the language in the onboarding section. Further, others looked for notifications which were quite hard to find, leading me to create a section for reminders in the Nav Bar. These small surprises taught me that users will always bring their own expectations, and research helps uncover blind spots early, before it gets timely and expensive.
                  </p>
                </div>

                <div className="border-l-4 border-green-600 pl-6">
                  <h4 className="text-xl font-medium text-gray-900 mb-3">
                    If I had more time, I would conduct more usability testing
                  </h4>
                  <p className="text-lg text-gray-700 leading-relaxed text-justify">
                    My initial paper sketches revealed a lot, but they were insufficient. To have testers go through the prototypes and UI, I asked them to manually describe everything they would do verbally as I moved to the next frame. If I had more time, I would build higher-fidelity clickable prototypes and run deeper usability tests.
                  </p>
                </div>

                <div className="border-l-4 border-green-600 pl-6">
                  <h4 className="text-xl font-medium text-gray-900 mb-3">
                    Looking forward
                  </h4>
                  <p className="text-lg text-gray-700 leading-relaxed text-justify">
                    After completing my first ever case study, I am more motivated than ever. I find that building tools that improve everyday life is genuinely enjoyable, and Kindro gave me a chance to explore my purpose. With Bowman in charge of turning this into an actual business, I could see my idea growing into a product people truly rely on for long-term care. For now, I'll carry forward my biggest lesson from the past three weeks: testing with real people, no matter how rough the prototype, is what transforms ideas into products that genuinely work.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Portfolio */}
        <section className="py-16 text-center bg-white">
          <Link
            to="/"
            onClick={handleBackClick}
            className="px-8 py-4 text-lg font-medium tracking-wider transition-colors duration-300 border-2 hover:text-white"
            style={{
              backgroundColor: 'white',
              borderColor: '#42805B',
              color: '#42805B'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#42805B';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'white';
              e.target.style.color = '#42805B';
            }}
          >
            ← BACK TO PORTFOLIO
          </Link>
        </section>

      </main>
    </div>
  );
}