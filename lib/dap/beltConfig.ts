import { Belt, BeltBandConfig, BeltId, LevelId, ResultVerdict } from './types';

/**
 * BELTS ARE JOB CATEGORIES — they describe the kind of work a person does,
 * not how well they performed. A candidate belongs to exactly one belt.
 */
export const belts: Belt[] = [
{
  id: 'white',
  name: 'White Belt',
  discipline: 'Execution & Delivery',
  description:
  'Ability to translate objectives into results through systematic planning, disciplined execution, and consistent delivery of commitments with appropriate quality standards.',
  swatchClass: 'bg-white border-2 border-gray-400'
},
{
  id: 'yellow',
  name: 'Yellow Belt',
  discipline: 'Analysis & Planning',
  description:
  'Capability to analyze complex situations, identify patterns and trends, anticipate future scenarios, and develop comprehensive plans that drive sustainable outcomes.',
  swatchClass: 'bg-yellow-400 border-2 border-yellow-500'
},
{
  id: 'green',
  name: 'Green Belt',
  discipline: 'Interpersonal & Collaboration',
  description:
  'Ability to build productive relationships, communicate effectively across stakeholder groups, influence outcomes, and collaborate to achieve shared objectives.',
  swatchClass: 'bg-green-600 border-2 border-green-700'
},
{
  id: 'black',
  name: 'Black Belt',
  discipline: 'Leadership & People Development',
  description:
  'Capability to inspire and guide others, develop talent, drive organizational outcomes, and create sustainable performance improvement through influence and direction.',
  swatchClass: 'bg-gray-900 border-2 border-black'
},
{
  id: 'blue',
  name: 'Blue Belt',
  discipline: 'Technical & Domain Depth',
  description:
  'Depth of domain knowledge, skill mastery, and ability to apply specialized expertise to solve problems, drive innovation, and deliver high-quality technical outcomes.',
  swatchClass: 'bg-blue-600 border-2 border-blue-700'
}];


export const getBelt = (id: BeltId): Belt =>
belts.find((b) => b.id === id) ?? belts[0];

/**
 * LEVEL BANDS ARE CONFIGURED PER BELT. The same 80% is not the same verdict
 * for two people in different job categories, so nothing may read these
 * ranges without knowing the belt.
 */
export const beltBandConfigs: BeltBandConfig[] = [
{
  beltId: 'white',
  bands: [
  { id: 'beginner', name: 'Beginner', min: 0, max: 55 },
  { id: 'intermediate', name: 'Intermediate', min: 56, max: 75 },
  { id: 'performer', name: 'Performer', min: 76, max: 87 },
  { id: 'expert', name: 'Expert', min: 88, max: 96 },
  { id: 'bestInClass', name: 'Best In Class', min: 97, max: 100 }]

},
{
  beltId: 'yellow',
  bands: [
  { id: 'beginner', name: 'Beginner', min: 0, max: 50 },
  { id: 'intermediate', name: 'Intermediate', min: 51, max: 70 },
  { id: 'performer', name: 'Performer', min: 71, max: 84 },
  { id: 'expert', name: 'Expert', min: 85, max: 94 },
  { id: 'bestInClass', name: 'Best In Class', min: 95, max: 100 }]

},
{
  beltId: 'green',
  bands: [
  { id: 'beginner', name: 'Beginner', min: 0, max: 52 },
  { id: 'intermediate', name: 'Intermediate', min: 53, max: 72 },
  { id: 'performer', name: 'Performer', min: 73, max: 85 },
  { id: 'expert', name: 'Expert', min: 86, max: 95 },
  { id: 'bestInClass', name: 'Best In Class', min: 96, max: 100 }]

},
{
  beltId: 'black',
  bands: [
  { id: 'beginner', name: 'Beginner', min: 0, max: 60 },
  { id: 'intermediate', name: 'Intermediate', min: 61, max: 78 },
  { id: 'performer', name: 'Performer', min: 79, max: 89 },
  { id: 'expert', name: 'Expert', min: 90, max: 97 },
  { id: 'bestInClass', name: 'Best In Class', min: 98, max: 100 }]

},
{
  beltId: 'blue',
  bands: [
  { id: 'beginner', name: 'Beginner', min: 0, max: 58 },
  { id: 'intermediate', name: 'Intermediate', min: 59, max: 76 },
  { id: 'performer', name: 'Performer', min: 77, max: 88 },
  { id: 'expert', name: 'Expert', min: 89, max: 96 },
  { id: 'bestInClass', name: 'Best In Class', min: 97, max: 100 }]

}];


/**
 * RESULT VERDICTS map one-to-one to levels, reusing the exact comment wording
 * already written into the DAP so the summary table and the section detail can
 * never disagree.
 */
export const resultVerdicts: ResultVerdict[] = [
{
  levelId: 'beginner',
  label: 'Foundational Stage – Focused Development Needed',
  toneClass: 'text-red-700',
  boxClass: 'border-red-500 bg-red-50 text-red-800'
},
{
  levelId: 'intermediate',
  label: 'Steady Competency – Room to Grow',
  toneClass: 'text-amber-700',
  boxClass: 'border-amber-500 bg-amber-50 text-amber-800'
},
{
  levelId: 'performer',
  label: 'Strong Alignment – Keep Building',
  toneClass: 'text-green-700',
  boxClass: 'border-green-600 bg-green-50 text-green-800'
},
{
  levelId: 'expert',
  label: 'Advanced Capability – Sustain and Extend',
  toneClass: 'text-teal-700',
  boxClass: 'border-teal-600 bg-teal-50 text-teal-800'
},
{
  levelId: 'bestInClass',
  label: 'Mastery Level – Continue Leading by Example',
  toneClass: 'text-blue-700',
  boxClass: 'border-blue-600 bg-blue-50 text-blue-800'
}];


export const getVerdict = (levelId: LevelId): ResultVerdict =>
resultVerdicts.find((v) => v.levelId === levelId) ?? resultVerdicts[0];