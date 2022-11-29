import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from '../action.counter';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  counterValue:Number = 0;
  constructor(private store:Store<{count:{count:Number}}>) { }

  ngOnInit(): void {
    this.store.select('count').subscribe((data) => {
      this.counterValue = data.count
    })
  }
  onSelectIncrease(){
    this.store.dispatch(increment())
  }
  onSelectDecrease(){
    this.store.dispatch(decrement())

  }
  onSelectReset(){
    this.store.dispatch(reset())

  }
}
