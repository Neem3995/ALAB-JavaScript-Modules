import { Character } from "./Character.js";

// Companion also inherits everything from Character
export class Companion extends Character {
  constructor(name, type) {
    // getting the name, health and inventory from Character
    super(name);

    // adding the type of companion
    this.type = type;
  }

  // Companions can help the adventurer
  assist() {
    console.log(`${this.name} is helping the party...`);

    // using the roll method from Character
    super.roll();
  }
}
