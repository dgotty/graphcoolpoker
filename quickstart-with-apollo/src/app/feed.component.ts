import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs/Subscription';

import gql from 'graphql-tag';

import 'rxjs/add/operator/toPromise';

const AllUsersQuery = gql`
  query allUsers {
      allUsers {
          username
      }
  }
`;

@Component({
  selector: 'app-feed',
  template: `
    <a routerLink="/create" class="fixed bg-white top-0 right-0 pa4 ttu dim black no-underline">+ New Post</a>
    <div class="w-100" style="max-width: 400px">
      <div class="pa3 bg-black-05 ma3" *ngFor="let user of allUsers">
        <ul class="pt3">
          <li>{{user.username}}</li>
        </ul>
      </div>
    </div>
  `,
  host: {'style': 'width: 100%; display: flex; justify-content: center;'}
})
export class FeedComponent implements OnInit, OnDestroy {

  loading = true;
  allUsers: any;
  allUsersSub: Subscription;

  constructor(
    private apollo: Apollo
  ) {}

  setImage(url: string) {
    const styles = {
      'background-image':  `url(${url})`,
      'background-size': 'cover',
      'padding-bottom': '100%',
    };
    return styles;
  }

  // handleDelete(id: string) {
  //   this.apollo.mutate({
  //     mutation: gql`
  //       mutation ($id: ID!) {
  //         deletePost(id: $id) {
  //           id
  //         }
  //       }
  //     `,
  //     variables: {
  //       id: id,
  //     },
  //     updateQueries: {
  //       allUsers: (prev: any) => {
  //         const allUsers = prev.allUsers.filter(post => post.id !== id);

  //         return {
  //           allUsers: [...allUsers]
  //         };
  //       }
  //     }
  //   }).toPromise();
  // }

  ngOnInit() {
    this.allUsersSub = this.apollo.watchQuery({
      query: AllUsersQuery
    }).subscribe(({data, loading}: any) => {
      this.allUsers = data.allUsers;
      this.loading = loading;
    });
  }

  ngOnDestroy() {
    this.allUsersSub.unsubscribe();
  }
}
