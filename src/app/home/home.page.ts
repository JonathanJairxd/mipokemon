import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pokemons: any[] = [];
  offset = 0;
  limit = 20;
  loading = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadPokemons();
  }

  loadPokemons(event?: any) {
    if (this.loading) return;
    this.loading = true;

    this.http
      .get<any>(`https://pokeapi.co/api/v2/pokemon?offset=${this.offset}&limit=${this.limit}`)
      .subscribe((res) => {
        this.pokemons = [...this.pokemons, ...res.results];
        this.offset += this.limit;
        this.loading = false;

        this.pokemons.forEach((pokemon) => {
          this.http.get<any>(pokemon.url).subscribe((details) => {
            pokemon.details = details;
          });
        });

        if (event) {
          event.target.complete();
        }

        if (res.next === null && event) {
          event.target.disabled = true;
        }
      });
  }

  getPokemonTypes(pokemon: any): string {
    return pokemon.details?.types?.map((t: any) => t.type.name).join(', ');
  }

  getPokemonIdFromUrl(url: string): number {
    const parts = url.split('/');
    return Number(parts[parts.length - 2]);
  }

  getImageUrl(pokemon: any): string {
    const id = this.getPokemonIdFromUrl(pokemon.url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  goToDetails(pokemonName: string) {
    this.router.navigate([`/pokemon/${pokemonName}`]);
  }
}
