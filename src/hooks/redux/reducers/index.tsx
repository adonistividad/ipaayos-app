import { combineReducers } from "redux";

import CategoriesReducer from "./CategoriesReducer";
import TasksReducer from "./TasksReducer";
import UserReducer from "./UserReducer";
import ProvidersReducer from "./ProvidersReducer";
import GroupedMessagesReducer from "./GroupedMessagesReducer";
import MessagesReducer from "./MessagesReducer";
import NotificationsReducer from "./NotificationsReducer";
import BadgesReducer from "./BadgesReducer";

const rootReducer = combineReducers({
  allCategories: CategoriesReducer,
  allTasks: TasksReducer,
  user: UserReducer,
  allProviders: ProvidersReducer,
  allGroupedMessages: GroupedMessagesReducer,
  allMessages: MessagesReducer,
  allNotifications: NotificationsReducer,
  allBadges: BadgesReducer,

  // oneProvider: ProviderReducer,
  // myList: MyListReducer,
  // user: UserReducer,
  // user_profile: UserProfileReducer,
  // provider_profile: ProviderProfileReducer,
  // provider: ProvidersReducer,
  // allTaskOffers: AllTaskOffersReducer,
  // taskOffers: TaskOffersReducer,
  // allMessages: MessagesReducer,
  // allReviews: ReviewsReducer,
});

export default rootReducer;
