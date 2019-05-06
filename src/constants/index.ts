import {
  Annotation as AnnotationType,
  Relation as RelationType,
  AnnotationCategoryType,
  RelationCategoryType,
} from 'src/types';

export const SELECT_TEXT = 'SELECT_TEXT';

export const REMOVE_SELECTED_ELEMENT = 'REMOVE_SELECTED_ELEMENT';
export const RESET_SELECTION = 'RESET_SELECTION';

export const ADD_ANNOTATION = 'ADD_ANNOTATION';
export const SELECT_ANNOTATION = 'SELECT_ANNOTATION';

export const PREPARE_RELATION = 'PREPARE_RELATION';
export const ADD_RELATION = 'ADD_RELATION';
export const SELECT_RELATION = 'SELECT_RELATION';
export const SET_SHOW_RELATIONS = 'SET_SHOW_RELATIONS';

// Modal actions
export const SUBMIT_ARTICLE_MODAL = 'SUBMIT_ARTICLE_MODAL';
export const SET_ARTICLE_MODAL_OPENED = 'SET_ARTICLE_MODAL_OPENED';
export const SET_ARTICLE_MODAL_TEXT = 'SET_ARTICLE_MODAL_TEXT';

// A8ns category types
export const FIRST_NAME = 'FIRST_NAME';
export const LAST_NAME = 'LAST_NAME';
export const FULL_NAME = 'FULL_NAME';
export const COMPANY_NAME = 'COMPANY_NAME';
export const DOB = 'DOB';
export const RISK = 'RISK';

// Relation types between a8ns
export const COREFERENCE = 'COREFERENCE';
export const INVOLVES = 'INVOLVES';

export const AllA8nCategories = [
  FIRST_NAME,
  LAST_NAME,
  FULL_NAME,
  COMPANY_NAME,
  DOB,
  RISK,
];
export const AllRelationCategories = [COREFERENCE, INVOLVES];

export const CategoryColorMap: { [K in AnnotationCategoryType]: string } = {
  FIRST_NAME: 'lightblue',
  LAST_NAME: 'lightgreen',
  FULL_NAME: 'orange',
  COMPANY_NAME: 'cyan',
  DOB: 'violet',
  RISK: 'red',
};

export const RelationColorMap: { [K in RelationCategoryType]: string } = {
  COREFERENCE: 'purple',
  INVOLVES: 'blue',
};

export const SelectedAnnotationColor = 'yellow';
export const SelectedRelationColor = 'red';

export const SampleAnnotation: AnnotationType = {
  id: '0:1:FULL_NAME',
  renderingId: '0:1:FULL_NAME',
  from: 0,
  to: 1,
  category: FULL_NAME,
  text: 'L',
};

export const SampleRelation: RelationType = {
  id: 'A->B',
  from: 'A',
  to: 'B',
  category: COREFERENCE,
};

