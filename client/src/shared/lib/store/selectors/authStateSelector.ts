import { createSelector } from "@reduxjs/toolkit";

import rootSelector from "./rootSelector";

const authStateSelector = createSelector(rootSelector, state => state.auth);
