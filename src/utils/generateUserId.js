export function generateUserId() {
    return Math.floor(1000 + Math.random() * 9000).toString(); // Generates a random 4-digit number
  }
  