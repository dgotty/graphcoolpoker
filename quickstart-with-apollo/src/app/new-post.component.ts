import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';

import gql from 'graphql-tag';

@Component({
  selector: 'app-new-post',
  template: `
    <div>
      <input
        type="text"
        class="form-control"
        id="descriptionInput"
        placeholder="Poker Game Name"
        [(ngModel)]="name"
        name="name"
        required
      />
      <button 
        (click)="postNewGame()"
      >
        Post
      </button>
    </div>
  `
})
export class NewPostComponent {
  name: string;

  constructor(
    private router: Router,
    private apollo: Apollo
  ) { }

  postNewGame(): void {

    this.apollo.mutate({
      mutation: gql`
          mutation ($name: String!){
              createPokerGame(name: $name, createdById: "cj4hmbxa24enp0140yrisqhz5") {
                  id
              }
          }
      `,
      variables: {
        name: this.name
      },
    })
      .toPromise()
      .then(() => {
        this.router.navigate(['/']);
      });
  }
}
