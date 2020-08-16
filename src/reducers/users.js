import { RECEIVE_USERS } from "../actions/users";

/* When the case is RECEIVE_USER the state is going to be everything
which is an empty object now ...state, we are going to grab all
the users from the action using action.users. default state is going to
return the state       */
export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      // when we receive user or tweets we want to merge all of those users or tweets
      //onto this object
      return {
        ...state,
        ...action.users
      };
    default:
      return state;
  }
}
