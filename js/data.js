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

  /**
   * Full journal articles used by pages/blog-details.html.
   * Each entry is selected through ?article=<slug> from the blog cards.
   */
  blogArticles: [
    {
      slug: 'regular-massage-therapy',
      title: 'The Transformative Benefits of Regular Massage Therapy',
      category: 'Wellness Guide',
      date: '2026-11-10',
      dateDisplay: 'Nov 10, 2026',
      readTime: '8 min read',
      author: 'Sarah Chen',
      authorRole: 'Lead Holistic Therapist & Wellness Director',
      authorPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80',
      authorBio: `With over 12 years of clinical bodywork and botanical wellness practice, Sarah specializes in integrative restorative therapy, myofascial release, and mindfulness-based stress reduction. She designs tailored care plans to help guests cultivate enduring serenity.`,
      image: 'https://i.pinimg.com/736x/a1/93/52/a193526742cd7d08312c69af4575301f.jpg',
      imageAlt: 'Serene massage therapy session with botanical elements',
      excerpt: `Discover how incorporating regular massage therapy into your wellness routine can profoundly transform your physical and mental wellbeing, from muscle recovery to emotional balance.`,
      pullquote: `Regular massage therapy isn't a luxury — it's one of the most effective ways to care for your body and mind.`,
      lead: `In our fast-paced modern world, constant stress and physical immobility gradually strain our bodies and minds without warning. Muscular knots tighten, sleep quality erodes, and chronic elevated cortisol quietly dampens our daily zest for life. Committing to consistent therapeutic bodywork isn't an occasional indulgence; it is an evidence-backed restorative ritual that resets the autonomic nervous system and restores harmonious vitality.`,
      toc: [
        { id: 'physical-benefits', label: 'The Physical Benefits of Regular Massage' },
        { id: 'mental-benefits', label: 'The Mental & Emotional Benefits' },
        { id: 'how-often', label: 'How Often Should You Book a Massage?' },
        { id: 'choosing-treatment', label: 'Choosing the Right Treatment for You' },
        { id: 'getting-started', label: 'Getting Started at Kora Spa' }
      ],
      sections: [
        {
          id: 'physical-benefits',
          heading: 'The Physical Benefits of Regular Massage',
          paragraphs: [
            `Musculoskeletal tension accumulates through repetitive motion, sedentary desk postures, and unconscious holding patterns. When skilled hands apply intentional, rhythmic friction and myofascial kneading, tight muscle fibers expand, releasing restricted adhesions in surrounding fascia.`,
            `Simultaneously, regular bodywork accelerates vascular circulation. The physical pressure strokes mechanically propel deoxygenated blood through the venous system, speeding up lymphatic drainage and cellular waste expulsion. Fresh, oxygenated blood floods newly softened tissue beds, delivering vital micronutrients that dramatically shorten post-exercise recovery windows.`
          ],
          highlight: {
            title: 'Clinical Insight: The Lymphatic Connection',
            text: `Gentle rhythmic massage strokes stimulate lymphatic valves that cannot pump themselves, eliminating metabolic byproducts up to 30% faster than passive sedentary rest.`
          },
          trailingParagraph: `Beyond pain reduction, consistent therapeutic touch preserves joint mobility and spinal alignment. By easing hypertonic tension across the hip flexors, cervical spine, and lumbar erectors, massage corrects compensatory movement flaws before they degenerate into chronic postural pain.`
        },
        {
          id: 'mental-benefits',
          heading: 'The Mental & Emotional Benefits',
          paragraphs: [
            `While the somatic relief of massage is immediate, its profound neurobiological impact may be even more transformative. Tactile stimulation stimulates nerve receptors nestled in the dermal layer, sending calming signals directly through the vagus nerve to down-regulate the sympathetic “fight or flight” mechanism.`,
            `Clinical studies demonstrate that a single 60-minute massage session reduces circulating salivary cortisol by up to 31% while elevating dopamine and serotonin levels by over 28%. Clients frequently describe leaving the treatment chamber feeling grounded, emotionally resilient, and enveloped by deep psychological quietude.`,
            `Furthermore, chronic stress severely disrupts slow-wave delta sleep cycles. By easing neuromuscular guarding, regular massage enables the brain to enter prolonged deep sleep stages, where cellular repair, memory consolidation, and hormonal balance naturally flourish.`
          ]
        },
        {
          id: 'how-often',
          heading: 'How Often Should You Book a Massage?',
          paragraphs: [
            `Optimal frequency depends on your lifestyle demands, physical exertion levels, and wellness objectives. Rather than waiting until pain becomes debilitating, establishing a proactive schedule yields compounding benefits.`
          ],
          table: {
            headers: ['Wellness Goal', 'Recommended Rhythm', 'Ideal Modality'],
            rows: [
              ['Stress Relief & Prevention', 'Monthly', 'Relaxation or Swedish Massage'],
              ['Chronic Tension & Desk Posture', 'Bi-Weekly', 'Deep Tissue & Trigger Point'],
              ['Athletic Training Recovery', 'Weekly or Bi-Weekly', 'Sports Therapy & Hot Stone'],
              ['Total Nervous System Reset', 'Every 3–4 Weeks', 'Botanical Aromatherapy']
            ]
          }
        },
        {
          id: 'choosing-treatment',
          heading: 'Choosing the Right Treatment for You',
          paragraphs: [
            `Selecting the treatment suited to your present state ensures the most rewarding restorative experience:`
          ],
          list: [
            `<strong>Overstimulated & Mentally Fatigued:</strong> Choose our <em>Relaxation Massage</em> with soothing Swedish strokes and soft ambient warmth to gently recalibrate your nervous system.`,
            `<strong>Deep Knots & Neck/Shoulder Rigidity:</strong> Opt for our <em>Deep Tissue Massage</em>, utilizing targeted slow friction and elbow pressure to resolve chronic myofascial adhesions.`,
            `<strong>Emotional Exhaustion & Low Energy:</strong> Our <em>Aromatherapy Treatment</em> infuses high-grade wildcrafted essential oils like bergamot, frankincense, and lavender directly into the skin.`,
            `<strong>Cold Weather Stiffness & Joint Aches:</strong> Experience <em>Hot Stone Therapy</em>, where heated basalt minerals transfer deep thermal relief directly into underlying muscular layers.`
          ]
        },
        {
          id: 'getting-started',
          heading: 'Getting Started at Kora Spa',
          paragraphs: [
            `Beginning your regular wellness rhythm is seamless. During your initial consultation, our licensed practitioners conduct an intuitive intake assessment, tailoring pressure gradients, aromatherapy notes, and target muscle groups to your unique physical constitution.`,
            `Whether you visit us for monthly preventative care or seek weekly recovery, we are honored to walk beside you on your journey toward sustained peace and vitality.`
          ]
        }
      ],
      inlineImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
      inlineAlt: 'Specialist massage therapist performing neck and shoulder acupressure',
      inlineCaption: `Gentle acupressure and essential oil blends enhance somatic relaxation during a Kora Signature treatment.`,
      tipsTitle: '5 Tips for Maximizing Your Massage Experience',
      tipsSubtitle: `Simple, intentional steps to deepen the restorative effects of your therapy before, during, and after each appointment.`,
      tips: [
        { title: 'Hydrate Well', text: `Drink plenty of fresh water before and after your session to assist cellular flushing and accelerate lymphatic detoxification.` },
        { title: 'Arrive Early', text: `Allow yourself 15–20 minutes to settle into our tea lounge, sip calming herbal infusions, and quiet mental turbulence.` },
        { title: 'Communicate Freely', text: `Your therapist tunes pressure, ambient temperature, and focus areas to your real-time feedback throughout the session.` },
        { title: 'Avoid Rushing', text: `Carve out 20–30 minutes of gentle post-treatment stillness instead of jumping immediately back into busy digital schedules.` },
        { title: 'Book Regularly', text: `The physiological gains compound with steady recurrence, preventing postural knots from reforming into chronic tension.` }
      ],
      ambientTitle: 'Embrace the Art of Stillness',
      ambientText: `Give yourself permission to pause, breathe deeply, and reconnect with your inner serenity in an atmosphere crafted solely for your restoration.`,
      ctaTitle: 'Ready to Experience the Benefits?',
      ctaText: `Step away from the demands of everyday life and immerse yourself in a tailored massage experience that reclaims your inner calm and vitality.`
    },
    {
      slug: 'aromatherapy-scents-that-heal',
      title: 'An Introduction to Aromatherapy: Scents That Heal',
      category: 'Treatment Guide',
      date: '2026-11-05',
      dateDisplay: 'Nov 5, 2026',
      readTime: '6 min read',
      author: 'Lisa Moretti',
      authorRole: 'Senior Esthetician & Botanical Formulator',
      authorPhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&q=80',
      authorBio: `Lisa is an international CIDESCO diplomat focused on botanical dermal nourishment, holistic lymphatic drainage, and the ceremonial use of aromatic plant extracts.`,
      image: 'https://i.pinimg.com/1200x/34/1d/59/341d590120412424d54c25fd946f6a18.jpg',
      imageAlt: 'Essential aromatherapy oils and dried botanicals',
      excerpt: `Aromatherapy pairs therapeutic botanical essences with rhythmic bodywork to stimulate olfactory pathways and soothe nervous tension. Learn how pure lavender, eucalyptus, and bergamot can reset your inner equilibrium.`,
      pullquote: `Scent bypasses logic and speaks directly to the nervous system — a quiet, elegant pathway back to balance.`,
      lead: `A single breath can change the tone of an entire afternoon. Aromatherapy works at the meeting point of chemistry and emotion, using volatile plant compounds to gently influence mood, muscular tension, and the pace of breathing. At Kora Spa, essential oils are never an afterthought; they are selected with the same care as the massage technique itself.`,
      toc: [
        { id: 'how-scent-works', label: 'How Scent Talks to the Brain' },
        { id: 'key-oils', label: 'Three Oils Worth Knowing' },
        { id: 'during-treatment', label: 'Aromatherapy During Bodywork' },
        { id: 'home-ritual', label: 'A Simple Home Ritual' },
        { id: 'safety-tips', label: 'Safety and Sensitivity' }
      ],
      sections: [
        {
          id: 'how-scent-works',
          heading: 'How Scent Talks to the Brain',
          paragraphs: [
            `Odor molecules travel through the nasal passages to the olfactory bulb, which shares close connections with the limbic system — the brain's emotional and memory center. This is why a familiar fragrance can soften your posture or summon a memory before you have consciously named it.`,
            `In a treatment room, that pathway becomes a gentle ally. Slow, deliberate breathing through the nose sends a steady stream of aromatic molecules upward while the massage itself encourages the shoulders to drop and the jaw to unclench.`
          ]
        },
        {
          id: 'key-oils',
          heading: 'Three Oils Worth Knowing',
          paragraphs: [
            `Rather than overwhelming the senses with a complex blend, our therapists begin with one or two oils chosen for your present state.`
          ],
          list: [
            `<strong>Lavender:</strong> calming and sedative, ideal for racing thoughts and a tight upper back.`,
            `<strong>Eucalyptus:</strong> clears the breath and refreshes mental fog, especially during seasonal congestion.`,
            `<strong>Bergamot:</strong> brightens mood without overstimulation, beautiful in morning or early afternoon sessions.`
          ]
        },
        {
          id: 'during-treatment',
          heading: 'Aromatherapy During Bodywork',
          paragraphs: [
            `Your therapist will offer a brief scent consultation before the session begins. Oils are diluted in a skin-safe carrier and warmed between the palms, then applied with long, flowing strokes that distribute the aroma evenly without overwhelming the senses.`,
            `Because the skin also absorbs aromatic compounds, the effect is twofold: inhalation supports emotional regulation while the massage encourages muscular release. Clients often describe the experience as feeling "quieter" from the inside out.`
          ]
        },
        {
          id: 'home-ritual',
          heading: 'A Simple Home Ritual',
          paragraphs: [
            `Place one drop of lavender on a cotton pad beside your pillow, or add two drops of bergamot to a diffuser for twenty minutes while you change into evening clothes. Keep the ritual small and repeatable; consistency matters far more than intensity.`,
            `Pair the scent with three slow breaths and a deliberate relaxation of the jaw. Over time, the aroma becomes a cue that lets your nervous system know the day is ending.`
          ]
        },
        {
          id: 'safety-tips',
          heading: 'Safety and Sensitivity',
          paragraphs: [
            `Essential oils are potent. They should never be applied undiluted to sensitive skin, and citrus oils can increase photosensitivity for several hours. Always tell your therapist about allergies, pregnancy, or medications before your session.`,
            `If a scent feels uncomfortable at any point, say so. Part of the therapy is learning which aromas support you and which ones ask to be set aside.`
          ]
        }
      ],
      inlineImage: 'https://i.pinimg.com/1200x/34/1d/59/341d590120412424d54c25fd946f6a18.jpg',
      inlineAlt: 'Botanical oils arranged for an aromatherapy ritual',
      inlineCaption: `Pure botanical essences are selected individually for every Kora Spa aromatherapy session.`,
      tipsTitle: '5 Ways to Bring Aromatherapy Home',
      tipsSubtitle: `Gentle, low-effort ways to extend the calming benefits of your treatment between visits.`,
      tips: [
        { title: 'Start With One Scent', text: `Choose a single oil for a week before building a blend, so you can notice its true effect on your mood and sleep.` },
        { title: 'Diffuse Briefly', text: `Twenty minutes is often enough. Continuous diffusion can dull your sensitivity and flatten the experience.` },
        { title: 'Dilute Always', text: `Blend essential oils with a carrier oil before skin contact, especially for the face and sensitive areas.` },
        { title: 'Mind the Timing', text: `Use uplifting citrus oils in the morning and reserve sedative florals such as lavender for the evening.` },
        { title: 'Store With Care', text: `Keep bottles closed, cool, and away from sunlight to protect their delicate aromatic compounds.` }
      ],
      ambientTitle: 'Breathe, Then Begin Again',
      ambientText: `Let a familiar scent become the threshold between a busy day and a quieter, more receptive state of mind.`,
      ctaTitle: 'Find Your Signature Scent',
      ctaText: `Let our botanical specialists guide you toward an aromatic blend that feels unmistakably your own.`
    },
    {
      slug: 'hot-stone-therapy-session',
      title: 'Hot Stone Therapy: What to Expect During Your Session',
      category: 'Treatment Guide',
      date: '2026-10-20',
      dateDisplay: 'Oct 20, 2026',
      readTime: '7 min read',
      author: 'Maya Patel',
      authorRole: 'Senior Ayurvedic & Thermal Specialist',
      authorPhoto: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=100&q=80',
      authorBio: `Maya specializes in vibrational energy balance and thermal basalt stone treatments, guiding guests into deeply restorative meditative states.`,
      image: 'https://i.pinimg.com/736x/ae/2f/a3/ae2fa34170f51ab0c6db41edca7c14a3.jpg',
      imageAlt: 'Smooth hot basalt massage stones resting beside white orchid',
      excerpt: `Smooth heated basalt stones glide along muscle meridians, delivering gentle penetrating warmth directly into tightened fascia. Discover how this ancient geological therapy melts away stress and awakens circulation.`,
      pullquote: `Heat does not force the body to relax — it invites it to remember how.`,
      lead: `Hot stone therapy is often described as a deep exhalation that you do not have to initiate yourself. Warm basalt stones, chosen for their ability to hold and radiate heat, are placed and glided along the body with slow, deliberate movements. The result is a session that feels both grounding and profoundly releasing.`,
      toc: [
        { id: 'what-are-stones', label: 'Why Basalt Stones?' },
        { id: 'warmth-circulation', label: 'Warmth, Circulation & Release' },
        { id: 'session-flow', label: 'The Session, Step by Step' },
        { id: 'who-its-for', label: 'Who It Suits Best' },
        { id: 'aftercare', label: 'Aftercare & Integration' }
      ],
      sections: [
        {
          id: 'what-are-stones',
          heading: 'Why Basalt Stones?',
          paragraphs: [
            `Basalt is a dense volcanic rock formed from cooled lava. Its mineral structure allows it to absorb heat evenly and release it slowly, creating a steady, enveloping warmth rather than a sharp surface heat.`,
            `At Kora Spa, stones are selected in graduated sizes and heated in a temperature-controlled bath. Your therapist tests each stone against the forearm before it ever touches your skin.`
          ]
        },
        {
          id: 'warmth-circulation',
          heading: 'Warmth, Circulation & Release',
          paragraphs: [
            `Warmth encourages blood vessels to expand, increasing circulation through areas that have been guarded and tight. Fresh blood arrives with oxygen and nutrients while metabolic byproducts are carried away more efficiently.`,
            `As the muscles soften, the therapist can work more deeply without asking the body to resist. Many clients say the warmth seems to "melt" tension from the inside, especially across the shoulders, lower back, and hips.`
          ]
        },
        {
          id: 'session-flow',
          heading: 'The Session, Step by Step',
          paragraphs: [
            `Your session begins with a short consultation, followed by placement of smooth stones along the spine, palms, and feet. You will be asked whether the temperature feels comfortable before the massage portion begins.`,
            `The therapist then glides warmed stones along muscle pathways, alternating with hands-on pressure. Stones are gradually removed as the session progresses, leaving the body warm, heavy, and quiet.`
          ]
        },
        {
          id: 'who-its-for',
          heading: 'Who It Suits Best',
          paragraphs: [
            `Hot stone therapy is especially supportive during colder months, for athletic recovery, and for anyone holding chronic tension in the back and shoulders. It is also a beautiful choice for clients who find deep pressure uncomfortable, since warmth does much of the preparatory work.`,
            `Please let us know if you have circulation concerns, diabetes, pregnancy, or any condition that alters heat sensitivity so we can adapt or suggest an alternative treatment.`
          ]
        },
        {
          id: 'aftercare',
          heading: 'Aftercare & Integration',
          paragraphs: [
            `Drink water generously and allow a slow transition back into your day. The deep relaxation can linger for hours, so avoid scheduling anything demanding immediately afterward.`,
            `A warm shower, a light meal, and an early night will help the body integrate the benefits of the session.`
          ]
        }
      ],
      inlineImage: 'https://i.pinimg.com/736x/ae/2f/a3/ae2fa34170f51ab0c6db41edca7c14a3.jpg',
      inlineAlt: 'Basalt stones prepared for a thermal massage treatment',
      inlineCaption: `Each stone is warmed, tested, and placed with intention before the massage begins.`,
      tipsTitle: '5 Tips for a Restorative Stone Session',
      tipsSubtitle: `Small choices before and after your appointment that deepen the thermal benefits.`,
      tips: [
        { title: 'Speak Up Early', text: `Tell your therapist immediately if a stone feels too warm. Comfort is always more important than endurance.` },
        { title: 'Arrive Hydrated', text: `Warm therapy encourages circulation and sweating, so begin your session with plenty of water onboard.` },
        { title: 'Wear Loose Layers', text: `Comfortable clothing makes the transition back into the outside world much gentler.` },
        { title: 'Slow Your Exit', text: `Sit for a few minutes after the treatment before standing, especially if you become lightheaded with heat.` },
        { title: 'Keep It Warm', text: `Pair your session with a warm scarf or blanket on the way home to extend the comforting effects.` }
      ],
      ambientTitle: 'Let the Warmth Linger',
      ambientText: `Carry the unhurried feeling of the treatment room into the rest of your day, one slow breath at a time.`,
      ctaTitle: 'Experience Deep Thermal Calm',
      ctaText: `Discover why our volcanic stone therapy is a favorite for tension, cold-weather restoration, and quiet minds.`
    },
    {
      slug: 'prepare-for-spa-visit',
      title: 'How to Prepare for Your Spa Visit: A Complete Guide',
      category: 'Spa Guide',
      date: '2026-10-12',
      dateDisplay: 'Oct 12, 2026',
      readTime: '5 min read',
      author: 'Sarah Chen',
      authorRole: 'Lead Holistic Therapist & Wellness Director',
      authorPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80',
      authorBio: `With over 12 years of clinical bodywork and botanical wellness practice, Sarah specializes in integrative restorative therapy, myofascial release, and mindfulness-based stress reduction.`,
      image: 'https://i.pinimg.com/736x/ee/78/d7/ee78d7cbf8a7302305c6a55d5bdf41a8.jpg',
      imageAlt: 'Tranquil spa lounge with plush linen robe and slippers',
      excerpt: `From mindful pre-hydration and comfortable attire to setting intentions and unhurried arrival, thoughtful preparation transforms your visit from a quick appointment into an immersive restorative retreat.`,
      pullquote: `The treatment begins long before you reach the table — it starts with how you arrive.`,
      lead: `A spa visit should never feel like another item squeezed into an overfull calendar. A little preparation protects the preciousness of the experience, allowing you to step out of momentum and into a space that has been shaped entirely around your restoration.`,
      toc: [
        { id: 'before-you-arrive', label: 'Before You Arrive' },
        { id: 'what-to-wear', label: 'What to Wear' },
        { id: 'arrival-ritual', label: 'The Arrival Ritual' },
        { id: 'share-preferences', label: 'Sharing Your Preferences' },
        { id: 'after-visit', label: 'After Your Visit' }
      ],
      sections: [
        {
          id: 'before-you-arrive',
          heading: 'Before You Arrive',
          paragraphs: [
            `Drink water steadily throughout the day rather than trying to compensate right before your session. Eat something light if you are hungry, and avoid a heavy meal within two hours of bodywork.`,
            `Complete any intake forms in advance if possible. Knowing about injuries, sensitivities, or medications ahead of time lets your therapist tailor the session from the first minute.`
          ]
        },
        {
          id: 'what-to-wear',
          heading: 'What to Wear',
          paragraphs: [
            `Comfort is the only rule. Loose layers, soft fabrics, and easy-to-remove shoes make the transition simple. We provide robes, slippers, and discreet changing space, so you never need to bring anything special.`,
            `Leave jewelry and valuables at home when you can. The less you have to manage, the more fully you can settle in.`
          ]
        },
        {
          id: 'arrival-ritual',
          heading: 'The Arrival Ritual',
          paragraphs: [
            `Plan to arrive fifteen to twenty minutes early. That time belongs to you: a quiet seat in the tea lounge, a warm herbal infusion, a few breaths without a screen, and the gentle realization that nothing is required of you for a while.`,
            `If you are running late, call us. We will do our best to preserve as much of your session as possible without rushing the next guest.`
          ]
        },
        {
          id: 'share-preferences',
          heading: 'Sharing Your Preferences',
          paragraphs: [
            `Your therapist will ask about pressure, focus areas, temperature, and scent. Specific feedback is welcome — "a little lighter on the shoulders" is far more useful than simply saying "good" while silently tolerating discomfort.`,
            `You are also welcome to ask for silence. Many guests find that the deepest rest arrives when conversation simply stops.`
          ]
        },
        {
          id: 'after-visit',
          heading: 'After Your Visit',
          paragraphs: [
            `Do not rush straight into a demanding task. Give yourself twenty minutes to drink water, notice how your body feels, and return to the day slowly.`,
            `The effects of bodywork continue to unfold over the following day, so keep your evening gentle and your expectations of yourself modest.`
          ]
        }
      ],
      inlineImage: 'https://i.pinimg.com/736x/ee/78/d7/ee78d7cbf8a7302305c6a55d5bdf41a8.jpg',
      inlineAlt: 'Robe and slippers waiting in a peaceful spa lounge',
      inlineCaption: `A few quiet minutes in our lounge are part of the treatment, not a pause before it.`,
      tipsTitle: '5 Small Ways to Prepare',
      tipsSubtitle: `A short checklist that makes every visit feel more spacious and more yours.`,
      tips: [
        { title: 'Hydrate Through the Day', text: `Steady water intake supports circulation and makes the body more receptive to massage.` },
        { title: 'Arrive Early', text: `Fifteen quiet minutes change the entire tone of the appointment.` },
        { title: 'Keep It Simple', text: `Loose clothing and minimal valuables remove unnecessary decisions.` },
        { title: 'Name Your Pressure', text: `Tell your therapist what feels right in real time rather than waiting until the end.` },
        { title: 'Leave Space Afterward', text: `Protect a gentle buffer in your schedule so the calm can settle in.` }
      ],
      ambientTitle: 'Let the Visit Begin Early',
      ambientText: `You do not need to do anything elaborate. Simply arrive a little sooner, breathe a little slower, and let the sanctuary meet you there.`,
      ctaTitle: 'Plan Your Visit',
      ctaText: `Reserve your preferred time and give yourself the gift of an unhurried, restorative appointment.`
    },
    {
      slug: 'mindful-self-care-routine',
      title: 'Building a Mindful Self-Care Routine That Actually Works',
      category: 'Self-Care',
      date: '2026-10-28',
      dateDisplay: 'Oct 28, 2026',
      readTime: '6 min read',
      author: 'Sarah Chen',
      authorRole: 'Lead Holistic Therapist & Wellness Director',
      authorPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80',
      authorBio: `With over 12 years of clinical bodywork and botanical wellness practice, Sarah specializes in integrative restorative therapy, myofascial release, and mindfulness-based stress reduction.`,
      image: 'https://i.pinimg.com/1200x/7a/ec/47/7aec478d1df759cb2df0103bc4edfbcf.jpg',
      imageAlt: 'Person practicing morning mindfulness in natural sunlit room',
      excerpt: `Craft a sustainable rhythm rooted in nervous-system regulation, gentle morning rituals, and restorative downtime that renews your vitality.`,
      pullquote: `Self-care is not another achievement to optimize. It is the quiet practice of staying in relationship with yourself.`,
      lead: `Most self-care routines fail because they are designed for an idealized version of a person — someone with more time, more energy, and fewer competing demands. A routine that actually works begins exactly where you are, with small repeated signals of safety that your nervous system can recognize.`,
      toc: [
        { id: 'why-routines-fail', label: 'Why Routines Fail' },
        { id: 'nervous-system-first', label: 'Start With the Nervous System' },
        { id: 'morning-anchors', label: 'Simple Morning Anchors' },
        { id: 'micro-rest', label: 'Micro-Rest During the Day' },
        { id: 'review-gently', label: 'Review Without Judgment' }
      ],
      sections: [
        {
          id: 'why-routines-fail',
          heading: 'Why Routines Fail',
          paragraphs: [
            `We often choose practices that look impressive rather than practices we will repeat. A sixty-minute meditation each morning may be beautiful in theory, but five honest minutes every day will reshape your baseline far more reliably.`,
            `The useful question is not "What should an ideal routine look like?" but "What can I return to even on a difficult Tuesday?"`
          ]
        },
        {
          id: 'nervous-system-first',
          heading: 'Start With the Nervous System',
          paragraphs: [
            `Before adding supplements, journals, or elaborate rituals, give your body evidence that it is safe. Slow exhalations, a relaxed jaw, warmth around the shoulders, and unhurried movement all signal a shift out of threat mode.`,
            `Once the nervous system settles, healthier choices become less effortful. Discipline follows regulation far more easily than regulation follows discipline.`
          ]
        },
        {
          id: 'morning-anchors',
          heading: 'Simple Morning Anchors',
          paragraphs: [
            `Choose two anchors, not ten. A glass of water beside the bed and three slow breaths before reaching for your phone can create a surprisingly durable sense of steadiness.`,
            `If you have a little more space, add a minute of gentle spinal movement. The goal is to greet the body, not to train it.`
          ]
        },
        {
          id: 'micro-rest',
          heading: 'Micro-Rest During the Day',
          paragraphs: [
            `Rest does not have to be a full vacation to count. Unclenching your hands, lowering your shoulders, looking out a window, or taking three conscious breaths between meetings all create small recovery pockets.`,
            `These micro-moments prevent tension from accumulating until the only available release is exhaustion.`
          ]
        },
        {
          id: 'review-gently',
          heading: 'Review Without Judgment',
          paragraphs: [
            `At the end of the week, notice what felt supportive and what felt like obligation. Keep the first, release the second, and adjust without criticism.`,
            `A sustainable self-care practice evolves with your life. Its purpose is to keep you company, not to keep score.`
          ]
        }
      ],
      inlineImage: 'https://i.pinimg.com/1200x/7a/ec/47/7aec478d1df759cb2df0103bc4edfbcf.jpg',
      inlineAlt: 'Soft morning light in a calm room',
      inlineCaption: `A few unhurried minutes in the morning can change the texture of the whole day.`,
      tipsTitle: '5 Gentle Self-Care Anchors',
      tipsSubtitle: `Small, repeatable practices that ask very little and give back steadily.`,
      tips: [
        { title: 'Water First', text: `Place water beside your bed so hydration is the easiest possible first choice.` },
        { title: 'Three Breaths', text: `Let the exhale be longer than the inhale before you look at a screen.` },
        { title: 'Soften the Jaw', text: `A relaxed jaw is a quick, quiet signal to the rest of the body that the moment is safe.` },
        { title: 'Take Micro-Rests', text: `Use transitions between tasks to stand, stretch, and look somewhere distant.` },
        { title: 'Keep It Small', text: `Choose a practice you can maintain on your busiest day, not your best day.` }
      ],
      ambientTitle: 'Return to Yourself, Gently',
      ambientText: `The most lasting rituals are the ones that feel like coming home rather than another demand on your time.`,
      ctaTitle: 'Make Rest a Ritual',
      ctaText: `Pair your home practice with regular therapeutic support and notice how steadily the benefits accumulate.`
    },
    {
      slug: 'winter-wellness-colder-months',
      title: 'Winter Wellness: Nourishing Your Body Through the Colder Months',
      category: 'Seasonal',
      date: '2026-10-05',
      dateDisplay: 'Oct 5, 2026',
      readTime: '5 min read',
      author: 'Lisa Moretti',
      authorRole: 'Senior Esthetician & Botanical Formulator',
      authorPhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&q=80',
      authorBio: `Lisa is an international CIDESCO diplomat focused on botanical dermal nourishment, holistic lymphatic drainage, and the ceremonial use of aromatic plant extracts.`,
      image: 'https://i.pinimg.com/1200x/e0/1e/22/e01e2220b559769db89b508faa15956d.jpg',
      imageAlt: 'Cozy herbal tea infusion with cinnamon and winter spices',
      excerpt: `Discover warming therapies, restorative herbal soaks, and deep skin hydration practices to stay radiant, grounded, and healthy all season.`,
      pullquote: `Winter asks us to turn inward. The right rituals make that inward turn feel like warmth rather than restriction.`,
      lead: `Shorter days, drier air, and a natural pull toward stillness change what our bodies need. Winter wellness is not about pushing through the season unchanged; it is about meeting it with warmth, nourishment, and a little more gentleness than usual.`,
      toc: [
        { id: 'seasonal-shift', label: 'Understanding the Seasonal Shift' },
        { id: 'warming-therapies', label: 'Warming Therapies' },
        { id: 'herbal-soaks', label: 'Restorative Herbal Soaks' },
        { id: 'skin-hydration', label: 'Deep Skin Hydration' },
        { id: 'mindful-nutrition', label: 'Mindful Seasonal Nutrition' }
      ],
      sections: [
        {
          id: 'seasonal-shift',
          heading: 'Understanding the Seasonal Shift',
          paragraphs: [
            `Cold air holds less moisture, and indoor heating can leave skin and respiratory passages feeling depleted. At the same time, reduced daylight can influence mood, sleep timing, and energy.`,
            `Rather than resisting these changes, treat them as information. The body often wants slower mornings, warmer foods, and more deliberate rest during this part of the year.`
          ]
        },
        {
          id: 'warming-therapies',
          heading: 'Warming Therapies',
          paragraphs: [
            `Hot stone therapy, warm compresses, and eucalyptus steam are especially supportive in winter. Heat encourages circulation to the hands and feet, eases stiff joints, and invites the nervous system to soften.`,
            `A monthly thermal treatment can be more valuable than a crowded schedule of quick appointments. Consistency and warmth matter more than intensity.`
          ]
        },
        {
          id: 'herbal-soaks',
          heading: 'Restorative Herbal Soaks',
          paragraphs: [
            `Add a handful of Epsom salts and a few drops of cedarwood or chamomile to a warm bath. Soak for fifteen to twenty minutes, allowing the warmth to do the work rather than filling the time with tasks.`,
            `Follow with a slow, unhurried transition to bed. The ritual signals that the day is complete.`
          ]
        },
        {
          id: 'skin-hydration',
          heading: 'Deep Skin Hydration',
          paragraphs: [
            `Switch to a richer cleanser and apply a ceramide moisturizer while skin is still slightly damp. Cold-pressed oils such as rosehip or camellia can be pressed over the top to seal in moisture.`,
            `A gentle body polish once a week removes dull surface cells and allows hydrating formulas to absorb more effectively.`
          ]
        },
        {
          id: 'mindful-nutrition',
          heading: 'Mindful Seasonal Nutrition',
          paragraphs: [
            `Warm, mineral-rich soups, slow-cooked grains, and spices such as cinnamon and ginger support circulation and digestion. Herbal teas offer hydration with an added moment of pause.`,
            `Let the season be an invitation to simplify: fewer rushed meals, more warmth, and more time at the table.`
          ]
        }
      ],
      inlineImage: 'https://i.pinimg.com/1200x/e0/1e/22/e01e2220b559769db89b508faa15956d.jpg',
      inlineAlt: 'Warm winter tea with cinnamon and spices',
      inlineCaption: `A cup of spiced herbal tea can be both nourishment and a small daily ritual.`,
      tipsTitle: '5 Winter Wellness Rituals',
      tipsSubtitle: `Simple ways to stay warm, hydrated, and grounded through the colder months.`,
      tips: [
        { title: 'Choose Warmth Daily', text: `Prioritize warm meals, warm drinks, and layers that keep the neck and feet comfortable.` },
        { title: 'Soak Slowly', text: `A fifteen-minute mineral bath is enough to ease tension and support sleep.` },
        { title: 'Seal In Moisture', text: `Apply moisturizer to damp skin and finish with a nourishing facial oil.` },
        { title: 'Keep Moving Gently', text: `Short walks and gentle stretching maintain circulation when the weather discourages movement.` },
        { title: 'Protect Your Sleep', text: `Earlier evenings and dimmer light help align with the season's quieter rhythm.` }
      ],
      ambientTitle: 'A Softer Kind of Season',
      ambientText: `Let winter be a time for warmth, reflection, and deep care rather than simply something to endure.`,
      ctaTitle: 'Explore Winter Treatments',
      ctaText: `Discover seasonal therapies designed to restore warmth, hydration, and a sense of quiet celebration.`
    },
    {
      slug: 'morning-rituals-calm-energy',
      title: '5 Morning Rituals for Calm Energy & Mindful Focus',
      category: 'Wellness Guide',
      date: '2026-09-24',
      dateDisplay: 'Sep 24, 2026',
      readTime: '4 min read',
      author: 'Sarah Chen',
      authorRole: 'Lead Holistic Therapist & Wellness Director',
      authorPhoto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80',
      authorBio: `With over 12 years of clinical bodywork and botanical wellness practice, Sarah specializes in integrative restorative therapy, myofascial release, and mindfulness-based stress reduction.`,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920&q=85',
      imageAlt: 'Person meditating quietly in morning light',
      excerpt: `Begin your day with somatic intention: room-temperature lemon water, gentle diaphragm breathing, and ten minutes of gentle spine mobility before looking at screens.`,
      pullquote: `The first twenty minutes of the day do not need to be productive. They need to be steady.`,
      lead: `How a morning begins tends to echo through the rest of the day. A few simple rituals can create calm energy without asking you to wake up hours earlier or follow a rigid plan. The key is sequencing: signal safety to the body, then invite clarity.`,
      toc: [
        { id: 'hydrate-first', label: 'Hydrate Before Caffeine' },
        { id: 'breathe-before-screens', label: 'Breathe Before Screens' },
        { id: 'gentle-mobility', label: 'Gentle Spine Mobility' },
        { id: 'set-an-intention', label: 'Set One Quiet Intention' },
        { id: 'make-it-stick', label: 'Make It Stick' }
      ],
      sections: [
        {
          id: 'hydrate-first',
          heading: 'Hydrate Before Caffeine',
          paragraphs: [
            `After a long night, a glass of room-temperature water — with a squeeze of lemon if you enjoy it — rehydrates gently and wakes the digestive system without a jolt.`,
            `Wait a few minutes before coffee or tea. This small gap keeps caffeine from becoming the only signal that the day has begun.`
          ]
        },
        {
          id: 'breathe-before-screens',
          heading: 'Breathe Before Screens',
          paragraphs: [
            `Sit on the edge of the bed and take five slow breaths, letting each exhale be a little longer than the inhale. Notice the contact of your feet on the floor and the support beneath you.`,
            `This brief pause interrupts the reflex to reach immediately for information and gives your attention a chance to arrive in your own body first.`
          ]
        },
        {
          id: 'gentle-mobility',
          heading: 'Gentle Spine Mobility',
          paragraphs: [
            `Ten minutes of easy movement is enough: cat and cow, slow neck turns, shoulder rolls, and a forward fold with bent knees. Move at a pace that feels like curiosity rather than exercise.`,
            `The aim is to tell the joints and muscles that the day can begin without urgency.`
          ]
        },
        {
          id: 'set-an-intention',
          heading: 'Set One Quiet Intention',
          paragraphs: [
            `Choose a single quality for the day — patience, steadiness, curiosity, or presence. You do not need to achieve it perfectly; simply let it be a direction rather than a rule.`,
            `Write it down or say it once aloud, then let it go. Over-intending can become just another form of pressure.`
          ]
        },
        {
          id: 'make-it-stick',
          heading: 'Make It Stick',
          paragraphs: [
            `Keep the sequence short enough that it survives a busy schedule. Even three minutes of water, breath, and movement is a meaningful beginning.`,
            `Consistency, not length, is what turns a morning ritual into a reliable source of calm energy.`
          ]
        }
      ],
      inlineImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80',
      inlineAlt: 'Quiet morning meditation practice',
      inlineCaption: `A few minutes of stillness before the day begins can change its entire texture.`,
      tipsTitle: '5 Tiny Morning Rituals',
      tipsSubtitle: `A calmer start does not require a longer to-do list.`,
      tips: [
        { title: 'Water First', text: `A glass of room-temperature water is the simplest way to greet the body.` },
        { title: 'Long Exhales', text: `Five slower-out breaths signal safety before information overload begins.` },
        { title: 'Move Gently', text: `Ten slow minutes of spinal mobility can replace a rushed, intense workout.` },
        { title: 'Delay the Phone', text: `Even ten minutes of screen-free time protects your attention.` },
        { title: 'One Word', text: `Choose a single quality for the day instead of a long list of goals.` }
      ],
      ambientTitle: 'Begin Before the Noise',
      ambientText: `There is a small, quiet window at the start of each day that belongs entirely to you.`,
      ctaTitle: 'Carry the Calm Forward',
      ctaText: `Extend your morning steadiness with treatments that support regulated energy and deep rest.`
    },
    {
      slug: 'herbal-teas-deep-rest',
      title: 'The Science of Herbal Teas & Deep Rest',
      category: 'Self-Care',
      date: '2026-09-15',
      dateDisplay: 'Sep 15, 2026',
      readTime: '5 min read',
      author: 'Lisa Moretti',
      authorRole: 'Senior Esthetician & Botanical Formulator',
      authorPhoto: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&q=80',
      authorBio: `Lisa is an international CIDESCO diplomat focused on botanical dermal nourishment, holistic lymphatic drainage, and the ceremonial use of aromatic plant extracts.`,
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1920&q=85',
      imageAlt: 'Herbal tea infusing in a glass cup',
      excerpt: `Explore the adaptogenic botanicals—including passionflower, chamomile, and ashwagandha—that naturally regulate evening melatonin production.`,
      pullquote: `A cup of tea can be both a gentle biochemical nudge and a permission slip to stop.`,
      lead: `The ritual of making tea is often as restorative as the infusion itself. Warm water, a lingering aroma, and a few minutes without a screen create a threshold between the demands of the day and the quiet of the evening. Behind that ritual, certain herbs offer genuine support for rest.`,
      toc: [
        { id: 'adaptogens-explained', label: 'How Adaptogens Work' },
        { id: 'chamomile', label: 'Chamomile: The Gentle Sedative' },
        { id: 'passionflower', label: 'Passionflower for a Busy Mind' },
        { id: 'ashwagandha', label: 'Ashwagandha & Stress Response' },
        { id: 'evening-ritual', label: 'Building an Evening Ritual' }
      ],
      sections: [
        {
          id: 'adaptogens-explained',
          heading: 'How Adaptogens Work',
          paragraphs: [
            `Adaptogens are botanicals that help the body respond more steadily to stress. Rather than forcing a particular outcome, they support the systems that regulate cortisol, sleep timing, and recovery.`,
            `Their effects are typically subtle and cumulative. Think of them as companions to good sleep habits, not replacements for them.`
          ]
        },
        {
          id: 'chamomile',
          heading: 'Chamomile: The Gentle Sedative',
          paragraphs: [
            `Chamomile contains apigenin, a compound that binds to certain benzodiazepine receptors in the brain and may promote mild relaxation. It is generally well tolerated and often the first herb people turn to for evening calm.`,
            `Use well-covered infusions and steep for five to seven minutes to extract its gentle flavor and aromatic compounds.`
          ]
        },
        {
          id: 'passionflower',
          heading: 'Passionflower for a Busy Mind',
          paragraphs: [
            `Passionflower has a long tradition of use for restlessness and circular thinking. Research suggests it may influence GABA pathways, which help quiet neural activity.`,
            `It pairs beautifully with chamomile on evenings when the body is tired but the mind keeps rehearsing the day.`
          ]
        },
        {
          id: 'ashwagandha',
          heading: 'Ashwagandha & Stress Response',
          paragraphs: [
            `Ashwagandha is an adaptogenic root studied for its potential to support a healthy cortisol response. It is more often taken as a standardized extract than as a casual cup of tea, and it is best used consistently over several weeks.`,
            `Because it can interact with certain medications and is not recommended during pregnancy, speak with a healthcare professional before adding it to your routine.`
          ]
        },
        {
          id: 'evening-ritual',
          heading: 'Building an Evening Ritual',
          paragraphs: [
            `Brew your tea an hour before bed, then step away from bright screens while you drink it. Use the time to dim lights, wash your face, prepare tomorrow's clothes, or simply sit quietly.`,
            `The consistency of the ritual teaches the body that sleep is approaching. Over time, the aroma alone can become part of the signal to rest.`
          ]
        }
      ],
      inlineImage: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=1200&q=80',
      inlineAlt: 'Herbal tea ready for an evening wind-down',
      inlineCaption: `Warm infusions offer both botanical support and a gentle boundary around the end of the day.`,
      tipsTitle: '5 Evening Tea Rituals',
      tipsSubtitle: `Make the last cup of the day a signal that everything can wait until morning.`,
      tips: [
        { title: 'Steep Fully', text: `Give herbs five to seven minutes in covered water to release their full aroma and beneficial compounds.` },
        { title: 'Skip Late Caffeine', text: `Choose caffeine-free infusions after midday, especially if sleep is already fragile.` },
        { title: 'Dim the Lights', text: `Lower lighting while you drink to support the body's natural melatonin rhythm.` },
        { title: 'Put the Phone Down', text: `Even ten screen-free minutes make the transition to sleep noticeably easier.` },
        { title: 'Keep It Consistent', text: `The same simple ritual at the same time each night is more powerful than an elaborate occasional one.` }
      ],
      ambientTitle: 'Let the Day Close Gently',
      ambientText: `Rest is not something to chase. It is something we make room for, one quiet ritual at a time.`,
      ctaTitle: 'Support Your Rest',
      ctaText: `Pair calming home rituals with restorative bodywork and let the benefits extend well beyond the treatment room.`
    }
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
