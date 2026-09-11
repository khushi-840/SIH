/* ==========================================================================
   IP-SAKTI Sahayak — Core Interactivity Engine (Vanilla JS)
   SIH Problem Statement 26045 Prototype
   ========================================================================== */

// STATE MANAGEMENT
let currentLang = 'en'; // 'en' or 'hi'
let activeView = 'home';
let currentSelectedPlant = null;
let currentSelectedProduct = null;
let currentDemoStep = 1;

/* ==========================================================================
   1. SAMPLE PLANT DATABASE (10 DEMO PLANTS)
   ========================================================================== */
const plantDatabase = {
    ashwagandha: {
        id: "ashwagandha",
        commonName: "Ashwagandha",
        commonNameHi: "अश्वगंधा",
        scientificName: "Withania somnifera",
        ayurvedicName: "Ashwagandha / Hayahvaya",
        family: "Solanaceae",
        image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80",
        confidence: "94%",
        overviewDesc: "Ashwagandha, commonly known as Indian Ginseng, is an evergreen shrub in the Solanaceae family. It is widely harvested for its roots which possess significant adaptogenic properties in classical Ayurveda.",
        overviewGeo: "Native to dry regions of India (Rajasthan, Madhya Pradesh, Punjab) as well as parts of Nepal, the Middle East, and Africa.",
        botanicalList: [
            "Leaves: Ovate, subtle velvet coating, up to 10 cm long",
            "Flowers: Small, green, bell-shaped in axillary clusters",
            "Fruit: Bright red berry enclosed in a papery calyx"
        ],
        ayurvedicUses: [
            "Rasayana (Rejuvenative tonic for longevity)",
            "Balya (Promotes muscular strength & vitality)",
            "Nidrajanana (Promotes restful sleep & stress relief)",
            "Vatapittahara (Pacifies Vata and Kapha doshas)"
        ],
        ayurvedicProps: {
            "Rasa (Taste)": "Tikta (Bitter), Kashaya (Astringent)",
            "Guna (Qualities)": "Laghu (Light), Snigdha (Unctuous)",
            "Virya (Potency)": "Ushna (Warm)",
            "Vipaka (Post-Digestive)": "Madhura (Sweet)"
        },
        partsUsed: ["Root (Mula)", "Leaves (Patra)", "Seeds (Bija)"],
        healthcareInfo: "Traditional wellness applications focus on adaptogenic stress response. Modern pharmacological research has evaluated withanolides for cortisol regulation, neuroprotection, and immune system modulation.",
        healthAreas: [
            "Stress & Cortisol Response Reduction",
            "Cognitive Support & Mental Focus",
            "Muscle Recovery & Physical Endurance",
            "Immune System Reinforcement"
        ],
        skincareUses: [
            "Topical paste used traditionally to soothe skin inflammation",
            "Antioxidant-rich cosmetic formulations for anti-aging skincare",
            "Traditional oil infusion for hair and scalp nourishment"
        ],
        skincareForms: ["Ayurvedic Face Pack", "Topical Herbal Oil", "Infused Hydrating Cream"],
        constituents: [
            { name: "Withaferin A", desc: "Steroidal lactone studied for anti-inflammatory & antioxidant action." },
            { name: "Withanolide D", desc: "Major adaptogenic constituent extracted from roots." },
            { name: "Sitoindosides", desc: "Glycowithanolides linked to neuroprotective research." }
        ],
        safetyList: [
            "Avoid during pregnancy unless under strict practitioner supervision.",
            "May potentiate thyroid medication or sedative therapies.",
            "High doses may cause mild gastrointestinal discomfort."
        ],
        tkMatch: true,
        tkDetails: "TKDL Entry #AY-402 (Found in Charaka Samhita & Sushruta Samhita). Documented public domain prior art exists for traditional powder (Churna) and milk decoction (Ksheerapaka).",
        ipEvaluation: "Existing classical preparations cannot be patented per Indian Patents Act Sec 3(p). However, novel supercritical CO2 extraction methods or synergistic combinations showing unexpected efficacy may be eligible for process or formulation patents.",
        riskLevel: "Moderate",
        sources: ["TKDL (CSIR)", "Indian Pharmacopoeia", "WIPO Patentscope", "AYUSH Formulations"]
    },
    neem: {
        id: "neem",
        commonName: "Neem",
        commonNameHi: "नीम",
        scientificName: "Azadirachta indica",
        ayurvedicName: "Nimba / Arishta",
        family: "Meliaceae",
        image: "https://images.unsplash.com/photo-1546852199-2d7e41700685?auto=format&fit=crop&w=600&q=80",
        confidence: "96%",
        overviewDesc: "Neem is a fast-growing evergreen tree revered as 'Village Pharmacy' in India due to its potent antimicrobial, purifying, and dermatological applications.",
        overviewGeo: "Widespread throughout tropical and sub-tropical regions of India, Myanmar, Sri Lanka, and Southeast Asia.",
        botanicalList: [
            "Leaves: Pinnate, serrated leaflets with bitter aromatic odor",
            "Flowers: Small, white, fragrant panicles",
            "Fruit: Yellowish-green drupe containing oil-rich seed"
        ],
        ayurvedicUses: [
            "Kusthaghna (Removes skin disorders)",
            "Krimighna (Antimicrobial & antiparasitic)",
            "Raktashodhaka (Blood purifier)",
            "Kaphapittahara (Pacifies Kapha and Pitta doshas)"
        ],
        ayurvedicProps: {
            "Rasa (Taste)": "Tikta (Bitter), Kashaya (Astringent)",
            "Guna (Qualities)": "Laghu (Light), Ruksha (Dry)",
            "Virya (Potency)": "Shita (Cooling)",
            "Vipaka (Post-Digestive)": "Katu (Pungent)"
        },
        partsUsed: ["Leaves (Patra)", "Bark (Twak)", "Seeds & Seed Oil (Taila)", "Twig (Danta Kastha)"],
        healthcareInfo: "Traditionally used for oral hygiene, skin detoxification, and glycemic maintenance. Modern studies highlight azadirachtin for insecticidal and antimicrobial properties.",
        healthAreas: [
            "Dermatological Health & Acne Care",
            "Oral & Dental Hygiene",
            "Antimicrobial & Anti-fungal Applications",
            "Blood Purification Context"
        ],
        skincareUses: [
            "Classic topical paste for acne, eczema, and psoriasis",
            "Cold-pressed neem seed oil for scalp dandruff treatments",
            "Herbal soaps and face washes for deep skin cleansing"
        ],
        skincareForms: ["Neem Face Gel", "Herbal Anti-Acne Lotion", "Cold-Pressed Neem Oil"],
        constituents: [
            { name: "Azadirachtin", desc: "Limonoid responsible for potent antimicrobial action." },
            { name: "Nimbin", desc: "Bitter compound researched for anti-inflammatory effects." },
            { name: "Nimbidin", desc: "Sulfur-containing compound with dermatological benefits." }
        ],
        safetyList: [
            "Neem seed oil is for external cosmetic use; avoid internal ingestion of crude oil.",
            "Not recommended for infants or women attempting conception."
        ],
        tkMatch: true,
        tkDetails: "TKDL Entry #NE-108. Landmark legal precedents (EPO Patent Revocation #436257) established that Neem's antifungal properties are prior art in Indian Traditional Knowledge.",
        ipEvaluation: "Broad claims on Neem extracts face high rejection risk under Sec 3(p). Patents are restricted to synthesized derivatives or unique mechanical delivery devices.",
        riskLevel: "Moderate",
        sources: ["TKDL (CSIR)", "EPO Patent Register", "Indian Patent Office", "AYUSH Pharmacopoeia"]
    },
    tulsi: {
        id: "tulsi",
        commonName: "Tulsi (Holy Basil)",
        commonNameHi: "तुलसी",
        scientificName: "Ocimum sanctum",
        ayurvedicName: "Tulasi / Surasa",
        family: "Lamiaceae",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
        confidence: "95%",
        overviewDesc: "Tulsi, known as the 'Queen of Herbs', is an aromatic sacred plant held in deep esteem in Ayurvedic medicine for respiratory support and adaptogenic balance.",
        overviewGeo: "Cultivated across the Indian subcontinent and tropical Asia.",
        botanicalList: [
            "Leaves: Aromatic green or purple, slightly serrated",
            "Flowers: Small purple to reddish blossoms on erect spikes",
            "Stem: Hairy, branched quadrangular stem"
        ],
        ayurvedicUses: [
            "Kasahara (Relieves cough and bronchitis)",
            "Shvasahara (Supports respiratory function)",
            "Jwarahara (Reduces fevers)",
            "Kaphavatashamaka (Balances Kapha and Vata)"
        ],
        ayurvedicProps: {
            "Rasa (Taste)": "Katu (Pungent), Tikta (Bitter)",
            "Guna (Qualities)": "Laghu (Light), Ruksha (Dry), Tikshna (Penetrating)",
            "Virya (Potency)": "Ushna (Warm)",
            "Vipaka (Post-Digestive)": "Katu (Pungent)"
        },
        partsUsed: ["Leaves (Patra)", "Seeds (Bija)", "Whole Plant (Panchanga)"],
        healthcareInfo: "Extensively researched for immunomodulatory, anti-viral, and adaptogenic benefits. Contains high concentrations of eugenol.",
        healthAreas: [
            "Upper Respiratory Relief & Cough Suppression",
            "Immunomodulation & Anti-Viral Support",
            "Adaptogenic Stress Response",
            "Cardiovascular Wellness Context"
        ],
        skincareUses: [
            "Purifying herbal face washes for oily skin",
            "Astringent toner to soothe minor skin redness",
            "Antioxidant leaf extract in revitalizing serums"
        ],
        skincareForms: ["Tulsi Clarifying Toner", "Herbal Face Wash", "Purifying Skin Mist"],
        constituents: [
            { name: "Eugenol", desc: "Essential oil phenol with analgesic & antimicrobial properties." },
            { name: "Ursolic Acid", desc: "Triterpenoid researched for anti-inflammatory skincare." },
            { name: "Rosmarinic Acid", desc: "Potent antioxidant compound." }
        ],
        safetyList: [
            "May interact with anticoagulant / blood-thinning medications.",
            "Excessive therapeutic doses may lower blood glucose levels."
        ],
        tkMatch: true,
        tkDetails: "TKDL Entry #TU-204. Documented in Bhavaprakasha Nighantu for respiratory ailments.",
        ipEvaluation: "Formulations relying on Tulsi leaf decoctions are non-patentable prior art. Novel nano-emulsions or volatile oil preservation technology may qualify.",
        riskLevel: "Low",
        sources: ["TKDL (CSIR)", "API (Ayurvedic Pharmacopoeia of India)", "WIPO"]
    },
    aloevera: {
        id: "aloevera",
        commonName: "Aloe Vera",
        commonNameHi: "घृतकुमारी (एलोवेरा)",
        scientificName: "Aloe barbadensis Miller",
        ayurvedicName: "Ghritakumari / Kumari",
        family: "Asphodelaceae",
        image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=600&q=80",
        confidence: "98%",
        overviewDesc: "Ghritakumari is a succulent leaf herb renowned in Ayurveda for cooling, tissue-regenerative (Vranaropana), and female reproductive balancing qualities.",
        overviewGeo: "Arid, semi-tropical zones of Rajasthan, Gujarat, and global dry belts.",
        botanicalList: [
            "Leaves: Fleshy, thick, lanceolate with serrated spiny margins",
            "Gel: Clear mucilaginous inner leaf parenchymatous tissue",
            "Flowers: Tubular yellow blossoms on long stalks"
        ],
        ayurvedicUses: [
            "Vranaropana (Wound healing & tissue repair)",
            "Pittahara (Cooling remedy for excess heat)",
            "Kumari Asava (Digestive & liver tonic formulation)"
        ],
        ayurvedicProps: {
            "Rasa (Taste)": "Tikta (Bitter), Madhura (Sweet)",
            "Guna (Qualities)": "Guru (Heavy), Snigdha (Unctuous), Picchila (Mucilaginous)",
            "Virya (Potency)": "Shita (Cooling)",
            "Vipaka (Post-Digestive)": "Madhura (Sweet)"
        },
        partsUsed: ["Leaf Mucilage Gel (Kumari Rasa)", "Leaf Latex (Elua)"],
        healthcareInfo: "Demonstrates proven hydrating, burn-soothing, and anti-inflammatory properties in topical applications. Evaluated for intestinal motility.",
        healthAreas: [
            "Dermatological Burn & Wound Healing",
            "Digestive Tract Soothing & Laxative Effect",
            "Skin Hydration & Barrier Repair",
            "Hepatic Health Context"
        ],
        skincareUses: [
            "Primary hydrating gel for sunburn relief and skin soothing",
            "Moisturizing base for organic creams and post-shave lotions",
            "Soothing scalp gel to reduce dryness and itching"
        ],
        skincareForms: ["Pure Aloe Gel", "Hydrating Moisturizer", "Post-Sun Recovery Spray"],
        constituents: [
            { name: "Aloin / Barbaloin", desc: "Anthraquinone glycoside present in leaf latex." },
            { name: "Acemannan", desc: "Complex polysaccharide fostering skin hydration & tissue repair." },
            { name: "Bradykinase", desc: "Enzyme involved in reducing skin inflammation." }
        ],
        safetyList: [
            "Purified clear gel is safe topically; crude outer leaf latex has strong laxative effects.",
            "Pregnant women should avoid consuming oral Aloe latex."
        ],
        tkMatch: true,
        tkDetails: "TKDL Entry #AL-309. Referenced across Sharangdhara Samhita for digestive asava preparations.",
        ipEvaluation: "Aloe gel topical formulations are ubiquitous. High patentability barrier unless combining novel stabilization matrix or patented biopolymer carrier.",
        riskLevel: "Low",
        sources: ["TKDL (CSIR)", "US FDA Cosmetic Guidelines", "Indian Patent Office"]
    },
    turmeric: {
        id: "turmeric",
        commonName: "Turmeric",
        commonNameHi: "हल्दी",
        scientificName: "Curcuma longa",
        ayurvedicName: "Haridra / Kanchani",
        family: "Zingiberaceae",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
        confidence: "97%",
        overviewDesc: "Haridra is the golden rhizome herb central to Indian culture, cuisine, and medicine, renowned for powerful anti-inflammatory, wound-healing, and skin-brightening actions.",
        overviewGeo: "Cultivated extensively across Andhra Pradesh, Tamil Nadu, Odisha, and Maharashtra.",
        botanicalList: [
            "Rhizome: Fleshy, bright orange-yellow internal color, oblong segments",
            "Leaves: Large, oblong-lanceolate smooth green leaves",
            "Flowers: White to yellow spikes with pink bracts"
        ],
        ayurvedicUses: [
            "Varnya (Enhances skin complexion)",
            "Vishaghna (Detoxifying agent)",
            "Kusthaghna (Alleviates skin diseases)",
            "Pramehara (Supports metabolic balance)"
        ],
        ayurvedicProps: {
            "Rasa (Taste)": "Tikta (Bitter), Katu (Pungent)",
            "Guna (Qualities)": "Ruksha (Dry), Laghu (Light)",
            "Virya (Potency)": "Ushna (Warm)",
            "Vipaka (Post-Digestive)": "Katu (Pungent)"
        },
        partsUsed: ["Rhizome (Kanda)"],
        healthcareInfo: "World's most researched botanical. Curcuminoids exhibit powerful NF-kB inhibition, antioxidant scavenging, and joint comfort support.",
        healthAreas: [
            "Joint Comfort & Anti-Inflammatory Support",
            "Antioxidant Scavenging & Cellular Health",
            "Dermatological Brightening & Wound Healing",
            "Cardiovascular & Liver Function"
        ],
        skincareUses: [
            "Traditional Ubtan pastes for glowing skin and complexion evening",
            "Topical antiseptic cream for cuts, burns, and minor skin infections",
            "Anti-inflammatory serum for hyperpigmentation"
        ],
        skincareForms: ["Haridra Skin Cream", "Brightening Face Serum", "Traditional Ubtan Pack"],
        constituents: [
            { name: "Curcumin", desc: "Primary polyphenol studied for potent anti-inflammatory pathway modulation." },
            { name: "Demethoxycurcumin", desc: "Secondary curcuminoid offering antioxidant protection." },
            { name: "Turmerones", desc: "Essential oil compounds aiding bioavailability." }
        ],
        safetyList: [
            "High supplemental doses may cause stomach irritation or bile duct contraction.",
            "May stain skin temporarily yellow upon topical application."
        ],
        tkMatch: true,
        tkDetails: "TKDL Entry #TU-501. Historical CSIR US Patent Challenge (USPTO Patent #5401504 revoked in 1997) proved Turmeric wound-healing is Indian prior art.",
        ipEvaluation: "Direct Turmeric extracts cannot be patented. Patents must focus on bioavailability complexes (e.g. liposomal curcumin, piperine co-crystal matrices).",
        riskLevel: "High",
        sources: ["CSIR Landmark Patent Case", "TKDL", "USPTO Re-examination Register", "AYUSH"]
    },
    amla: {
        id: "amla",
        commonName: "Amla (Indian Gooseberry)",
        commonNameHi: "आंवला",
        scientificName: "Phyllanthus emblica",
        ayurvedicName: "Amalaki / Dhatri",
        family: "Phyllanthaceae",
        image: "https://images.unsplash.com/photo-1546852199-2d7e41700685?auto=format&fit=crop&w=600&q=80",
        confidence: "95%",
        overviewDesc: "Amalaki is revered as the ultimate Rasayana (rejuvenator) in Ayurveda, containing five of the six tastes and providing one of nature's richest natural sources of Vitamin C and tannins.",
        overviewGeo: "Deciduous forests across India, Sri Lanka, and Southeast Asia.",
        botanicalList: [
            "Fruit: Globose, pale yellow-green with 6 vertical furrows",
            "Leaves: Feathery, small, light green linear-oblong leaflets",
            "Bark: Flaking greyish-brown bark"
        ],
        ayurvedicUses: [
            "Vayasthapana (Anti-aging & vitality preserver)",
            "Chakshushya (Promotes eye health)",
            "Chyawanprash Primary Ingredient",
            "Tridoshahara (Balances all three doshas)"
        ],
        ayurvedicProps: {
            "Rasa (Taste)": "Amla (Sour), Tikta, Madhura, Katu, Kashaya",
            "Guna (Qualities)": "Guru (Heavy), Ruksha (Dry), Shita (Cooling)",
            "Virya (Potency)": "Shita (Cooling)",
            "Vipaka (Post-Digestive)": "Madhura (Sweet)"
        },
        partsUsed: ["Fruit (Phala)"],
        healthcareInfo: "Abundant in ascorbic acid, emblicanin, and polyphenols. Studied for hyperlipidemia reduction, immune fortification, and hair follicle stimulation.",
        healthAreas: [
            "Immune System Fortification & Anti-Aging",
            "Hair Growth & Scalp Nourishment",
            "Digestive Regularity & Hyperacidity Relief",
            "Lipid Profile Management"
        ],
        skincareUses: [
            "Amla oil is the gold standard in Indian hair care to prevent premature greying",
            "Vitamin C antioxidant face serum for collagen synthesis",
            "Astringent toner to tighten open skin pores"
        ],
        skincareForms: ["Amla Hair Nourishing Oil", "Natural Vitamin C Serum", "Astringent Tonic"],
        constituents: [
            { name: "Emblicanin A & B", desc: "Low-molecular weight tannins offering cascade antioxidant effects." },
            { name: "Ascorbic Acid", desc: "Bioavailable natural Vitamin C." },
            { name: "Gallid Acid", desc: "Polyphenol with skin-protective qualities." }
        ],
        safetyList: [
            "Extremely safe herb. High acidic fruit intake may trigger cold sensation in hyper-sensitive individuals."
        ],
        tkMatch: true,
        tkDetails: "TKDL Entry #AM-601. Referenced in Sushruta Samhita for eye and hair remedies.",
        ipEvaluation: "Classical Chyawanprash formulations are non-patentable. Unique water-soluble tannoid extractions or standardized hair hair-growth peptides are patentable.",
        riskLevel: "Low",
        sources: ["TKDL", "Indian Pharmacopoeia", "AYUSH Ministry"]
    },
    brahmi: {
        id: "brahmi",
        commonName: "Brahmi",
        commonNameHi: "ब्राह्मी",
        scientificName: "Bacopa monnieri",
        ayurvedicName: "Brahmi / Saraswati",
        family: "Plantaginaceae",
        image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80",
        confidence: "93%",
        overviewDesc: "Brahmi is a creeping perennial succulent herb celebrated as the premier Medhya Rasayana (brain & memory sharpener) in classical Ayurvedic literature.",
        overviewGeo: "Wetlands, marshy shores, and damp riverbanks across India.",
        botanicalList: [
            "Leaves: Small, succulent, oblong, thick green leaves",
            "Flowers: Small, solitary, pale blue to white 5-petaled flowers",
            "Stem: Prostrate creeping stem rooting at nodes"
        ],
        ayurvedicUses: [
            "Medhya (Enhances memory, intellect, & recall)",
            "Prajasthapana (Nervine tranquility)",
            "Unmadahara (Alleviates mental agitation)",
            "Vatapittahara (Balances Vata & Pitta)"
        ],
        ayurvedicProps: {
            "Rasa (Taste)": "Tikta (Bitter), Kashaya (Astringent)",
            "Guna (Qualities)": "Laghu (Light)",
            "Virya (Potency)": "Shita (Cooling)",
            "Vipaka (Post-Digestive)": "Madhura (Sweet)"
        },
        partsUsed: ["Whole Plant (Panchanga)"],
        healthcareInfo: "Bacosides A & B have been shown to facilitate synaptic transmission, repair damaged neurons, and reduce anxiety without sedation.",
        healthAreas: [
            "Memory Retention & Cognitive Speed",
            "Nervine Stress & Anxiety Reduction",
            "Focus & Concentration Support",
            "Neuroprotective Age-Related Health"
        ],
        skincareUses: [
            "Soothing hair oil to calm scalp tension and promote sleep",
            "Antioxidant facial oil to soothe sensitive skin"
        ],
        skincareForms: ["Brahmi Memory Syrup", "Scalp Cooling Oil", "Nervine Tea Blend"],
        constituents: [
            { name: "Bacoside A", desc: "Triterpenoid saponin responsible for synaptic restoration." },
            { name: "Bacoside B", desc: "Nootropic constituent enhancing cerebral blood flow." },
            { name: "Hersaponin", desc: "Sedative saponin giving calming property." }
        ],
        safetyList: [
            "May cause mild stomach cramps or dry mouth if taken on an empty stomach.",
            "May slow heart rate in patients with bradycardia."
        ],
        tkMatch: true,
        tkDetails: "TKDL Entry #BR-702. Documented in Charaka Samhita Chikitsa Sthana.",
        ipEvaluation: "Brahmi syrups and teas are public prior art. Enriched bacoside extracts (>50% purity) prepared via novel chromatographic isolation possess patent eligibility.",
        riskLevel: "Low",
        sources: ["TKDL", "CDRI Lucknow Patents", "Indian Patent Office"]
    },
    ginger: {
        id: "ginger",
        commonName: "Ginger (Sunthi / Ardraka)",
        commonNameHi: "सोंठ / अदरक",
        scientificName: "Zingiber officinale",
        ayurvedicName: "Ardraka (Fresh) / Sunthi (Dry)",
        family: "Zingiberaceae",
        image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
        confidence: "96%",
        overviewDesc: "Known as Vishwabhesaja (Universal Medicine), Ginger is the cornerstone of digestive fire (Agni) in Ayurveda, available as fresh Ardraka or concentrated dry Sunthi.",
        overviewGeo: "Cultivated in Kerala, Assam, Meghalaya, and Karnataka.",
        botanicalList: [
            "Rhizome: Tuberous, branched, aromatic palmate digits",
            "Leaves: Narrow lanceolate green leaves",
            "Stem: Annual leafy pseudostem"
        ],
        ayurvedicUses: [
            "Deepana (Kindles digestive fire Agni)",
            "Pachana (Digests toxic Ama metabolic waste)",
            "Shoolaprashamana (Relieves abdominal colic)",
            "Trikatu Ingredient"
        ],
        ayurvedicProps: {
            "Rasa (Taste)": "Katu (Pungent)",
            "Guna (Qualities)": "Laghu (Light), Snigdha (Dry for Sunthi)",
            "Virya (Potency)": "Ushna (Warm)",
            "Vipaka (Post-Digestive)": "Madhura (Sweet for Dry)"
        },
        partsUsed: ["Rhizome (Kanda)"],
        healthcareInfo: "Gingerols and shogaols possess clinically validated anti-nausea, anti-emetic, and gastro-prokinetic efficacy.",
        healthAreas: [
            "Digestive Agni Support & Motion Sickness Relief",
            "Joint Discomfort & Inflammatory Relief",
            "Respiratory Warmth & Decongestion"
        ],
        skincareUses: [
            "Warming botanical oils for therapeutic muscle massage",
            "Scalp stimulant treatments for hair follicle activation"
        ],
        skincareForms: ["Warming Massage Oil", "Digestive Herbal Tea", "Sunthi Churna"],
        constituents: [
            { name: "6-Gingerol", desc: "Pungent constituent giving digestive & anti-nausea power." },
            { name: "6-Shogaol", desc: "Dehydrated derivative abundant in dry Sunthi with anti-inflammatory action." },
            { name: "Zingiberene", desc: "Essential sesquiterpene hydrocarbon." }
        ],
        safetyList: [
            "Excessive consumption may cause heartburn or gastric hyperacidity in Pitta individuals."
        ],
        tkMatch: true,
        tkDetails: "TKDL Entry #GI-803. Universal culinary & medicinal prior art documented across all classical Samhitas.",
        ipEvaluation: "High prior art barrier. Patentability requires nano-carrier delivery or synthetic derivative isolation.",
        riskLevel: "High",
        sources: ["TKDL", "AYUSH", "WIPO"]
    },
    giloy: {
        id: "giloy",
        commonName: "Giloy (Guduchi)",
        commonNameHi: "गिलोय (गुडूची)",
        scientificName: "Tinospora cordifolia",
        ayurvedicName: "Guduchi / Amrita",
        family: "Menispermaceae",
        image: "https://images.unsplash.com/photo-1546852199-2d7e41700685?auto=format&fit=crop&w=600&q=80",
        confidence: "94%",
        overviewDesc: "Guduchi, named 'Amrita' (Immortality), is a large climbing shrub famed for immunomodulatory, anti-pyretic, and liver-protecting potency.",
        overviewGeo: "Found climbing on Neem and Mango trees across tropical India.",
        botanicalList: [
            "Leaves: Heart-shaped (cordate), smooth light green",
            "Stem: Succulent, grooved corky bark with aerial roots",
            "Fruit: Aggregates of red drupelets"
        ],
        ayurvedicUses: [
            "Jwarahara (Potent anti-pyretic for fevers)",
            "Rasayana (Immune system restorative)",
            "Raktashodhaka (Blood purifier)",
            "Tridoshashamaka (Balances Vata, Pitta, & Kapha)"
        ],
        ayurvedicProps: {
            "Rasa (Taste)": "Tikta (Bitter), Kashaya (Astringent)",
            "Guna (Qualities)": "Guru (Heavy), Snigdha (Unctuous)",
            "Virya (Potency)": "Ushna (Warm)",
            "Vipaka (Post-Digestive)": "Madhura (Sweet)"
        },
        partsUsed: ["Stem (Kanda)", "Starch Extract (Guduchi Satva)"],
        healthcareInfo: "Tinosporoside and cordifoliosides activate macrophages and white blood cell phagocytosis during viral fevers.",
        healthAreas: [
            "Immune Response Activation & Platelet Support",
            "Chronic Fever & Anti-Pyretic Relief",
            "Hepatic Detoxification & Liver Protection"
        ],
        skincareUses: [
            "Blood-purifying internal supplement for clear skin",
            "Soothing herbal washes for allergic skin rashes"
        ],
        skincareForms: ["Guduchi Satva Starch", "Immunity Tablets", "Herbal Stem Juice"],
        constituents: [
            { name: "Tinosporoside", desc: "Diterpene furanoid glycoside activating immune macrophages." },
            { name: "Cordifolioside A", desc: "Immunomodulatory alkaloid compound." },
            { name: "Magnoflorine", desc: "Alkaloid researched for liver protection." }
        ],
        safetyList: [
            "May lower blood sugar; diabetic patients should monitor blood glucose closely."
        ],
        tkMatch: true,
        tkDetails: "TKDL Entry #GL-905. Extensive documentation in Charaka Samhita for fever management.",
        ipEvaluation: "Guduchi Satva starch extraction is classical prior art. Patents limited to specific purified alkaloid fractions or anti-viral drug combinations.",
        riskLevel: "Moderate",
        sources: ["TKDL", "AYUSH Ministry Guidelines", "Indian Patent Office"]
    },
    shatavari: {
        id: "shatavari",
        commonName: "Shatavari",
        commonNameHi: "शतावरी",
        scientificName: "Asparagus racemosus",
        ayurvedicName: "Shatavari / Bahuputra",
        family: "Asparagaceae",
        image: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=600&q=80",
        confidence: "93%",
        overviewDesc: "Shatavari, meaning 'she who possesses a hundred husbands', is the paramount female tonic in Ayurveda, supporting hormonal harmony, lactation, and vitality.",
        overviewGeo: "Tropical and subtropical regions of India and the Himalayas up to 1400m altitude.",
        botanicalList: [
            "Root: Tuberous, fleshy, cluster of 30-100 fascycled roots",
            "Leaves: Pine-like needle cladodes",
            "Flowers: Small white fragrant racemes"
        ],
        ayurvedicUses: [
            "Stanyajana (Promotes healthy lactation in nursing mothers)",
            "Vrishya (Aphrodisiac & reproductive tonic)",
            "Rasayana (Rejuvenative for female health)",
            "Pittavatahara (Pacifies Pitta and Vata doshas)"
        ],
        ayurvedicProps: {
            "Rasa (Taste)": "Madhura (Sweet), Tikta (Bitter)",
            "Guna (Qualities)": "Guru (Heavy), Snigdha (Unctuous)",
            "Virya (Potency)": "Shita (Cooling)",
            "Vipaka (Post-Digestive)": "Madhura (Sweet)"
        },
        partsUsed: ["Tuberous Root (Mula)"],
        healthcareInfo: "Shatavarins (steroidal saponins) exhibit phytoestrogenic modulation, supporting female reproductive health and hormonal balance.",
        healthAreas: [
            "Female Hormonal Balance & Reproductive Vitality",
            "Lactation Support for Nursing Mothers",
            "Gastro-Mucosal Protection & Ulcer Soothing"
        ],
        skincareUses: [
            "Nourishing herbal oils for dry, mature skin types",
            "Rejuvenating face creams promoting skin elasticity"
        ],
        skincareForms: ["Shatavari Granules (Kalpa)", "Nourishing Body Oil", "Female Vitality Capsules"],
        constituents: [
            { name: "Shatavarin I-IV", desc: "Steroidal saponins providing natural phytoestrogenic balance." },
            { name: "Sarsasapogenin", desc: "Aglycone sapogenin precursor." },
            { name: "Isoflavones", desc: "Antioxidant compounds supporting hormonal health." }
        ],
        safetyList: [
            "Estrogen-sensitive conditions should use with medical guidance.",
            "May have mild diuretic effect."
        ],
        tkMatch: true,
        tkDetails: "TKDL Entry #SH-990. Documented in Bhavaprakasha and Astanga Hridaya.",
        ipEvaluation: "Classical Shatavari Kalpa milk decoctions are prior art. Process patents possible for isolated Shatavarin IV purity extracts.",
        riskLevel: "Low",
        sources: ["TKDL", "Indian Pharmacopoeia", "AYUSH"]
    }
};

