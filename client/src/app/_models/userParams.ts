import { User } from "./user";

export class UserParams {
    department: string;
    minAge = 0;
    maxAge = 25;
    pageNumber = 1;
    pageSize = 5;
    orderBy = 'lastActive';

    constructor(user: User) {
        this.department = user.department;
    }
}