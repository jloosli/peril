export interface Question {
  answer: string;
  question: string;
  twiceToday?: boolean;
  answered?: boolean;
}

export interface QuestionList {
  [id: string]: Question[];
}
