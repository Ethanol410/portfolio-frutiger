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
      { id: '12', name: 'Idées.txt', type: 'file', content: 'Faire un OS en React...' }
    ]
  },
  {
    id: '2',
    name: 'Images',
    type: 'folder',
    children: [
      { id: '21', name: 'Vacances.jpg', type: 'file', content: 'img_url' }
    ]
  }
];