export interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: string;
}

export interface GameUser {
  email: string;
  name: string;
}

export interface Game {
  score: number;
  game_user: GameUser;
}