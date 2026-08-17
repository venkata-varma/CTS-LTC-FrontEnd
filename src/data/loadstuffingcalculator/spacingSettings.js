import boxesTtlength from "../../assets/loadstuffingcalculator/spacingSettings/box/boxesTtlength.svg";
import boxesTtwidth from "../../assets/loadstuffingcalculator/spacingSettings/box/boxesTtwidth.svg";
import boxesTtheight from "../../assets/loadstuffingcalculator/spacingSettings/box/boxesTtheight.webp";

import bigbagsTtlength from "../../assets/loadstuffingcalculator/spacingSettings/bigBag/bigbagsTtlength.svg";
import bigbagsTtwidth from "../../assets/loadstuffingcalculator/spacingSettings/bigBag/bigbagsTtwidth.svg";

import sacksTtlength from "../../assets/loadstuffingcalculator/spacingSettings/sack/sacksTtlength.svg";
import sacksTtwidth from "../../assets/loadstuffingcalculator/spacingSettings/sack/sacksTtwidth.svg";

import rollsTtLength from "../../assets/loadstuffingcalculator/spacingSettings/roll/rollsTtLength.svg";
import rollSquarePlacement from "../../assets/loadstuffingcalculator/spacingSettings/roll/rollSquarePlacement.svg";
import rollHexagonPlacement from "../../assets/loadstuffingcalculator/spacingSettings/roll/rollHexagonPlacement.svg";

import barrelsTtlength from "../../assets/loadstuffingcalculator/spacingSettings/barrel/barrelsTtlength.svg";
import barrelSquarePlacement from "../../assets/loadstuffingcalculator/spacingSettings/barrel/barrelSquarePlacement.svg";
import barrelHexagon from "../../assets/loadstuffingcalculator/spacingSettings/barrel/barrelHexagon.svg";

export const spacingSettings = {
  box: {
    tiltOptions: [
      {
        id: "tiltToLength",
        label: "Tilt to length",
        image: boxesTtlength,
        disabled: false,
      },
      {
        id: "tiltToWidth",
        label: "Tilt to width",
        image: boxesTtwidth,
        disabled: false,
      },
      {
        id: "tiltToHeight",
        label: "Tilt to height",
        image: boxesTtheight,
        disabled: true,
      },
    ],
    placementOptions: [],
  },

  bigbag: {
    tiltOptions: [
      {
        id: "tiltToLength",
        label: "Tilt to length",
        image: bigbagsTtlength,
        disabled: false,
      },
      {
        id: "tiltToWidth",
        label: "Tilt to width",
        image: bigbagsTtwidth,
        disabled: false,
      },
    ],
    placementOptions: [],
  },

  sack: {
    tiltOptions: [
      {
        id: "tiltToLength",
        label: "Tilt to length",
        image: sacksTtlength,
        disabled: false,
      },
      {
        id: "tiltToWidth",
        label: "Tilt to width",
        image: sacksTtwidth,
        disabled: false,
      },
    ],
    placementOptions: [],
  },

  roll: {
    tiltOptions: [
      {
        id: "tilt",
        label: "Tilt",
        image: rollsTtLength,
        disabled: false,
      },
    ],
    placementTitle: "Roll placement",
    placementOptions: [
      {
        id: "square",
        label: "Square",
        image: rollSquarePlacement,
      },
      {
        id: "hexagon",
        label: "Hexagon",
        image: rollHexagonPlacement,
      },
    ],
  },

  barrel: {
    tiltOptions: [
      {
        id: "tilt",
        label: "Tilt",
        image: barrelsTtlength,
        disabled: false,
      },
    ],
    placementTitle: "Barrel placement",
    placementOptions: [
      {
        id: "square",
        label: "Square",
        image: barrelSquarePlacement,
      },
      {
        id: "hexagon",
        label: "Hexagon",
        image: barrelHexagon,
      },
    ],
  },
};