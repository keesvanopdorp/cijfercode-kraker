import {Component, Input, OnInit} from '@angular/core';
import {HistoryItem} from '../../interfaces/historyItem';

@Component({
  selector: 'app-history-tab',
  templateUrl: './history-tab.component.html',
  styleUrls: ['./history-tab.component.scss']
})
export class HistoryTabComponent implements OnInit {
  p: number;
  @Input() history: HistoryItem[];

  constructor() {
    this.p = 1;
  }

  ngOnInit() {}

}
