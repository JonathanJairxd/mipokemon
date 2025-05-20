import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

// Para poder escribir la opinion en el detalle
import { FormsModule } from '@angular/forms';
// Para guardar la info de los pokemons en firebase
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit {
  pokemon: any;
  resena: string = '';

  constructor(private route: ActivatedRoute, 
    private http: HttpClient,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    const nombre = this.route.snapshot.queryParamMap.get('nombre');
    if (nombre) {
      this.http.get(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
      .subscribe((data) => {
        console.log('Datos recividos: ', data)
        this.pokemon = data;});
    }
  }

  guardar() {
    if (!this.pokemon) return;

    const data = {
      nombre: this.pokemon.name,
      imagen: this.pokemon.sprites.front_default,
      altura: this.pokemon.height,
      peso: this.pokemon.weight,
      tipos: this.pokemon.types.map((t: any) => t.type.name),
      reseña: this.resena,
      fecha: new Date()
    };

    console.log('Datos a guardar:', data); 

    this.pokemonService
      .guardarPokemon(data)
      .then(() => alert('¡Pokémon guardado en Firebase!'))
      .catch((err) => alert('Error al guardar: ' + err));
  }

  
}
