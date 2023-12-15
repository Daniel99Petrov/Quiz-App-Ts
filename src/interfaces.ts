interface Answers {
    correct_answer: string,
    incorrect_answers: string[];
}

interface Question extends Answers{
    question: string;
}

interface DropdownOption {
    value: string;
    label: string;
  }

interface Cards {
    question: Question,
}

interface history extends Cards{
    points: Points
    
}

interface results {
    type: string,
    difficulty: string,
    category: string,
    question: string,
    correct_answer: string,
    incorrect_answers: string[]
}