require('dotenv').config({ path: './.env' });
const mongoose = require('mongoose');
const College = require('../src/models/College');

const colleges = [
  {
    name: "Indian Institute of Technology (IIT) Bombay",
    location: "Powai, Mumbai",
    city: "Mumbai",
    state: "Maharashtra",
    type: "Public",
    rating: 4.9,
    totalFees: 210000,
    description: "IIT Bombay is a global leader in engineering education and research, known for its rigorous academic programs and vibrant campus life.",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop",
    establishedYear: 1958,
    placementPct: 98,
    avgPackage: 25,
    courses: [
      { name: "B.Tech Computer Science", duration: "4 Years", fees: 210000 },
      { name: "B.Tech Electrical Engineering", duration: "4 Years", fees: 210000 },
      { name: "M.Tech Data Science", duration: "2 Years", fees: 150000 }
    ],
    reviews: [
      { author: "Rahul S.", rating: 5, comment: "Best engineering college in India. The exposure is unmatched." },
      { author: "Sneha P.", rating: 4.5, comment: "Academic pressure is high but totally worth it for the placements." }
    ]
  },
  {
    name: "Indian Institute of Technology (IIT) Delhi",
    location: "Hauz Khas, New Delhi",
    city: "New Delhi",
    state: "Delhi",
    type: "Public",
    rating: 4.8,
    totalFees: 225000,
    description: "Located in the heart of the capital, IIT Delhi is renowned for its innovation hub and top-tier engineering faculty.",
    imageUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=1000&auto=format&fit=crop",
    establishedYear: 1961,
    placementPct: 96,
    avgPackage: 23,
    courses: [
      { name: "B.Tech Mechanical Engineering", duration: "4 Years", fees: 225000 },
      { name: "B.Tech Mathematics and Computing", duration: "4 Years", fees: 225000 }
    ],
    reviews: [
      { author: "Amit K.", rating: 5, comment: "The startup culture here is amazing." }
    ]
  },
  {
    name: "BITS Pilani",
    location: "Vidya Vihar, Pilani",
    city: "Pilani",
    state: "Rajasthan",
    type: "Private",
    rating: 4.7,
    totalFees: 540000,
    description: "Birla Institute of Technology and Science is India's top private engineering university, famous for its 'No Reservation' policy.",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756eaa589?q=80&w=1000&auto=format&fit=crop",
    establishedYear: 1964,
    placementPct: 95,
    avgPackage: 19,
    courses: [
      { name: "B.E. Computer Science", duration: "4 Years", fees: 540000 },
      { name: "B.E. Chemical Engineering", duration: "4 Years", fees: 540000 }
    ],
    reviews: [
      { author: "Vikas M.", rating: 4.5, comment: "No attendance policy is a blessing!" }
    ]
  },
  {
    name: "VIT Vellore",
    location: "Katpadi, Vellore",
    city: "Vellore",
    state: "Tamil Nadu",
    type: "Private",
    rating: 4.2,
    totalFees: 198000,
    description: "Vellore Institute of Technology is known for its massive campus and diverse student body from all over India.",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop",
    establishedYear: 1984,
    placementPct: 90,
    avgPackage: 9,
    courses: [
      { name: "B.Tech IT", duration: "4 Years", fees: 198000 },
      { name: "B.Tech Biotech", duration: "4 Years", fees: 175000 }
    ],
    reviews: [
      { author: "Anjali R.", rating: 4, comment: "Great infrastructure, but too many rules in the hostel." }
    ]
  },
  {
    name: "National Institute of Technology (NIT) Trichy",
    location: "Tanjore Main Road, Tiruchirappalli",
    city: "Trichy",
    state: "Tamil Nadu",
    type: "Public",
    rating: 4.6,
    totalFees: 145000,
    description: "NIT Trichy is consistently ranked as the #1 NIT in India, offering excellent placements and research facilities.",
    imageUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=1000&auto=format&fit=crop",
    establishedYear: 1964,
    placementPct: 92,
    avgPackage: 15,
    courses: [
      { name: "B.Tech Civil Engineering", duration: "4 Years", fees: 145000 },
      { name: "B.Tech Electronics & Communication", duration: "4 Years", fees: 145000 }
    ],
    reviews: [
      { author: "Suresh L.", rating: 4.5, comment: "Top-notch coding culture." }
    ]
  },
  {
    name: "Manipal Institute of Technology",
    location: "Tiger Circle, Manipal",
    city: "Manipal",
    state: "Karnataka",
    type: "Private",
    rating: 4.4,
    totalFees: 425000,
    description: "MIT Manipal offers a world-class student experience with cutting-edge labs and a global alumni network.",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop",
    establishedYear: 1957,
    placementPct: 88,
    avgPackage: 12,
    courses: [
      { name: "B.Tech Mechatronics", duration: "4 Years", fees: 425000 },
      { name: "B.Tech Computer Science", duration: "4 Years", fees: 480000 }
    ],
    reviews: [
      { author: "Ishaan B.", rating: 4, comment: "Life at Manipal is unforgettable. Placements are solid for CS." }
    ]
  },
  {
    name: "SRM University",
    location: "Kattankulathur, Chennai",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "Private",
    rating: 4.0,
    totalFees: 250000,
    description: "SRM Institute of Science and Technology is one of the largest private universities in India with a strong focus on interdisciplinary research.",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756eaa589?q=80&w=1000&auto=format&fit=crop",
    establishedYear: 1985,
    placementPct: 85,
    avgPackage: 7.5,
    courses: [
      { name: "B.Tech Software Engineering", duration: "4 Years", fees: 250000 }
    ],
    reviews: [
      { author: "Priya M.", rating: 3.5, comment: "Decent college, huge campus." }
    ]
  },
  {
    name: "Delhi Technological University (DTU)",
    location: "Shahbad Daulatpur, Rohini",
    city: "New Delhi",
    state: "Delhi",
    type: "Public",
    rating: 4.5,
    totalFees: 190000,
    description: "Formerly Delhi College of Engineering, DTU is one of India's oldest and most prestigious engineering institutions.",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop",
    establishedYear: 1941,
    placementPct: 94,
    avgPackage: 18,
    courses: [
      { name: "B.Tech Production Engineering", duration: "4 Years", fees: 190000 }
    ],
    reviews: [
      { author: "Karan T.", rating: 5, comment: "DCE legacy is real. Best ROI in Delhi." }
    ]
  },
  {
    name: "Amity University",
    location: "Sector 125, Noida",
    city: "Noida",
    state: "Uttar Pradesh",
    type: "Private",
    rating: 3.8,
    totalFees: 310000,
    description: "Amity Noida is known for its modern infrastructure, global campuses, and corporate exposure.",
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop",
    establishedYear: 2005,
    placementPct: 80,
    avgPackage: 6,
    courses: [
      { name: "B.Tech CSE", duration: "4 Years", fees: 310000 },
      { name: "MBA", duration: "2 Years", fees: 450000 }
    ],
    reviews: [
      { author: "Arjun W.", rating: 3, comment: "Good facilities, but the student crowd is too large." }
    ]
  },
  {
    name: "Jadavpur University",
    location: "Jadavpur, Kolkata",
    city: "Kolkata",
    state: "West Bengal",
    type: "Public",
    rating: 4.7,
    totalFees: 10000,
    description: "Jadavpur University is legendary for providing world-class engineering education at almost zero cost.",
    imageUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=1000&auto=format&fit=crop",
    establishedYear: 1955,
    placementPct: 93,
    avgPackage: 14,
    courses: [
      { name: "B.E. IT", duration: "4 Years", fees: 2400 },
      { name: "B.E. Electrical", duration: "4 Years", fees: 2400 }
    ],
    reviews: [
      { author: "Sourav D.", rating: 5, comment: "Unbeatable ROI. The best place for intellectual growth." }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    await College.deleteMany({});
    console.log("Cleared existing colleges.");

    await College.insertMany(colleges);
    console.log(`Successfully seeded ${colleges.length} colleges.`);

    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedDB();
