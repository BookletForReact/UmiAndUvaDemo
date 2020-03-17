import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';

export const dva = {
  config: {
    onReducer(reducer) {
      const persistConfig = {
        key: 'root',
        storage,
        stateReconciler: autoMergeLevel2
      }
      return persistReducer(persistConfig, reducer)
    },
    onError(err) {
      err.preventDefault();
      console.error(err.message);
    },
  },
};

window.onload = () => {
  persistStore(window.g_app._store)
}
