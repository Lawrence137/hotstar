import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Target, Users, TrendingUp, ArrowRight } from 'lucide-react';

const About = () => {
  const teamImages = [
    "/Image1.jpg",
    "/Image2.jpg",
    "/Image3.jpg",
    "/Image4.jpg",
    "/Image5.jpg",
    "/Image6.jpg"
  ];

  const values = [
    {
      icon: <Shield className="w-10 h-10 text-yellow-500" />,
      title: "Resilience",
      description: "We face challenges head-on and emerge stronger, both on and off the field."
    },
    {
      icon: <Users className="w-10 h-10 text-yellow-500" />,
      title: "Community",
      description: "We are more than a team; we are a family of players, fans, and supporters."
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-yellow-500" />,
      title: "Passion",
      description: "Our love for the game drives us to give our all in every match and training session."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pt-20">
      {/* Hero Section */}
      <section className="relative w-full py-20 lg:py-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-red-900/30 to-black"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
            About Hotstar FC
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Forged in passion, driven by community. Discover the story behind the most electrifying team in Kiambu County.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold mb-6 text-yellow-500">Our Story</h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Wangige Hotstars Football Club, based in the heart of Wangige, Kabete in Kiambu County, is a testament to the enduring spirit of local football. Established in 2020, the club rose from the ashes of the disbanded Kabete Cares Football Academy. 
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                It was founded by a passionate group of homegrown former players and talented graduates of the academy who refused to let their dreams be converted into a baseball academy. They envisioned a new club that would not only nurture local talent but also create a vibrant community hub.
              </p>
              <p className="text-gray-300 leading-relaxed">
                From humble beginnings, Hotstar FC has grown into a formidable force, known for its exciting style of play and unwavering commitment to its roots.
              </p>
            </div>
            <div className="order-1 lg:order-2 relative h-96">
              <div className="grid grid-cols-3 grid-rows-3 gap-2 h-full">
                {teamImages.map((src, index) => (
                  <div 
                    key={index} 
                    className={`relative rounded-lg overflow-hidden ${
                      index === 0 ? 'col-span-2 row-span-2' : ''
                    }`}
                  >
                    <img 
                      src={src} 
                      alt={`Team image ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-gray-800 to-black p-8 rounded-2xl border border-gray-700 hover:border-yellow-500/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <Target className="w-10 h-10 text-yellow-500" />
                <h3 className="text-3xl font-bold text-white">Our Mission</h3>
              </div>
              <p className="text-gray-400">
                To inspire and unite our community through the beautiful game of football, while developing local talent and promoting sportsmanship, teamwork, and excellence.
              </p>
            </div>
            <div className="bg-gradient-to-br from-gray-800 to-black p-8 rounded-2xl border border-gray-700 hover:border-yellow-500/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <TrendingUp className="w-10 h-10 text-yellow-500" />
                <h3 className="text-3xl font-bold text-white">Our Vision</h3>
              </div>
              <p className="text-gray-400">
                To become a leading football club in the region, recognized for our competitive success, our commitment to youth development, and our positive impact on the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-12 text-yellow-500">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-yellow-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-yellow-500/30 transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-r from-yellow-500 via-red-600 to-yellow-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Be Part of Our <span className="text-white">Journey</span>
          </h2>
          <p className="text-xl text-black/80 mb-8 max-w-2xl mx-auto">
            Whether you're a player, a fan, or a partner, there's a place for you in the Hotstar FC family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/join"
              className="bg-black text-yellow-500 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              Join Fan Club <ArrowRight size={20} />
            </Link>
            <Link
              to="/matches"
              className="border-2 border-black text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-black hover:text-yellow-500 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
            >
              View Matches <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;