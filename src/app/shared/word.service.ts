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

  filterOld(regex: any, similarities: any) {
    const potentialWords = [];
    console.log(similarities);
    console.log(`regex: ${regex}`);
    for (const prop in this.words) {
      const word = this.words[prop];
      if (word.match(regex)) {
        let similar = false;
        if (similarities.length !== 0) {
          for (let i = 0; i < similarities.length; i++) {
            console.log(`word ${prop}`);
            console.log(word.charAt(similarities[i].first - 1));
            console.log(word.charAt(similarities[i].second - 1));
            const first = word.charAt(similarities[i].first - 1);
            const second = word.charAt(similarities[i].second - 1);
            if (first !== second) {
              similar = false;
              console.log('not similar');
            } else {
              similar = true;
              console.log('is similar');
            }
          }
        } else {
          similar = true;
        }
        if (similar === true) {
          potentialWords.push(word);
          // console.log(word);
        }
      }
    }
    return potentialWords;
  }

  filter(regex: RegExp) {
    const potentialsWords = [];
    for (const prop in this.words) {
      const currentWord = this.words[prop];
      if (currentWord.match(regex)) {
        const similar = this.checkSimilarities(currentWord);
        console.log(similar);
        if (similar === true) {
          potentialsWords.push(currentWord);
        }
      }
    }
    return potentialsWords;
  }

  checkSimilarities(word: string) {
    let similar = false;
    const similaritiesLength = this.similarities.length;
    if (similaritiesLength !== 0) {
      for (let i = 0; i < similaritiesLength; i++) {
        const firstValue = this.similarities[i].first - 1;
        const secondValue = this.similarities[i].second - 1;
        const firstLetter = word.charAt(firstValue);
        const secondLetter = word.charAt(secondValue);
        console.log(secondLetter);
        console.log(firstLetter);
        similar = firstLetter === secondLetter;
      }
    } else {
      similar = true;
    }
    return similar;
  }
}
