import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  pokemons: any[] = [];
  offset = 0;
  limit = 20;
  loading = false;

  nombreBuscar: string = '';

  constructor(private http: HttpClient, private router: Router) { }

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

        if (event) {
          event.target.complete();
        }

        // Disable scroll if no more Pokémon
        if (res.next === null && event) {
          event.target.disabled = true;
        }
      });
  }

  getImageUrl(index: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`;
  }

  verDetalle(nombre: string) {
    this.router.navigate(['/pokemon'], { queryParams: { nombre } });
  }

  buscar() {
  if (!this.nombreBuscar.trim()) return;
  this.router.navigate(['/pokemon'], { queryParams: { nombre: this.nombreBuscar.toLowerCase() } });
}

}