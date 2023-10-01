const db = require('./connection');
const { User, Product, Category } = require('../models');


db.once('open', async () => {
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Controllers' },
    { name: 'Video Games' },
    { name: 'Consoles' },
    { name: 'Board Games' },
    { name: 'PC' }
  ]);

  console.log('categories seeded');

  await Product.deleteMany();

  const products = await Product.insertMany([
    {
      name: 'PlayStation 5 Controller',
      description:
        'SONY PlayStation 5 DualSense Wireless Controller',
      image: 'PS5-controller.jpg',
      category: categories[0]._id,
      price: 49.99,
      quantity: 500
    },
    {
      name: 'Xbox One Controller',
      description:
        'Xbox Wireless Controller - Robot White',
      image: 'Xbox-controller.jpg',
      category: categories[0]._id,
      price: 49.99,
      quantity: 500
    },
    {
      name: 'Nba 2k23',
      category: categories[1]._id,
      description:'The next evolution of ultra-real gameplay has arrived on New Gen with NBA 2K23',
      image: 'nba2k23.jpg',
      price: 27.99,
      quantity: 20
    },
    {
      name: 'MLB the Show 22',
      category: categories[1]._id,
      description:
        'With the all-new MLB® The Show™, there are more ways than ever for gamers to play – craft the perfect team, round up your friends to see who’s champion of the couch or online, or spend an evening raking in homers as you progress your career to the big leagues in Road to the Show.',
      image: 'mlb.jpg',
      price: 33.99,
      quantity: 50
    },
    {
      name: 'NHL 23',
      category: categories[1]._id,
      description:
        "NHL 23 is greater together with the introduction of mixed women's and men's teams in HUT, and cross-platform matchmaking in select modes.",
      image: 'nhl23.jpg',
      price: 14.99,
      quantity: 100
    },
    {
      name: 'Playstation 5',
      category: categories[2]._id,
      description:
        'Step up your gaming experience with the PlayStation 5. Enjoy lightning-fast loading with an ultra-high speed SSD, deep immersion with haptic feedback, adaptive triggers, and 3D audio.',
      image: 'ps5.jpg',
      price: 499.99,
      quantity: 30
    },
    {
      name: 'Xbox Series X',
      category: categories[2]._id,
      description:
        'Xbox Series X, the fastest, most powerful Xbox ever. Play thousands of titles from four generations of consoles—all games look and play best on Xbox Series X. At the heart of Series X is the Xbox Velocity Architecture, which pairs a custom SSD with integrated software for faster, streamlined gameplay with significantly reduced load times.',
      image: 'xbox.jpg',
      price: 399.99,
      quantity: 30
    },
    {
      name: 'Mario Monopoly',
      category: categories[3]._id,
      description:
        'MONOPOLY GAME CELEBRATES SUPER MARIO: Players can buy, sell, trade, and scheme to win it all with this Monopoly board game inspired by iconic Super Mario artwork, characters, and themes.',
      image: 'monopoly.jpg',
      price: 9.99,
      quantity: 100
    },
    {
      name: 'Lumos Ultimate PC',
      category: categories[4]._id,
      description: "Experience a new level of performance, blow the doors off today’s most demanding next-gen games, and do it with maximum detail, speed, and power.",
      image: 'pc2.jpg',
      price: 1200.00,
      quantity: 1000
    },
    {
      name: 'Gaming PC',
      category: categories[4]._id,
      description:
        "Blow the doors off today's most demanding games with maximum performance for an immersive experience without breaking the bank.",
      image: 'pc.jpg',
      price: 999.00,
      quantity: 10
    },
    {
      name: 'GeForce RTX 40 Series',
      category: categories[4]._id,
      description:
        "Vestibulum et NVIDIA® GeForce RTX™ 40 Series GPUs are beyond fast for gamers and creators. They're powered by the ultra-efficient NVIDIA Ada Lovelace architecture which delivers a quantum leap in both performance and AI-powered graphics. Experience lifelike virtual worlds with ray tracing and ultra-high FPS gaming with the lowest latency. Discover revolutionary new ways to create and unprecedented workflow acceleration. finibus erat suscipit vulputate sed vitae dui. Ut laoreet tellus sit amet justo bibendum ultrices. Donec vitae felis vestibulum, congue augue eu, finibus turpis.",
      image: 'pc3.jpg',
      price: 1967.99,
      quantity: 100
    },
    {
      name: 'Chess Up',
      category: categories[3]._id,
      description:
        'ChessUp is a revolutionary smart chess board with a built-in chess engine and chess instructor. It makes learning chess and improving faster and easier for all skill levels by lighting up all possible moves according to strength.',
      image: 'chess.jpg',
      price: 299.00,
      quantity: 600
    }
  ]);

  console.log('products seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Pamela',
    lastName: 'Washington',
    email: 'pamela@testmail.com',
    password: 'password12345',
    orders: [
      {
        products: [products[0]._id, products[0]._id, products[1]._id]
      }
    ]
  });

  await User.create({
    firstName: 'test',
    lastName: 'west',
    email: 'test@gmail.com',
    password: 'test12345'
  });

  console.log('users seeded');

  process.exit();
});
