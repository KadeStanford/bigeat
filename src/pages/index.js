import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import React, { useState } from "react";
import Map from "./map.js";

const inter = Inter({ subsets: ["latin"] });

const menuItems = [
  {
    name: "The Big Eater",
    category: "Burgers",
    description:
      "A colossal burger with double patties, loaded with cheese, bacon, lettuce, tomato, pickles, and special sauce",
    price: "$16.99",
  },
  {
    name: "Giant Slice",
    category: "Pizza",
    description:
      "A massive slice of pizza with your choice of five toppings, served on a platter",
    price: "$14.99",
  },
  {
    name: "Mega Fries",
    category: "Appetizers",
    description:
      "A mountain of crispy fries served in a bucket, perfect for sharing",
    price: "$8.99",
  },
  {
    name: "Enormous Salad",
    category: "Salads",
    description:
      "A garden salad packed with fresh greens, cherry tomatoes, cucumbers, carrots, and your choice of dressing",
    price: "$12.99",
  },
  {
    name: "Jumbo Sundae",
    category: "Desserts",
    description:
      "A gigantic bowl of ice cream with a variety of toppings, whipped cream, and a cherry on top",
    price: "$10.99",
  },
  {
    name: "The Beast",
    category: "Steaks",
    description:
      "A massive steak cooked to perfection, served with a side of giant mashed potatoes and grilled vegetables",
    price: "$29.99",
  },
  {
    name: "Colossal Nachos",
    category: "Appetizers",
    description:
      "A tower of tortilla chips smothered in melted cheese, salsa, guacamole, sour cream, and jalapenos",
    price: "$16.99",
  },
  {
    name: "The Whopper",
    category: "Sandwiches",
    description:
      "A humongous sandwich filled with layers of roast beef, turkey, ham, Swiss cheese, lettuce, tomato, and mayo",
    price: "$15.99",
  },
  {
    name: "Gargantuan Pasta",
    category: "Pasta",
    description:
      "A gigantic plate of pasta with your choice of meat or marinara sauce, served with garlic bread",
    price: "$13.99",
  },
  {
    name: "Monster Burrito",
    category: "Mexican",
    description:
      "A massive burrito filled with your choice of meat, rice, beans, cheese, lettuce, salsa, and sour cream",
    price: "$11.99",
  },
  {
    name: "The Titan",
    category: "Hot Dogs",
    description:
      "An enormous hot dog topped with chili, cheese, onions, and relish, served with a side of giant onion rings",
    price: "$12.99",
  },
  {
    name: "Huge Pancakes",
    category: "Breakfast",
    description:
      "A stack of oversized pancakes served with butter, syrup, and your choice of bacon or sausage",
    price: "$9.99",
  },
  {
    name: "Goliath Wings",
    category: "Appetizers",
    description:
      "A platter of jumbo chicken wings coated in your choice of sauce, served with celery and blue cheese dip",
    price: "$13.99",
  },
  {
    name: "The Grand Slam",
    category: "Breakfast",
    description:
      "A massive breakfast platter with eggs, bacon, sausage, hash browns, toast, and pancakes",
    price: "$14.99",
  },
  {
    name: "Mammoth Sushi Roll",
    category: "Sushi",
    description:
      "An oversized sushi roll filled with a variety of fresh fish, avocado, cucumber, and soy sauce",
    price: "$18.99",
  },
  {
    name: "The Giant Quesadilla",
    category: "Mexican",
    description:
      "A huge quesadilla filled with melted cheese, grilled chicken or steak, peppers, onions, and sour cream",
    price: "$16.99",
  },
  {
    name: "King-size Ribs",
    category: "BBQ",
    description:
      "A full rack of tender and succulent BBQ ribs served with coleslaw and cornbread",
    price: "$22.99",
  },
  {
    name: "Mega Taco Platter",
    category: "Mexican",
    description:
      "A platter of oversized tacos filled with your choice of meat, cheese, lettuce, tomato, and salsa",
    price: "$17.99",
  },
  {
    name: "The Big Catch",
    category: "Seafood",
    description:
      "A massive seafood platter with fried fish, shrimp, calamari, and a side of giant onion rings",
    price: "$19.99",
  },
  {
    name: "Colossal Caesar",
    category: "Salads",
    description:
      "A giant Caesar salad with fresh romaine lettuce, croutons, Parmesan cheese, and Caesar dressing",
    price: "$10.99",
  },
  {
    name: "Hulk Shake",
    category: "Beverages",
    description:
      "A towering milkshake with multiple flavors, whipped cream, sprinkles, and a giant cookie on top",
    price: "$8.99",
  },
  {
    name: "The Big Dipper",
    category: "Appetizers",
    description:
      "An oversized platter of assorted dipping sauces, perfect for sharing with friends",
    price: "$6.99",
  },
  {
    name: "Jumbo Sausage",
    category: "Sandwiches",
    description:
      "A foot-long sausage served on a giant bun with your choice of toppings and condiments",
    price: "$11.99",
  },
  {
    name: "The Mega Wrap",
    category: "Wraps",
    description:
      "A massive wrap filled with grilled chicken or veggies, lettuce, tomato, cheese, and dressing",
    price: "$13.99",
  },
  {
    name: "The Towering Pancake",
    category: "Breakfast",
    description:
      "A single giant pancake the size of a dinner plate, served with syrup and your choice of fruit",
    price: "$7.99",
  },
];
export default function Home() {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 5000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  const [homeContent, setHomeContent] = useState(true);
  const [menuContent, setMenuContent] = useState(false);
  const [aboutContent, setAboutContent] = useState(false);

  const handleHomeClick = () => {
    setHomeContent(true);
    setMenuContent(false);
    setAboutContent(false);
  };

  const handleMenuClick = () => {
    setHomeContent(false);
    setMenuContent(true);
    setAboutContent(false);
  };

  const handleAboutClick = () => {
    setHomeContent(false);
    setMenuContent(false);
    setAboutContent(true);
  };

  // Grouping menu items by category
  const groupedMenuItems = menuItems.reduce((acc, menuItem) => {
    if (!acc[menuItem.category]) {
      acc[menuItem.category] = [];
    }
    acc[menuItem.category].push(menuItem);
    return acc;
  }, {});

  return (
    <>
      <Head>
        <title>Big Eats Restaurant</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.sideBar}>
          <Image src="/logo.png" alt="Big Eats" width={200} height={200} />
          <h1 className={styles.name}>Big Eats</h1>
          <div className={styles.buttonBox}>
            <button className={styles.button} onClick={handleHomeClick}>
              Home
            </button>
            <button className={styles.button} onClick={handleMenuClick}>
              Menu
            </button>
            <button className={styles.button} onClick={handleAboutClick}>
              About Us
            </button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.topBar}>
            <h1 className={styles.title}>Welcome to Big Eats</h1>
            <h2 className={styles.subtitle}>
              The home of larger-than-life food
            </h2>
          </div>
          <div
            ref={sliderRef}
            className="keen-slider"
            style={{ maxHeight: "150px", minHeight: "150px", zIndex: "-1" }}
          >
            <div
              className="keen-slider__slide number-slide1"
              style={{
                width: "100%",
                borderRadius: "5px",
                objectFit: "cover",
              }}
            >
              <img
                src="/mexicanbanner.jpg"
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  objectFit: "cover",
                }}
              ></img>
            </div>
            <div
              className="keen-slider__slide number-slide1"
              style={{
                width: "100%",
                borderRadius: "5px",
                objectFit: "cover",
              }}
            >
              <img
                src="/newasaia.jpg"
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  objectFit: "fill",
                }}
              ></img>
            </div>
            <div
              className="keen-slider__slide number-slide1"
              style={{
                width: "100%",
                borderRadius: "5px",
                objectFit: "fill",
              }}
            >
              <img
                src="newpizzabanner.jpg"
                style={{
                  width: "100%",
                  borderRadius: "5px",
                  objectFit: "fill",
                }}
              ></img>
            </div>
          </div>
          {homeContent && (
            <div className={styles.homeContent}>
              <Map
                className={styles.map}
                address="1600 Amphitheatre Parkway, Mountain View, CA"
              />
              <div className={styles.descBox}>
                Welcome to Big Eats, the home of larger-than-life dining
                experiences in Townville. <br></br>
                <br></br>Discover our menu of mouthwatering dishes that are
                guaranteed to satisfy your appetite. From towering burgers to
                gigantic desserts, we serve up colossal portions that will leave
                you in awe.
                <br></br>
                <br></br> Come and experience the sensation of Big Eats, the
                ultimate destination for food enthusiasts seeking a taste
                adventure like no other.
              </div>
            </div>
          )}
          {menuContent && (
            <div className={styles.menuContent}>
              {/* Add filter options here */}
              {/* Display menu items grouped by category */}
              {Object.entries(groupedMenuItems).map(([category, items]) => (
                <div style={{ width: "100%" }} key={category}>
                  <h2>{category}</h2>
                  {items.map((item, index) => (
                    <div key={index} className={styles.menuItem}>
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                      <p>{item.price}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
          {aboutContent && (
            <div className={styles.aboutContent}>
              {/* Placeholder for about content */}
              <div className={styles.aboutBox}>
                <h2 className={styles.aboutTitle}>About Us</h2>
                <p className={styles.aboutOwners}>
                  Big Eats was founded in 2021 by two friends, John and Jane.
                  <br></br>
                  <br></br>
                  John and Jane met at university, where they bonded over their
                  love of food. They both had a passion for cooking and wanted
                  to share their creations with the world. <br></br>
                  <br></br>
                  After graduating, they decided to open a restaurant together.
                  They wanted to create a place where people could enjoy
                  delicious food in a fun and relaxed atmosphere. <br></br>
                  <br></br>
                  They came up with the idea of Big Eats, a restaurant that
                  serves up larger-than-life dishes that are guaranteed to
                  satisfy your appetite. <br></br>
                  <br></br>
                  John and Jane are passionate about food and are always looking
                  for new ways to create exciting dishes. They hope that you
                  enjoy their creations as much as they do!
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
