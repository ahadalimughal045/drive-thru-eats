-- Database seed script for drive-thru-eats MySQL Database
-- Clear existing data (ensures clean seed)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE `user`;
TRUNCATE TABLE `menu_item`;
TRUNCATE TABLE `menu_category`;
TRUNCATE TABLE `table`;
TRUNCATE TABLE `settings`;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Seed Admin User
INSERT INTO `user` (`name`, `email`, `password`, `role`, `createdAt`) 
VALUES ('Admin User', 'admin@drivethru.com', 'admin123', 'admin', NOW());

-- 2. Seed Categories
INSERT INTO `menu_category` (`id`, `name`, `icon`) VALUES ('breakfast', 'BREAKFAST', '🍳');
INSERT INTO `menu_category` (`id`, `name`, `icon`) VALUES ('shawarma', 'SHAWARMA', '🌯');
INSERT INTO `menu_category` (`id`, `name`, `icon`) VALUES ('tandoori', 'TANDOORI CHICKEN', '🍗');
INSERT INTO `menu_category` (`id`, `name`, `icon`) VALUES ('pizza', 'PIZZA', '🍕');
INSERT INTO `menu_category` (`id`, `name`, `icon`) VALUES ('burger', 'BURGER', '🍔');
INSERT INTO `menu_category` (`id`, `name`, `icon`) VALUES ('rolls', 'ROLLS', '🌮');
INSERT INTO `menu_category` (`id`, `name`, `icon`) VALUES ('chicken-meals', 'CHICKEN MEALS', '🍖');
INSERT INTO `menu_category` (`id`, `name`, `icon`) VALUES ('momos', 'MOMOS', '🥟');
INSERT INTO `menu_category` (`id`, `name`, `icon`) VALUES ('sandwich', 'SANDWICH', '🥪');
INSERT INTO `menu_category` (`id`, `name`, `icon`) VALUES ('other', 'OTHER COURSE', '🍜');
INSERT INTO `menu_category` (`id`, `name`, `icon`) VALUES ('combos', 'COMBOS', '🎁');
INSERT INTO `menu_category` (`id`, `name`, `icon`) VALUES ('kids', 'KIDS MENU', '👶');
INSERT INTO `menu_category` (`id`, `name`, `icon`) VALUES ('appetizers', 'APPETIZERS', '☕');
INSERT INTO `menu_category` (`id`, `name`, `icon`) VALUES ('salads', 'SALAD''S', '🥗');
INSERT INTO `menu_category` (`id`, `name`, `icon`) VALUES ('juices', 'JUICES', '🥤');
INSERT INTO `menu_category` (`id`, `name`, `icon`) VALUES ('shakes', 'SHAKES', '🥛');
INSERT INTO `menu_category` (`id`, `name`, `icon`) VALUES ('icecream', 'ICE CREAM / SWEETS', '🍦');
INSERT INTO `menu_category` (`id`, `name`, `icon`) VALUES ('water', 'WATER', '💧');

