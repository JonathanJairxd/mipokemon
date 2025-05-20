import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { PokemonDetailPage } from './pokemon-detail/pokemon-detail.page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'pokemon/:name',
    component: PokemonDetailPage,
  },
];
