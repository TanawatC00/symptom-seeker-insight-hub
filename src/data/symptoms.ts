
export interface Symptom {
  id: string;
  name: string;
  category: SymptomCategory;
  description: string;
}

export type SymptomCategory = 
  | 'General'
  | 'Head'
  | 'Respiratory'
  | 'Digestive'
  | 'Musculoskeletal'
  | 'Skin';

export const symptoms: Symptom[] = [
  // General symptoms
  {
    id: 'fever',
    name: 'Fever',
    category: 'General',
    description: 'Elevated body temperature above 100.4°F (38°C)'
  },
  {
    id: 'fatigue',
    name: 'Fatigue',
    category: 'General',
    description: 'Feeling of tiredness or lack of energy'
  },
  {
    id: 'chills',
    name: 'Chills',
    category: 'General',
    description: 'Feeling of coldness with shivering or shaking'
  },
  {
    id: 'weakness',
    name: 'Weakness',
    category: 'General',
    description: 'Reduced strength or energy'
  },

  // Head symptoms
  {
    id: 'headache',
    name: 'Headache',
    category: 'Head',
    description: 'Pain in any region of the head'
  },
  {
    id: 'dizziness',
    name: 'Dizziness',
    category: 'Head',
    description: 'Feeling lightheaded or unsteady'
  },
  {
    id: 'sore_throat',
    name: 'Sore Throat',
    category: 'Head',
    description: 'Pain or scratchiness in the throat'
  },
  {
    id: 'runny_nose',
    name: 'Runny Nose',
    category: 'Head',
    description: 'Excess drainage from the nose'
  },

  // Respiratory symptoms
  {
    id: 'cough',
    name: 'Cough',
    category: 'Respiratory',
    description: 'Sudden expulsion of air from the lungs'
  },
  {
    id: 'shortness_of_breath',
    name: 'Shortness of Breath',
    category: 'Respiratory',
    description: 'Difficulty breathing or feeling breathless'
  },
  {
    id: 'chest_pain',
    name: 'Chest Pain',
    category: 'Respiratory',
    description: 'Discomfort or pain in the chest area'
  },
  {
    id: 'wheezing',
    name: 'Wheezing',
    category: 'Respiratory',
    description: 'High-pitched whistling sound when breathing'
  },

  // Digestive symptoms
  {
    id: 'nausea',
    name: 'Nausea',
    category: 'Digestive',
    description: 'Feeling of discomfort in the stomach with an urge to vomit'
  },
  {
    id: 'vomiting',
    name: 'Vomiting',
    category: 'Digestive',
    description: 'Forceful expulsion of stomach contents through the mouth'
  },
  {
    id: 'diarrhea',
    name: 'Diarrhea',
    category: 'Digestive',
    description: 'Loose, watery bowel movements'
  },
  {
    id: 'abdominal_pain',
    name: 'Abdominal Pain',
    category: 'Digestive',
    description: 'Pain felt between the chest and pelvic regions'
  },

  // Musculoskeletal symptoms
  {
    id: 'joint_pain',
    name: 'Joint Pain',
    category: 'Musculoskeletal',
    description: 'Discomfort in one or more joints'
  },
  {
    id: 'muscle_pain',
    name: 'Muscle Pain',
    category: 'Musculoskeletal',
    description: 'Aching or soreness in muscles'
  },
  {
    id: 'back_pain',
    name: 'Back Pain',
    category: 'Musculoskeletal',
    description: 'Discomfort in the back area'
  },
  {
    id: 'stiffness',
    name: 'Stiffness',
    category: 'Musculoskeletal',
    description: 'Difficulty moving joints or muscles'
  },

  // Skin symptoms
  {
    id: 'rash',
    name: 'Rash',
    category: 'Skin',
    description: 'Abnormal change in skin color or texture'
  },
  {
    id: 'itching',
    name: 'Itching',
    category: 'Skin',
    description: 'Irritating sensation that causes a desire to scratch'
  },
  {
    id: 'swelling',
    name: 'Swelling',
    category: 'Skin',
    description: 'Enlargement or puffiness of body tissue'
  },
  {
    id: 'skin_discoloration',
    name: 'Skin Discoloration',
    category: 'Skin',
    description: 'Abnormal change in skin color'
  }
];

