import { Character } from "./Character.js";

// Enemy inherits everything from Character
export class Enemy extends Character {
  constructor(name, type) {
    super(name);

    // adding the enemy type
    this.type = type;
  }

  // enemies can attack another character
  attack(character) {
    console.log(`${this.name} attacks ${character.name}!`);

    character.health--;

    console.log(`${character.name} now has ${character.health} health.`);
  }
}
