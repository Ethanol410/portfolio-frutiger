export type FileNode = {
  id: string;
  name: string;
  type: 'folder' | 'file' | 'app';
  content?: string; // URL ou texte
  children?: FileNode[];
};

export const myComputer: FileNode[] = [
  {
    id: '1',
    name: 'Documents',
    type: 'folder',
    children: [
      { id: '11', name: 'cv_ethan_collin.pdf', type: 'file', content: '/cv_ethan_collin.pdf' },
    ]
  },
  {
    id: '2',
    name: 'Projets',
    type: 'folder',
    children: [
      { id: '21', name: 'Portfolio OS Frutiger', type: 'app', content: 'https://github.com/Ethanol410/portfolio-frutiger' },
      { id: '22', name: 'Agentix Canvas', type: 'app', content: 'https://github.com/Ethanol410/ProjetWorkshop' },
      { id: '23', name: 'Weight Tracker MVP', type: 'app', content: 'https://github.com/Ethanol410/weight-tracker-mvp' },
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
