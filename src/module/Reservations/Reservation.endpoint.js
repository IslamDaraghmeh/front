import { roles } from './../../services/roles.js';
export const endpoint = {
    add: [roles.User , roles.Admin],
    show: [roles.Admin],
 
}