/* ==========================================
   2. SAMPLE PRODUCTS DATABASE
   ========================================== */
const sampleProducts = {
    ashwagandha: {
        title: "Ashwagandha Herbal Formulation",
        type: "Ayurvedic Herbal Supplement",
        ingredients: ["Ashwagandha Root Extract (500mg)", "Shatavari Root", "Brahmi Extract", "Turmeric"],
        completeness: "82%",
        tkMatch: "FOUND",
        ipBarrier: "Moderate (Sec 3p)",
        absMandatory: "Yes (NBA)",
        riskScore: 62,
        missing: [
            "Exact botanical solvent extraction ratios not disclosed.",
            "AYUSH manufacturing license number absent on draft outer label.",
            "National Biodiversity Authority (NBA) approval clearance pending."
        ],
        actions: [
            "Verify novelty of specific extraction process (e.g. CO2 vs water).",
            "File NBA Form I for biological resource commercial utilization.",
            "Register brand name under Trademark Class 5 (Pharmaceuticals & AYUSH)."
        ]
    },
    neem: {
        title: "Neem-Based Skincare Cleansing Gel",
        type: "Ayurvedic Cosmetic Form",
        ingredients: ["Azadirachta indica Leaf Gel", "Aloe Vera Mucilage", "Tulsi Leaf Oil", "Tea Tree Oil"],
        completeness: "90%",
        tkMatch: "FOUND",
        ipBarrier: "Moderate Risk",
        absMandatory: "Yes (NBA)",
        riskScore: 54,
        missing: [
            "Stability test data for tropical temperature storage.",
            "INCI standard cosmetic ingredient listing format."
        ],
        actions: [
            "Perform microbiological challenge test per BIS standards.",
            "Search existing international cosmetics trademarks.",
            "Review US FDA VCRP registration for export."
        ]
    },
    brahmi: {
        title: "Brahmi Cognitive & Memory Syrup",
        type: "AYUSH Proprietary Medicine",
        ingredients: ["Bacopa monnieri Extract (200mg)", "Shankhpushpi", "Jyotishmati", "Honey"],
        completeness: "95%",
        tkMatch: "CLEAR",
        ipBarrier: "Low Risk",
        absMandatory: "Yes (NBA)",
        riskScore: 22,
        missing: [
            "Batch expiration date testing protocol."
        ],
        actions: [
            "Proceed with Trademark registration.",
            "File patent claim for unique non-glycemic syrup base carrier."
        ]
    },
    tulsi: {
        title: "Tulsi Immunity Booster Decoction",
        type: "AYUSH Classical Form",
        ingredients: ["Ocimum sanctum Leaves", "Dry Ginger (Sunthi)", "Black Pepper (Maricha)", "Cinnamon (Twak)"],
        completeness: "88%",
        tkMatch: "FOUND",
        ipBarrier: "Review Required",
        absMandatory: "Yes (NBA)",
        riskScore: 58,
        missing: [
            "Heavy metal analysis report (Lead, Arsenic, Cadmium, Mercury)."
        ],
        actions: [
            "File AYUSH Rule 158(B) manufacturing application.",
            "Do not file product patent due to classical Ayush Kwath prior art."
        ]
    }
};

