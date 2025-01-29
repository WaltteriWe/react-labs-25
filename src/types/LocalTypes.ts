import {User} from 'hybrid-types/DBTypes';

export type Credentials = Pick<User, 'username' | 'password'>;

/* export type { Credentials };
 */
