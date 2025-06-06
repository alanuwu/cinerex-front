//AQUI VAN TODAS LAS ENTIDADES QUE TENEMOS EN BACK
// A CONSIDERAR LO DE LOS ASIENTOS Y RESERVACIONES

export interface User {
  userId: string;


  userEmail: string;


  userPassword: string;

userRoles: string[];

}

export interface Customer{
    
  customerId: string;

  customerName: string;
  customerLastName: string;
  customerEmail: string;
  customerPhoneNumber: string;

  tickets: Ticket[];

  user: User;
}

export interface Movie {
      
  movieId: number;

  movieTitle: string;

  movieDescription: string;

  movieDurationMinutes: number;

  movieGenre: string;

  movieImageUrl: string;

  movieTrailer: string;

  showtimes: Showtime[];


}

export interface Room{

  roomId: string;

 
  roomName: string;

 
  roomCapacity: number;


  showtimes: Showtime[];
}

export interface Showtime{
  id: string;

  dateTime: Date;
  
  price: number;
  remainingSeats: number;

  movie: Movie;

  room:   Room;

   lenguage: string;

  tickets: Ticket[];


}

export interface Ticket {
      
  id: string;
  price: number;

  purchaseDate: Date;

  customer: Customer ;

  showtime: Showtime ;

}
