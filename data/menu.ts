export interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  restaurant: string;
  category: string;
  categoryId: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  {
    "id": "breakfast",
    "name": "BREAKFAST",
    "icon": "🍳"
  },
  {
    "id": "shawarma",
    "name": "SHAWARMA",
    "icon": "🌯"
  },
  {
    "id": "tandoori",
    "name": "TANDOORI CHICKEN",
    "icon": "🍗"
  },
  {
    "id": "pizza",
    "name": "PIZZA",
    "icon": "🍕"
  },
  {
    "id": "burger",
    "name": "BURGER",
    "icon": "🍔"
  },
  {
    "id": "rolls",
    "name": "ROLLS",
    "icon": "🌮"
  },
  {
    "id": "chicken-meals",
    "name": "CHICKEN MEALS",
    "icon": "🍖"
  },
  {
    "id": "momos",
    "name": "MOMOS",
    "icon": "🥟"
  },
  {
    "id": "sandwich",
    "name": "SANDWICH",
    "icon": "🥪"
  },
  {
    "id": "other",
    "name": "OTHER COURSE",
    "icon": "🍜"
  },
  {
    "id": "combos",
    "name": "COMBOS",
    "icon": "🎁"
  },
  {
    "id": "kids",
    "name": "KIDS MENU",
    "icon": "👶"
  },
  {
    "id": "appetizers",
    "name": "APPETIZERS",
    "icon": "☕"
  },
  {
    "id": "salads",
    "name": "SALAD'S",
    "icon": "🥗"
  },
  {
    "id": "juices",
    "name": "JUICES",
    "icon": "🥤"
  },
  {
    "id": "shakes",
    "name": "SHAKES",
    "icon": "🥛"
  },
  {
    "id": "icecream",
    "name": "ICE CREAM / SWEETS",
    "icon": "🍦"
  },
  {
    "id": "water",
    "name": "WATER",
    "icon": "💧"
  }
];

