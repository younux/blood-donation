/**
 * Created by younes.benhoumich on 27/11/2017.
 */


export class Author {

  username: string;
  email: string;
  firstName: string;
  lastName: string;

  constructor(username: string,
              email: string,
              firstName: string,
              lastName: string,
              ) {
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}
