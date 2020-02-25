import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  words: any;
  similarities: any;

  constructor(private http: HttpClient) {
  }

  getWordList() {
    this.http.get<any>('assets/dutch.json', {responseType: 'json'}).subscribe(data => {
      this.words = data;
    });
  }

  filter(regex: RegExp) {
    const potentialsWords = [];
    for (const prop in this.words) {
      const currentWord = this.words[prop];
      if (currentWord.match(regex)) {
        const similar = this.checkSimilarities(currentWord);
        if (similar === true) {
          potentialsWords.push(currentWord);
        }
      }
    }
    return potentialsWords;
  }

  checkSimilarities(word: string) {
    let similar = false;
    const values = [];
    const similaritiesLength = this.similarities.length;
    if (similaritiesLength !== 0) {
      for (let i = 0; i < similaritiesLength; i++) {
        const firstValue = this.similarities[i].first - 1;
        const secondValue = this.similarities[i].second - 1;
        const firstLetter = word.charAt(firstValue).toString();
        const secondLetter = word.charAt(secondValue).toString();
        values.push(firstLetter === secondLetter);
      }
      const checker = arr => arr.every(Boolean);
      similar = checker(values);
    } else {
      similar = true;
    }
    return similar;
  }
}
