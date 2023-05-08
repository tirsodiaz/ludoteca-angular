import { Customer } from "src/app/customer/model/Customer";
import { Game } from "src/app/game/model/Game";

export class Booking {
    id: number;
    customer: Customer;
    game: Game;
    inicio: Date;
    fin: Date;
}