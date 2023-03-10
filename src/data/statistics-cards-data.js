import {
  BanknotesIcon,
  UserPlusIcon,
  UserIcon,
  ChartBarIcon,
  CircleStackIcon,
  CurrencyEuroIcon,
  LifebuoyIcon,
} from "@heroicons/react/24/solid";

export const statisticsCardsData = [
  {
    id: 1,
    color: "yellow",
    icon: CircleStackIcon,
    title: "Gold Reserve",
    value: "0.0",
    footer: {},
    update: true
  },
  {
    id: 2,
    color: "blue",
    icon: CurrencyEuroIcon,
    title: "Bitcoin Reserve",
    value: "0.0",
    footer: {},
    update: true
  },
  {
    id: 3,
    color: "red",
    icon: LifebuoyIcon,
    title: "Natura Token Price",
    value: "0.0",
    footer: {},
    update: false
  },
  {
    id: 4,
    color: "green",
    icon: ChartBarIcon,
    title: "Miscellaneous Reserve",
    value: "0.0",
    footer: {},
    update: true
  },
  {
    id: 5,
    color: "orange",
    icon: CircleStackIcon,
    title: "Other Natura Released",
    value: "0.0",
    footer: {},
    update: true
  },
  {
    id: 6,
    color: "purple",
    icon: CircleStackIcon,
    title: "Staking Rewards Claimed",
    value: "0.0",
    footer: {},
    update: false
  },
];

export default statisticsCardsData;
