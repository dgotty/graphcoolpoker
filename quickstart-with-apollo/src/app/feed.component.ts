import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs/Subscription';
import { MdCardModule } from '@angular/material';

import gql from 'graphql-tag';

import 'rxjs/add/operator/toPromise';

const AllPokerGamesQuery = gql`
  query allPokerGames {
      allPokerGames {
          id,
          name,
          createdAt,
          userStories {
            id
          }
      }
  }
`;

@Component({
  selector: 'app-feed',
  template: `
    <a routerLink="/create">+ New Poker Session</a>
    <md-card *ngFor="let game of allPokerGames">
      <md-card-header>
        <md-card-title>{{game.name}}</md-card-title>
        <md-card-subtitle>{{game.createdAt}}</md-card-subtitle>
      </md-card-header>
      <md-card-content>
        <p>Bacon ipsum dolor amet burgdoggen swine shank porchetta filet mignon chuck short loin ground round turkey sausage. Filet mignon swine leberkas, shank turkey biltong corned beef alcatra. Pastrami t-bone ball tip pork andouille. Chicken pig pork loin pork belly jowl.</p>
      </md-card-content>
    </md-card>
  `
})
export class FeedComponent implements OnInit, OnDestroy {

  loading = true;
  allPokerGames: any;
  allPokerGamesSub: Subscription;

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
    this.allPokerGamesSub = this.apollo.watchQuery({
      query: AllPokerGamesQuery
    }).subscribe(({data, loading}: any) => {
      this.allPokerGames = data.allPokerGames;
      this.loading = loading;
    });
  }

  ngOnDestroy() {
    this.allPokerGamesSub.unsubscribe();
  }
}
