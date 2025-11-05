export interface Sport {
  name: string;
  description: string;
  image: string;
  socialLink: string;
}

export const sports: Sport[] = [
  {
    name: 'Basketbal',
    description: 'Dunk als een baas en scoor driepunters!',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png',
    socialLink: 'https://chat.whatsapp.com/BasketbalGroupID',
  },
  {
    name: 'Yoga',
    description: 'Word zo flexibel als een kat en vind je innerlijke rust.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Yoga_asanas.jpg',
    socialLink: 'https://chat.whatsapp.com/YogaGroupID',
  },
  {
    name: 'Padel',
    description: 'Sla, smash en win op de padelbaan!',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Padel_court.jpg',
    socialLink: 'https://chat.whatsapp.com/PadelGroupID',
  },
  {
    name: 'Boulderen',
    description: 'Klim als een ninja over de bouldermuren.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Bouldering_competition.jpg',
    socialLink: 'https://chat.whatsapp.com/BoulderenGroupID',
  },
  {
    name: 'Klimmen',
    description: 'Bereik nieuwe hoogtes en hang als een aap aan de rotsen.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Climbing_in_Sicily.jpg',
    socialLink: 'https://chat.whatsapp.com/KlimmenGroupID',
  },
  {
    name: 'Wakeboarden',
    description: 'Scheur over het water en maak vette sprongen!',
    image: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Wakeboarding_on_the_Lake.jpg',
    socialLink: 'https://chat.whatsapp.com/WakeboardenGroupID',
  }
];