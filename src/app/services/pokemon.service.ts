import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  constructor(private firestore: Firestore) {}

  guardarPokemon(pokemon: any) {
    const coleccion = collection(this.firestore, 'pokemones');
    return addDoc(coleccion, pokemon);
  }
}