/* ==========================================
   3. PREDEFINED AI ASSISTANT QUERY SOLVER
   ========================================== */
const predefinedQueries = {
    ashwagandha_patent: {
        q: "Can I patent an Ayurvedic formulation containing Ashwagandha?",
        answer: "Existing publicly documented traditional knowledge may create challenges for novelty under Section 3(p) of the Indian Patents Act, 1970. However, a genuinely novel extraction process, unique synergistic carrier matrix, or unexpected therapeutic efficacy may be patentable.",
        category: "Patent & Traditional Knowledge",
        risk: "Moderate",
        riskScore: "62/100",
        actions: [
            "1. Review TKDL (Traditional Knowledge Digital Library) records for Ashwagandha (Withania somnifera).",
            "2. Conduct prior-art search across Indian Patent Office & WIPO databases.",
            "3. Assess if your formulation demonstrates synergistic unexpected effects beyond mere aggregation.",
            "4. File National Biodiversity Authority (NBA) clearance if using Indian biological resources."
        ],
        sources: ["TKDL (CSIR) Entry #AY-402", "Indian Patents Act Sec 3(p)", "WIPO Patentscope"],
        confidence: "95%"
    },
    neem_uses: {
        q: "What are the traditional skincare uses of Neem?",
        answer: "In classical Ayurveda (Charaka Samhita & Sushruta Samhita), Neem (Azadirachta indica) is categorized as Kusthaghna (alleviator of skin diseases) and Raktashodhaka (blood purifier). It is traditionally prepared as leaf pastes or cold-pressed seed oils for acne, eczema, wound soothing, and scalp health.",
        category: "Botanical & Traditional Knowledge",
        risk: "Low",
        riskScore: "15/100",
        actions: [
            "1. Utilize cold-pressed seed oil or aqueous leaf extracts for topical cosmetic formulations.",
            "2. Label products accurately under AYUSH Cosmetic Rules or BIS standards.",
            "3. Ensure claims emphasize 'traditional skin soothing' rather than unverified disease cure claims."
        ],
        sources: ["Charaka Samhita Chikitsa Sthana", "TKDL Entry #NE-108", "Ayurvedic Pharmacopoeia of India"],
        confidence: "98%"
    },
    brand_protection: {
        q: "How can I protect my Ayurvedic brand name?",
        answer: "Ayurvedic brand names, product titles, and logos are best protected through Trademark registration under the Trade Marks Act, 1999. Select non-descriptive names and register under Class 5 (Pharmaceuticals & AYUSH medicines) and Class 3 (Cosmetics & Skincare).",
        category: "Trademark Protection",
        risk: "Low",
        riskScore: "20/100",
        actions: [
            "1. Conduct a trademark availability search on the IP India Trade Marks Registry.",
            "2. Avoid using generic botanical terms (e.g. 'Pure Ashwagandha Powder') as the sole brand name.",
            "3. File TM Application under Class 5 (AYUSH products) and Class 3 (topical skincare).",
            "4. Monitor trademark journal publications for potential opposition."
        ],
        sources: ["Trade Marks Act, 1999", "IP India Trademark Registry", "Nice Classification (Class 3 & 5)"],
        confidence: "96%"
    },
    tk_patentability: {
        q: "Does traditional knowledge affect patentability under Sec 3(p)?",
        answer: "Yes. Section 3(p) of the Indian Patents Act, 1970 explicitly states that 'an invention which in effect is traditional knowledge or which is an aggregation or duplication of known properties of traditionally known component or components' is NOT patentable.",
        category: "Statutory Patent Law",
        risk: "High",
        riskScore: "85/100",
        actions: [
            "1. Cross-reference your formulation ingredients against TKDL prior-art entries.",
            "2. Establish quantifiable proof of synergy or novel bio-availability enhancement.",
            "3. Focus patent claims on novel extraction parameters or synthetic derivative molecules rather than raw herbal combinations."
        ],
        sources: ["Indian Patents Act 1970 Sec 3(p)", "Manual of Patent Office Practice & Procedure", "CSIR TKDL Database"],
        confidence: "99%"
    },
    abs_rules: {
        q: "What is Access and Benefit Sharing (ABS) under National Biodiversity Act?",
        answer: "Under the Biological Diversity Act, 2002 of India, any commercial utilization of Indian biological resources or associated traditional knowledge requires mandatory approval from the National Biodiversity Authority (NBA). Foreign entities or IP filers based on Indian herbs must pay ABS fees to support local conservation communities.",
        category: "Biodiversity & Regulatory",
        risk: "Moderate",
        riskScore: "55/100",
        actions: [
            "1. Determine if your plant material was sourced within India.",
            "2. File Form I (for commercial utilization) or Form III (before applying for any Patent) with NBA India.",
            "3. Maintain chain-of-custody raw material sourcing invoices from registered herb growers."
        ],
        sources: ["Biological Diversity Act, 2002", "National Biodiversity Authority (NBA) Guidelines", "ABS Regulations 2014"],
        confidence: "97%"
    },
    formulation_ip: {
        q: "What IP protection is suitable for a new herbal extraction process?",
        answer: "A novel manufacturing process (e.g. supercritical fluid extraction, ultrasonic-assisted extraction, or specialized solvent purification) is eligible for a **Process Patent** if it satisfies novelty, non-obviousness, and industrial applicability criteria.",
        category: "Process Patent",
        risk: "Low",
        riskScore: "30/100",
        actions: [
            "1. Document precise temperature, pressure, yield, and solvent purity parameters.",
            "2. Conduct prior-art search for existing extraction patents in WIPO and Indian Patent Office.",
            "3. Keep process details confidential under Trade Secrets until provisional patent filing."
        ],
        sources: ["Indian Patents Act Sec 2(1)(j)", "WIPO Patent Drafting Manual", "IPO Process Guidelines"],
        confidence: "94%"
    },
    export_regs: {
        q: "What should I check before selling my Ayurvedic product in the USA?",
        answer: "In the USA, Ayurvedic products are regulated by the US FDA primarily as **Dietary Supplements** (under DSHEA 1994) or **Cosmetics**, NOT prescription drugs. You cannot claim that the product cures or treats medical diseases without FDA drug approval.",
        category: "International Regulatory (USA)",
        risk: "Moderate",
        riskScore: "60/100",
        actions: [
            "1. Format product labels with standard 'Supplement Facts' or 'Cosmetic Ingredients' panels.",
            "2. Include mandatory FDA disclaimer: 'These statements have not been evaluated by the FDA.'",
            "3. Verify heavy metals, pesticide residues, and microbial counts meet USP standards.",
            "4. Register manufacturing facility under FDA FSMA (Food Safety Modernization Act)."
        ],
        sources: ["US FDA DSHEA 1994", "US Code of Federal Regulations Title 21", "USP Dietary Supplements Compendium"],
        confidence: "96%"
    }
};