// Common conditions and their associated symptoms
export interface Condition {
  id: string;
  name: string;
  symptoms: string[];
  description: string;
  selfCare: string[];
  whenToSeeDoctor: string;
}

export const conditions: Condition[] = [
  {
    id: 'common_cold',
    name: 'Common Cold',
    symptoms: ['runny_nose', 'sore_throat', 'cough', 'fever', 'headache'],
    description: 'A viral infection of the upper respiratory tract that typically affects the nose and throat.',
    selfCare: [
      'Rest and get plenty of sleep',
      'Drink adequate fluids to stay hydrated',
      'Use over-the-counter medications for symptom relief',
      'Use a humidifier to add moisture to the air'
    ],
    whenToSeeDoctor: 'If symptoms persist for more than 10 days, you develop a high fever, or symptoms are severe.'
  },
  {
    id: 'flu',
    name: 'Influenza (Flu)',
    symptoms: ['fever', 'cough', 'fatigue', 'chills', 'headache', 'muscle_pain'],
    description: 'A contagious respiratory illness caused by influenza viruses that infect the nose, throat, and lungs.',
    selfCare: [
      'Rest and avoid physical exertion',
      'Stay hydrated by drinking plenty of fluids',
      'Take acetaminophen or ibuprofen for fever and pain',
      'Use a humidifier to ease congestion'
    ],
    whenToSeeDoctor: 'If you have difficulty breathing, chest pain, persistent high fever, or are in a high-risk group (elderly, pregnant, or immunocompromised).'
  },
  {
    id: 'food_poisoning',
    name: 'Food Poisoning',
    symptoms: ['nausea', 'vomiting', 'diarrhea', 'abdominal_pain', 'fever', 'weakness'],
    description: 'Illness caused by consuming contaminated food or beverages, resulting in digestive distress.',
    selfCare: [
      'Stay hydrated with water, clear broths, or sports drinks',
      'Ease back into eating with bland foods',
      'Avoid dairy, fatty, sugary, or spicy foods',
      'Get plenty of rest'
    ],
    whenToSeeDoctor: 'If you have severe dehydration, bloody stools, diarrhea lasting more than 3 days, or a fever above 102°F.'
  },
  {
    id: 'migraine',
    name: 'Migraine',
    symptoms: ['headache', 'nausea', 'dizziness', 'sensitivity_to_light'],
    description: 'A headache disorder characterized by recurrent headaches that are moderate to severe, often with associated symptoms.',
    selfCare: [
      'Rest in a dark, quiet room',
      'Apply cold compresses to the forehead',
      'Try over-the-counter pain relievers',
      'Stay hydrated and maintain regular meals'
    ],
    whenToSeeDoctor: 'If you have severe headaches that don\'t respond to over-the-counter medications, or if headaches interfere with daily activities.'
  },
  {
    id: 'allergic_reaction',
    name: 'Allergic Reaction',
    symptoms: ['rash', 'itching', 'swelling', 'runny_nose', 'shortness_of_breath'],
    description: 'An immune system response to a substance that the body mistakenly believes is harmful.',
    selfCare: [
      'Avoid known allergens',
      'Take antihistamines as directed',
      'Use hydrocortisone cream for skin reactions',
      'Try a cool bath or compress for skin symptoms'
    ],
    whenToSeeDoctor: 'If you experience severe swelling, difficulty breathing, or symptoms don\'t improve with over-the-counter treatments.'
  }
];

// Helper function to match symptoms to possible conditions
export const findPossibleConditions = (selectedSymptoms: string[]): Condition[] => {
  if (selectedSymptoms.length === 0) return [];
  
  // Calculate a match score for each condition
  return conditions
    .map(condition => {
      // Count how many of the selected symptoms match this condition
      const matchingSymptoms = condition.symptoms.filter(symptom => 
        selectedSymptoms.includes(symptom)
      );
      
      // Calculate a score based on the percentage of matching symptoms
      const score = matchingSymptoms.length / selectedSymptoms.length;
      
      return { 
        condition, 
        score,
        matchCount: matchingSymptoms.length
      };
    })
    // Filter conditions that have at least one matching symptom
    .filter(result => result.matchCount > 0)
    // Sort by score in descending order
    .sort((a, b) => b.score - a.score)
    // Return just the conditions
    .map(result => result.condition);
};
