import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ProductProps } from 'src/app/types/types';

// ngModel is updating the value from the element in a two way,
// can manipulate it after sending data through the service

@Component({
  selector: 'app-user-page',
  template: `
    <div class="mainUsersDiv">
      <app-modal-basic 
      *ngIf="this.showModal" 
      (showFalse)="this.showModal=$event"
      (showTrue)="this.showModal=$event"
      modalTitle="Purchases List"
      >
      <div class="purchasesList">
        <app-list-item-basic class="purchaseInfo" *ngFor="let purchase of this.userPurchaseList">
        <p>PURCHASE ID : {{purchase.purchase_id}} </p>
        <p>PURCHASE ITEMS : </p>
        <p *ngFor="let product of purchase.products">{{product.name}},</p>
        </app-list-item-basic>
      </div>
    </app-modal-basic>
    <app-toast-success *ngIf="this.showToastSuccess"></app-toast-success>
    <app-toast-failure *ngIf="this.showToastFailure"></app-toast-failure>
      <div class="mainUsersContentDiv">
        <div class="usersList">  
          <h2>Users List</h2>
          <app-list-item-basic (click)="userPurchaseListRequest(user.id)" *ngFor="let user of usersList" class="usersListComponent">
          <p>ID : {{user.id}} </p>
          <p>CPF : {{user.cpf}}</p>
          </app-list-item-basic>
        </div>
        <div class="usersRegister">
          <h2>User Regiser</h2>
          <form #formUser="ngForm" (ngSubmit)="addUser(formUser)" class="usersForm" >
            <div class="usersInput">
              <div class="inputDiv">
                <label>NAME :</label>
                <input #nameInput required [(ngModel)]="this.name" name="name" placeholder="First Second Name">
              </div>
              <div class="inputDiv">
                <label>EMAIL :</label>
                <input required [(ngModel)]="this.email" name="email" placeholder="user@mail.com">
              </div>
              <div class="inputDiv">
                <label>PHONE :</label>
                <input required [(ngModel)]="this.phone" name="phone" placeholder="(99) 99999-9999">
              </div>
              <div class="inputDiv">
                <label>CPF :</label>
                <input required [(ngModel)]="this.cpf" name="cpf" placeholder="999.999.999-99">
              </div>
            </div>
            <div class="buttonDiv">
              <button class="button" type="submit">Add User</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`

    .mainUsersDiv {
      display:flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }

    .mainUsersContentDiv {
      display:flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
      width: 90%;
      height: 90%;
      padding:0.5em;
      background-color: white;
      border-radius: 1em;
    }

    .purchasesList{
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:flex-start;
      height:90%;
      width:90%;
      padding:0.5em;
      gap: 1em;
    }
    
    .purchaseInfo{
      height: 10%;
      width: 100%;
    }

    .usersList {
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:flex-start;
      height:90%;
      width:40%;
      padding:0.5em;
      border-radius: 1em;
      border: 2px solid #EE7517;
      gap: 1em;
      overflow-y: auto;
    }
    
    .usersListComponent{
      width: 90%;
    }

    .usersRegister {
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:flex-start;
      height:90%;
      width:40%;
      padding:0.5em;
      border-radius: 1em;
      border: 2px solid #EE7517;
    }

    .usersForm {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1em;
    }

    .usersInput {
      display:flex;
      align-items:center;
      justify-content:center;
      gap: 1em;
      flex-wrap:wrap;
    }

    .inputDiv{
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap:0.5em;
    width: fit-content;

  }

    .buttonDiv {
      display: flex;
      flex-direction: row;
      align-items:center;
      justify-content: flex-start;
      width: 90%;
    }

    .button {
      width: 40%;
    }

  `]
})

export class UsersPageComponent implements OnInit {

  // app root component is handling all the variables so it can pass to other components and
  // update its data, sinc it is a simple application

  name: string = '';
  email: string = '';
  phone: string = '';
  cpf: string = '';
  showModal: boolean = false;
  showToastSuccess: boolean = false;
  showToastFailure: boolean = false;
  usersList!: Array<any>;
  userPurchaseList!: Array<{ purchase_id: number, user_id: number, products: Array<ProductProps> }>;

  constructor(private service: DatabaseService) {
  }

  listUsers() {
    this.service.usersList().subscribe({
      next: (response: any) => {
        this.usersList = response
        console.log(response)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  addUser(form: any) {
    console.log(form.value)
    this.service.createUser(form.value).subscribe({
      next: () => {
        console.log("success")
        this.showToastSuccess = true;
        setTimeout(() => {
          this.showToastSuccess = false;
          window.location.reload() // method that refreshes the page
        }, 2000)
        this.name = ''
        this.email = ''
        this.phone = ''
        this.cpf = ''

      },
      error: () => {
        console.log("error");
        this.showToastFailure = true;
        setTimeout(() => {
          this.showToastFailure = false;
        }, 2000)
        this.name = ''
        this.email = ''
        this.phone = ''
        this.cpf = ''
      }
    })
  }

  userPurchaseListRequest(userId: any) {
    this.showModal = true
    this.service.usersPurchases(userId).subscribe({
      next: (response: any) => { console.log(response); this.userPurchaseList = response },
      error: (error) => { console.log(error); this.userPurchaseList = [] }
    })
  }

  userPurchaseTotalCost(purchaseProducts: any) {

  }

  ngOnInit(): void {
    this.listUsers()
  }

}
