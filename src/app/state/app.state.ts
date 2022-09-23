import { CVState } from './CV-State/cv.reducer';
import { UserState } from './user-state/user.reducer';
export interface AppState {
  cvState: CVState;
  userState: UserState;
}