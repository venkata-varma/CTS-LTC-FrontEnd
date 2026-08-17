import standard20Image from "../../assets/loadstuffingcalculator/containerImages/20standard.svg";
import openTop20Image from "../../assets/loadstuffingcalculator/containerImages/20opentop.svg";
import highCube40Image from "../../assets/loadstuffingcalculator/containerImages/40highcube.svg";
import standard40Image from "../../assets/loadstuffingcalculator/containerImages/40standard.svg";
import highCube45Image from "../../assets/loadstuffingcalculator/containerImages/45highcube.svg";
import customContainerImage from "../../assets/loadstuffingcalculator/containerImages/customContainer.svg";
import openTop40Image from "../../assets/loadstuffingcalculator/containerImages/40opentop.svg";

export const containerTypes = [
  {
  id: "20-standard",
  name: "20' Standard",
  image: standard20Image,
  isCustom: false,

  specifications: [
    {
      label: "Inside Length",
      value: "5.895 m",
    },
    {
      label: "Inside Width",
      value: "2.350 m",
    },
    {
      label: "Inside Height",
      value: "2.392 m",
    },
    {
      label: "Door Width",
      value: "2.340 m",
    },
    {
      label: "Door Height",
      value: "2.292 m",
    },
    {
      label: "Capacity",
      value: "33 m³",
    },
    {
      label: "Tare Weight",
      value: "2230 kg",
    },
    {
      label: "Max Weight",
      value: "28230 kg",
    },
  ],

  description: [
    "Standard containers are also known as general purpose containers.",

    "They are closed containers, meaning they are enclosed on all sides.",

    "Common variants include containers with doors at one or both ends, containers with full-length side doors, and containers with additional side access depending on operational requirements.",

    "Different standard containers vary in dimensions and weight, providing options for a wide range of cargo types.",

    "The most widely used sizes are 20' and 40'. Smaller containers are uncommon today, while longer containers such as 45' are becoming increasingly popular.",
  ],
},
{
  id: "40-standard",
  name: "40' Standard",
  image: standard40Image,
  isCustom: false,

  specifications: [
    {
      label: "Inside Length",
      value: "12.029 m",
    },
    {
      label: "Inside Width",
      value: "2.350 m",
    },
    {
      label: "Inside Height",
      value: "2.392 m",
    },
    {
      label: "Door Width",
      value: "2.340 m",
    },
    {
      label: "Door Height",
      value: "2.292 m",
    },
    {
      label: "Capacity",
      value: "67 m³",
    },
    {
      label: "Tare Weight",
      value: "3780 kg",
    },
    {
      label: "Max Weight",
      value: "26700 kg",
    },
  ],

  description: [
    "Standard containers are also known as general purpose containers.",

    "They are closed containers, meaning they are enclosed on all sides.",

    "Common variants include containers with doors at one or both ends, containers with full-length side doors, and containers with additional side access depending on operational requirements.",

    "Different standard containers vary in dimensions and weight, providing options for a wide range of cargo types.",

    "The most widely used sizes are 20' and 40'. Smaller containers are uncommon today, while longer containers such as 45' are becoming increasingly popular.",
  ],
},
 {
  id: "40-high-cube",
  name: "40' High-Cube",
  image: highCube40Image,
  isCustom: false,

  specifications: [
    {
      label: "Inside Length",
      value: "12.024 m",
    },
    {
      label: "Inside Width",
      value: "2.350 m",
    },
    {
      label: "Inside Height",
      value: "2.697 m",
    },
    {
      label: "Door Width",
      value: "2.340 m",
    },
    {
      label: "Door Height",
      value: "2.597 m",
    },
    {
      label: "Capacity",
      value: "76 m³",
    },
    {
      label: "Tare Weight",
      value: "4020 kg",
    },
    {
      label: "Max Weight",
      value: "26460 kg",
    },
  ],

  description: [
    "High-cube containers are similar in structure to standard containers but provide additional internal height.",

    "Unlike standard containers with a maximum height of 2.591 m (8'6\"), high-cube containers are 2.896 m (9'6\") tall, making them ideal for taller cargo.",

    "Most high-cube containers are 40' long, although 45' high-cube containers are also commonly available.",

    "Several lashing rings capable of securing loads up to 1000 kg are fitted to the front top end rail, bottom cross member, and corner posts.",

    "Many 40' high-cube containers include a recessed floor at the front to fit gooseneck chassis, allowing the container to sit lower while maintaining greater internal height.",
  ],
},
  {
  id: "45-high-cube",
  name: "45' High-Cube",
  image: highCube45Image,
  isCustom: false,

  specifications: [
    {
      label: "Inside Length",
      value: "13.556 m",
    },
    {
      label: "Inside Width",
      value: "2.352 m",
    },
    {
      label: "Inside Height",
      value: "2.700 m",
    },
    {
      label: "Door Width",
      value: "2.340 m",
    },
    {
      label: "Door Height",
      value: "2.597 m",
    },
    {
      label: "Capacity",
      value: "86 m³",
    },
    {
      label: "Tare Weight",
      value: "4800 kg",
    },
    {
      label: "Max Weight",
      value: "27700 kg",
    },
  ],

  description: [
    "High-cube containers are similar in structure to standard containers but provide additional internal height.",

    "Unlike standard containers with a maximum height of 2.591 m (8'6\"), high-cube containers are 2.896 m (9'6\") tall, making them ideal for taller cargo.",

    "Most high-cube containers are 40' long, although 45' high-cube containers are also commonly available.",

    "Several lashing rings capable of securing loads up to 1000 kg are fitted to the front top end rail, bottom cross member, and corner posts.",

    "Many high-cube containers include a recessed floor at the front to fit gooseneck chassis, allowing the container to sit lower while maintaining greater internal height.",
  ],
},
 {
  id: "20-open-top",
  name: "20' Open Top",
  image: openTop20Image,
  isCustom: false,

  specifications: [
    {
      label: "Inside Length",
      value: "5.888 m",
    },
    {
      label: "Inside Width",
      value: "2.345 m",
    },
    {
      label: "Inside Height",
      value: "2.315 m",
    },
    {
      label: "Door Width",
      value: "2.286 m",
    },
    {
      label: "Door Height",
      value: "2.184 m",
    },
    {
      label: "Capacity",
      value: "32 m³",
    },
    {
      label: "Tare Weight",
      value: "2250 kg",
    },
    {
      label: "Max Weight",
      value: "30480 kg",
    },
  ],

  description: [
    "Open-top containers are generally constructed with corrugated steel walls and a wooden floor.",

    "Their roof consists of removable roof bows covered by a removable tarpaulin. The door header can also be swung outward, making loading and unloading much easier.",

    "These features allow cargo to be loaded from above using cranes or through the doors when the roof is removed, making open-top containers ideal for oversized or difficult-to-handle cargo.",

    "The removable roof bows are not only used to support the tarpaulin but also contribute to the structural stability of the container. For cargo that exceeds the container height, flatracks are often a more suitable choice.",

    "Lashing rings are fitted to the upper and lower side rails as well as the corner posts. Each ring is designed to secure cargo with loads of up to 1,000 kg.",
  ],
},
  {
  id: "40-open-top",
  name: "40' Open Top",
  image: openTop40Image,
  isCustom: false,

  specifications: [
    {
      label: "Inside Length",
      value: "12.029 m",
    },
    {
      label: "Inside Width",
      value: "2.342 m",
    },
    {
      label: "Inside Height",
      value: "2.326 m",
    },
    {
      label: "Door Width",
      value: "2.341 m",
    },
    {
      label: "Door Height",
      value: "2.274 m",
    },
    {
      label: "Capacity",
      value: "65 m³",
    },
    {
      label: "Tare Weight",
      value: "3810 kg",
    },
    {
      label: "Max Weight",
      value: "26670 kg",
    },
  ],

  description: [
    "Open-top containers are generally constructed with corrugated steel walls and a wooden floor.",

    "Their roof consists of removable roof bows covered by a removable tarpaulin. The door header can also be swung outward, making loading and unloading much easier.",

    "These features allow cargo to be loaded from above using cranes or through the doors when the roof is removed, making open-top containers ideal for oversized or difficult-to-handle cargo.",

    "The removable roof bows are not only used to support the tarpaulin but also contribute to the structural stability of the container. For cargo that exceeds the container height, flatracks are often a more suitable choice.",

    "Lashing rings are fitted to the upper and lower side rails as well as the corner posts. Each ring is designed to secure cargo with loads of up to 1,000 kg.",
  ],
},
 {
  id: "custom-container",
  name: "Custom Container",
  image: customContainerImage,
  isCustom: true,

  specifications: [
    {
      label: "Inside Length",
      value: "5.895 m",
    },
    {
      label: "Inside Width",
      value: "2.350 m",
    },
    {
      label: "Inside Height",
      value: "2.392 m",
    },
    {
      label: "Door Width",
      value: "2.340 m",
    },
    {
      label: "Door Height",
      value: "2.292 m",
    },
    {
      label: "Capacity",
      value: "33 m³",
    },
    {
      label: "Tare Weight",
      value: "2230 kg",
    },
    {
      label: "Max Weight",
      value: "28230 kg",
    },
  ],

  description: [
    "Create a custom container by entering your own dimensions and weight limits.",

    "This option is useful when your container specifications differ from the predefined container types or when working with specialized equipment.",

    "All dimensions, capacity, tare weight, and maximum weight can be modified after selecting this container.",
  ],
},
];