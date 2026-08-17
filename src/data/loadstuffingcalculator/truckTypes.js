import tautlinerImage from "../../assets/loadstuffingcalculator/truckImages/tautliner.svg";
import refrigeratedImage from "../../assets/loadstuffingcalculator/truckImages/refrigerated.svg";
import megaTrailerImage from "../../assets/loadstuffingcalculator/truckImages/megaTrailer.svg";
import jumboImage from "../../assets/loadstuffingcalculator/truckImages/jumbo.svg";
import isothermImage from "../../assets/loadstuffingcalculator/truckImages/isotherm.svg";
import customTruckImage from "../../assets/loadstuffingcalculator/truckImages/customTruck.svg";

export const truckTypes = [
  {
    id: "tautliner",
    name: "Tautliner (Curtainsider)",
    image: tautlinerImage,
    isCustom: false,
    specifications: [
      {
        label: "Inside Length",
        value: "13.600 m",
      },
      {
        label: "Inside Width",
        value: "2.500 m",
      },
      {
        label: "Inside Height",
        value: "2.650 m",
      },
      {
        label: "Capacity",
        value: "90 m3",
      },
      {
        label: "Max Weight",
        value: "24500 Kgs",
      },
    ],

    description: [
      "These are similar to the Euroliners, with sliding roofs, sliding curtains and solid rear doors but do not have side gates or sideboards.",
      "The Tautliner has all-round flexibility for loading and unloading from the rear, sides and overhead.",
    ],
    axleLoadSettings: {
      front: {
        maxWeight: {
          value: 200,
          unit: "kg",
        },
        offset: {
          value: 100,
          unit: "mm",
        },
      },

      rear: {
        maxWeight: {
          value: 300,
          unit: "kg",
        },
        offset: {
          value: 100,
          unit: "mm",
        },
      },
    },
  },
  {
    id: "refrigerated",
    name: "Refrigerated Truck",
    image: refrigeratedImage,
    isCustom: false,
    specifications: [
      {
        label: "Inside Length",
        value: "13.600 m",
      },
      {
        label: "Inside Width",
        value: "2.500 m",
      },
      {
        label: "Inside Height",
        value: "2.650 m",
      },
      {
        label: "Capacity",
        value: "90 m3",
      },
      {
        label: "Max Weight",
        value: "24500 Kgs",
      },
    ],

    description: [
      "Semi-trailers equipped with a refrigeration unit provide automatic temperature controls.",
      "Designed for the transportation of goods requiring deep freezing or cooling.",
      "Deep-frozen products, such as carcasses on hooks and fish, are transported at temperatures ranging from -24°C to -12°C.",
      "For the transportation of chilled animal or vegetable products, the -6°C to 0°C temperature mode can be used.",
    ],
    axleLoadSettings: {
      front: {
        maxWeight: {
          value: 200,
          unit: "kg",
        },
        offset: {
          value: 100,
          unit: "mm",
        },
      },

      rear: {
        maxWeight: {
          value: 300,
          unit: "kg",
        },
        offset: {
          value: 100,
          unit: "mm",
        },
      },
    },
  },
  {
    id: "mega-trailer",
    name: "Mega Trailer",
    image: megaTrailerImage,
    isCustom: false,

    specifications: [
      {
        label: "Inside Length",
        value: "13.600 m",
      },
      {
        label: "Inside Width",
        value: "2.470 m",
      },
      {
        label: "Inside Height",
        value: "3.000 m",
      },
      {
        label: "Capacity",
        value: "100 m3",
      },
      {
        label: "Max Weight",
        value: "32800 Kgs",
      },
    ],
    axleLoadSettings: {
      front: {
        maxWeight: {
          value: 200,
          unit: "kg",
        },
        offset: {
          value: 100,
          unit: "mm",
        },
      },

      rear: {
        maxWeight: {
          value: 300,
          unit: "kg",
        },
        offset: {
          value: 100,
          unit: "mm",
        },
      },
    },

    description: [
      "Mega curtainsiders feature a massive 100 m³ cargo capacity.",
      "The increased internal height allows shippers to maximize cargo volume while retaining the advantages of a straight-frame loading bed.",
      "The trailer provides convenient loading and unloading through open side access, rear doors, and a sliding/lifting roof.",
      "It is also equipped with 32 sideboards for improved cargo securing and handling.",
    ],
  },
  {
    id: "jumbo",
    name: "Jumbo Truck",
    image: jumboImage,
    isCustom: false,

    specifications: [
      {
        label: "Inside Length",
        value: "8.000 m",
      },
      {
        label: "Inside Width",
        value: "2.480 m",
      },
      {
        label: "Inside Height",
        value: "2.950 m",
      },
      {
        label: "Capacity",
        value: "120 m3",
      },
      {
        label: "Max Weight",
        value: "23000 Kgs",
      },
    ],
    axleLoadSettings: {
      front: {
        maxWeight: {
          value: 200,
          unit: "kg",
        },
        offset: {
          value: 100,
          unit: "mm",
        },
      },

      rear: {
        maxWeight: {
          value: 300,
          unit: "kg",
        },
        offset: {
          value: 100,
          unit: "mm",
        },
      },
    },
    description: [
      "The term 'Jumbo' refers to a special large type of truck designed to transport high-volume cargo.",
      "Compared to regular trucks, Jumbo trucks offer a significantly larger loading volume.",
      "They are ideal for transporting bulky goods that occupy a large amount of space.",
      "Jumbo trucks are also widely used in the automotive industry due to their approximately 3-meter internal loading height.",
    ],
  },
  {
    id: "isotherm",
    name: "Isotherm Truck",
    image: isothermImage,
    isCustom: false,

    specifications: [
      {
        label: "Inside Length",
        value: "13.360 m",
      },
      {
        label: "Inside Width",
        value: "2.600 m",
      },
      {
        label: "Inside Height",
        value: "2.650 m",
      },
      {
        label: "Capacity",
        value: "92 m3",
      },
      {
        label: "Max Weight",
        value: "22000 Kgs",
      },
    ],
    axleLoadSettings: {
      front: {
        maxWeight: {
          value: 200,
          unit: "kg",
        },
        offset: {
          value: 100,
          unit: "mm",
        },
      },

      rear: {
        maxWeight: {
          value: 300,
          unit: "kg",
        },
        offset: {
          value: 100,
          unit: "mm",
        },
      },
    },
    description: [
      "The cargo compartment of the semi-trailer is thermally insulated but is not equipped with a refrigeration unit.",
      "It is designed for the short-term transportation of perishable goods.",
      "The insulated body helps maintain the desired internal temperature for a limited period without active cooling.",
    ],
  },
  {
    id: "custom-truck",
    name: "Custom Truck",
    image: customTruckImage,
    isCustom: true,

    specifications: [
      {
        label: "Inside Length",
        value: "13.600 m",
      },
      {
        label: "Inside Width",
        value: "2.500 m",
      },
      {
        label: "Inside Height",
        value: "2.650 m",
      },
      {
        label: "Capacity",
        value: "90 m3",
      },
      {
        label: "Max Weight",
        value: "24500 Kgs",
      },
    ],
    axleLoadSettings: {
      front: {
        maxWeight: {
          value: 200,
          unit: "kg",
        },
        offset: {
          value: 100,
          unit: "mm",
        },
      },

      rear: {
        maxWeight: {
          value: 300,
          unit: "kg",
        },
        offset: {
          value: 100,
          unit: "mm",
        },
      },
    },
    description: [
      "Create a custom truck by entering your own dimensions and weight limits.",
      "This option is useful when your vehicle specifications differ from the predefined truck types or when working with specialized transport vehicles.",
      "All dimensions, capacity, and maximum weight can be modified after selecting this truck.",
    ],
  },
];
