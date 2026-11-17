/**
 * KORA SPA — Shared Demo Data
 * Comprehensive data models for treatments, therapists, memberships, bookings, history, notifications, and blog posts.
 */

window.SpaData = {
  treatments: [
    {
      id: 'relaxation-massage',
      name: 'Signature Relaxation Massage',
      category: 'Massage Therapy',
      price: 140,
      duration: ['60 min', '90 min'],
      durationMinutes: 60,
      rating: 4.9,
      reviewCount: 128,
      shortDesc: 'A gentle full-body experience utilizing rhythmic Swedish strokes to release tension, soothe the nervous system, and restore inner equilibrium.',
      longDesc: 'Our Signature Relaxation Massage incorporates botanical carrier oils blended with therapeutic organic botanicals. Long, gliding strokes relieve muscle tightness, improve circulation, and induce deep somatic relaxation.',
      benefits: ['Calms the nervous system', 'Increases peripheral circulation', 'Reduces cortisol levels', 'Improves sleep quality'],
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
      popular: true
    },
    {
      id: 'deep-tissue-massage',
      name: 'Deep Tissue Therapeutic Massage',
      category: 'Therapeutic Bodywork',
      price: 165,
      duration: ['60 min', '90 min', '120 min'],
      durationMinutes: 60,
      rating: 4.85,
      reviewCount: 94,
      shortDesc: 'Focused, firm pressure reaching deep sub-layers of muscle tissue and fascia to release chronic structural knots and restore posture.',
      longDesc: 'Engineered for athletes, chronic desk-workers, and those carrying stubborn physical fatigue. Our certified specialists apply deliberate friction across the grain of tense muscle fibers, breaking down adhesions and relieving repetitive stress.',
      benefits: ['Alleviates chronic musculoskeletal pain', 'Breaks scar tissue and adhesions', 'Enhances joint mobility', 'Lowers postural strain'],
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80',
      popular: true
    },
    {
      id: 'aromatherapy-massage',
      name: 'Botanical Aromatherapy Ritual',
      category: 'Sensory Therapy',
      price: 155,
      duration: ['60 min', '90 min'],
      durationMinutes: 60,
      rating: 4.95,
      reviewCount: 112,
      shortDesc: 'Pure artisanal botanical essences chosen bespoke to harmonize mental clarity, alleviate stress, and nourish skin barrier function.',
      longDesc: 'Before beginning, a personalized consultation pairs you with steam-distilled rare extracts including French lavender, wild bergamot, damask rose, and Himalayan cedarwood, massaged into acupressure points.',
      benefits: ['Balances emotional state', 'Clears respiratory channels', 'Deep cellular hydration', 'Induces neuro-calm'],
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
      popular: false
    },
    {
      id: 'hot-stone-therapy',
      name: 'Volcanic Basalt Hot Stone Therapy',
      category: 'Thermal Healing',
      price: 175,
      duration: ['75 min', '90 min'],
      durationMinutes: 75,
      rating: 4.92,
      reviewCount: 86,
      shortDesc: 'Smooth, heated volcanic basalt stones placed along chakra centers combined with warm stone gliding for penetrating muscular comfort.',
      longDesc: 'Heated to an exacting therapeutic temperature, mineral-rich basalt stones transfer subterranean warmth into tight connective tissue. Blood flow surges, toxins dissipate, and tension melts away effortlessly.',
      benefits: ['Accelerates muscle relaxation', 'Expands blood vessels', 'Soothes chronic arthritis symptoms', 'Induces meditative stillness'],
      image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80',
      popular: true
    },
    {
      id: 'swedish-massage',
      name: 'Classic Nordic Swedish Massage',
      category: 'Massage Therapy',
      price: 135,
      duration: ['60 min', '90 min'],
      durationMinutes: 60,
      rating: 4.88,
      reviewCount: 145,
      shortDesc: 'Effleurage, petrissage, and light percussive movements that stimulate blood oxygenation, remove metabolic waste, and induce euphoria.',
      longDesc: 'The foundation of holistic European bodywork. Designed to stimulate lymphatic flow toward the heart while loosening tense tendons and fostering an overall sensation of peaceful rejuvenation.',
      benefits: ['Enhances lymphatic drainage', 'Boosts oxygen flow in blood', 'Relaxes nervous system', 'Increases muscular suppleness'],
      image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=80',
      popular: false
    },
    {
      id: 'body-treatments',
      name: 'Illuminating Herbal Body Polish & Wrap',
      category: 'Body Treatments',
      price: 190,
      duration: ['90 min'],
      durationMinutes: 90,
      rating: 4.97,
      reviewCount: 78,
      shortDesc: 'Exfoliating marine salts, French clays, and wild silk protein wraps followed by a nutrient drench for glowing, velvet-soft skin.',
      longDesc: 'A total skin resurrection. Begins with micro-ground mineral salt exfoliation, followed by a warm cocoon cocooning you in volcanic nutrient mud, concluding with an organic camellia seed moisture lock.',
      benefits: ['Sloughs dead epidermal cells', 'Extracts cutaneous impurities', 'Replenishes lost minerals', 'Imparts luminous skin glow'],
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
      popular: true
    }
  ],

  therapists: [
    {
      id: 'sarah-chen',
      name: 'Sarah Chen, LMT',
      role: 'Master Holistic Bodyworker & Director of Therapies',
      experience: '12 Years Experience',
      rating: 4.98,
      reviewCount: 310,
      bio: 'Trained in Kyoto and Zurich, Sarah fuses eastern meridian therapy with precise Western biomechanics to address root causes of bodily stagnation.',
      specialties: ['Swedish', 'Aromatherapy', 'Deep Tissue', 'Reflexology'],
      photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
      available: true,
      days: ['Mon', 'Tue', 'Wed', 'Fri', 'Sat']
    },
    {
      id: 'maya-patel',
      name: 'Maya Patel, RMT',
      role: 'Senior Ayurvedic & Thermal Specialist',
      experience: '9 Years Experience',
      rating: 4.94,
      reviewCount: 220,
      bio: 'Maya specializes in vibrational energy balance and thermal basalt stone treatments, guiding guests into deeply restorative meditative states.',
      specialties: ['Hot Stone', 'Ayurveda', 'Relaxation', 'Head & Scalp'],
      photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&q=80',
      available: true,
      days: ['Tue', 'Wed', 'Thu', 'Sat', 'Sun']
    },
    {
      id: 'james-wilson',
      name: 'James Wilson, CSCS, LMT',
      role: 'Neuromuscular & Sports Rehabilitation Specialist',
      experience: '10 Years Experience',
      rating: 4.91,
      reviewCount: 195,
      bio: 'Former clinical athletic therapist dedicated to myofascial decompression, kinetic postural alignment, and deep muscular restoration.',
      specialties: ['Deep Tissue', 'Trigger Point', 'Myofascial Release', 'Postural Restoration'],
      photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80',
      available: false,
      days: ['Mon', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    {
      id: 'lisa-moretti',
      name: 'Lisa Moretti, CIDESCO',
      role: 'Senior Esthetician & Botanical Formulator',
      experience: '8 Years Experience',
      rating: 4.96,
      reviewCount: 168,
      bio: 'International CIDESCO diplomat focused on botanical dermal nourishment, holistic lymphatic drainage, and ritual herbal body wraps.',
      specialties: ['Body Treatments', 'Aromatherapy Polish', 'Facial Acupressure', 'Lymphatic Detox'],
      photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&q=80',
      available: true,
      days: ['Mon', 'Wed', 'Thu', 'Fri', 'Sun']
    }
  ],

  membershipPlans: [
    {
      id: 'serenity',
      name: 'Serenity Tier',
      price: 119,
      period: 'per month',
      badge: 'Starter',
      featured: false,
      description: 'Ideal for establishing a dependable monthly wellness ritual and maintaining calm focus.',
      features: [
        '1 Signature 60-min massage or treatment per month',
        '10% savings on all supplementary spa services',
        'Unlimited access to Himalayan salt lounge & tea bar',
        'Priority booking access with 48h advance reservation',
        'Complimentary aromatic steam shower before sessions'
      ],
      cta: 'Join Serenity'
    },
    {
      id: 'radiance',
      name: 'Radiance Tier',
      price: 219,
      period: 'per month',
      badge: 'Most Popular',
      featured: true,
      description: 'Our most cherished holistic membership for comprehensive bodily renewal and beauty ritual.',
      features: [
        '2 Premium 60-min or 90-min treatments monthly',
        '15% savings across all services and boutique cosmetics',
        'Unlimited hydrotherapy thermal suites & eucalyptus saunas',
        'Complimentary guest pass every quarter',
        'Bespoke seasonal essential oil roll-on blend gifted each visit',
        'Complimentary valet parking and welcome champagne elixir'
      ],
      cta: 'Join Radiance'
    },
    {
      id: 'sanctuary',
      name: 'Sanctuary Elite',
      price: 369,
      period: 'per month',
      badge: 'VIP Platinum',
      featured: false,
      description: 'The pinnacle of bespoke luxury, continuous wellbeing, and private wellness retreat.',
      features: [
        '4 Bespoke treatments (any modality, up to 90 min) monthly',
        '25% savings on all treatments and boutique retail',
        'Unrestricted private cabana suite booking privileges',
        'Dedicated personal wellness concierge & direct therapist match',
        'Unlimited guest accompaniment to thermal hydrotherapy gardens',
        'Annual complimentary private spa day celebration for two'
      ],
      cta: 'Join Sanctuary'
    }
  ],

  sampleBookings: [
    {
      id: 'KSP-849201',
      treatment: 'Signature Relaxation Massage',
      treatmentId: 'relaxation-massage',
      therapist: 'Sarah Chen, LMT',
      therapistId: 'sarah-chen',
      date: '2026-11-28',
      time: '10:30 AM',
      duration: '60 min',
      price: 140,
      status: 'confirmed',
      notes: 'Focus on shoulder tension, lavender scent requested.'
    },
    {
      id: 'KSP-731940',
      treatment: 'Volcanic Basalt Hot Stone Therapy',
      treatmentId: 'hot-stone-therapy',
      therapist: 'Maya Patel, RMT',
      therapistId: 'maya-patel',
      date: '2026-12-05',
      time: '02:00 PM',
      duration: '75 min',
      price: 175,
      status: 'confirmed',
      notes: 'Medium pressure, warming oils.'
    },
    {
      id: 'KSP-612089',
      treatment: 'Botanical Aromatherapy Ritual',
      treatmentId: 'aromatherapy-massage',
      therapist: 'Lisa Moretti, CIDESCO',
      therapistId: 'lisa-moretti',
      date: '2026-12-14',
      time: '11:00 AM',
      duration: '60 min',
      price: 155,
      status: 'pending',
      notes: 'Bergamot and cedarwood preferred.'
    }
  ],

  treatmentHistory: [
    {
      id: 'KSP-510928',
      treatment: 'Deep Tissue Therapeutic Massage',
      therapist: 'James Wilson, CSCS, LMT',
      date: '2026-10-18',
      time: '03:30 PM',
      duration: '60 min',
      price: 165,
      status: 'completed',
      receiptUrl: '#',
      ratingGiven: 5
    },
    {
      id: 'KSP-420911',
      treatment: 'Signature Relaxation Massage',
      therapist: 'Sarah Chen, LMT',
      date: '2026-09-22',
      time: '10:00 AM',
      duration: '90 min',
      price: 195,
      status: 'completed',
      receiptUrl: '#',
      ratingGiven: 5
    },
    {
      id: 'KSP-380122',
      treatment: 'Illuminating Herbal Body Polish & Wrap',
      therapist: 'Lisa Moretti, CIDESCO',
      date: '2026-08-14',
      time: '01:00 PM',
      duration: '90 min',
      price: 190,
      status: 'completed',
      receiptUrl: '#',
      ratingGiven: 5
    },
    {
      id: 'KSP-291040',
      treatment: 'Classic Nordic Swedish Massage',
      therapist: 'Sarah Chen, LMT',
      date: '2026-07-03',
      time: '11:30 AM',
      duration: '60 min',
      price: 135,
      status: 'completed',
      receiptUrl: '#',
      ratingGiven: 4
    }
  ],

  notifications: [
    {
      id: 'notif-001',
      type: 'confirmation',
      title: 'Appointment Confirmed',
      message: 'Your Signature Relaxation Massage with Sarah Chen on Nov 28 at 10:30 AM has been locked in.',
      date: '2026-11-16',
      read: false
    },
    {
      id: 'notif-002',
      type: 'reminder',
      title: 'Upcoming Session in 48 Hours',
      message: 'Please arrive 15 minutes prior to your treatment to enjoy our organic herbal infusion bar.',
      date: '2026-11-15',
      read: false
    },
    {
      id: 'notif-003',
      type: 'promotion',
      title: 'Seasonal Winter Radiance Ritual',
      message: 'Members receive early-bird bookings and a bonus cedar bath soak with any Hot Stone service this December.',
      date: '2026-11-12',
      read: true
    },
    {
      id: 'notif-004',
      type: 'system',
      title: 'Monthly Membership Credits Applied',
      message: 'Your Radiance Tier membership credited 2 new spa treatment vouchers to your account balance.',
      date: '2026-11-01',
      read: true
    }
  ],

  paymentHistory: [
    {
      id: 'INV-2026-011',
      date: '2026-11-01',
      description: 'Radiance Membership — Monthly Auto-renew',
      amount: 219.00,
      method: 'Visa •••• 4242',
      status: 'Paid',
      pdf: '#'
    },
    {
      id: 'INV-2026-010',
      date: '2026-10-18',
      description: 'Deep Tissue Massage (Add-on gratuity)',
      amount: 35.00,
      method: 'Visa •••• 4242',
      status: 'Paid',
      pdf: '#'
    },
    {
      id: 'INV-2026-009',
      date: '2026-10-01',
      description: 'Radiance Membership — Monthly Auto-renew',
      amount: 219.00,
      method: 'Visa •••• 4242',
      status: 'Paid',
      pdf: '#'
    }
  ],

  timeSlots: [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM'
  ],

  blogPosts: [
    {
      id: 'art-of-slow-living',
      slug: 'the-art-of-slow-living-rituals-for-everyday-calm',
      title: 'The Art of Slow Living: Daily Rituals for Cultivating Somatic Calm',
      category: 'Mindfulness',
      readTime: '5 min read',
      date: 'November 10, 2026',
      author: 'Sarah Chen, LMT',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      excerpt: 'Discover practical, mindful rituals that anchor nervous system balance amid modern urban overstimulation.',
      tags: ['Mindfulness', 'Wellness', 'Self Care']
    },
    {
      id: 'essential-oils-guide',
      slug: 'botanical-alchemy-guide-to-therapeutic-essential-oils',
      title: 'Botanical Alchemy: A Guide to Restorative Essential Oils',
      category: 'Aromatherapy',
      readTime: '7 min read',
      date: 'October 29, 2026',
      author: 'Lisa Moretti',
      image: 'https://images.unsplash.com/photo-1608181831688-8e2e5b4b02dc?w=800&q=80',
      excerpt: 'Explore how steam-distilled plant compounds communicate with olfactory receptors to dissolve stress.',
      tags: ['Aromatherapy', 'Holistic Health', 'Botanicals']
    },
    {
      id: 'hot-stone-science',
      slug: 'subterranean-warmth-the-science-behind-basalt-stone-therapy',
      title: 'Subterranean Warmth: The Science of Basalt Stone Therapy',
      category: 'Bodywork',
      readTime: '6 min read',
      date: 'October 14, 2026',
      author: 'Maya Patel',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=800&q=80',
      excerpt: 'How geology and ancient thermal therapies synergize to decompress deep connective tissue adhesions.',
      tags: ['Hot Stone', 'Muscle Recovery', 'Therapy']
    },
    {
      id: 'posture-alignment',
      slug: 'posture-breath-and-spinal-decompression',
      title: 'Posture, Breath, and Spinal Decompression at Your Desk',
      category: 'Therapeutic',
      readTime: '4 min read',
      date: 'September 30, 2026',
      author: 'James Wilson',
      image: 'https://images.unsplash.com/photo-1517637382994-f02da38c6728?w=800&q=80',
      excerpt: 'Practical ergonomic resets and diaphragmatic breaths to reverse computer-neck and shoulder constriction.',
      tags: ['Ergonomics', 'Posture', 'Rehabilitation']
    },
    {
      id: 'hydrotherapy-benefits',
      slug: 'immersion-and-contrast-the-healing-power-of-water',
      title: 'Immersion & Contrast: The Healing Power of Thermal Springs',
      category: 'Hydrotherapy',
      readTime: '8 min read',
      date: 'September 18, 2026',
      author: 'Sarah Chen, LMT',
      image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80',
      excerpt: 'Unlocking vascular vitality, immune vigor, and dopamine release with gentle contrast hydrotherapy.',
      tags: ['Hydrotherapy', 'Immunity', 'Thermal Spa']
    },
    {
      id: 'winter-skin-nourishment',
      slug: 'nourishing-winter-skin-botanical-lipids-and-ceramides',
      title: 'Nourishing Winter Skin: Plant Lipids & Barrier Ceramides',
      category: 'Skincare',
      readTime: '5 min read',
      date: 'September 02, 2026',
      author: 'Lisa Moretti',
      image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80',
      excerpt: 'Shielding skin radiance against harsh seasonal dryness using cold-pressed omega oils and botanical balms.',
      tags: ['Skincare', 'Beauty', 'Organic']
    }
  ]
};
