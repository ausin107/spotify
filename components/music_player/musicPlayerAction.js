import { setPlayPauseMusic, setPlayList } from './musicPlayerSlice'
import { setCurrentId } from '../collection/collectionSlice'
export const handlePlayPause = (isShow, musicId, itemId, index) => async (dispatch) => {
  dispatch(setPlayList())
  if (isShow && musicId == itemId) {
    dispatch(setPlayPauseMusic())
  } else if (!isShow) {
    dispatch(setCurrentId({ index: index }))
  } else if (musicId != itemId) {
    dispatch(setCurrentId({ index: index }))
  }
}