export const SampleText =
  'Lorem ipsum dolor sit amet, nominavi rationibus vix in. Pro' +
  'omittam intellegam ea. Eum malorum nonumes oporteat cu, qui illum' +
  'imperdiet id, deserunt salutandi theophrastus ut quo. Quo summo' +
  'minimum scribentur an, no mel sumo oratio definitiones. Vim at' +
  'utamur luptatum lobortis, urbanitas vituperata disputationi eu' +
  'vis, eos ut iuvaret mentitum signiferumque. Vix tota convenire no,' +
  'meis mandamus facilisis cum an. Velit patrioque complectitur est' +
  'ex. Id vide debitis suscipiantur quo. Virtute adolescens eam eu.' +
  'Id phaedrum posidonium deterruisset quo. Mei et justo tempor. Duo' +
  'oratio labores sensibus ea, ad modo quas graece qui. Cu ancillae' +
  'explicari nam, viris numquam cu vim. Id amet consequuntur vis, mei' +
  'oporteat legendos oportere in, in sit labores perfecto' +
  'adversarium. Mucius voluptatum sea in. His et movet delectus. Sint' +
  'duis brute ne nec. Nam ex purto mazim volutpat, enim philosophia' +
  'ut duo. Vim ad justo dicta paulo. Mel posse discere eu, placerat' +
  'comprehensam et vel. Sed et assum disputationi, utroque accusamus' +
  'laboramus ex cum, vel populo tractatos ex. Putent pericula te vix,' +
  'nam an lobortis dissentias. At veniam dicunt concludaturque est,' +
  'impetus reprimique efficiendi vel ne. In ius putent aperiri' +
  'vivendum, an nam amet graecis sadipscing, summo nominati et sed.' +
  'Facete doctus ex sit. Vim malorum persequeris no.' +
  '\n\n' +
  'Lorem ipsum dolor sit amet,' +
  'rationibus vix in. Pro omittam intellegam ea. Eum malorum nonumes' +
  'oporteat cu, qui illum imperdiet id, deserunt salutandi' +
  'theophrastus ut quo. Quo summo minimum scribentur an, no mel sumo' +
  'oratio definitiones. Vim at utamur luptatum lobortis, urbanitas' +
  'vituperata disputationi eu vis, eos ut iuvaret mentitum' +
  'signiferumque. Vix tota convenire no, meis mandamus facilisis cum' +
  'an. Velit patrioque complectitur est ex. Id vide debitis' +
  'suscipiantur quo. Virtute adolescens eam eu. Id phaedrum' +
  'posidonium deterruisset quo. Mei et justo tempor. Duo oratio' +
  'labores sensibus ea, ad modo quas graece qui. Cu ancillae' +
  'explicari nam, viris numquam cu vim. Id amet consequuntur vis, mei' +
  'oporteat legendos oportere in, in sit labores perfecto' +
  'adversarium. Mucius voluptatum sea in. His et movet delectus. Sint' +
  'duis brute ne nec. Nam ex purto mazim volutpat, enim philosophia' +
  'ut duo. Vim ad justo dicta paulo. Mel posse discere eu, placerat' +
  'comprehensam et vel. Sed et assum disputationi, utroque accusamus' +
  'laboramus ex cum, vel populo tractatos ex. Putent pericula te vix,' +
  'nam an lobortis dissentias. At veniam dicunt concludaturque est,' +
  'impetus reprimique efficiendi vel ne. In ius putent aperiri' +
  'vivendum, an nam amet graecis sadipscing, summo nominati et sed.' +
  'Facete doctus ex sit. Vim malorum persequeris no.' +
  '\n\n' +
  'Lorem ipsum dolor sit amet, nominavi rationibus vix in. Pro' +
  'omittam intellegam ea. Eum malorum nonumes oporteat cu, qui illum' +
  'imperdiet id, deserunt salutandi theophrastus ut quo. Quo summo' +
  'minimum scribentur an, no mel sumo oratio definitiones. Vim at' +
  'utamur luptatum lobortis, urbanitas vituperata disputationi eu' +
  'vis, eos ut iuvaret mentitum signiferumque. Vix tota convenire no,' +
  'meis mandamus facilisis cum an. Velit patrioque complectitur est' +
  'ex. Id vide debitis suscipiantur quo. Virtute adolescens eam eu.' +
  'Id phaedrum posidonium deterruisset quo. Mei et justo tempor. Duo' +
  'oratio labores sensibus ea, ad modo quas graece qui. Cu ancillae' +
  'explicari nam, viris numquam cu vim. Id amet consequuntur vis, mei' +
  'oporteat legendos oportere in, in sit labores perfecto' +
  'adversarium. Mucius voluptatum sea in. His et movet delectus. Sint' +
  'duis brute ne nec. Nam ex purto mazim volutpat, enim philosophia' +
  'ut duo. Vim ad justo dicta paulo. Mel posse discere eu, placerat' +
  'comprehensam et vel. Sed et assum disputationi, utroque accusamus' +
  'laboramus ex cum, vel populo tractatos ex. Putent pericula te vix,' +
  'nam an lobortis dissentias. At veniam dicunt concludaturque est,' +
  'impetus reprimique efficiendi vel ne. In ius putent aperiri' +
  'vivendum, an nam amet graecis sadipscing, summo nominati et sed.' +
  'Lorem ipsum dolor sit amet,' +
  'rationibus vix in. Pro omittam intellegam ea. Eum malorum nonumes' +
  'oporteat cu, qui illum imperdiet id, deserunt salutandi' +
  'theophrastus ut quo. Quo summo minimum scribentur an, no mel sumo' +
  'oratio definitiones. Vim at utamur luptatum lobortis, urbanitas' +
  'vituperata disputationi eu vis, eos ut iuvaret mentitum' +
  'signiferumque. Vix tota convenire no, meis mandamus facilisis cum' +
  'an. Velit patrioque complectitur est ex. Id vide debitis' +
  'suscipiantur quo. Virtute adolescens eam eu. Id phaedrum' +
  'posidonium deterruisset quo. Mei et justo tempor. Duo oratio' +
  'labores sensibus ea, ad modo quas graece qui. Cu ancillae' +
  'explicari nam, viris numquam cu vim. Id amet consequuntur vis, mei' +
  'oporteat legendos oportere in, in sit labores perfecto' +
  'adversarium. Mucius voluptatum sea in. His et movet delectus. Sint' +
  'duis brute ne nec. Nam ex purto mazim volutpat, enim philosophia' +
  'ut duo. Vim ad justo dicta paulo. Mel posse discere eu, placerat' +
  'comprehensam et vel. Sed et assum disputationi, utroque accusamus' +
  'laboramus ex cum, vel populo tractatos ex. Putent pericula te vix,' +
  'nam an lobortis dissentias. At veniam dicunt concludaturque est,' +
  'impetus reprimique efficiendi vel ne. In ius putent aperiri' +
  'vivendum, an nam amet graecis sadipscing, summo nominati et sed.' +
  'Facete doctus ex sit. Vim malorum persequeris no.' +
  '\n\n' +
  'Lorem ipsum dolor sit amet, nominavi rationibus vix in. Pro' +
  'omittam intellegam ea. Eum malorum nonumes oporteat cu, qui illum' +
  'imperdiet id, deserunt salutandi theophrastus ut quo. Quo summo' +
  'minimum scribentur an, no mel sumo oratio definitiones. Vim at' +
  'utamur luptatum lobortis, urbanitas vituperata disputationi eu' +
  'vis, eos ut iuvaret mentitum signiferumque. Vix tota convenire no,' +
  'meis mandamus facilisis cum an. Velit patrioque complectitur est' +
  'ex. Id vide debitis suscipiantur quo. Virtute adolescens eam eu.' +
  'Id phaedrum posidonium deterruisset quo. Mei et justo tempor. Duo' +
  'oratio labores sensibus ea, ad modo quas graece qui. Cu ancillae' +
  'explicari nam, viris numquam cu vim. Id amet consequuntur vis, mei' +
  'oporteat legendos oportere in, in sit labores perfecto' +
  'adversarium. Mucius voluptatum sea in. His et movet delectus. Sint' +
  'duis brute ne nec. Nam ex purto mazim volutpat, enim philosophia' +
  'ut duo. Vim ad justo dicta paulo. Mel posse discere eu, placerat' +
  'comprehensam et vel. Sed et assum disputationi, utroque accusamus' +
  'laboramus ex cum, vel populo tractatos ex. Putent pericula te vix,' +
  'nam an lobortis dissentias. At veniam dicunt concludaturque est,' +
  'impetus reprimique efficiendi vel ne. In ius putent aperiri' +
  'vivendum, an nam amet graecis sadipscing, summo nominati et sed.' +
  'Facete doctus ex sit. Vim malorum persequeris no.';