-- 3. Seed Menu Items
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('39', 'FRENCH FRIES', 99, '', 0, 'img_39.jpg', 'Burger Arena', '', 'BREAKFAST', 'breakfast');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('44', 'PERI PERI FRENCH FRIES', 110, '', 0, 'img_44.jpg', 'Burger Arena', '', 'BREAKFAST', 'breakfast');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('45', 'TOAST NORMAL (2pc)', 20, '', 0, 'img_45.jpg', 'Burger Arena', '', 'BREAKFAST', 'breakfast');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('46', 'BUTTER TOAST (2pc)', 25, '', 0, 'img_46.jpg', 'Burger Arena', '', 'BREAKFAST', 'breakfast');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('47', 'FRIED TOAST (1pc)', 10, '', 0, 'img_47.jpg', 'Burger Arena', '', 'BREAKFAST', 'breakfast');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('48', 'EGG TOAST (1pc)', 25, '', 0, 'img_48.jpg', 'Burger Arena', '', 'BREAKFAST', 'breakfast');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('94', 'Halwa Poori (250 Gm, 2 Poori)', 99, '', 0, 'img_94.jpg', 'Burger Arena', '', 'BREAKFAST', 'breakfast');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('84', 'SHAWARMA', 120, '', 0, 'img_84.jpg', 'Burger Arena', '', 'SHAWARMA', 'shawarma');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('85', 'SHAWARMA LARGE', 200, '', 0, 'img_85.jpg', 'Burger Arena', '', 'SHAWARMA', 'shawarma');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('86', 'ARABIC SHAWARMA SINGLE', 150, '', 0, 'img_86.jpg', 'Burger Arena', '', 'SHAWARMA', 'shawarma');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('87', 'ARABIC SHAWARMA DOUBLE', 250, '', 0, 'img_87.jpg', 'Burger Arena', '', 'SHAWARMA', 'shawarma');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('78', 'TANDOORI CHICKEN 1 PC', 140, '', 0, 'img_78.jpg', 'Burger Arena', '', 'TANDOORI CHICKEN', 'tandoori');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('79', 'TANDOORI CHICKEN HALF', 280, '', 0, 'img_79.jpg', 'Burger Arena', '', 'TANDOORI CHICKEN', 'tandoori');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('80', 'TANDOORI CHICKEN FULL', 560, '', 0, 'img_80.jpg', 'Burger Arena', '', 'TANDOORI CHICKEN', 'tandoori');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('64', 'Chicken Fajita SMALL', 200, '', 0, 'img_64.jpg', 'Burger Arena', '', 'PIZZA', 'pizza');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('65', 'Chicken Fajita MEDIUM', 400, '', 0, 'img_65.jpg', 'Burger Arena', '', 'PIZZA', 'pizza');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('66', 'Chicken Fajita LARGE', 600, '', 0, 'img_66.jpg', 'Burger Arena', '', 'PIZZA', 'pizza');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('67', 'Chicken Super Supreme SMALL', 200, '', 0, 'img_67.jpg', 'Burger Arena', '', 'PIZZA', 'pizza');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('68', 'Chicken Super Supreme MEDIUM', 400, '', 0, 'img_68.jpg', 'Burger Arena', '', 'PIZZA', 'pizza');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('69', 'Chicken Super Supreme LARGE', 600, '', 0, 'img_69.jpg', 'Burger Arena', '', 'PIZZA', 'pizza');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('70', 'Chicken Barbeque SMALL', 210, '', 0, 'img_70.jpg', 'Burger Arena', '', 'PIZZA', 'pizza');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('71', 'Chicken Barbeque MEDIUM', 420, '', 0, 'img_71.jpg', 'Burger Arena', '', 'PIZZA', 'pizza');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('72', 'Chicken Barbeque LARGE', 650, '', 0, 'img_72.jpg', 'Burger Arena', '', 'PIZZA', 'pizza');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('73', 'VEG PIZZA SMALL', 180, '', 0, 'img_73.jpg', 'Burger Arena', '', 'PIZZA', 'pizza');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('74', 'VEG PIZZA MEDIUM', 350, '', 0, 'img_74.jpg', 'Burger Arena', '', 'PIZZA', 'pizza');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('75', 'VEG PIZZA LARGE', 500, '', 0, 'img_75.jpg', 'Burger Arena', '', 'PIZZA', 'pizza');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('5', 'ZINGER BURGER', 100, '', 0, 'img_5.jpg', 'Burger Arena', '', 'BURGER', 'burger');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('6', 'ZINGER KING BURGER', 120, '', 0, 'img_6.jpg', 'Burger Arena', '', 'BURGER', 'burger');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('7', 'MAGICIAN BURGER', 120, '', 0, 'img_7.jpg', 'Burger Arena', '', 'BURGER', 'burger');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('8', 'PERI PERI BURGER', 120, '', 0, 'img_8.jpg', 'Burger Arena', '', 'BURGER', 'burger');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('13', 'CRISPY TWISTER', 99, '', 0, 'img_13.jpg', 'Burger Arena', '', 'ROLLS', 'rolls');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('14', 'MEXICAN TWISTER', 120, '', 0, 'img_14.jpg', 'Burger Arena', '', 'ROLLS', 'rolls');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('15', 'PERI PERI TWISTER', 120, '', 0, 'img_15.jpg', 'Burger Arena', '', 'ROLLS', 'rolls');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('51', 'CHICKEN MAX ROLL', 120, '', 0, 'img_51.jpg', 'Burger Arena', '', 'ROLLS', 'rolls');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('24', 'CHICKEN NUGGETS (8pc)', 199, '', 0, 'img_24.jpg', 'Burger Arena', '', 'CHICKEN MEALS', 'chicken-meals');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('25', 'CHICKEN POPCORN (20pc)', 110, '', 0, 'img_25.jpg', 'Burger Arena', '', 'CHICKEN MEALS', 'chicken-meals');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('26', 'CHICKEN STRIPS (4pc)', 100, '', 0, 'img_26.jpg', 'Burger Arena', '', 'CHICKEN MEALS', 'chicken-meals');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('42', 'CHICKEN LOLIPOP', 199, '', 0, 'img_42.jpg', 'Burger Arena', '', 'CHICKEN MEALS', 'chicken-meals');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('52', 'CHICKEN STRIPS (6pc)', 150, '', 0, 'img_52.jpg', 'Burger Arena', '', 'CHICKEN MEALS', 'chicken-meals');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('53', 'CHICKEN WINGS (4pc)', 100, '', 0, 'img_53.jpg', 'Burger Arena', '', 'CHICKEN MEALS', 'chicken-meals');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('54', 'CHICKEN WINGS (8pc)', 199, '', 0, 'img_54.jpg', 'Burger Arena', '', 'CHICKEN MEALS', 'chicken-meals');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('88', 'CRISPY FRIED CHICKEN 1 PC', 70, '', 0, 'img_88.jpg', 'Burger Arena', '', 'CHICKEN MEALS', 'chicken-meals');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('89', 'CRISPY FRIED CHICKEN 4 PC', 260, '', 0, 'img_89.jpg', 'Burger Arena', '', 'CHICKEN MEALS', 'chicken-meals');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('91', 'CRISPY FRIED CHICKEN 8 PC', 520, '', 0, 'img_91.jpg', 'Burger Arena', '', 'CHICKEN MEALS', 'chicken-meals');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('55', 'STEAM MOMOS (10pc)', 100, '', 0, 'img_55.jpg', 'Burger Arena', '', 'MOMOS', 'momos');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('56', 'FRIED MOMOS (10pc)', 120, '', 0, 'img_56.jpg', 'Burger Arena', '', 'MOMOS', 'momos');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('29', 'CHICKEN SANDWICH', 120, '', 0, 'img_29.jpg', 'Burger Arena', '', 'SANDWICH', 'sandwich');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('30', 'SANDWICH VEG.', 99, '', 0, 'img_30.jpg', 'Burger Arena', '', 'SANDWICH', 'sandwich');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('40', 'VEG. NODDLES', 99, '', 0, 'img_40.jpg', 'Burger Arena', '', 'OTHER COURSE', 'other');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('49', 'CHICKEN BIRYANI', 120, '', 0, 'img_49.jpg', 'Burger Arena', '', 'OTHER COURSE', 'other');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('50', 'VEG. BIRYANI', 100, '', 0, 'img_50.jpg', 'Burger Arena', '', 'OTHER COURSE', 'other');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('60', 'POPCORN', 20, '', 0, 'img_60.jpg', 'Burger Arena', '', 'OTHER COURSE', 'other');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('76', 'FISH STRIPS 5 Pcs', 100, '', 0, 'img_76.jpg', 'Burger Arena', '', 'OTHER COURSE', 'other');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('77', 'FISH CUTLETS -1 PLATE SMALL', 100, '', 0, 'img_77.jpg', 'Burger Arena', '', 'OTHER COURSE', 'other');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('90', 'LOADED FRIES', 149, '', 0, 'img_90.jpg', 'Burger Arena', '', 'OTHER COURSE', 'other');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('16', 'COFFEE SMALL', 20, '', 0, 'img_16.jpg', 'Burger Arena', '', 'APPETIZERS', 'appetizers');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('17', 'COFFEE MEDIUM', 30, '', 0, 'img_17.jpg', 'Burger Arena', '', 'APPETIZERS', 'appetizers');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('18', 'TEA SMALL', 20, '', 0, 'img_18.jpg', 'Burger Arena', '', 'APPETIZERS', 'appetizers');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('19', 'TEA MEDIUM', 30, '', 0, 'img_19.jpg', 'Burger Arena', '', 'APPETIZERS', 'appetizers');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('20', 'LEMON TEA SMALL', 20, '', 0, 'img_20.jpg', 'Burger Arena', '', 'APPETIZERS', 'appetizers');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('21', 'LEMON TEA MEDIUM', 30, '', 0, 'img_21.jpg', 'Burger Arena', '', 'APPETIZERS', 'appetizers');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('22', 'KEHWA KASHMIRI SMALL', 20, '', 0, 'img_22.jpg', 'Burger Arena', '', 'APPETIZERS', 'appetizers');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('23', 'KEHWA KASHMIRI MEDIUM', 40, '', 0, 'img_23.jpg', 'Burger Arena', '', 'APPETIZERS', 'appetizers');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('81', 'HOT CHOCOLATE', 25, '', 0, 'img_81.jpg', 'Burger Arena', '', 'APPETIZERS', 'appetizers');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('82', 'TOMATO SOUP', 25, '', 0, 'img_82.jpg', 'Burger Arena', '', 'APPETIZERS', 'appetizers');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('83', 'BLACK COFFEE', 25, '', 0, 'img_83.jpg', 'Burger Arena', '', 'APPETIZERS', 'appetizers');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('27', 'VEG. SALAD (250gm)', 75, '', 0, 'img_27.jpg', 'Burger Arena', '', 'SALAD''S', 'salads');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('28', 'FRUIT CREAM CHAT (150gm)', 149, '', 0, 'dimg.svg', 'Burger Arena', '', 'SALAD''S', 'salads');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('92', 'Mango Cream (150gm)', 100, '', 0, 'img_92.jpg', 'Burger Arena', '', 'SALAD''S', 'salads');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('1', 'MANGO JUICE', 100, '', 0, 'img_1.jpg', 'Burger Arena', '', 'JUICES', 'juices');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('2', 'ORANGE JUICE', 100, '', 0, 'img_2.jpg', 'Burger Arena', '', 'JUICES', 'juices');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('3', 'PINE APPLE JUICE', 100, '', 0, 'img_3.jpg', 'Burger Arena', '', 'JUICES', 'juices');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('4', 'WATERMELON JUICE', 100, '', 0, 'img_4.jpg', 'Burger Arena', '', 'JUICES', 'juices');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('9', 'MANGO SHAKE', 130, '', 0, 'img_9.jpg', 'Burger Arena', '', 'SHAKES', 'shakes');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('10', 'BANANA SHAKE', 120, '', 0, 'img_10.jpg', 'Burger Arena', '', 'SHAKES', 'shakes');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('11', 'VANILLA SHAKE', 100, '', 0, 'img_11.jpg', 'Burger Arena', '', 'SHAKES', 'shakes');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('12', 'CHOCOLATE SHAKE', 120, '', 0, 'img_12.jpg', 'Burger Arena', '', 'SHAKES', 'shakes');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('93', 'Fruit Falooda (200gm)', 200, '', 0, 'img_93.jpg', 'Burger Arena', '', 'SHAKES', 'shakes');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('31', 'VANILLA SOFTY SMALL', 30, '', 0, 'img_31.jpg', 'Burger Arena', '', 'ICE CREAM / SWEETS', 'icecream');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('32', 'VANILLA SOFTY MEDIUM', 40, '', 0, 'img_32.jpg', 'Burger Arena', '', 'ICE CREAM / SWEETS', 'icecream');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('33', 'STRAWBERRY SOFT SMALL', 30, '', 0, 'img_33.jpg', 'Burger Arena', '', 'ICE CREAM / SWEETS', 'icecream');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('34', 'STRAWBERRY SOFT MEDIUM', 40, '', 0, 'img_34.jpg', 'Burger Arena', '', 'ICE CREAM / SWEETS', 'icecream');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('35', 'BUTTER SCOTCH SOFTY SMALL', 30, '', 0, 'img_35.jpg', 'Burger Arena', '', 'ICE CREAM / SWEETS', 'icecream');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('36', 'BUTTER SCOTCH SOFTY MEDIUM', 40, '', 0, 'img_36.jpg', 'Burger Arena', '', 'ICE CREAM / SWEETS', 'icecream');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('62', 'SMALL WATER BOTTLE', 10, '', 0, 'img_62.jpg', 'Burger Arena', '', 'WATER', 'water');
INSERT INTO `menu_item` (`id`, `name`, `price`, `description`, `discount`, `image`, `restaurant`, `tags`, `categoryName`, `categoryId`) VALUES ('63', 'WATER BOTTLE MEDIUM', 20, '', 0, 'img_63.jpg', 'Burger Arena', '', 'WATER', 'water');