/* ==========================================
   4. MULTILINGUAL TRANSLATION DICTIONARY (EN/HI)
   ========================================== */
const i18nData = {
    en: {
        nav_home: "Home",
        nav_dashboard: "Dashboard",
        nav_ai: "AI Assistant",
        nav_plants: "Plant Intelligence",
        nav_product: "Product Analyzer",
        nav_doc: "Doc Analyzer",
        nav_ip_search: "IP Search",
        nav_ip_guide: "IP Guidance",
        nav_regulations: "Regulations",
        nav_library: "Knowledge Library",
        nav_arch: "Architecture",
        nav_about: "About",
        nav_login: "Login",
        nav_try_demo: "⚡ Try Interactive Demo",
        hero_pill: "SIH 2026 • AI + Ayurveda + Intellectual Property",
        hero_title: "Protecting Ayurveda Through Intelligent IP & Regulatory Guidance",
        hero_subtitle: "An AI-powered multilingual assistant that helps Ayurveda innovators identify plants, understand traditional knowledge, explore intellectual property, and navigate regulatory requirements with transparent, source-cited guidance.",
        tagline_main: "“AI-Powered Intellectual Property & Regulatory Assistant for Ayurveda”",
        tagline_sub: "Identify. Understand. Verify. Protect.",
        hero_cta_demo: "Try Interactive Demo",
        hero_cta_ai: "Ask AI Assistant",
        hero_cta_plant: "Identify an Ayurvedic Plant",
        trust_label: "Referenced Knowledge Repositories:",
        sec_capabilities: "Core Capabilities",
        sec_cap_title: "Intelligent Modules for Ayurveda Innovation",
        sec_cap_desc: "Combining traditional bio-resource knowledge with modern intellectual property frameworks and national regulatory standards.",
        f1_title: "AI-Powered Guidance",
        f1_desc: "Source-cited answers for patentability, trademarks, copyright, and regulatory compliance tailored for Ayurvedic formulations.",
        f2_title: "Ayurvedic Plant Intelligence",
        f2_desc: "Identify plants via photo, explore traditional uses, active constituents, skincare applications, and TKDL prior art implications.",
        f3_title: "Source-Cited Answers",
        f3_desc: "Every response maps directly to verifiable sources including TKDL, WIPO, Indian Patent Office, NBA, and Ministry of AYUSH.",
        f4_title: "IP Protection Guidance",
        f4_desc: "Step-by-step strategy to safeguard brand names, novel extraction processes, product designs, and geographical indications.",
        f5_title: "National & International Regs",
        f5_desc: "Navigate Indian AYUSH & NBA Access & Benefit Sharing (ABS) rules as well as global regulatory systems (US FDA, EU EMA).",
        f6_title: "Multilingual Assistance",
        f6_desc: "Interact seamlessly in English, Hindi, Tamil, Telugu, Marathi, and Bengali to democratize IP literacy for rural innovators.",
        learn_more: "Learn More",
        sec_workflow: "Workflow",
        sec_wf_title: "How IP-SAKTI Works",
        sec_wf_desc: "From raw botanical input to verifiable, source-cited intellectual property guidance.",
        dash_welcome: "Welcome to IP-SAKTI Sahayak",
        dash_subtitle: "Your intelligent assistant for Ayurveda IP and regulatory guidance.",
        m_products: "Products Analyzed",
        m_plants: "Plants Identified",
        m_searches: "IP Searches",
        m_reports: "Reports Generated",
        ai_new_chat: "New Query Session",
        ai_suggested: "Suggested Questions",
        ai_view_rag: "How RAG Retrieval Works"
    },
    hi: {
        nav_home: "मुख्य पृष्ठ (Home)",
        nav_dashboard: "डैशबोर्ड (Dashboard)",
        nav_ai: "एआई सहायक (AI Assistant)",
        nav_plants: "पौधा बुद्धिमत्ता (Plant Intelligence)",
        nav_product: "उत्पाद विश्लेषक (Product Analyzer)",
        nav_doc: "दस्तावेज़ विश्लेषक (Doc Analyzer)",
        nav_ip_search: "आईपी खोज (IP Search)",
        nav_ip_guide: "आईपी मार्गदर्शन (IP Guidance)",
        nav_regulations: "विनियमन (Regulations)",
        nav_library: "ज्ञान पुस्तकालय (Library)",
        nav_arch: "तकनीकी संरचना (Architecture)",
        nav_about: "परिचय (About)",
        nav_login: "लॉगिन",
        nav_try_demo: "⚡ इंटरएक्टिव डेमो आज़माएं",
        hero_pill: "एसआईएच 2026 • एआई + आयुर्वेद + बौद्धिक संपदा",
        hero_title: "बुद्धिमान आईपी और नियामक मार्गदर्शन के माध्यम से आयुर्वेद का संरक्षण",
        hero_subtitle: "एक एआई-संचालित बहुभाषी सहायक जो आयुर्वेद अन्वेषकों को पौधों की पहचान करने, पारंपरिक ज्ञान को समझने, बौद्धिक संपदा की खोज करने और पारदर्शी, स्रोत-उद्धृत मार्गदर्शन के साथ नियामक आवश्यकताओं को नेविगेट करने में मदद करता है।",
        tagline_main: "“आयुर्वेद के लिए एआई-संचालित बौद्धिक संपदा एवं नियामक सहायक”",
        tagline_sub: "पहचानें। समझें। सत्यापित करें। सुरक्षित करें।",
        hero_cta_demo: "इंटरएक्टिव डेमो आज़माएं",
        hero_cta_ai: "एआई सहायक से पूछें",
        hero_cta_plant: "आयुर्वेदिक पौधे की पहचान करें",
        trust_label: "संदर्भित ज्ञान भंडार (Repositories):",
        sec_capabilities: "प्रमुख क्षमताएं",
        sec_cap_title: "आयुर्वेद नवाचार के लिए बुद्धिमान मॉड्यूल",
        sec_cap_desc: "पारंपरिक जैविक संसाधन ज्ञान को आधुनिक बौद्धिक संपदा ढांचे और राष्ट्रीय नियामक मानकों के साथ जोड़ना।",
        f1_title: "एआई-संचालित मार्गदर्शन",
        f1_desc: "आयुर्वेदिक योगों के लिए पेटेंट क्षमता, ट्रेडमार्क, कॉपीराइट और नियामक अनुपालन के लिए स्रोत-उद्धृत उत्तर।",
        f2_title: "आयुर्वेदिक पौधा बुद्धिमत्ता",
        f2_desc: "फोटो से पौधों की पहचान करें, पारंपरिक उपयोगों, सक्रिय घटकों, त्वचा देखभाल अनुप्रयोगों और टीकेडीएल पूर्व-कला निहितार्थों का अन्वेषण करें।",
        f3_title: "स्रोत-उद्धृत उत्तर",
        f3_desc: "प्रत्येक उत्तर टीकेडीएल, विपो, भारतीय पेटेंट कार्यालय, एनबीए और आयुष मंत्रालय सहित सत्यापनीय स्रोतों से सीधे जुड़ता है।",
        f4_title: "आईपी संरक्षण मार्गदर्शन",
        f4_desc: "ब्रांड नामों, नवीन निष्कर्षण प्रक्रियाओं, उत्पाद डिजाइनों और भौगोलिक संकेतकों की सुरक्षा के लिए चरण-दर-चरण रणनीति।",
        f5_title: "राष्ट्रीय एवं अंतर्राष्ट्रीय नियम",
        f5_desc: "भारतीय आयुष और एनबीए पहुंच और लाभ साझाकरण (ABS) नियमों के साथ-साथ वैश्विक नियामक प्रणालियों (US FDA, EU EMA) को नेविगेट करें।",
        f6_title: "बहुभाषी सहायता",
        f6_desc: "ग्रामीण अन्वेषकों के लिए आईपी साक्षरता का लोकतंत्रीकरण करने के लिए अंग्रेजी, हिंदी, तमिल, तेलुगु, मराठी और बंगाली में सहजता से बातचीत करें।",
        learn_more: "और जानें",
        sec_workflow: "कार्यप्रवाह (Workflow)",
        sec_wf_title: "आईपी-शक्ति कैसे काम करता है",
        sec_wf_desc: "कच्चे वनस्पति इनपुट से लेकर सत्यापनीय, स्रोत-उद्धृत बौद्धिक संपदा मार्गदर्शन तक।",
        dash_welcome: "आईपी-शक्ति सहायक में आपका स्वागत है",
        dash_subtitle: "आयुर्वेद आईपी और नियामक मार्गदर्शन के लिए आपका बुद्धिमान सहायक।",
        m_products: "विश्लेषित उत्पाद",
        m_plants: "पहचाने गए पौधे",
        m_searches: "आईपी खोजें",
        m_reports: "उत्पन्न रिपोर्ट",
        ai_new_chat: "नया प्रश्न सत्र",
        ai_suggested: "सुझाए गए प्रश्न",
        ai_view_rag: "RAG पुनर्प्राप्ति कैसे काम करती है"
    }
};

