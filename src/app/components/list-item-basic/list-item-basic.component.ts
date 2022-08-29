import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-item-basic',
  template: `
  <div class="mainComponentDiv">
    <div class="listMainDiv">
      <ng-content>
      </ng-content>
    </div>
  </div>
`,
  styles: [`
    .mainComponentDiv {
        height: fit-content;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content:flex-start;
        gap: 0.5em;
    }

    .listMainDiv {
      height: fit-content;
      width:100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      padding-right: 0.5em;
      padding-left: 0.5em;
      border-radius: 5em;
      gap: 1em;
      background-color: white;
      font-size: 0.75em;
      border: 2px solid #EE7517;
    }

    .listMainDiv:hover{
      transition: 0.5s;
      transform: scale(1.05);
      cursor: pointer;
    }

    .listMainDiv:active{
      background-color: #D0D0D0;
    }
    
  `]
})
export class ListItemBasicComponent implements OnInit {

  // ngFor in userInfo

  constructor() { }

  ngOnInit(): void {
  }

}