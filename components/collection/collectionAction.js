import { startLoading, loadItemsSuccess, loadItemsFailed } from './collectionSlice'
import { setPlayList, setNotPlayList } from '../music_player/musicPlayerSlice'
import { addLikedMusic, getAllLikedMusic, removeLikedMusic } from '../../lib/firebaseAction'
export const getCollection = (path) => async (dispatch) => {
  dispatch(startLoading())
  try {
    const allMusics = await getAllLikedMusic(path)
    dispatch(loadItemsSuccess(allMusics))
  } catch (e) {
    dispatch(loadItemsFailed())
  }
}
export const addCollection = (path, data) => async (dispatch) => {
  dispatch(startLoading())
  try {
    await addLikedMusic(path, data)
    dispatch(loadItemsSuccess())
  } catch (e) {
    dispatch(loadItemsFailed())
  }
}
export const deleteCollection = (path) => async (dispatch) => {
  dispatch(startLoading())
  try {
    await removeLikedMusic(path)
    dispatch(loadItemsSuccess())
  } catch (e) {
    console.log(e)
  }
}
