export const APPRENTICESHIP = {
  diploma: {
    label:
      "Ingénieur diplômé de l'ENSSAT, spécialité Informatique et Technologies de l'Information",
    rncp: '35781',
    code: '1703260V',
  },
  contract: {
    startDate: '2026-09-07',
    endDate: '2029-09-06',
    durationMonths: 36,
    durationHours: 1800,
  },
  cost: {
    annualTotal: 12000,
    employerShare: 750,
    opcoShare: 11250,
  },
  cfa: {
    name: 'CFAI-DIAFOR',
    address: '7 rue du Bignon, La Prunelle, BP 221, 22192 Plérin Cedex',
    siret: '39048242000028',
    uai: '0221835A',
    contactEmail: 'conventionCFAI@formation-industrie.bzh',
    contactPhone: '02 90 52 03 29',
  },
  school: {
    name: 'ENSSAT',
    parent: 'Université de Rennes',
    address: '6 rue de Kerampont, Technopôle Anticipa, BP 80518, 22300 Lannion',
    siret: '13003051300019',
    uai: '0221982K',
    track: 'IA & Multimédia (IAM)',
    websiteUrl:
      'https://www.enssat.fr/fr_FR/formations/ingenieur-informatique-par-apprentissage',
    wikiUrl:
      'https://wiki.univ-rennes1.fr/enssatformation/doku.php?id=formation:fisa:ta:iai29:chercherunterraindapprentissage',
    contacts: [
      {
        name: 'Laurent LE CALVEZ',
        role: 'Responsable de filière IAI',
        email: 'laurent.le-calvez@enssat.fr',
        phone: '02 96 46 92 10',
      },
      {
        name: 'Anne-Perrine CONSTANTIN',
        role: 'Chargée de mission apprentissage',
        email: 'anne-perrine.constantin@univ-rennes.fr',
        phone: '02 96 46 91 36',
      },
      {
        name: 'Secrétariat IAI',
        role: 'Contact général',
        email: 'secretariat.informatique-apprentissage@enssat.fr',
        phone: '02 96 46 92 10',
      },
    ],
  },
  publicEmployerContact: {
    name: 'Richard DELORME',
    org: 'UIMM Bretagne, Pôle Formation',
    email: 'richard.delorme@formation-industrie.bzh',
    phone: '02 96 74 63 23',
  },
  internationalPeriod: {
    minWeeks: 9,
    recommendedWeeks: 12,
    statuses: ['Mise à disposition', 'Mise en veille du contrat'],
    recommendedTiming:
      "Été A1→A2 ou A2→A3, ou mobilité académique S5 (sept. 2028 → fév. 2029)",
  },
  iamSkills: [
    { label: 'Apprentissage automatique (ML)', level: 'Maîtrise pratique' },
    { label: 'Ingénierie des données', level: 'Maîtrise pratique' },
    { label: "Design de modèles et d'architectures", level: 'Maîtrise pratique' },
    { label: 'MLOps et industrialisation', level: 'Maîtrise pratique' },
    { label: "Traitement de l'audio", level: 'Bases opérationnelles' },
    { label: 'Traitement de la vidéo', level: 'Bases opérationnelles' },
    { label: 'IA symbolique', level: 'Bases opérationnelles' },
  ],
  year1Schedule: [
    { code: 'A0', kind: 'school',  start: '07/09/2026', end: '04/10/2026', label: 'Académique, rentrée' },
    { code: 'E1', kind: 'company', start: '05/10/2026', end: '01/11/2026', label: 'Entreprise, 1er bloc' },
    { code: 'A1', kind: 'school',  start: '02/11/2026', end: '20/12/2026', label: 'Académique' },
    { code: 'E2', kind: 'company', start: '21/12/2026', end: '28/02/2027', label: 'Entreprise, bloc long' },
    { code: 'A2', kind: 'school',  start: '01/03/2027', end: '13/06/2027', label: 'Académique' },
    { code: 'E3', kind: 'company', start: '14/06/2027', end: '05/09/2027', label: 'Entreprise, été projet long' },
  ] as const,
  signatureSteps: [
    'Pôle Formation envoie la convention de formation',
    'Vous saisissez le CERFA sur votre portail OPCO et signez le contrat',
    'CFAI valide et signe le contrat',
    'Vous déposez la convention et le contrat sur le portail OPCO',
    "L'OPCO valide et enregistre auprès de la DGEFP",
  ],
  employerObligations: [
    'DPAE auprès de l\'URSSAF dès le démarrage du contrat',
    "Visite médicale d'embauche dans les 2 mois",
    'Désignation d\'un maître d\'apprentissage (point de contact pédagogique avec le CFA)',
    "Transmission d'une copie du contrat à l'apprenti",
  ],
  documents: [
    { id: 'calendar',     label: 'Calendrier officiel 2026-2029',                file: '/alternance/calendrier-fisa-2026-2029.pdf',   kind: 'pdf'  as const },
    { id: 'notice',       label: 'Notice CFAI 2026 (CERFA pré-rempli)',          file: '/alternance/notice-cfai-2026.pdf',            kind: 'pdf'  as const },
    { id: 'private',      label: 'Fiche de renseignements employeur privé',     file: '/alternance/fiche-renseignements-prive.pdf',  kind: 'pdf'  as const },
    { id: 'public',       label: 'Fiche de renseignements employeur public',    file: '/alternance/fiche-renseignements-public.docx',kind: 'docx' as const },
    { id: 'terrain',      label: "Description du terrain d'apprentissage",       file: '/alternance/fiche-terrain-apprentissage.doc', kind: 'doc'  as const },
    { id: 'international',label: 'Période internationale (mémo ENSSAT)',         file: '/alternance/periode-internationale.pdf',      kind: 'pdf'  as const },
    { id: 'fisa',         label: 'Présentation FISA Informatique ENSSAT',        file: '/alternance/fisa-info-enssat.pdf',            kind: 'pdf'  as const },
    { id: 'process',      label: "Processus de signature, mémo apprenti",        file: '/alternance/processus-signature.pdf',         kind: 'pdf'  as const },
  ],
} as const;

export type ApprenticeshipDoc = (typeof APPRENTICESHIP.documents)[number];
