export class UserStateService {
    private userState: Map<string, any>;

    constructor() {
        this.userState = new Map<string, any>();
    }

    getUserState(userId: string): any {
        return this.userState.get(userId);
    }

    setUserState(userId: string, state: any): void {
        this.userState.set(userId, state);
    }

    // Add other methods as needed
}