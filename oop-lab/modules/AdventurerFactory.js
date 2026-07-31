import { Adventurer } from "./Adventurer.js";

// factory used to create adventurers with the same role
export class AdventurerFactory {
  constructor(role) {
    this.role = role;
    this.adventurers = [];
  }

  // creating a new adventurer
  generate(name) {
    const newAdventurer = new Adventurer(name, this.role);

    this.adventurers.push(newAdventurer);

    // returning the new adventurer
    return newAdventurer;
  }

  // finding an adventurer by their position
  findByIndex(index) {
    return this.adventurers[index];
  }

  // finding an adventurer by their name
  findByName(name) {
    return this.adventurers.find((adventurer) => {
      return adventurer.name === name;
    });
  }
}