-- 4. Seed Tables
INSERT INTO `table` (`id`, `number`, `seats`, `type`, `status`) VALUES ('t1', 1, 2, 'window', 'available');
INSERT INTO `table` (`id`, `number`, `seats`, `type`, `status`) VALUES ('t2', 2, 2, 'window', 'available');
INSERT INTO `table` (`id`, `number`, `seats`, `type`, `status`) VALUES ('t3', 3, 2, 'window', 'available');
INSERT INTO `table` (`id`, `number`, `seats`, `type`, `status`) VALUES ('t4', 4, 2, 'window', 'available');
INSERT INTO `table` (`id`, `number`, `seats`, `type`, `status`) VALUES ('t5', 5, 4, 'regular', 'available');
INSERT INTO `table` (`id`, `number`, `seats`, `type`, `status`) VALUES ('t6', 6, 4, 'regular', 'available');
INSERT INTO `table` (`id`, `number`, `seats`, `type`, `status`) VALUES ('t7', 7, 4, 'regular', 'available');
INSERT INTO `table` (`id`, `number`, `seats`, `type`, `status`) VALUES ('t8', 8, 4, 'regular', 'available');
INSERT INTO `table` (`id`, `number`, `seats`, `type`, `status`) VALUES ('t9', 9, 6, 'vip', 'available');
INSERT INTO `table` (`id`, `number`, `seats`, `type`, `status`) VALUES ('t10', 10, 6, 'vip', 'available');
INSERT INTO `table` (`id`, `number`, `seats`, `type`, `status`) VALUES ('t11', 11, 6, 'vip', 'available');
INSERT INTO `table` (`id`, `number`, `seats`, `type`, `status`) VALUES ('t12', 12, 6, 'vip', 'available');

-- 5. Seed Settings
INSERT INTO `settings` (`id`, `isOpen`, `mode`, `openTime`, `closeTime`) VALUES ('restaurant_config', 1, 'auto', '09:00', '22:00');
