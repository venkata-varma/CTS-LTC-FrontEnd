import boxIcon from "../../assets/loadstuffingcalculator/productIcons/box.svg";
import bigBagIcon from "../../assets/loadstuffingcalculator/productIcons/bigBag.svg";
import sackIcon from "../../assets/loadstuffingcalculator/productIcons/sack.svg";
import barrelIcon from "../../assets/loadstuffingcalculator/productIcons/barrel.svg";
import rollIcon from "../../assets/loadstuffingcalculator/productIcons/roll.svg";
import pipesIcon from '../../assets/loadstuffingcalculator/productIcons/pipes.jpg'
import bulkIcon from '../../assets/loadstuffingcalculator/productIcons/bulk.jpg'


// --- Preview bar images imports

import boxPreview from "../../assets/loadstuffingcalculator/productPreview/box.svg";
import bigBagPreview from "../../assets/loadstuffingcalculator/productPreview/bigBag.svg";
import sackPreview from "../../assets/loadstuffingcalculator/productPreview/sack.svg";
import barrelPreview from "../../assets/loadstuffingcalculator/productPreview/barrel.svg";
import rollPreview from "../../assets/loadstuffingcalculator/productPreview/roll.svg";



export const productTypes = [
  {
    id: "box",
    name: "Box",
    icon: boxIcon,
    image: boxPreview,
    description: "Regular carton or cardboard box.",
    defaultDimensions: {
      length: "",
      width: "",
      height: "",
      weight: ""
    },
  },
  {
    id: "bigbag",
    name: "Big Bag",
    icon: bigBagIcon,
    image: bigBagPreview,
    description: "Large industrial bulk bag (FIBC).",
    defaultDimensions: {
      length: "",
      width: "",
      height: "",
      weight: ""
    },
  },

  {
    id: "sack",
    name: "Sack",
    icon: sackIcon,
    image: sackPreview,
    description: "Flexible sack used for grains, cement and similar goods.",
    defaultDimensions: {
      length: "",
      width: "",
      height: "",
      weight: ""
    },
  },

  {
    id: "roll",
    name: "Roll",
    icon: rollIcon,
    image: rollPreview,
    description: "Paper, fabric or plastic roll.",
    defaultDimensions: {
      diameter: "",
      height: "",
      weight: ""
    },
  },
  {
    id: "barrel",
    name: "Barrell",
    icon: barrelIcon,
    image: barrelPreview,
    description: "Cylinder type plastic barrel.",
    defaultDimensions: {
      diameter: "",
      width: "",
      weight: ""
    },
  },


];

//   {
//     id: "pipe",
//     name: "Pipe",
//     icon: pipesIcon,
//     image: null,
//     description: "Round pipe or tube. --- Coming soon",
//     defaultDimensions: {
//       length: "",
//       diameter: "",
//       weight: "",
//     },
//   },



//   {
//     id: "bulk",
//     name: "Bulk",
//     icon: bulkIcon,
//     image: null,
//     description: "Gas or pressure cylinder.",
//     defaultDimensions: {
//       diameter: "",
//       height: "",
//       weight: "",
//     },
//   },