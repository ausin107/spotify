import { setShow } from '../toast/toastSlice'
import { removeDocument } from '../../lib/firebaseAction'
import { loadAllPlaylist, startLoading, endLoading } from './playlistSlice'
export const getAllPlaylist = (data) => async (dispatch) => {
  dispatch(startLoading())
  try {
    dispatch(loadAllPlaylist(data))
    dispatch(setShow(notify))
    dispatch(endLoading())
  } catch (e) {
    dispatch(endLoading())
  }
}
export const deletePlaylist = (path, notify) => async (dispatch) => {
  dispatch(startLoading())
  try {
    await removeDocument(path)
    dispatch(loadAllPlaylist())
    dispatch(setShow(notify))
    dispatch(endLoading())
  } catch (e) {
    dispatch(endLoading())
  }
}
