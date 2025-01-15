import shoe2 from "../assets/images/shoe2.webp";
import shoe3 from "../assets/images/shoe3.webp";
import shoe4 from "../assets/images/shoe4.webp";
import shoe5 from "../assets/images/shoe5.webp";
import shoe6 from "../assets/images/shoe6.webp";
import shoe7 from "../assets/images/moon-walker.jpeg";

import shoe8 from "../assets/images/moon-walker2.jpg";
import shoe9 from "../assets/images/moon-walker3.jpeg";

export const products = [
  {
    id: "0",

    srcset: [shoe2],
    name: "Jordan Retro 13",
    price: 160.0,
    salePrice: 125.0,
    colors: ["#CE9D59", "#646361", "#557CC7"],
    isNew: true,
    category: "shoes",
    type: "Men's",
    sizes: ["7.5", "8.0", "9.0", "9.5", "10.5", "12.0"],
    reviews: [
      {
        stars: 5,
        comment:
          "These shoes fit great. They look better in person. I love them!",
        user: {
          firstName: "Langston",
          lastName: "Reed",
        },
      },
      {
        stars: 3,
        comment:
          "I like the shoes but I got the wrong size and had trouble returning them.",
        user: {
          firstName: "Alex",
          lastName: "Dumphy",
        },
      },
    ],
  },
  {
    id: "1",

    srcset: [shoe3],
    name: "PUMA MB. 03 Toxic",
    price: 115.0,
    salePrice: 0,

    colors: ["rgb(153, 118, 185)", "rgb(247, 60, 85)"],
    isNew: true,
    category: "shoes",
    type: "Women's",

    sizes: ["7.5", "8.5", "9.5", "10.5", "12.0"],
    reviews: [
      {
        stars: 5,
        comment:
          "They look great but they are kind of uncomfortable when I run in them.",
        user: {
          firstName: "Lexi",
          lastName: "Lambert",
        },
      },
      {
        stars: 2,
        comment: "Fantastic. Love the colors and it fits to size",
        user: {
          firstName: "Ashley",
          lastName: "Harris",
        },
      },
    ],
  },

  {
    id: "2",

    srcset: [shoe4],
    name: "Air Jordan 5 Retro SE",
    price: 150.0,
    salePrice: 135.0,
    colors: ["rgb(38,48,74)", "rgba(54, 51, 58, 0.7)", "#CE9D5980"],
    isNew: false,
    category: "shoes",
    type: "Men's",

    sizes: ["7.0", "8.0", "8.5", "9.5", "10.5"],
    reviews: [
      {
        stars: 3,
        comment:
          "I like the look and colors of the shoes but just too uncomfortable.",
        user: {
          firstName: "Max",
          lastName: "Catro",
        },
      },
      {
        stars: 5,
        comment:
          "Love these, got em for my brother and he loved them too. Glad I got them on sale too!",
        user: {
          firstName: "Izzy",
          lastName: "Robinson",
        },
      },
    ],
  },

  {
    id: "3",

    srcset: [shoe5],
    name: "Nike KD 16 NRG",
    price: 150.0,
    salePrice: 135.0,
    colors: ["rgb(235,76,130)", "rgb(54,168,229)", "rgb(249, 185, 52)"],
    isNew: true,
    category: "shoes",
    type: "Women's",
    reviews: [],

    sizes: ["7.5", "8.0", "8.5", "9.0", "9.5"],
  },
  {
    id: "4",
    srcset: [shoe6],
    name: "Nike",
    salePrice: 0,

    price: 100.0,
    colors: ["#CE9D59", "#646361", "#557CC7"],
    isNew: true,
    type: "Men's",
    category: "shoes",
    sizes: ["7.5", "8.0", "8.5", "9.0", "9.5", "10.5"],
    reviews: [],
  },

  {
    id: "5",
    srcset: [shoe9, shoe7, shoe8],
    name: "Moon Walker 3",
    salePrice: 75,
    price: 150,
    colors: ["rgb(193, 30, 47)", "rgb(40,40,40)"],
    isNew: true,
    type: "Men's",
    category: "shoes",
    sizes: ["7.5", "8.0", "9.0", "9.5", "10.5"],
    reviews: [],
  },
];

export const featured = {
  ...products.find((item) => item.name === "Moon Walker 3"),
  description: "Introducing our new, lighter than ever shoes!",
};
