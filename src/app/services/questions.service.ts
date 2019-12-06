import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {QuestionList, QuestionSet} from '@interface/question';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {

  gameState$ = new BehaviorSubject<'single' | 'double' | 'final'>('single');
  questionSet_lds$ = new BehaviorSubject<QuestionSet>({
    name: 'LDS',
    categories: [
      {
        name: 'Book of Mormon',
        questions: [
          {answer: 'This Book of Mormon Prophet Taught the Sacrament Prayers', question: 'Who was Moroni?'},
          {answer: 'He became the new king after the death of his father wicked King Noah', question: 'Who was Limhi?'},
          {answer: 'This Jaredite prophet witnessed the entire destruction of his people.', question: 'Who was Ether?'},
          {answer: 'This man was the prophet at the time Lehi left Jerusalem', question: 'Who was Jeremiah?'},
          {answer: 'They were the four sons of Mosiah the king.', question: 'Who were Ammon, Aaron, Omner and Himni?'},
        ],
      },
      {
        name: 'New Testament',
        questions: [
          {
            answer: 'This prophet held the Aaronic priesthood and predicted the coming of Jesus Christ',
            question: 'Who was John the Baptist?',
          },
          {
            answer: 'This king said unto Paul, “almost thou persuadeth me to be a christian”',
            question: 'Who was King Agrippa?',
          },
          {
            answer: 'He was a publican and a tax collector, yet he was called as an apostle by Jesus.',
            question: 'Who was Matthew?',
          },
          {
            answer: `These two sisters ran for Jesus when their brother was very ill and about to die.  This led to one of the most spectacular miracles in the new testament.`,
            question: 'Who were Mary and Martha?',
          },
          {
            answer: 'This man visited Mary as an angel to tell her of the birth of Jesus Christ.  He had another name on earth and was famous for his construction projects.',
            question: 'Who was Gabriel? (know on Earth as Noah)',
          },
        ],
      },
      {
        name: 'Old Testament',
        questions: [
          {
            answer: 'This massive structure was built by Nimrod in 2300 BC to reach heaven.',
            question: 'What was the Tower of Babel?',
          },
          {answer: 'He was the first king of Israel (before David)', question: 'Who was Saul?'},
          {
            answer: 'This man was famous for his 12 sons.  His uncle also had 12 sons.',
            question: 'Who was Jacob (Israel)? (Note that Ishmael also had 12 sons)',
          },
          {answer: 'She betrayed Samson to the Philistines.', question: 'Who was Delilah?'},
          {
            answer: 'Ezekiel prophesied that these two sticks would be joined together.',
            question: 'What are the stick of Joseph and the stick of Judah?',
          },
        ],
      },
      {
        name: 'The New Dispensation',
        questions: [
          {
            answer: 'This man was with Joseph Smith when he saw the vision of the three degrees of glory (D&C 76)',
            question: 'Who was Sidney Rigdon',
          },
          {answer: 'This famous Mormon settlement was once a bigger city then Chicago', question: 'What is Nauvoo?'},
          {
            answer: 'This book came from the translation of ancient Egyptian papyrus scrolls sold by Michael H. Chandler.',
            question: 'What is the Pearl of Great Price (or Book of Abraham or Book of Moses)?',
          },
          {
            answer: 'This Illinois governor pledged to protect Joseph and Hyrum if they would submit and come to Carthage.',
            question: 'Who was Thomas Ford?',
          },
          {answer: 'The first temple in this dispensation was built in this city.', question: 'What is Kirtland, Ohio?'},
        ],
      },
      {
        name: 'Grab Bag',
        questions: [{
          answer: 'This event brought death into the world when Eve partook of the forbidden fruit.',
          question: 'What was the Fall?',
        },
          {answer: 'This kingdom is as the glory of the stars.', question: 'What is the Telestial?'},
          {answer: 'Martin Luther was a citizen of this country', question: 'What is Germany?'},
          {
            answer: 'He is the only Mormon to be voted Most Valuable Player at the Super Bowl.',
            question: 'Who is Steve Young?',
            twiceToday: false,
          },
          {answer: 'This LDS gymnast won 2 medals in the 1984 olympics', question: 'Who is Peter Vidmar?'},
        ],
      },
    ],
  });

  questionSet$ = new BehaviorSubject<QuestionSet>({
    name: 'Javascript',
    categories: [
      {
        name: 'It\'s a feature, not a bug',
        questions: [
          {answer: 'Variations can be "//" or "/* */"', question: 'What are comments'},
          {answer: 'For, While, and Do While are types of these', question: 'What are loops'},
          {answer: 'This would be the result of 3+2+"7"', question: 'What is 57'},
          {answer: 'This is the method used to add to append to an array', question: 'What is .push()'},
          {answer: 'This is the method used to add to exit a loop before completion', question: 'What is break'},
        ],
      },
      {
        name: 'How do you function?',
        questions: [
          {answer: 'This is used to pop up a request for user input.', question: 'What is prompt()'},
          {answer: 'This is used to pop up a user notification.', question: 'What is alert()'},
          {answer: 'This is used to wait and then run something after a specified delay.', question: 'What is setTimeout()'},
          {answer: 'This is used to convert something like 0x4F to and integer.', question: 'What is parseInt()'},
          {answer: 'This is a statement used to remove a property as well as its value.', question: 'What is delete'},

        ],
      },
      {
        name: 'Use Strict',
        questions: [
          {answer: 'This company developed Javascript', question: 'What is Netscape'},
          {answer: 'true && false are values for this type', question: 'What is Boolean'},
          {answer: 'One would use this method to listen to a keypress', question: 'What is .addEventListener()'},
          {answer: 'Before you can catch something, you\'ve got to do this', question: 'What is try'},
          {answer: 'You can use this to make sure the string will be a valid URI', question: 'What is encodeURI()'},
        ],
      },
    ],
  });

  categories$ = this.questionSet$.pipe(
    map(qs => qs.categories.map((cat, idx) => ({id: String.fromCharCode(idx + 97), name: cat.name}))),
  );
  answersAndQuestions$ = this.questionSet$.pipe(
    map(qs => {
      const questionList: QuestionList = {};
      qs.categories.forEach((cat, idx) => {
        questionList[String.fromCharCode(idx + 97)] = cat.questions;
      });
      return questionList;
    }),
  );

  private _answered$ = new BehaviorSubject<{ [id: string]: Set<number> }>({});
  answered$ = this._answered$.asObservable();

  constructor() {
  }

  setAsAnswered(id: string, idx: number) {
    const answered = {...this._answered$.getValue()};
    if (!(id in answered)) {
      answered[id] = new Set();
    }
    answered[id].add(idx);
    this._answered$.next(answered);

    const qs = this.questionSet$.getValue();
    qs.categories[id.charCodeAt(0) - 97].questions[idx].answered = true;
    this.questionSet$.next(qs);
  }

}
