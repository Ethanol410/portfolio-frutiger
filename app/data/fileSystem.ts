export type FileNode = {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'app';
  content?: string; // URL ou texte
  children?: FileNode[];
  icon?: any;
};

export const myComputer: FileNode[] = [
  {
    id: '1',
    name: 'Documents',
    type: 'folder',
    children: [
      { id: '11', name: 'cv.pdf', type: 'file', content: '/cv.pdf' },
      { id: '12', name: 'Lettre_ENSSAT.pdf', type: 'file', content: '/Lettre_de_motivation_ENSSAT_COLLIN_Ethan.pdf' },
      { id: '13', name: 'Lettre_MIAGE.pdf', type: 'file', content: '/Lettre_de_motivation_MIAGE.pdf' },
      { id: '14', name: 'Lettres_de_recommandation.pdf', type: 'file', content: '/lettresRecommandations (1).pdf' },
    ]
  },
  {
    id: '2',
    name: 'Projets',
    type: 'folder',
    children: [
      { id: '21', name: 'Portfolio OS Frutiger', type: 'app', content: 'https://github.com/Ethanol410/portfolio-frutiger' },
      { id: '22', name: 'UI Drift', type: 'app', content: 'https://github.com/Ethanol410/site-drift' },
      { id: '23', name: 'Agentix Canvas', type: 'app', content: 'https://github.com/Ethanol410/ProjetWorkshop' },
      { id: '24', name: 'Weight Tracker MVP', type: 'app', content: 'https://github.com/Ethanol410/weight-tracker-mvp' },
    ]
  },
  {
    id: '3',
    name: 'Musique',
    type: 'folder',
    children: [
      { id: '31', name: 'Modjo — Lady.mp3', type: 'file', content: '/music/modjo-lady.mp3' },
      { id: '32', name: 'Bob Sinclar — World Hold On.mp3', type: 'file', content: '/music/bob-sinclar-world.mp3' },
      { id: '33', name: 'Kendji Girac — Elle m\'a aimé.mp3', type: 'file', content: '/music/kendji-aimer.mp3' },
      { id: '34', name: 'Maitre Gims — Tout Donner.mp3', type: 'file', content: '/music/maitre-gims-tout-donner.mp3' },
    ]
  },
];
