import { APPLICATION_INIT, WIPE_CURRENT_DATA } from "../constants";

export const applicationInit = () => ({
  type: APPLICATION_INIT
});

export const wipeCurrentData = () => ({
  type: WIPE_CURRENT_DATA
});
