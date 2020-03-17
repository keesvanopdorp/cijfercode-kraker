import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray
} from '@angular/forms';

import {WordService} from './shared/word.service';
import {HistoryItem} from './interfaces/historyItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  letterForm: FormGroup;
  words: any[];
  history: HistoryItem[] = [];
  showHistoryTab = false;
  constructor(private fb: FormBuilder, private wordService: WordService) {}

  ngOnInit(): void {
    this.letterForm = this.fb.group({
     value: ['', [
       Validators.required
     ]],
    similarities: this.fb.array([])
    });
    this.wordService.getWordList();
  }

  // this is the submit handler for sending the data from the form to the WordService
  submitHandler(): void {
    // sets the value control incorrect
    this.letterForm.controls.value.setErrors({incorrect: true});
    const historyItem: HistoryItem = Object.assign({}, this.letterForm.value);
    console.log(this.letterForm.value.value);
    console.log(historyItem);
    const str = this.letterForm.value.value;
    console.log(typeof str);
    let count = 0;
    let regex: string | RegExp = '^';
    let previousChar = '';
    // makes the regex
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) !== '*') {
        if (previousChar === '*' ) {
          regex += `{${count}}`;
          regex += str.charAt(i);
          previousChar = '';
          count = 0;
        } else {
          regex += str.charAt(i);
        }
      } else {
        if (count === 0 ) {
          regex += '[a-zA-Z]';
          count += 1;
          previousChar = '*';
        } else {
          count += 1;
          previousChar = '*';
        }
      }
    }
    if (str.charAt(str.length - 2) !== '}' && previousChar === '*') {
      regex += `{${count}}`;
    }
    regex += '$';
    regex = new RegExp(regex);
    // sends the similarities to the WordService
    this.wordService.similarities = this.letterForm.value.similarities;
    // clears the value of the main input
    this.letterForm.value.value = '';
    this.words = undefined;
    this.words = this.wordService.filter(regex);
    historyItem.words = this.words;
    this.history.push(historyItem);
    console.log(this.history);
  }

  // gets a array of the all the similarities
  get similarityForms() {
    return this.letterForm.get('similarities') as FormArray;
  }

  addSimilarity(): void {
    const similarity = this.fb.group({
      first: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{1,2}$/),
        Validators.min(0)
      ]],
      second: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{1,2}$/),
        Validators.min(0)
      ]]
    });
    this.similarityForms.push(similarity);
  }

  removeSimilarity(index) {
    this.similarityForms.removeAt(index);
  }

  // this function clears the array of found words
  resetWords(): void {
    this.words = undefined;
  }

  // this function resets the value of the main input
  resetValue(): void {
    this.letterForm.value.value = '';
  }

  get value() {
    return this.letterForm.get('value');
  }

  openHistoryTab() {
    this.showHistoryTab = !this.showHistoryTab;
    // alert('Komt binnenkort');
  }
}