/* ==========================================
   5. VIEW SWITCHER & NAVIGATION
   ========================================== */
function switchView(viewId) {
    activeView = viewId;
    const views = document.querySelectorAll('.page-view');
    views.forEach(v => v.classList.remove('active'));

    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) {
        targetView.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update Nav Active State
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('data-view') === viewId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Close Mobile Menu if open
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) navMenu.classList.remove('mobile-open');
}

function handleHashChange() {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(`view-${hash}`)) {
        switchView(hash);
    }
}

window.addEventListener('hashchange', handleHashChange);

// Mobile Toggle Handler & Navigation Init
document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('mobile-open');
        });
    }

    // Navbar Link Click Listeners
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const viewId = link.getAttribute('data-view');
            if (viewId) {
                switchView(viewId);
                history.pushState(null, null, `#${viewId}`);
            }
        });
    });

    // Handle initial URL hash if present
    if (window.location.hash) {
        handleHashChange();
    }

    // Populate Sample Plant Chips
    renderSamplePlantChips();
    
    // Select default plant Ashwagandha for preview
    selectPlantDemo('ashwagandha');

    // Populate Knowledge Library Cards
    renderKnowledgeLibrary();

    // Populate Initial IP Search Results
    executeIPSearch();

    // Populate International Comparison Table
    updateIntlComparison();
});

/* ==========================================
   6. LANGUAGE SWITCHING ENGINE
   ========================================== */
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'hi' : 'en';
    const langBtnText = document.getElementById('lang-toggle-text');
    const chatLangLabel = document.getElementById('chat-lang-label');

    if (langBtnText) {
        langBtnText.textContent = currentLang === 'en' ? 'हिंदी में बदलें (Hindi)' : 'Switch to English';
    }

    if (chatLangLabel) {
        chatLangLabel.textContent = currentLang === 'en' ? 'Language: English' : 'भाषा: हिंदी (Hindi)';
    }

    // Update all i18n tagged elements
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18nData[currentLang] && i18nData[currentLang][key]) {
            el.textContent = i18nData[currentLang][key];
        }
    });

    showToast(currentLang === 'en' ? "Language changed to English" : "भाषा बदलकर हिंदी की गई");
}

/* ==========================================
   7. PLANT INTELLIGENCE FUNCTIONS
   ========================================== */
function renderSamplePlantChips() {
    const container = document.getElementById('sample-chips-container');
    if (!container) return;

    let html = '';
    Object.keys(plantDatabase).forEach(key => {
        const p = plantDatabase[key];
        const displayName = currentLang === 'hi' && p.commonNameHi ? p.commonNameHi : p.commonName;
        html += `<button class="sample-chip" id="chip-${p.id}" onclick="selectPlantDemo('${p.id}')">🌿 ${displayName}</button>`;
    });
    container.innerHTML = html;
}

