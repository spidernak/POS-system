import coffee from "../assets/CategoryImage/coffee.png";
import all from "../assets/CategoryImage/all.png";
import juice from "../assets/CategoryImage/juice.png";
import dessert from "../assets/CategoryImage/dessert.png";
import burger from "../assets/CategoryImage/burger.png";

export const menu = [
  { id: 10, title: "All", image: all },
  { id: 11, title: "Snack", image: coffee },
  { id: 12, title: "Drink", image: juice },
  { id: 13, title: "Food", image: burger },
  { id: 14, title: "Dessert", image: dessert },
];
export const product = [
  // All
  {
    id: 1,
    category: "Food",
    name: "Margherita Pizza",
    price: 8.99,
    image: "https://uk.ooni.com/cdn/shop/articles/20220211142645-margherita-9920.jpg?crop=center&height=915&v=1660843558&width=1200",
    description: "Classic margherita pizza with fresh mozzarella and basil",
    sizes: ["small", "medium", "large"],
    quantity: { small: 0, medium: 5, large: 11 },
  },
  {
    id: 2,
    category: "Food",
    name: "Caesar Salad",
    price: 5.99,
    image: "https://www.seriouseats.com/thmb/Fi_FEyVa3_-_uzfXh6OdLrzal2M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/the-best-caesar-salad-recipe-06-40e70f549ba2489db09355abd62f79a9.jpg",
    description: "Crisp romaine lettuce with Caesar dressing and croutons",
    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 10 },
    
  },
  {
    id: 3,
    category: "Food",
    name: "Spaghetti Carbonara",
    price: 10.99,
    image: "https://example.com/spaghetti-carbonara.jpg",
    description: "Traditional Italian pasta with creamy sauce and pancetta",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 4,
    category: "Food",
    name: "Chicken Alfredo",
    price: 12.99,
    image: "https://example.com/chicken-alfredo.jpg",
    description:
      "Fettuccine pasta with creamy Alfredo sauce and grilled chicken",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 5,
    category: "Food",
    name: "Garlic Bread",
    price: 3.99,
    image: "https://example.com/garlic-bread.jpg",
    description: "Toasted bread with garlic butter and parsley",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 6,
    category: "Food",
    name: "Tiramisu",
    price: 6.99,
    image: "https://example.com/tiramisu.jpg",
    description:
      "Classic Italian dessert with layers of mascarpone and coffee-soaked ladyfingers",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 7,
    category: "Food",
    name: "Pepperoni Pizza",
    price: 9.99,
    image: "https://example.com/pepperoni-pizza.jpg",
    description: "Pepperoni pizza with mozzarella cheese and tomato sauce",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 8,
    category: "Food",
    name: "Minestrone Soup",
    price: 4.99,
    image: "https://example.com/minestrone-soup.jpg",
    description: "Hearty Italian soup with vegetables, beans, and pasta",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 9,
    category: "Food",
    name: "Lasagna",
    price: 11.99,
    image: "https://example.com/lasagna.jpg",
    description: "Layers of pasta, meat sauce, and cheese baked to perfection",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 10,
    category: "Food",
    name: "Caprese Salad",
    price: 7.99,
    image: "https://example.com/caprese-salad.jpg",
    description:
      "Fresh tomatoes, mozzarella, and basil drizzled with balsamic glaze",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },

  // Snack
  {
    id: 11,
    category: "Snack",
    name: "Nachos",
    price: 5.99,
    image: "https://example.com/nachos.jpg",
    description:
      "Crispy tortilla chips topped with melted cheese and jalapenos",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 12,
    category: "Snack",
    name: "Mozzarella Sticks",
    price: 6.99,
    image: "https://example.com/mozzarella-sticks.jpg",
    description:
      "Breaded and fried mozzarella sticks served with marinara sauce",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 13,
    category: "Snack",
    name: "Spring Rolls",
    price: 4.99,
    image: "https://example.com/spring-rolls.jpg",
    description:
      "Crispy spring rolls filled with vegetables and served with dipping sauce",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 14,
    category: "Snack",
    name: "Chicken Wings",
    price: 7.99,
    image: "https://example.com/chicken-wings.jpg",
    description: "Spicy chicken wings served with blue cheese dressing",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 15,
    category: "Snack",
    name: "Potato Skins",
    price: 6.49,
    image: "https://example.com/potato-skins.jpg",
    description: "Crispy potato skins topped with cheese and bacon",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 16,
    category: "Snack",
    name: "Stuffed Mushrooms",
    price: 5.99,
    image: "https://example.com/stuffed-mushrooms.jpg",
    description: "Mushrooms stuffed with cheese and herbs",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 17,
    category: "Snack",
    name: "Onion Rings",
    price: 4.99,
    image: "https://example.com/onion-rings.jpg",
    description: "Crispy fried onion rings served with dipping sauce",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 18,
    category: "Snack",
    name: "Pretzel Bites",
    price: 5.49,
    image: "https://example.com/pretzel-bites.jpg",
    description: "Soft pretzel bites served with cheese sauce",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 19,
    category: "Snack",
    name: "Cheese Platter",
    price: 8.99,
    image: "https://example.com/cheese-platter.jpg",
    description: "Assorted cheeses served with crackers and fruit",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 20,
    category: "Snack",
    name: "Hummus and Pita",
    price: 4.99,
    image: "https://example.com/hummus-pita.jpg",
    description: "Creamy hummus served with warm pita bread",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },

  // Drink
  {
    id: 21,
    category: "Drink",
    name: "Latte",
    price: 3.99,
    image: "https://example.com/latte.jpg",
    description: "Rich and creamy latte with steamed milk",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 22,
    category: "Drink",
    name: "Cappuccino",
    price: 3.49,
    image: "https://example.com/cappuccino.jpg",
    description: "Espresso with steamed milk and a thick layer of foam",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 23,
    category: "Drink",
    name: "Americano",
    price: 2.99,
    image: "https://example.com/americano.jpg",
    description: "Espresso with hot water",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 24,
    category: "Drink",
    name: "Espresso",
    price: 2.49,
    image: "https://example.com/espresso.jpg",
    description: "Strong and rich espresso",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 25,
    category: "Drink",
    name: "Iced Coffee",
    price: 3.99,
    image: "https://example.com/iced-coffee.jpg",
    description: "Cold brewed coffee served over ice",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 26,
    category: "Drink",
    name: "Green Tea",
    price: 2.99,
    image: "https://example.com/green-tea.jpg",
    description: "Refreshing green tea",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 27,
    category: "Drink",
    name: "Smoothie",
    price: 4.99,
    image: "https://example.com/smoothie.jpg",
    description: "Fresh fruit smoothie",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 28,
    category: "Drink",
    name: "Milkshake",
    price: 4.49,
    image: "https://example.com/milkshake.jpg",
    description: "Thick and creamy milkshake",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 29,
    category: "Drink",
    name: "Lemonade",
    price: 3.49,
    image: "https://example.com/lemonade.jpg",
    description: "Refreshing lemonade",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 30,
    category: "Drink",
    name: "Hot Chocolate",
    price: 3.99,
    image: "https://example.com/hot-chocolate.jpg",
    description: "Rich and creamy hot chocolate",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },

  // Food
  {
    id: 31,
    category: "Food",
    name: "Burger",
    price: 9.99,
    image: "https://example.com/burger.jpg",
    description: "Juicy beef burger with lettuce, tomato, and cheese",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 32,
    category: "Food",
    name: "Grilled Cheese Sandwich",
    price: 6.99,
    image: "https://example.com/grilled-cheese.jpg",
    description: "Toasted bread with melted cheese",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 33,
    category: "Food",
    name: "Chicken Tacos",
    price: 8.99,
    image: "https://example.com/chicken-tacos.jpg",
    description: "Soft tacos filled with grilled chicken and toppings",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 34,
    category: "Food",
    name: "Fish and Chips",
    price: 11.99,
    image: "https://example.com/fish-and-chips.jpg",
    description: "Crispy battered fish served with fries",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 35,
    category: "Food",
    name: "Steak",
    price: 15.99,
    image: "https://example.com/steak.jpg",
    description: "Grilled steak served with vegetables",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 36,
    category: "Food",
    name: "BBQ Ribs",
    price: 13.99,
    image: "https://example.com/bbq-ribs.jpg",
    description: "Tender ribs with BBQ sauce",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 37,
    category: "Food",
    name: "Fried Chicken",
    price: 10.99,
    image: "https://example.com/fried-chicken.jpg",
    description: "Crispy fried chicken served with sides",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 38,
    category: "Food",
    name: "Vegetable Stir Fry",
    price: 9.49,
    image: "https://example.com/vegetable-stir-fry.jpg",
    description: "Stir-fried vegetables served with rice",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 39,
    category: "Food",
    name: "Pasta Primavera",
    price: 11.49,
    image: "https://example.com/pasta-primavera.jpg",
    description: "Pasta with fresh vegetables and a light sauce",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 40,
    category: "Food",
    name: "Grilled Salmon",
    price: 14.99,
    image: "https://example.com/grilled-salmon.jpg",
    description: "Grilled salmon served with a side of vegetables",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },

  // Dessert
  {
    id: 41,
    category: "Dessert",
    name: "Chocolate Cake",
    price: 5.99,
    image: "https://example.com/chocolate-cake.jpg",
    description: "Rich and moist chocolate cake",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 42,
    category: "Dessert",
    name: "Cheesecake",
    price: 6.99,
    image: "https://example.com/cheesecake.jpg",
    description: "Creamy cheesecake with a graham cracker crust",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 43,
    category: "Dessert",
    name: "Apple Pie",
    price: 4.99,
    image: "https://example.com/apple-pie.jpg",
    description: "Classic apple pie with a flaky crust",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 44,
    category: "Dessert",
    name: "Brownies",
    price: 3.99,
    image: "https://example.com/brownies.jpg",
    description: "Fudgy chocolate brownies",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 45,
    category: "Dessert",
    name: "Ice Cream Sundae",
    price: 5.49,
    image: "https://example.com/ice-cream-sundae.jpg",
    description: "Ice cream sundae with toppings",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 46,
    category: "Dessert",
    name: "Panna Cotta",
    price: 6.49,
    image: "https://example.com/panna-cotta.jpg",
    description: "Creamy panna cotta with fruit sauce",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 47,
    category: "Dessert",
    name: "Creme Brulee",
    price: 6.99,
    image: "https://example.com/creme-brulee.jpg",
    description: "Rich custard with a caramelized sugar top",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 48,
    category: "Dessert",
    name: "Fruit Tart",
    price: 5.99,
    image: "https://hips.hearstapps.com/hmg-prod/images/fruit-tart-index-65ef54d972bb1.jpg?crop=0.502xw:1.00xh;0.463xw,0&resize=1200:*",
    description: "Fresh fruit tart with a pastry crust",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 49,
    category: "Dessert",
    name: "Lemon Meringue Pie",
    price: 5.99,
    image: "https://example.com/lemon-meringue-pie.jpg",
    description: "Lemon pie with a meringue topping",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
  {
    id: 50,
    category: "Dessert",
    name: "Banana Split",
    price: 5.49,
    image: "https://hips.hearstapps.com/hmg-prod/images/banana-split-index-6478e3976e52d.jpg?crop=0.7501754385964912xw:1xh;center,top&resize=1200:*",
    description: "Banana split with ice cream and toppings",

    sizes: ["small", "medium", "large"],
    quantity: { small: 20, medium: 20, large: 20 },
  },
];
// export const cashiers = [
//   { username: "cashier1", password: "password1", name: "Cashier1", role: "Cashier" },
//   { username: "cashier2", password: "password2", name: "Cashier2", role: "Cashier" },
  
// ];
// export const admins = [
//   { username: "admin1", password: "adminpassword1", name: "Admin1", role: "Admin" },
//   { username: "admin2", password: "adminpassword2", name: "Admin2", role: "Admin" },
// ];
// export const stocks = [
//   { password: "12345678", name: "Stock 1", role: "Stock" },
//   { password: "12345678", name: "Stock 2", role: "Stock" },
// ];
