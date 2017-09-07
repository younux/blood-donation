/**
 * Created by younes.benhoumich on 05/09/2017.
 */

const APP_API_URL = 'http://127.0.0.1:6001/api/';

export const apiInjectables: Array<any> = [
  {provide: 'APP_API_URL', useValue: APP_API_URL},
]