function selectPlantDemo(plantId) {
    const plant = plantDatabase[plantId];
    if (!plant) return;

    currentSelectedPlant = plant;

    // Highlight Chip
    document.querySelectorAll('.sample-chip').forEach(c => c.classList.remove('active'));
    const chip = document.getElementById(`chip-${plantId}`);
    if (chip) chip.classList.add('active');

    // Trigger Identification Animation
    const overlay = document.getElementById('plant-loading-overlay');
    const resultBox = document.getElementById('plant-result-container');
    const progressFill = document.getElementById('plant-progress-bar');
    const loadingText = document.getElementById('plant-loading-text');

    if (resultBox) resultBox.style.display = 'none';
    if (overlay) overlay.style.display = 'block';

    const steps = [
        "Analyzing plant leaf & flower morphology...",
        "Matching botanical characteristics with Flora of India database...",
        "Searching Traditional Knowledge Digital Library (TKDL)...",
        "Cross-referencing Section 3(p) patent records...",
        "Preparing Ayurvedic & Regulatory profile..."
    ];

    let stepIdx = 0;
    progressFill.style.width = '0%';

    const interval = setInterval(() => {
        stepIdx++;
        if (stepIdx < steps.length) {
            loadingText.textContent = steps[stepIdx];
            progressFill.style.width = `${(stepIdx / steps.length) * 100}%`;
        } else {
            clearInterval(interval);
            progressFill.style.width = '100%';
            setTimeout(() => {
                overlay.style.display = 'none';
                displayPlantResult(plant);
                if (resultBox) resultBox.style.display = 'block';
            }, 300);
        }
    }, 250);
}

function displayPlantResult(p) {
    document.getElementById('res-plant-name').textContent = currentLang === 'hi' && p.commonNameHi ? p.commonNameHi : p.commonName;
    document.getElementById('res-scientific-name').textContent = p.scientificName;
    document.getElementById('res-ayurvedic-name').textContent = p.ayurvedicName;
    document.getElementById('res-family').textContent = p.family;
    document.getElementById('res-plant-img').src = p.image;
    document.getElementById('res-plant-confidence').textContent = `${p.confidence} Prototype Match`;

    document.getElementById('res-overview-desc').textContent = p.overviewDesc;
    document.getElementById('res-overview-geo').textContent = p.overviewGeo;

    // Botanical list
    const botList = document.getElementById('res-botanical-list');
    botList.innerHTML = p.botanicalList.map(item => `<li>${item}</li>`).join('');

    // Ayurvedic uses
    const ayurUses = document.getElementById('res-ayur-uses');
    ayurUses.innerHTML = p.ayurvedicUses.map(use => `<li>${use}</li>`).join('');

    // Ayurvedic props
    const ayurProps = document.getElementById('res-ayur-props');
    ayurProps.innerHTML = Object.keys(p.ayurvedicProps).map(k => `
        <div class="card-inner bg-light">
            <div class="text-xs text-muted">${k}</div>
            <strong class="text-sm">${p.ayurvedicProps[k]}</strong>
        </div>
    `).join('');

    // Parts used
    const partsContainer = document.getElementById('res-parts-used');
    partsContainer.innerHTML = p.partsUsed.map(part => `<span class="badge bg-emerald">${part}</span>`).join('');

    // Healthcare
    document.getElementById('res-health-desc').textContent = p.healthcareInfo;
    document.getElementById('res-health-areas').innerHTML = p.healthAreas.map(h => `<li>${h}</li>`).join('');

    // Skincare
    document.getElementById('res-skincare-uses').innerHTML = p.skincareUses.map(s => `<li>${s}</li>`).join('');
    document.getElementById('res-skincare-forms').innerHTML = p.skincareForms.map(f => `<span class="badge bg-gold">${f}</span>`).join('');

    // Constituents
    const constGrid = document.getElementById('res-constituents-grid');
    constGrid.innerHTML = p.constituents.map(c => `
        <div class="card-inner bg-light">
            <h4 class="text-sm">${c.name}</h4>
            <p class="text-xs text-muted">${c.desc}</p>
        </div>
    `).join('');

    // Safety list
    document.getElementById('res-safety-list').innerHTML = p.safetyList.map(s => `<li>${s}</li>`).join('');

    // TK & IP Tab
    document.getElementById('res-tk-link').textContent = p.tkDetails;
    document.getElementById('res-ip-evaluation').textContent = p.ipEvaluation;
}

// Tab Switching inside Plant Result Card
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-btn')) {
        const targetId = e.target.getAttribute('data-target');
        const container = e.target.closest('.tabs-container');
        
        container.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        container.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

        e.target.classList.add('active');
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.classList.add('active');
    }
});

function handlePlantUpload(input) {
    if (input.files && input.files[0]) {
        showToast(`Simulating upload for: ${input.files[0].name}`);
        // Pick a random plant or Ashwagandha for demonstration
        selectPlantDemo('ashwagandha');
    }
}

function simulateCameraCapture() {
    showToast("Simulating live mobile camera capture...");
    selectPlantDemo('neem');
}

function triggerFileUpload(id) {
    const elem = document.getElementById(id);
    if (elem) elem.click();
}

/* ==========================================
   8. PRODUCT ANALYZER & AUDIT DEMO
   ========================================== */
function runProductDemo(prodKey) {
    const prod = sampleProducts[prodKey] || sampleProducts.ashwagandha;
    currentSelectedProduct = prod;

    switchView('product-analyzer');

    const overlay = document.getElementById('product-loading-overlay');
    const resContainer = document.getElementById('product-result-container');

    if (resContainer) resContainer.style.display = 'none';
    if (overlay) overlay.style.display = 'block';

    setTimeout(() => {
        overlay.style.display = 'none';
        if (resContainer) resContainer.style.display = 'block';

        document.getElementById('prod-res-title').textContent = prod.title;
        document.getElementById('prod-res-score').textContent = prod.riskScore;
        document.getElementById('prod-res-completeness').textContent = prod.completeness;

        document.getElementById('prod-res-ingredients').innerHTML = prod.ingredients.map(i => `<span class="badge bg-emerald">${i}</span>`).join('');
        document.getElementById('prod-res-tk-match').textContent = prod.tkMatch;
        document.getElementById('prod-res-ip-barrier').textContent = prod.ipBarrier;

        document.getElementById('prod-res-missing').innerHTML = prod.missing.map(m => `<li>${m}</li>`).join('');
        document.getElementById('prod-res-actions').innerHTML = prod.actions.map(a => `<li>${a}</li>`).join('');
    }, 1000);
}

function handleProductUpload(input) {
    if (input.files && input.files[0]) {
        showToast(`Analyzing label file: ${input.files[0].name}`);
        runProductDemo('ashwagandha');
    }
}

/* ==========================================
   9. DOCUMENT ANALYZER DEMO
   ========================================== */
function simulateDocAnalysis() {
    switchView('document-analyzer');
    const overlay = document.getElementById('doc-loading-overlay');
    const res = document.getElementById('doc-result-container');

    if (res) res.style.display = 'none';
    if (overlay) overlay.style.display = 'block';

    setTimeout(() => {
        overlay.style.display = 'none';
        if (res) res.style.display = 'block';
    }, 1200);
}

function handleDocUpload(input) {
    if (input.files && input.files[0]) {
        showToast(`Extracting claims from ${input.files[0].name}...`);
        simulateDocAnalysis();
    }
}

/* ==========================================
   10. AI ASSISTANT CHAT LOGIC
   ========================================== */
function askPredefinedQuery(key) {
    const qData = predefinedQueries[key];
    if (!qData) return;

    appendChatMessage('user', qData.q);

    // Simulate Typing response
    setTimeout(() => {
        appendStructuredAIResponse(qData);
    }, 600);
}

function handleChatKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendUserMessage();
    }
}

function sendUserMessage() {
    const textarea = document.getElementById('chat-input');
    const text = textarea.value.trim();
    if (!text) return;

    appendChatMessage('user', text);
    textarea.value = '';

    // Match keywords to predefined responses or generate fallback source-cited answer
    setTimeout(() => {
        const lower = text.toLowerCase();
        let matched = null;

        if (lower.includes('ashwagandha') || lower.includes('patent')) matched = predefinedQueries.ashwagandha_patent;
        else if (lower.includes('neem') || lower.includes('skin')) matched = predefinedQueries.neem_uses;
        else if (lower.includes('brand') || lower.includes('trademark')) matched = predefinedQueries.brand_protection;
        else if (lower.includes('traditional knowledge') || lower.includes('sec 3') || lower.includes('3(p)')) matched = predefinedQueries.tk_patentability;
        else if (lower.includes('abs') || lower.includes('biodiversity')) matched = predefinedQueries.abs_rules;
        else if (lower.includes('extraction') || lower.includes('process')) matched = predefinedQueries.formulation_ip;
        else if (lower.includes('usa') || lower.includes('export') || lower.includes('fda')) matched = predefinedQueries.export_regs;

        if (!matched) {
            // Dynamic structured response fallback
            matched = {
                q: text,
                answer: currentLang === 'hi' ? 
                    `इस आयुर्वेदिक विषय के संदर्भ में, भारत के एकस्व (पेटेंट) अधिनियम १९७० और परंपरागत ज्ञान डिजिटल पुस्तकालय (TKDL) के अनुसार पूर्व-कला का विश्लेषण आवश्यक है।` :
                    `Regarding your query on "${text}", Section 3(p) of the Indian Patents Act, 1970 and TKDL prior-art repositories apply. Any traditional formulation in the public domain requires proven novel extraction or unexpected synergistic bio-efficacy to qualify for patent protection.`,
                category: "Ayurvedic IP & Regulatory Guidance",
                risk: "Moderate Risk",
                riskScore: "50/100",
                actions: [
                    "1. Cross-reference query terms with TKDL (CSIR) database records.",
                    "2. Search registered prior art on Indian Patent Office (IPO) search portal.",
                    "3. Verify regulatory compliance with Ministry of AYUSH & NBA guidelines."
                ],
                sources: ["TKDL (CSIR)", "Indian Patent Office (IPO)", "WIPO Patentscope", "AYUSH Ministry"],
                confidence: "92%"
            };
        }

        appendStructuredAIResponse(matched);
    }, 800);
}

