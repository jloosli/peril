export interface Question {
  answer: string;
  question: string;
  twiceToday?: boolean;
  answered?: boolean;
}

export interface PerilCategory {
  id?: string;
  name: string;
  questions: Question[];
}

export interface QuestionSet {
  name: string;
  categories: PerilCategory[];
}

export interface QuestionList {
  [id: string]: Question[];
}
