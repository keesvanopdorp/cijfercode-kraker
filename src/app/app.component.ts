import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray
} from '@angular/forms';

import {WordService} from './shared/word.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  letterForm: FormGroup;
  words: any;
  constructor(private fb: FormBuilder, private wordService: WordService) {}

  ngOnInit(): void {
    this.letterForm = this.fb.group({
     value: ['', [
       Validators.required,
       Validators.minLength(2)
     ]],
    similarities: this.fb.array([])
    });
    this.wordService.getWordList();
  }

  submitHandler() {
    console.log(this.letterForm.value);
    const str = this.letterForm.value.value;
    let count = 0;
    let regex: string | RegExp = '^';
    let previousChar = '';
    console.log(`string: ${str.length}`);
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
    this.wordService.similarities = this.letterForm.value.similarities;
    this.words = this.wordService.filter(regex);
  }

  get similarityForms() {
    return this.letterForm.get('similarities') as FormArray;
  }

  addSimilarity() {
    const similarity = this.fb.group({
      first: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{1,2}$/)
      ]],
      second: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{1,2}$/)
      ]]
    });
    this.similarityForms.push(similarity);
  }

  removeSimilarity(index) {
    this.similarityForms.removeAt(index);
  }

  resetWords() {
    this.words = [];
  }

  resetForm() {
    this.similarityForms.controls = [];
  }
}
