import boxesLayersStuffing from "../../assets/loadstuffingcalculator/stuffingSettings/box/boxesLayersStuffing.svg";
import boxesMassStuffing from "../../assets/loadstuffingcalculator/stuffingSettings/box/boxesMassStuffing.svg";
import boxesHeightStuffing from "../../assets/loadstuffingcalculator/stuffingSettings/box/boxesHeightStuffing.svg";

import bigbagsLayersStuffing from "../../assets/loadstuffingcalculator/stuffingSettings/bigBag/bigbagsLayersStuffing.svg";
import bigbagsMassStuffing from "../../assets/loadstuffingcalculator/stuffingSettings/bigBag/bigbagsMassStuffing.svg";
import bigbagsHeightStuffing from "../../assets/loadstuffingcalculator/stuffingSettings/bigBag/bigbagsHeightStuffing.svg";

import sacksLayersStuffing from "../../assets/loadstuffingcalculator/stuffingSettings/sack/sacksLayersStuffing.svg";
import sacksMassStuffing from "../../assets/loadstuffingcalculator/stuffingSettings/sack/sacksMassStuffing.svg";
import sacksHeightStuffing from "../../assets/loadstuffingcalculator/stuffingSettings/sack/sacksHeightStuffing.svg";

import rollsLayersStuffing from "../../assets/loadstuffingcalculator/stuffingSettings/roll/rollsLayersStuffing.svg";
import rollsMassStuffing from "../../assets/loadstuffingcalculator/stuffingSettings/roll/rollsMassStuffing.svg";
import rollsHeightStuffing from "../../assets/loadstuffingcalculator/stuffingSettings/roll/rollsHeightStuffing.svg";

import barrelsLayersStuffing from "../../assets/loadstuffingcalculator/stuffingSettings/barrel/barrelsLayersStuffing.svg";
import barrelsMassStuffing from "../../assets/loadstuffingcalculator/stuffingSettings/barrel/barrelsMassStuffing.svg";
import barrelsHeightStuffing from "../../assets/loadstuffingcalculator/stuffingSettings/barrel/barrelsHeightStuffing.svg";

export const stuffingSettings = {
  box: [
    {
      id: "layersCount",
      label: "Layers Count",
      image: boxesLayersStuffing,
      unit: "layers",
    },
    {
      id: "mass",
      label: "Mass",
      image: boxesMassStuffing,
      unit: "kg",
    },
    {
      id: "height",
      label: "Height",
      image: boxesHeightStuffing,
      unit: "mm",
    },
  ],

  bigbag: [
    {
      id: "layersCount",
      label: "Layers Count",
      image: bigbagsLayersStuffing,
      unit: "layers",
    },
    {
      id: "mass",
      label: "Mass",
      image: bigbagsMassStuffing,
      unit: "kg",
    },
    {
      id: "height",
      label: "Height",
      image: bigbagsHeightStuffing,
      unit: "mm",
    },
  ],

  sack: [
    {
      id: "layersCount",
      label: "Layers Count",
      image: sacksLayersStuffing,
      unit: "layers",
    },
    {
      id: "mass",
      label: "Mass",
      image: sacksMassStuffing,
      unit: "kg",
    },
    {
      id: "height",
      label: "Height",
      image: sacksHeightStuffing,
      unit: "mm",
    },
  ],

  roll: [
    {
      id: "layersCount",
      label: "Layers Count",
      image: rollsLayersStuffing,
      unit: "layers",
    },
    {
      id: "mass",
      label: "Mass",
      image: rollsMassStuffing,
      unit: "kg",
    },
    {
      id: "height",
      label: "Height",
      image: rollsHeightStuffing,
      unit: "mm",
    },
  ],

  barrel: [
    {
      id: "layersCount",
      label: "Layers Count",
      image: barrelsLayersStuffing,
      unit: "layers",
    },
    {
      id: "mass",
      label: "Mass",
      image: barrelsMassStuffing,
      unit: "kg",
    },
    {
      id: "height",
      label: "Height",
      image: barrelsHeightStuffing,
      unit: "mm",
    },
  ],
};