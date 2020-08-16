import { SET_AUTHED_USER } from "../actions/authedUser";
/* state will be initially null so we will use the default parameter
The first time this function is invoked the state is undefined  */
export default function authedUser(state = null, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      return action.id;
    default:
      return state;
  }
}
