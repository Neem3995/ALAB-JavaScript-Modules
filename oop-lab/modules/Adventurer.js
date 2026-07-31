import { Character } from "./Character.js";

// Adventurer inherits everything from Character
export class Adventurer extends Character {
  // these are the allowed adventurer roles
  static ROLES = ["Fighter", "Healer", "Wizard"];

  constructor(name, role) {
    // getting the name, health and inventory from Character
    super(name);

    // checking if the role is allowed
    if (!Adventurer.ROLES.includes(role)) {
      throw new Error(
        `${role} is not a valid role. Choose Fighter, Healer, or Wizard.`
      );
    }

    this.role = role;

    // every adventurer starts with these items
    this.inventory.push("bedroll", "50 gold coins");
  }

  // Adventurers can scout ahead
  scout() {
    console.log(`${this.name} is scouting ahead...`);
    super.roll();
  }
}
