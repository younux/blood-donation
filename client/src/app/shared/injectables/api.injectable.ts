/**
 * Created by younes.benhoumich on 05/09/2017.
 */

const APP_API_URL = 'http://localhost:4200/api/';
const GOOGLE_MAPS_API_KEY = 'AIzaSyBYvCehzGZfMfMDA9oOHjxAJSbCwwWZQjo';

export const apiInjectables: Array<any> = [
  {provide: 'APP_API_URL', useValue: APP_API_URL},
  {provide: 'GOOGLE_MAPS_API_KEY', useValue: GOOGLE_MAPS_API_KEY},
];