export const menuItems: MenuItem[] = [
  {
    "id": 39,
    "name": "FRENCH FRIES",
    "price": 99,
    "image": "img_39.jpg",
    "restaurant": "Burger Arena",
    "category": "BREAKFAST",
    "categoryId": "breakfast"
  },
  {
    "id": 44,
    "name": "PERI PERI FRENCH FRIES",
    "price": 110,
    "image": "img_44.jpg",
    "restaurant": "Burger Arena",
    "category": "BREAKFAST",
    "categoryId": "breakfast"
  },
  {
    "id": 45,
    "name": "TOAST NORMAL (2pc)",
    "price": 20,
    "image": "img_45.jpg",
    "restaurant": "Burger Arena",
    "category": "BREAKFAST",
    "categoryId": "breakfast"
  },
  {
    "id": 46,
    "name": "BUTTER TOAST (2pc)",
    "price": 25,
    "image": "img_46.jpg",
    "restaurant": "Burger Arena",
    "category": "BREAKFAST",
    "categoryId": "breakfast"
  },
  {
    "id": 47,
    "name": "FRIED TOAST (1pc)",
    "price": 10,
    "image": "img_47.jpg",
    "restaurant": "Burger Arena",
    "category": "BREAKFAST",
    "categoryId": "breakfast"
  },
  {
    "id": 48,
    "name": "EGG TOAST (1pc)",
    "price": 25,
    "image": "img_48.jpg",
    "restaurant": "Burger Arena",
    "category": "BREAKFAST",
    "categoryId": "breakfast"
  },
  {
    "id": 94,
    "name": "Halwa Poori (250 Gm, 2 Poori)",
    "price": 99,
    "image": "img_94.jpg",
    "restaurant": "Burger Arena",
    "category": "BREAKFAST",
    "categoryId": "breakfast"
  },
  {
    "id": 84,
    "name": "SHAWARMA",
    "price": 120,
    "image": "img_84.jpg",
    "restaurant": "Burger Arena",
    "category": "SHAWARMA",
    "categoryId": "shawarma"
  },
  {
    "id": 85,
    "name": "SHAWARMA LARGE",
    "price": 200,
    "image": "img_85.jpg",
    "restaurant": "Burger Arena",
    "category": "SHAWARMA",
    "categoryId": "shawarma"
  },
  {
    "id": 86,
    "name": "ARABIC SHAWARMA SINGLE",
    "price": 150,
    "image": "img_86.jpg",
    "restaurant": "Burger Arena",
    "category": "SHAWARMA",
    "categoryId": "shawarma"
  },
  {
    "id": 87,
    "name": "ARABIC SHAWARMA DOUBLE",
    "price": 250,
    "image": "img_87.jpg",
    "restaurant": "Burger Arena",
    "category": "SHAWARMA",
    "categoryId": "shawarma"
  },
  {
    "id": 78,
    "name": "TANDOORI CHICKEN 1 PC",
    "price": 140,
    "image": "img_78.jpg",
    "restaurant": "Burger Arena",
    "category": "TANDOORI CHICKEN",
    "categoryId": "tandoori"
  },
  {
    "id": 79,
    "name": "TANDOORI CHICKEN HALF",
    "price": 280,
    "image": "img_79.jpg",
    "restaurant": "Burger Arena",
    "category": "TANDOORI CHICKEN",
    "categoryId": "tandoori"
  },
  {
    "id": 80,
    "name": "TANDOORI CHICKEN FULL",
    "price": 560,
    "image": "img_80.jpg",
    "restaurant": "Burger Arena",
    "category": "TANDOORI CHICKEN",
    "categoryId": "tandoori"
  },
  {
    "id": 64,
    "name": "Chicken Fajita SMALL",
    "price": 200,
    "image": "img_64.jpg",
    "restaurant": "Burger Arena",
    "category": "PIZZA",
    "categoryId": "pizza"
  },
  {
    "id": 65,
    "name": "Chicken Fajita MEDIUM",
    "price": 400,
    "image": "img_65.jpg",
    "restaurant": "Burger Arena",
    "category": "PIZZA",
    "categoryId": "pizza"
  },
  {
    "id": 66,
    "name": "Chicken Fajita LARGE",
    "price": 600,
    "image": "img_66.jpg",
    "restaurant": "Burger Arena",
    "category": "PIZZA",
    "categoryId": "pizza"
  },
  {
    "id": 67,
    "name": "Chicken Super Supreme SMALL",
    "price": 200,
    "image": "img_67.jpg",
    "restaurant": "Burger Arena",
    "category": "PIZZA",
    "categoryId": "pizza"
  },
  {
    "id": 68,
    "name": "Chicken Super Supreme MEDIUM",
    "price": 400,
    "image": "img_68.jpg",
    "restaurant": "Burger Arena",
    "category": "PIZZA",
    "categoryId": "pizza"
  },
  {
    "id": 69,
    "name": "Chicken Super Supreme LARGE",
    "price": 600,
    "image": "img_69.jpg",
    "restaurant": "Burger Arena",
    "category": "PIZZA",
    "categoryId": "pizza"
  },
  {
    "id": 70,
    "name": "Chicken Barbeque SMALL",
    "price": 210,
    "image": "img_70.jpg",
    "restaurant": "Burger Arena",
    "category": "PIZZA",
    "categoryId": "pizza"
  },
  {
    "id": 71,
    "name": "Chicken Barbeque MEDIUM",
    "price": 420,
    "image": "img_71.jpg",
    "restaurant": "Burger Arena",
    "category": "PIZZA",
    "categoryId": "pizza"
  },
  {
    "id": 72,
    "name": "Chicken Barbeque LARGE",
    "price": 650,
    "image": "img_72.jpg",
    "restaurant": "Burger Arena",
    "category": "PIZZA",
    "categoryId": "pizza"
  },
  {
    "id": 73,
    "name": "VEG PIZZA SMALL",
    "price": 180,
    "image": "img_73.jpg",
    "restaurant": "Burger Arena",
    "category": "PIZZA",
    "categoryId": "pizza"
  },
  {
    "id": 74,
    "name": "VEG PIZZA MEDIUM",
    "price": 350,
    "image": "img_74.jpg",
    "restaurant": "Burger Arena",
    "category": "PIZZA",
    "categoryId": "pizza"
  },
  {
    "id": 75,
    "name": "VEG PIZZA LARGE",
    "price": 500,
    "image": "img_75.jpg",
    "restaurant": "Burger Arena",
    "category": "PIZZA",
    "categoryId": "pizza"
  },
  {
    "id": 5,
    "name": "ZINGER BURGER",
    "price": 100,
    "image": "img_5.jpg",
    "restaurant": "Burger Arena",
    "category": "BURGER",
    "categoryId": "burger"
  },
  {
    "id": 6,
    "name": "ZINGER KING BURGER",
    "price": 120,
    "image": "img_6.jpg",
    "restaurant": "Burger Arena",
    "category": "BURGER",
    "categoryId": "burger"
  },
  {
    "id": 7,
    "name": "MAGICIAN BURGER",
    "price": 120,
    "image": "img_7.jpg",
    "restaurant": "Burger Arena",
    "category": "BURGER",
    "categoryId": "burger"
  },
  {
    "id": 8,
    "name": "PERI PERI BURGER",
    "price": 120,
    "image": "img_8.jpg",
    "restaurant": "Burger Arena",
    "category": "BURGER",
    "categoryId": "burger"
  },
  {
    "id": 13,
    "name": "CRISPY TWISTER",
    "price": 99,
    "image": "img_13.jpg",
    "restaurant": "Burger Arena",
    "category": "ROLLS",
    "categoryId": "rolls"
  },
  {
    "id": 14,
    "name": "MEXICAN TWISTER",
    "price": 120,
    "image": "img_14.jpg",
    "restaurant": "Burger Arena",
    "category": "ROLLS",
    "categoryId": "rolls"
  },
  {
    "id": 15,
    "name": "PERI PERI TWISTER",
    "price": 120,
    "image": "img_15.jpg",
    "restaurant": "Burger Arena",
    "category": "ROLLS",
    "categoryId": "rolls"
  },
  {
    "id": 51,
    "name": "CHICKEN MAX ROLL",
    "price": 120,
    "image": "img_51.jpg",
    "restaurant": "Burger Arena",
    "category": "ROLLS",
    "categoryId": "rolls"
  },
  {
    "id": 24,
    "name": "CHICKEN NUGGETS (8pc)",
    "price": 199,
    "image": "img_24.jpg",
    "restaurant": "Burger Arena",
    "category": "CHICKEN MEALS",
    "categoryId": "chicken-meals"
  },
  {
    "id": 25,
    "name": "CHICKEN POPCORN (20pc)",
    "price": 110,
    "image": "img_25.jpg",
    "restaurant": "Burger Arena",
    "category": "CHICKEN MEALS",
    "categoryId": "chicken-meals"
  },
  {
    "id": 26,
    "name": "CHICKEN STRIPS (4pc)",
    "price": 100,
    "image": "img_26.jpg",
    "restaurant": "Burger Arena",
    "category": "CHICKEN MEALS",
    "categoryId": "chicken-meals"
  },
  {
    "id": 42,
    "name": "CHICKEN LOLIPOP",
    "price": 199,
    "image": "img_42.jpg",
    "restaurant": "Burger Arena",
    "category": "CHICKEN MEALS",
    "categoryId": "chicken-meals"
  },
  {
    "id": 52,
    "name": "CHICKEN STRIPS (6pc)",
    "price": 150,
    "image": "img_52.jpg",
    "restaurant": "Burger Arena",
    "category": "CHICKEN MEALS",
    "categoryId": "chicken-meals"
  },
  {
    "id": 53,
    "name": "CHICKEN WINGS (4pc)",
    "price": 100,
    "image": "img_53.jpg",
    "restaurant": "Burger Arena",
    "category": "CHICKEN MEALS",
    "categoryId": "chicken-meals"
  },
  {
    "id": 54,
    "name": "CHICKEN WINGS (8pc)",
    "price": 199,
    "image": "img_54.jpg",
    "restaurant": "Burger Arena",
    "category": "CHICKEN MEALS",
    "categoryId": "chicken-meals"
  },
  {
    "id": 88,
    "name": "CRISPY FRIED CHICKEN 1 PC",
    "price": 70,
    "image": "img_88.jpg",
    "restaurant": "Burger Arena",
    "category": "CHICKEN MEALS",
    "categoryId": "chicken-meals"
  },
  {
    "id": 89,
    "name": "CRISPY FRIED CHICKEN 4 PC",
    "price": 260,
    "image": "img_89.jpg",
    "restaurant": "Burger Arena",
    "category": "CHICKEN MEALS",
    "categoryId": "chicken-meals"
  },
  {
    "id": 91,
    "name": "CRISPY FRIED CHICKEN 8 PC",
    "price": 520,
    "image": "img_91.jpg",
    "restaurant": "Burger Arena",
    "category": "CHICKEN MEALS",
    "categoryId": "chicken-meals"
  },
  {
    "id": 55,
    "name": "STEAM MOMOS (10pc)",
    "price": 100,
    "image": "img_55.jpg",
    "restaurant": "Burger Arena",
    "category": "MOMOS",
    "categoryId": "momos"
  },
  {
    "id": 56,
    "name": "FRIED MOMOS (10pc)",
    "price": 120,
    "image": "img_56.jpg",
    "restaurant": "Burger Arena",
    "category": "MOMOS",
    "categoryId": "momos"
  },
  {
    "id": 29,
    "name": "CHICKEN SANDWICH",
    "price": 120,
    "image": "img_29.jpg",
    "restaurant": "Burger Arena",
    "category": "SANDWICH",
    "categoryId": "sandwich"
  },
  {
    "id": 30,
    "name": "SANDWICH VEG.",
    "price": 99,
    "image": "img_30.jpg",
    "restaurant": "Burger Arena",
    "category": "SANDWICH",
    "categoryId": "sandwich"
  },
  {
    "id": 40,
    "name": "VEG. NODDLES",
    "price": 99,
    "image": "img_40.jpg",
    "restaurant": "Burger Arena",
    "category": "OTHER COURSE",
    "categoryId": "other"
  },
  {
    "id": 49,
    "name": "CHICKEN BIRYANI",
    "price": 120,
    "image": "img_49.jpg",
    "restaurant": "Burger Arena",
    "category": "OTHER COURSE",
    "categoryId": "other"
  },
  {
    "id": 50,
    "name": "VEG. BIRYANI",
    "price": 100,
    "image": "img_50.jpg",
    "restaurant": "Burger Arena",
    "category": "OTHER COURSE",
    "categoryId": "other"
  },
  {
    "id": 60,
    "name": "POPCORN",
    "price": 20,
    "image": "img_60.jpg",
    "restaurant": "Burger Arena",
    "category": "OTHER COURSE",
    "categoryId": "other"
  },
  {
    "id": 76,
    "name": "FISH STRIPS 5 Pcs",
    "price": 100,
    "image": "img_76.jpg",
    "restaurant": "Burger Arena",
    "category": "OTHER COURSE",
    "categoryId": "other"
  },
  {
    "id": 77,
    "name": "FISH CUTLETS -1 PLATE SMALL",
    "price": 100,
    "image": "img_77.jpg",
    "restaurant": "Burger Arena",
    "category": "OTHER COURSE",
    "categoryId": "other"
  },
  {
    "id": 90,
    "name": "LOADED FRIES",
    "price": 149,
    "image": "img_90.jpg",
    "restaurant": "Burger Arena",
    "category": "OTHER COURSE",
    "categoryId": "other"
  },
  {
    "id": 16,
    "name": "COFFEE SMALL",
    "price": 20,
    "image": "img_16.jpg",
    "restaurant": "Burger Arena",
    "category": "APPETIZERS",
    "categoryId": "appetizers"
  },
  {
    "id": 17,
    "name": "COFFEE MEDIUM",
    "price": 30,
    "image": "img_17.jpg",
    "restaurant": "Burger Arena",
    "category": "APPETIZERS",
    "categoryId": "appetizers"
  },
  {
    "id": 18,
    "name": "TEA SMALL",
    "price": 20,
    "image": "img_18.jpg",
    "restaurant": "Burger Arena",
    "category": "APPETIZERS",
    "categoryId": "appetizers"
  },
  {
    "id": 19,
    "name": "TEA MEDIUM",
    "price": 30,
    "image": "img_19.jpg",
    "restaurant": "Burger Arena",
    "category": "APPETIZERS",
    "categoryId": "appetizers"
  },
  {
    "id": 20,
    "name": "LEMON TEA SMALL",
    "price": 20,
    "image": "img_20.jpg",
    "restaurant": "Burger Arena",
    "category": "APPETIZERS",
    "categoryId": "appetizers"
  },
  {
    "id": 21,
    "name": "LEMON TEA MEDIUM",
    "price": 30,
    "image": "img_21.jpg",
    "restaurant": "Burger Arena",
    "category": "APPETIZERS",
    "categoryId": "appetizers"
  },
  {
    "id": 22,
    "name": "KEHWA KASHMIRI SMALL",
    "price": 20,
    "image": "img_22.jpg",
    "restaurant": "Burger Arena",
    "category": "APPETIZERS",
    "categoryId": "appetizers"
  },
  {
    "id": 23,
    "name": "KEHWA KASHMIRI MEDIUM",
    "price": 40,
    "image": "img_23.jpg",
    "restaurant": "Burger Arena",
    "category": "APPETIZERS",
    "categoryId": "appetizers"
  },
  {
    "id": 81,
    "name": "HOT CHOCOLATE",
    "price": 25,
    "image": "img_81.jpg",
    "restaurant": "Burger Arena",
    "category": "APPETIZERS",
    "categoryId": "appetizers"
  },
  {
    "id": 82,
    "name": "TOMATO SOUP",
    "price": 25,
    "image": "img_82.jpg",
    "restaurant": "Burger Arena",
    "category": "APPETIZERS",
    "categoryId": "appetizers"
  },
  {
    "id": 83,
    "name": "BLACK COFFEE",
    "price": 25,
    "image": "img_83.jpg",
    "restaurant": "Burger Arena",
    "category": "APPETIZERS",
    "categoryId": "appetizers"
  },
  {
    "id": 27,
    "name": "VEG. SALAD (250gm)",
    "price": 75,
    "image": "img_27.jpg",
    "restaurant": "Burger Arena",
    "category": "SALAD'S",
    "categoryId": "salads"
  },
  {
    "id": 28,
    "name": "FRUIT CREAM CHAT (150gm)",
    "price": 149,
    "image": "dimg.svg",
    "restaurant": "Burger Arena",
    "category": "SALAD'S",
    "categoryId": "salads"
  },
  {
    "id": 92,
    "name": "Mango Cream (150gm)",
    "price": 100,
    "image": "img_92.jpg",
    "restaurant": "Burger Arena",
    "category": "SALAD'S",
    "categoryId": "salads"
  },
  {
    "id": 1,
    "name": "MANGO JUICE",
    "price": 100,
    "image": "img_1.jpg",
    "restaurant": "Burger Arena",
    "category": "JUICES",
    "categoryId": "juices"
  },
  {
    "id": 2,
    "name": "ORANGE JUICE",
    "price": 100,
    "image": "img_2.jpg",
    "restaurant": "Burger Arena",
    "category": "JUICES",
    "categoryId": "juices"
  },
  {
    "id": 3,
    "name": "PINE APPLE JUICE",
    "price": 100,
    "image": "img_3.jpg",
    "restaurant": "Burger Arena",
    "category": "JUICES",
    "categoryId": "juices"
  },
  {
    "id": 4,
    "name": "WATERMELON JUICE",
    "price": 100,
    "image": "img_4.jpg",
    "restaurant": "Burger Arena",
    "category": "JUICES",
    "categoryId": "juices"
  },
  {
    "id": 9,
    "name": "MANGO SHAKE",
    "price": 130,
    "image": "img_9.jpg",
    "restaurant": "Burger Arena",
    "category": "SHAKES",
    "categoryId": "shakes"
  },
  {
    "id": 10,
    "name": "BANANA SHAKE",
    "price": 120,
    "image": "img_10.jpg",
    "restaurant": "Burger Arena",
    "category": "SHAKES",
    "categoryId": "shakes"
  },
  {
    "id": 11,
    "name": "VANILLA SHAKE",
    "price": 100,
    "image": "img_11.jpg",
    "restaurant": "Burger Arena",
    "category": "SHAKES",
    "categoryId": "shakes"
  },
  {
    "id": 12,
    "name": "CHOCOLATE SHAKE",
    "price": 120,
    "image": "img_12.jpg",
    "restaurant": "Burger Arena",
    "category": "SHAKES",
    "categoryId": "shakes"
  },
  {
    "id": 93,
    "name": "Fruit Falooda (200gm)",
    "price": 200,
    "image": "img_93.jpg",
    "restaurant": "Burger Arena",
    "category": "SHAKES",
    "categoryId": "shakes"
  },
  {
    "id": 31,
    "name": "VANILLA SOFTY SMALL",
    "price": 30,
    "image": "img_31.jpg",
    "restaurant": "Burger Arena",
    "category": "ICE CREAM / SWEETS",
    "categoryId": "icecream"
  },
  {
    "id": 32,
    "name": "VANILLA SOFTY MEDIUM",
    "price": 40,
    "image": "img_32.jpg",
    "restaurant": "Burger Arena",
    "category": "ICE CREAM / SWEETS",
    "categoryId": "icecream"
  },
  {
    "id": 33,
    "name": "STRAWBERRY SOFT SMALL",
    "price": 30,
    "image": "img_33.jpg",
    "restaurant": "Burger Arena",
    "category": "ICE CREAM / SWEETS",
    "categoryId": "icecream"
  },
  {
    "id": 34,
    "name": "STRAWBERRY SOFT MEDIUM",
    "price": 40,
    "image": "img_34.jpg",
    "restaurant": "Burger Arena",
    "category": "ICE CREAM / SWEETS",
    "categoryId": "icecream"
  },
  {
    "id": 35,
    "name": "BUTTER SCOTCH SOFTY SMALL",
    "price": 30,
    "image": "img_35.jpg",
    "restaurant": "Burger Arena",
    "category": "ICE CREAM / SWEETS",
    "categoryId": "icecream"
  },
  {
    "id": 36,
    "name": "BUTTER SCOTCH SOFTY MEDIUM",
    "price": 40,
    "image": "img_36.jpg",
    "restaurant": "Burger Arena",
    "category": "ICE CREAM / SWEETS",
    "categoryId": "icecream"
  },
  {
    "id": 62,
    "name": "SMALL WATER BOTTLE",
    "price": 10,
    "image": "img_62.jpg",
    "restaurant": "Burger Arena",
    "category": "WATER",
    "categoryId": "water"
  },
  {
    "id": 63,
    "name": "WATER BOTTLE MEDIUM",
    "price": 20,
    "image": "img_63.jpg",
    "restaurant": "Burger Arena",
    "category": "WATER",
    "categoryId": "water"
  }
];
