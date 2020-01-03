import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  words: any;
  constructor(private http: HttpClient) { }

  getWordList() {
    this.http.get<any>('assets/dutch.json' , {responseType: 'json'}).subscribe(data => {
      this.words = data;
    });
  }

  filter(regex: any, similarities: any) {
    console.log(similarities);
    const potentialWords = [];
    console.log(regex);
    for (const prop in this.words) {
      const word = this.words[prop];
      if (word.match(regex)) {
        let similar = false;
        let fails = 0;
        if (similarities.length !== 0) {
          console.log('niet 0');
          for (let i = 0; i < similarities.length; i++) {
            const first = word.charAt(similarities[i].first - 1);
            const second = word.charAt(similarities[i].second - 1);
            if (first !== second){
              fails++;
            }
          }
          similar = fails !== similarities.length;
          console.log(similar);
        } else {
          similar = true;
          console.log(similar);
        }
        if (similar === true) {
          potentialWords.push(word);
          console.log(word);
        }
      }
    }
    return potentialWords;
  }
}
