import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
  <div class="main" style="background-color: #EE7517;">
  <div class="mainNavigationMenu" style="background-color: yellow;">
    <app-navigation-menu></app-navigation-menu>
  </div>
  <div class="mainClientInformation">
    <div class="clientInfoOne" style="background-color: blue;">
      <app-user-card [userData]="userData" ></app-user-card>
    </div>
    <div class="clientInfoTwo" style="background-color: green;">
      <!-- the variables used in component shall be difined inside the used class -->
      <app-user-list (userClicked)="user($event)" ></app-user-list>
    </div>
  </div>
</div>
  `,
  styles: [`
  .main {
    display: flex;
    flex-direction: column;
    gap: 1em;
    height: 100%;
    width: 100%;
  }

  .mainNavigationMenu {
    width: 100%;
    height: 20%;
  }

  .mainClientInformation {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 80%;
  }

  .clientInfoOne {
    width: 50%;
    height: 100%;
  }

  .clientInfoTwo {
    width: 50%;
    height: 100%;
  }
  `]
})

export class AppComponent {

  userData = {
    name : '',
    email: '',
    phone: ''

  }
  
  user(user: any): any {
    this.userData = user
    console.log("data in parent",this.userData)
  }

  

}
