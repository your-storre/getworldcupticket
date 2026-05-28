'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase } from '@/lib/supabase/client'
import { SearchBar } from '@/components/ui/SearchBar'
import { MatchCard } from '@/components/ui/MatchCard'
import { CountdownTimer } from '@/components/ui/CountdownTimer'
import { NewsletterSignup } from '@/components/ui/NewsletterSignup'
import { 
  Shield, 
  Ticket, 
  Clock, 
  Star, 
  MapPin, 
  Calendar,
  CheckCircle,
  CreditCard,
  Headphones,
  TrendingUp,
  Award
} from 'lucide-react'

export default function HomePage() {
  const [featuredMatches, setFeaturedMatches] = useState([])
  const [upcomingMatches, setUpcomingMatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      // Fetch featured matches
      const { data: matches } = await supabase
        .from('matches')
        .select(`
          *,
          home_team:teams!matches_home_team_id_fkey(*),
          away_team:teams!matches_away_team_id_fkey(*),
          stadium:stadiums(*),
          ticket_inventory:ticket_inventory(price, quantity_available)
        `)
        .eq('status', 'upcoming')
        .order('match_date', { ascending: true })
        .limit(8)

      setFeaturedMatches(matches || [])
      setUpcomingMatches(matches?.slice(0, 4) || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const worldCupStartDate = new Date('2026-06-12T20:00:00')

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="https://images.unsplash.com/photo-1522778526097-7b3edf3d0c03"
          >
            <source src="/worldcup-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>

        <div className="relative z-10 container-custom text-center text-white">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">FIFA World Cup 2026 • USA</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Buy World Cup Tickets<br />
              <span className="text-blue-400">Securely & Instantly</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Trusted resale marketplace for football fans worldwide. 
              100% guaranteed tickets for all matches.
            </p>

            <div className="mb-12">
              <CountdownTimer targetDate={worldCupStartDate} />
            </div>

            <SearchBar className="max-w-2xl mx-auto" />

            <div className="flex flex-wrap justify-center gap-4 mt-12">
              <Link href="/matches" className="btn-primary inline-flex items-center gap-2">
                Browse All Matches
                <TrendingUp className="w-5 h-5" />
              </Link>
              <Link href="/how-it-works" className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/30 transition-all inline-flex items-center gap-2">
                How It Works
                <Award className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-8 bg-gray-50 border-y border-gray-200">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[
              { icon: Shield, text: '100% Secure' },
              { icon: CreditCard, text: 'Instant Delivery' },
              { icon: Headphones, text: '24/7 Support' },
              { icon: CheckCircle, text: 'Best Price Guarantee' }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-700">
                <item.icon className="w-5 h-5 text-green-600" />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Matches */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Matches
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Secure your seats for the most anticipated matches of World Cup 2026
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="card skeleton h-96" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredMatches.map((match: any) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/matches" className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700">
              View All Matches
              <TrendingUp className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose GetWorldCupTicket
            </h2>
            <p className="text-gray-600 text-lg">
              The most trusted marketplace for World Cup tickets
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Secure Transactions',
                description: 'Bank-level encryption and fraud protection for all payments',
                color: 'blue'
              },
              {
                icon: Ticket,
                title: 'Instant Ticket Delivery',
                description: 'Receive QR codes immediately after purchase via email',
                color: 'green'
              },
              {
                icon: Star,
                title: 'Best Price Guarantee',
                description: 'Competitive pricing with no hidden fees',
                color: 'purple'
              },
              {
                icon: MapPin,
                title: 'Official Stadium Seating',
                description: 'Verified seats in all World Cup stadiums',
                color: 'orange'
              },
              {
                icon: Calendar,
                title: 'Real-time Availability',
                description: 'Live inventory updates for all matches',
                color: 'red'
              },
              {
                icon: Headphones,
                title: '24/7 Customer Support',
                description: 'Dedicated support team for ticket inquiries',
                color: 'indigo'
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ticket Categories */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ticket Categories
            </h2>
            <p className="text-gray-600 text-lg">
              Choose from various seating options to fit your budget
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                name: 'VIP Experience',
                price: 'From $1,250',
                features: ['Premium seating', 'VIP lounge access', 'Complimentary refreshments', 'Dedicated concierge'],
                color: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
                badge: 'BEST VIEW'
              },
              {
                name: 'Premium',
                price: 'From $850',
                features: ['Lower bowl seating', 'Priority entry', 'Food & beverage credit', 'Commemorative ticket'],
                color: 'bg-gradient-to-r from-gray-400 to-gray-500',
                badge: 'POPULAR'
              },
              {
                name: 'Standard',
                price: 'From $450',
                features: ['Mid-level seating', 'Standard entry', 'Match program included', 'Digital ticket'],
                color: 'bg-gradient-to-r from-blue-500 to-blue-600',
                badge: 'VALUE'
              },
              {
                name: 'Economy',
                price: 'From $199',
                features: ['Upper bowl seating', 'Standard entry', 'Digital ticket only'],
                color: 'bg-gradient-to-r from-green-500 to-green-600',
                badge: 'BUDGET'
              }
            ].map((category, i) => (
              <div key={i} className="card relative overflow-hidden group">
                {category.badge && (
                  <div className={`absolute top-4 right-4 ${category.color} text-white text-xs font-bold px-3 py-1 rounded-full z-10`}>
                    {category.badge}
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-4">{category.price}</div>
                  <ul className="space-y-3 mb-6">
                    {category.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-2 text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    href="/matches" 
                    className="block text-center bg-gray-100 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                  >
                    View Tickets
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600 text-lg">
              Trusted by thousands of football fans worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'David Chen',
                location: 'Toronto, Canada',
                rating: 5,
                comment: 'Got my tickets for the final within minutes! The QR code worked perfectly. Best World Cup experience ever!',
                match: 'World Cup Final 2026',
                avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
              },
              {
                name: 'Maria Rodriguez',
                location: 'Madrid, Spain',
                rating: 5,
                comment: 'Excellent customer service. Had an issue with my booking and they resolved it immediately. Highly recommend!',
                match: 'Spain vs Brazil',
                avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
              },
              {
                name: 'James Wilson',
                location: 'London, UK',
                rating: 5,
                comment: 'Best ticket platform I\'ve used. Smooth checkout process and instant delivery. Will use again for sure.',
                match: 'England vs Germany',
                avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-3">"{testimonial.comment}"</p>
                <p className="text-sm text-blue-600 font-medium">Match: {testimonial.match}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 text-gray-600">
              <span className="text-2xl font-bold text-yellow-500">★★★★★</span>
              <span>4.9 out of 5 based on 2,847 reviews</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg">
              Everything you need to know about buying World Cup tickets
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Are the tickets guaranteed to be legitimate?",
                a: "Yes, 100%! All tickets are verified and guaranteed. If any issue arises, you receive a full refund or replacement tickets of equal or better value."
              },
              {
                q: "How do I receive my tickets?",
                a: "Tickets are delivered instantly via email with a unique QR code. You can also download them from your dashboard. The QR code is scanned at stadium entry."
              },
              {
                q: "Can I resell my tickets if I can't attend?",
                a: "Absolutely! You can list your tickets on our marketplace for other fans to purchase. We facilitate the secure transfer of tickets to the new buyer."
              },
              {
                q: "What payment methods do you accept?",
                a: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, and various mobile money options through our secure Flutterwave payment gateway."
              },
              {
                q: "Is there a refund policy?",
                a: "If an event is cancelled, you receive a full refund. For other circumstances, we offer a 48-hour cancellation policy with partial refund."
              },
              {
                q: "How do I contact customer support?",
                a: "Our 24/7 support team is available via live chat, email (support@getworldcupticket.com), or phone. Response time is typically under 5 minutes."
              }
            ].map((faq, i) => (
              <details key={i} className="group border border-gray-200 rounded-lg">
                <summary className="flex justify-between items-center cursor-pointer p-6 list-none">
                  <h3 className="font-semibold text-gray-900 pr-4">{faq.q}</h3>
                  <div className="text-blue-600 group-open:rotate-180 transition-transform">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6 text-gray-600 border-t border-gray-100 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="container-custom text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience World Cup 2026?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Don't miss out on the biggest sporting event in the world
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/matches" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2">
              Browse Tickets
              <Ticket className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors inline-flex items-center gap-2">
              Contact Sales
              <Headphones className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterSignup />
    </div>
  )
}
