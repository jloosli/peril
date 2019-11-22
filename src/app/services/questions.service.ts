import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Category} from '@interface/category';
import {QuestionList} from '@interface/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {

  gameState$ = new BehaviorSubject<'single' | 'double' | 'final'>('single');

  categories$ = new BehaviorSubject<Category[]>([
    {id: 'a', name: 'Book of Mormon'},
    {id: 'b', name: 'New Testament'},
    {id: 'c', name: 'Old Testament'},
    {id: 'd', name: 'The New Dispensation'},
    {id: 'e', name: 'Grab Bag'},
  ]).asObservable();
  answersAndQuestions$ = new BehaviorSubject<QuestionList>({
    a: [
      {answer: 'This Book of Mormon Prophet Taught the Sacrament Prayers', question: 'Who was Moroni?', twiceToday: false},
      {answer: 'He became the new king after the death of his father wicked King Noah', question: 'Who was Limhi?', twiceToday: false},
      {answer: 'This Jaredite prophet witnessed the entire destruction of his people.', question: 'Who was Ether?', twiceToday: false},
      {answer: 'This man was the prophet at the time Lehi left Jerusalem', question: 'Who was Jeremiah?', twiceToday: false},
      {answer: 'They were the four sons of Mosiah the king.', question: 'Who were Ammon, Aaron, Omner and Himni?', twiceToday: false},
    ],
    b: [
      {
        answer: 'This prophet held the Aaronic priesthood and predicted the coming of Jesus Christ',
        question: 'Who was John the Baptist?',
        twiceToday: false,
      },
      {
        answer: 'This king said unto Paul, “almost thou persuadeth me to be a christian”',
        question: 'Who was King Agrippa?',
        twiceToday: false,
      },
      {
        answer: 'He was a publican and a tax collector, yet he was called as an apostle by Jesus.',
        question: 'Who was Matthew?',
        twiceToday: false,
      },
      {
        answer: `These two sisters ran for Jesus when their brother was very ill and about to die.  This led to one of the most spectacular miracles in the new testament.`,
        question: 'Who were Mary and Martha?',
        twiceToday: false,
      },
      {
        answer: 'This man visited Mary as an angel to tell her of the birth of Jesus Christ.  He had another name on earth and was famous for his construction projects.',
        question: 'Who was Gabriel? (know on Earth as Noah)',
        twiceToday: false,
      },
    ],
    c: [
      {
        answer: 'This massive structure was built by Nimrod in 2300 BC to reach heaven.',
        question: 'What was the Tower of Babel?',
        twiceToday: false,
      },
      {answer: 'He was the first king of Israel (before David)', question: 'Who was Saul?', twiceToday: false},
      {
        answer: 'This man was famous for his 12 sons.  His uncle also had 12 sons.',
        question: 'Who was Jacob (Israel)? (Note that Ishmael also had 12 sons)',
        twiceToday: false,
      },
      {answer: 'She betrayed Samson to the Philistines.', question: 'Who was Delilah?', twiceToday: false},
      {
        answer: 'Ezekiel prophesied that these two sticks would be joined together.',
        question: 'What are the stick of Joseph and the stick of Judah?',
        twiceToday: false,
      },
    ],
    d: [
      {
        answer: 'This man was with Joseph Smith when he saw the vision of the three degrees of glory (D&C 76)',
        question: 'Who was Sidney Rigdon',
        twiceToday: false,
      },
      {answer: 'This famous Mormon settlement was once a bigger city then Chicago', question: 'What is Nauvoo?', twiceToday: false},
      {
        answer: 'This book came from the translation of ancient Egyptian papyrus scrolls sold by Michael H. Chandler.',
        question: 'What is the Pearl of Great Price (or Book of Abraham or Book of Moses)?',
        twiceToday: false,
      },
      {
        answer: 'This Illinois governor pledged to protect Joseph and Hyrum if they would submit and come to Carthage.',
        question: 'Who was Thomas Ford?',
        twiceToday: false,
      },
      {answer: 'The first temple in this dispensation was built in this city.', question: 'What is Kirtland, Ohio?', twiceToday: false},
    ],
    e: [
      {
        answer: 'This event brought death into the world when Eve partook of the forbidden fruit.',
        question: 'What was the Fall?',
        twiceToday: false,
      },
      {answer: 'This kingdom is as the glory of the stars.', question: 'What is the Telestial?', twiceToday: false},
      {answer: 'Martin Luther was a citizen of this country', question: 'What is Germany?', twiceToday: false},
      {
        answer: 'He is the only Mormon to be voted Most Valuable Player at the Super Bowl.',
        question: 'Who is Steve Young?',
        twiceToday: false,
      },
      {answer: 'This LDS gymnast won 2 medals in the 1984 olympics', question: 'Who is Peter Vidmar?', twiceToday: false},
    ],
  }).asObservable();

  finalPeril$ = new BehaviorSubject({
    category: 'Scriptural Villains',
    answer: 'This evil Gadianton leader was hanged on a tree by the Nephites til dead.',
    question: 'Who was Zemnarihah?',
  }).asObservable();

  private _answered$ = new BehaviorSubject<{ [id: string]: Set<number> }>({});
  answered$ = this._answered$.asObservable();

  constructor() {
  }

  remove(id, idx) {
    const answered = {...this._answered$.getValue()};
    if (!(id in answered)) {
      answered[id] = new Set();
    }
    answered[id].add(idx);
    this._answered$.next(answered);
  }

}
