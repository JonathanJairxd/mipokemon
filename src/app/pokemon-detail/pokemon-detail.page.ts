import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
})
export class PokemonDetailPage implements OnInit {
  pokemonDetails: any;
  pokemonName: string | null = null;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.pokemonName = this.activatedRoute.snapshot.paramMap.get('name');
    if (this.pokemonName) {
      this.loadPokemonDetails();
    }
  }

  loadPokemonDetails() {
    this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${this.pokemonName}`).subscribe((details) => {
      this.pokemonDetails = details;
    });
  }

  getTypes(): string {
    return this.pokemonDetails?.types?.map((t: any) => t.type.name).join(', ');
  }

  getAbilities(): string {
    return this.pokemonDetails?.abilities?.map((a: any) => a.ability.name).join(', ');
  }
}
