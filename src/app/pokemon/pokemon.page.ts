import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit {
  pokemon: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    const nombre = this.route.snapshot.paramMap.get('name');
    if (nombre) {
      this.http.get(`https://pokeapi.co/api/v2/pokemon/${nombre}`).subscribe((res) => {
        this.pokemon = res;
      });
    }
  }
}
