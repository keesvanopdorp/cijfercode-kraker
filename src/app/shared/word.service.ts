import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WordService {
  words: any;
  constructor(private http: HttpClient) { }

  getWordList() {
    this.http.get<any>('/assets/dutch.json' , {responseType: 'json'}).subscribe(data => {
      this.words = data;
      console.log(this.words);
    });
  }

  filter(regex: any) {
    const potentialWords = [];
    console.log(regex);
    for (const prop in this.words) {
      if (this.words[prop].match(regex)) {
        potentialWords.push(this.words[prop]);
        console.log(this.words[prop]);
      }
    }
    return potentialWords;
  }
}