function appendChatMessage(sender, text) {
    const thread = document.getElementById('chat-thread');
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${sender}`;

    const avatar = sender === 'user' ? '👤' : '🌿';
    const name = sender === 'user' ? 'Innovator' : 'IP-SAKTI Sahayak AI';

    msgDiv.innerHTML = `
        <div class="msg-avatar">${avatar}</div>
        <div class="msg-content">
            <div class="msg-header">
                <span class="sender-name">${name}</span>
                <span class="msg-time">Just now</span>
            </div>
            <div class="msg-body">
                <p>${text}</p>
            </div>
        </div>
    `;

    thread.appendChild(msgDiv);
    thread.scrollTop = thread.scrollHeight;
}

function appendStructuredAIResponse(data) {
    const thread = document.getElementById('chat-thread');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-message assistant';

    const sourcesHtml = data.sources.map(s => `<span class="src-tag">📚 ${s}</span>`).join(' ');
    const actionsHtml = data.actions.map(a => `<div class="text-xs mt-1">• ${a}</div>`).join('');

    msgDiv.innerHTML = `
        <div class="msg-avatar">🌿</div>
        <div class="msg-content">
            <div class="msg-header">
                <span class="sender-name">IP-SAKTI Sahayak AI</span>
                <span class="msg-time">Just now</span>
            </div>
            <div class="msg-body">
                <p><strong>ANSWER:</strong> ${data.answer}</p>
                
                <div class="structured-response-box">
                    <div class="res-sec">
                        <div class="res-sec-title">RELEVANT CATEGORY</div>
                        <span class="badge bg-emerald">${data.category}</span>
                    </div>

                    <div class="res-sec">
                        <div class="res-sec-title">RISK LEVEL & NOVELTY SCORE</div>
                        <span class="risk-badge ${data.risk.toLowerCase().includes('low') ? 'low' : 'moderate'}">${data.risk} (${data.riskScore || 'Moderate'})</span>
                    </div>

                    <div class="res-sec">
                        <div class="res-sec-title">RECOMMENDED ACTIONS</div>
                        ${actionsHtml}
                    </div>

                    <div class="res-sec">
                        <div class="res-sec-title">REFERENCED SOURCES USED</div>
                        <div class="sources-tags">${sourcesHtml}</div>
                    </div>

                    <div class="res-sec">
                        <div class="res-sec-title">AI RETRIEVAL CONFIDENCE</div>
                        <span class="badge bg-gold">🎯 ${data.confidence} Verified Prototype RAG Match</span>
                    </div>
                </div>
            </div>
            <div class="msg-disclaimer text-xs">
                <span class="disc-icon">ℹ️</span> <strong>Disclaimer:</strong> IP-SAKTI Sahayak provides source-cited informational guidance. It does not constitute formal legal or medical advice. Verify claims with qualified patent attorneys or AYUSH authorities.
            </div>
        </div>
    `;

    thread.appendChild(msgDiv);
    thread.scrollTop = thread.scrollHeight;
}

function resetChat() {
    const thread = document.getElementById('chat-thread');
    thread.innerHTML = `
        <div class="chat-message assistant">
            <div class="msg-avatar">🌿</div>
            <div class="msg-content">
                <div class="msg-header">
                    <span class="sender-name">IP-SAKTI Sahayak AI</span>
                    <span class="msg-time">Just now</span>
                </div>
                <div class="msg-body">
                    <p>New session initialized. Ask questions about Ayurveda plants, traditional knowledge, patentability, trademarks, or export regulations.</p>
                </div>
            </div>
        </div>
    `;
}

function clearChat() {
    resetChat();
}

function simulateVoiceInput() {
    showToast("🎙️ Simulated Voice Input: Listening for your query...");
    setTimeout(() => {
        document.getElementById('chat-input').value = "Can I patent an Ayurvedic formulation containing Ashwagandha?";
    }, 1500);
}

function handleChatFileUpload(input) {
    if (input.files && input.files[0]) {
        showToast(`Attached file: ${input.files[0].name}`);
        document.getElementById('chat-input').value = `Please analyze attached document: ${input.files[0].name} for patent claims and TKDL prior art.`;
    }
}

/* ==========================================
   11. IP SEARCH ENGINE DEMO
   ========================================== */
const sampleIPRecords = [
    { title: "Herbal Formulation Containing Ashwagandha & Piperine", type: "Patent", jurisdiction: "India", similarity: "High (82%)", status: "Published Prior Art #20231100452" },
    { title: "Composition for Stress & Adaptogenic Support", type: "Patent", jurisdiction: "USA", similarity: "Moderate (54%)", status: "Granted US Patent #9872651" },
    { title: "Kashmir Saffron (Mongra Saffron)", type: "GI", jurisdiction: "India", similarity: "Low (12%)", status: "Registered GI Tag #635" },
    { title: "AyushBio Pure Herbals Logo", type: "Trademark", jurisdiction: "India", similarity: "Low (5%)", status: "Registered Class 5 #4512998" }
];

function executeIPSearch() {
    const query = document.getElementById('ip-search-input') ? document.getElementById('ip-search-input').value.trim() : '';
    const country = document.getElementById('country-filter') ? document.getElementById('country-filter').value : 'all';

    const grid = document.getElementById('ip-results-grid');
    if (!grid) return;

    let filtered = sampleIPRecords.filter(r => {
        if (country !== 'all' && r.jurisdiction !== country) return false;
        return true;
    });

    grid.innerHTML = filtered.map(r => `
        <div class="card-inner">
            <div class="flex-between mb-2">
                <span class="badge bg-emerald">${r.type}</span>
                <span class="text-xs text-muted">${r.jurisdiction}</span>
            </div>
            <h4>${r.title}</h4>
            <div class="text-xs text-warning mt-1">Similarity Index: <strong>${r.similarity}</strong></div>
            <div class="text-xs text-muted mt-1">${r.status}</div>
        </div>
    `).join('');

    const countEl = document.getElementById('search-result-count');
    if (countEl) countEl.textContent = filtered.length;
}

/* ==========================================
   12. IP GUIDANCE ADVISOR
   ========================================== */
function showIPAdvice(catKey) {
    const displayTitle = document.getElementById('advice-title');
    const displayBody = document.getElementById('advice-body');

    const adviceMap = {
        formulation: {
            title: "🌿 Protecting a New Herbal Formulation",
            html: `
                <p><strong>Primary IP Tool:</strong> Product Patent (or Utility Model in foreign jurisdictions).</p>
                <p><strong>Key Legal Criteria:</strong> Must overcome Section 3(p) of Indian Patents Act by proving unexpected synergistic therapeutic effect beyond mere combination of classical herbs.</p>
                <h4 class="mt-3">Recommended Next Steps:</h4>
                <ol class="styled-numbered-list">
                    <li>Perform TKDL search to ensure formulation is not documented in ancient Ayurvedic texts.</li>
                    <li>Conduct synergistic bio-assay comparison against individual single-herb extracts.</li>
                    <li>Apply for NBA Form III clearance prior to patent filing.</li>
                </ol>
            `
        },
        process: {
            title: "⚙️ Protecting a Manufacturing Process",
            html: `
                <p><strong>Primary IP Tool:</strong> Process Patent.</p>
                <p><strong>Key Legal Criteria:</strong> Patentable if the extraction parameters, temperature/pressure controls, or solvent recovery techniques are novel and non-obvious.</p>
                <h4 class="mt-3">Recommended Next Steps:</h4>
                <ol class="styled-numbered-list">
                    <li>Maintain strict laboratory confidentiality under Non-Disclosure Agreements (NDAs).</li>
                    <li>File a Provisional Patent Application to secure early priority date.</li>
                </ol>
            `
        },
        brand: {
            title: "🏷️ Protecting Brand Name & Logo",
            html: `
                <p><strong>Primary IP Tool:</strong> Trademark Registration under Trade Marks Act 1999.</p>
                <p><strong>Classes:</strong> Class 5 (Pharmaceutical & AYUSH products) and Class 3 (Cosmetics & Skincare).</p>
                <h4 class="mt-3">Recommended Next Steps:</h4>
                <ol class="styled-numbered-list">
                    <li>Select a distinctive brand name that does not merely describe the herb name.</li>
                    <li>Conduct a search on IP India Trade Marks Registry portal.</li>
                </ol>
            `
        },
        design: {
            title: "🎨 Protecting Product Container & Packaging Design",
            html: `
                <p><strong>Primary IP Tool:</strong> Industrial Design Registration under Designs Act 2000.</p>
                <p><strong>Prerequisite:</strong> The shape, pattern, or ornament applied to the bottle/applicator must be new and original.</p>
            `
        },
        tk: {
            title: "📚 Heritage Traditional Knowledge",
            html: `
                <p><strong>Status:</strong> Public Domain Traditional Knowledge cannot be owned or patented by any private individual.</p>
                <p><strong>Protection Mechanism:</strong> Documented in TKDL to prevent foreign bio-piracy.</p>
            `
        },
        gi: {
            title: "📍 Geographical Indication (GI Tag)",
            html: `
                <p><strong>Primary IP Tool:</strong> Geographical Indications of Goods Act 1999.</p>
                <p><strong>Example:</strong> Kashmir Saffron, Naga Mircha, Malabar Pepper.</p>
            `
        }
    };

    const data = adviceMap[catKey];
    if (data && displayTitle && displayBody) {
        displayTitle.textContent = data.title;
        displayBody.innerHTML = data.html;
    }
}

/* ==========================================
   13. INTERNATIONAL REGULATORY COMPARISON
   ========================================== */
const intlDataMap = {
    USA: {
        flag: "🇺🇸",
        name: "USA (US FDA & USPTO)",
        rows: [
            { domain: "Product Classification", india: "AYUSH Medicine / Cosmetic", target: "Dietary Supplement (DSHEA 1994) / Cosmetic" },
            { domain: "Disease Cure Claims", india: "Allowed for classical AYUSH indications", target: "STRICTLY PROHIBITED without FDA drug approval" },
            { domain: "Heavy Metal Standards", india: "AYUSH Pharmacopoeial Limits", target: "Strict USP <2232> Elemental Impurity limits" },
            { domain: "Patent Sec 3(p) Equivalent", india: "Sec 3(p) mandatory exclusion", target: "35 U.S.C. 102 Prior Art (TKDL admissible)" }
        ]
    },
    EU: {
        flag: "🇪🇺",
        name: "European Union (EMA & EPO)",
        rows: [
            { domain: "Product Classification", india: "AYUSH Medicine", target: "Traditional Herbal Medicinal Product (THMPD)" },
            { domain: "Prior Traditional Use", india: "Documented in classical Samhitas", target: "Requires 30 years documented medicinal use (15 in EU)" },
            { domain: "Pesticide Residues", india: "FSSAI / AYUSH limits", target: "Strict European Pharmacopoeia (Ph. Eur.) limits" }
        ]
    },
    UK: {
        flag: "🇬🇧",
        name: "United Kingdom (MHRA)",
        rows: [
            { domain: "Product Classification", india: "AYUSH Medicine", target: "Traditional Herbal Registration (THR)" },
            { domain: "Label Disclaimers", india: "AYUSH Manufacturing License #", target: "Mandatory THR Certification mark on carton" }
        ]
    },
    Canada: {
        flag: "🇨🇦",
        name: "Canada (Health Canada)",
        rows: [
            { domain: "Product Classification", india: "AYUSH Medicine", target: "Natural Health Product (NHP)" },
            { domain: "Licensing Requirement", india: "State AYUSH License", target: "Mandatory Site License & Product NPN Number" }
        ]
    },
    Japan: {
        flag: "🇯🇵",
        name: "Japan (PMDA & JPO)",
        rows: [
            { domain: "Product Classification", india: "AYUSH Medicine", target: "Kampo / Quasi-Drug Category" },
            { domain: "Quality Control", india: "API Standards", target: "Japanese Pharmacopoeia (JP) strict purity testing" }
        ]
    }
};

function updateIntlComparison() {
    const select = document.getElementById('intl-country-select');
    if (!select) return;
    const countryKey = select.value;
    const data = intlDataMap[countryKey] || intlDataMap.USA;

    document.getElementById('intl-target-flag').textContent = data.flag;
    document.getElementById('intl-target-name').textContent = data.name;

    const tbody = document.getElementById('intl-table-body');
    if (tbody) {
        tbody.innerHTML = data.rows.map(r => `
            <tr>
                <td><strong>${r.domain}</strong></td>
                <td>${r.india}</td>
                <td><span class="badge bg-gold">${r.target}</span></td>
            </tr>
        `).join('');
    }
}

/* ==========================================
   14. KNOWLEDGE LIBRARY RENDERER
   ========================================== */
const librarySources = [
    { name: "Traditional Knowledge Digital Library (TKDL)", auth: "CSIR & Ministry of AYUSH", desc: "Digital database of over 420,000 traditional formulations translated into 5 international languages to prevent biopiracy." },
    { name: "Indian Patent Office (IPO)", auth: "CGPDTM, Govt of India", desc: "Official repository of registered Indian patents, patent searches, and Section 3(p) rejection guidelines." },
    { name: "WIPO Patentscope", auth: "World Intellectual Property Organization", desc: "Global patent database containing international PCT applications and prior-art search tools." },
    { name: "National Biodiversity Authority (NBA)", auth: "Ministry of Environment & Forests", desc: "Statutory body regulating Access and Benefit Sharing (ABS) for Indian bio-resources." },
    { name: "Ayurvedic Pharmacopoeia of India (API)", auth: "Pharmacopoeia Commission for AYUSH", desc: "Official statutory standards for quality, purity, and identity of Ayurvedic single drugs and formulations." }
];

function renderKnowledgeLibrary() {
    const grid = document.getElementById('library-cards-grid');
    if (!grid) return;

    grid.innerHTML = librarySources.map(s => `
        <div class="card feature-card">
            <div class="card-icon">📚</div>
            <h3>${s.name}</h3>
            <div class="text-xs text-gold mb-2"><strong>Authority:</strong> ${s.auth}</div>
            <p class="card-text">${s.desc}</p>
            <button class="btn-secondary btn-sm" onclick="showSourceModal('${s.name}')">View Source Details</button>
        </div>
    `).join('');
}

function showSourceModal(srcName) {
    showToast(`Opening source profile for ${srcName}`);
    openRagModal();
}

/* ==========================================
   15. GUIDED SIH PRESENTATION DEMO FLOW (3-MIN TOUR)
   ========================================== */
function startGuidedDemo() {
    currentDemoStep = 1;
    updateDemoModalStep();
    const modal = document.getElementById('demo-modal');
    if (modal) modal.style.display = 'flex';
}

function updateDemoModalStep() {
    // Stepper indicators update
    for (let i = 1; i <= 6; i++) {
        const ind = document.getElementById(`demo-step-${i}-ind`);
        if (ind) {
            if (i === currentDemoStep) ind.classList.add('active');
            else ind.classList.remove('active');
        }
    }

    const prevBtn = document.getElementById('btn-demo-prev');
    const nextBtn = document.getElementById('btn-demo-next');
    const stepLabel = document.getElementById('demo-step-num-label');
    const content = document.getElementById('demo-step-content');

    if (prevBtn) prevBtn.disabled = currentDemoStep === 1;
    if (nextBtn) nextBtn.textContent = currentDemoStep === 6 ? 'Finish Presentation Demo' : 'Next Step →';
    if (stepLabel) stepLabel.textContent = `Step ${currentDemoStep} of 6`;

    const stepTexts = [
        {
            title: "Step 1: 🌿 Plant Identification Simulation (Ashwagandha)",
            body: "<p>The innovator uploads a leaf/root photograph. Computer vision matches <i>Withania somnifera</i> with 94% confidence, retrieving traditional uses and TKDL prior art entry #AY-402.</p>",
            action: () => selectPlantDemo('ashwagandha')
        },
        {
            title: "Step 2: 📦 Product Label OCR & Risk Assessment",
            body: "<p>The system performs OCR on 'Ashwagandha Herbal Formulation'. Detects 4 active ingredients, cross-references TKDL, and flags Section 3(p) Patent Risk (62/100 Moderate Risk).</p>",
            action: () => runProductDemo('ashwagandha')
        },
        {
            title: "Step 3: 🤖 RAG-Based Source-Cited AI Assistant Query",
            body: "<p>The user asks: <i>'Can I patent an Ayurvedic formulation containing Ashwagandha?'</i> AI delivers a structured response citing TKDL, IPO Sec 3(p), and WIPO databases.</p>",
            action: () => askPredefinedQuery('ashwagandha_patent')
        },
        {
            title: "Step 4: 🌐 Multilingual Accessibility (Hindi Language Toggle)",
            body: "<p>Demonstrates instant translation of UI, queries, and AI responses to Hindi for rural Ayurveda practitioners across India.</p>",
            action: () => toggleLanguage()
        },
        {
            title: "Step 5: 🌍 Export & International Regulatory Comparison",
            body: "<p>Compares Indian AYUSH licensing against US FDA Dietary Supplement rules and USPTO prior-art standards.</p>",
            action: () => switchView('regulations')
        },
        {
            title: "Step 6: 📄 Printable Audit Report Generation",
            body: "<p>Generates a formal, printable PDF audit summary with risk meters, TKDL references, and recommended compliance actions.</p>",
            action: () => openPrintReportModal('ashwagandha')
        }
    ];

    const currentData = stepTexts[currentDemoStep - 1];
    if (content && currentData) {
        content.innerHTML = `
            <h3>${currentData.title}</h3>
            ${currentData.body}
            <button class="btn-gold btn-sm mt-3" onclick="executeDemoStepAction(${currentDemoStep})">▶ Execute Live Action for Step ${currentDemoStep}</button>
        `;
    }
}

function executeDemoStepAction(stepNum) {
    closeModal('demo-modal');
    if (stepNum === 1) { switchView('plant-intelligence'); selectPlantDemo('ashwagandha'); }
    else if (stepNum === 2) { runProductDemo('ashwagandha'); }
    else if (stepNum === 3) { switchView('ai-assistant'); askPredefinedQuery('ashwagandha_patent'); }
    else if (stepNum === 4) { toggleLanguage(); switchView('ai-assistant'); }
    else if (stepNum === 5) { switchView('regulations'); }
    else if (stepNum === 6) { openPrintReportModal('ashwagandha'); }
}

function nextDemoStep() {
    if (currentDemoStep < 6) {
        currentDemoStep++;
        updateDemoModalStep();
    } else {
        closeModal('demo-modal');
        showToast("✨ SIH Guided Demo Flow Completed!");
    }
}

function prevDemoStep() {
    if (currentDemoStep > 1) {
        currentDemoStep--;
        updateDemoModalStep();
    }
}

/* ==========================================
   16. REPORT PRINTING & GENERATION
   ========================================== */
function openPrintReportModal(prodKey) {
    const prod = sampleProducts[prodKey] || sampleProducts.ashwagandha;
    const plant = plantDatabase[prodKey] || plantDatabase.ashwagandha;

    const reportContent = document.getElementById('printable-report-content');
    if (!reportContent) return;

    reportContent.innerHTML = `
        <div style="padding: 2rem; background: white; color: #1F2937; font-family: sans-serif;">
            <div style="display: flex; justify-content: space-between; border-bottom: 2px solid #0A4D3C; padding-bottom: 1rem; margin-bottom: 1.5rem;">
                <div>
                    <h1 style="color: #0A4D3C; margin: 0;">🌿 IP-SAKTI Sahayak Audit Report</h1>
                    <div style="font-size: 0.85rem; color: #6B7280;">SIH Problem Statement 26045 Compliance Evaluation</div>
                </div>
                <div style="text-align: right;">
                    <div style="font-weight: bold; color: #C5A059;">REPORT #IP-2026-8841</div>
                    <div style="font-size: 0.8rem;">Date: September 10, 2026</div>
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 1.5rem;">
                <div style="border: 1px solid #E5E7EB; padding: 1rem; border-radius: 8px;">
                    <h3 style="margin-top: 0; color: #0A4D3C;">Item Information</h3>
                    <div><strong>Title:</strong> ${prod.title}</div>
                    <div><strong>Category:</strong> ${prod.type}</div>
                    <div><strong>Detected Plant Source:</strong> ${plant.commonName} (<i>${plant.scientificName}</i>)</div>
                </div>
                <div style="border: 1px solid #E5E7EB; padding: 1rem; border-radius: 8px; background: #FFFBEB;">
                    <h3 style="margin-top: 0; color: #B45309;">Overall Risk Score</h3>
                    <div style="font-size: 2.5rem; font-weight: bold; color: #B45309;">${prod.riskScore} / 100</div>
                    <div style="font-size: 0.85rem; font-weight: bold;">Status: Review Required</div>
                </div>
            </div>

            <div style="margin-bottom: 1.5rem;">
                <h3 style="color: #0A4D3C;">1. Traditional Knowledge (TKDL) Prior Art Evaluation</h3>
                <p>${plant.tkDetails}</p>
            </div>

            <div style="margin-bottom: 1.5rem;">
                <h3 style="color: #0A4D3C;">2. Intellectual Property (IP) Analysis</h3>
                <p>${plant.ipEvaluation}</p>
            </div>

            <div style="margin-bottom: 1.5rem;">
                <h3 style="color: #0A4D3C;">3. Recommended Action Checklist for Innovators</h3>
                <ol>
                    ${prod.actions.map(a => `<li>${a}</li>`).join('')}
                </ol>
            </div>

            <div style="border-top: 1px dashed #E5E7EB; padding-top: 1rem; font-size: 0.75rem; color: #6B7280;">
                <strong>Disclaimer:</strong> IP-SAKTI Sahayak provides source-cited informational guidance generated by AI prototype models referencing TKDL, IPO, WIPO, and AYUSH repositories. Verify details with qualified legal counsel.
            </div>
        </div>
    `;

    const modal = document.getElementById('report-modal');
    if (modal) modal.style.display = 'flex';
}

function generateReportForCurrentProduct() {
    openPrintReportModal('ashwagandha');
}

function generateCustomReport() {
    openPrintReportModal('ashwagandha');
}

/* ==========================================
   17. MODALS & TOAST UTILITIES
   ========================================== */
function openRagModal() {
    const modal = document.getElementById('rag-modal');
    if (modal) modal.style.display = 'flex';
}

function openLoginModal() {
    const modal = document.getElementById('login-modal');
    if (modal) modal.style.display = 'flex';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

function handleLogin(e) {
    e.preventDefault();
    closeModal('login-modal');
    showToast("🔑 Successfully logged in as AYUSH Innovator!");
}

function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>ℹ️</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}
