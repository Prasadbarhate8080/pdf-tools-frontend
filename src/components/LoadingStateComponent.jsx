import React from 'react'
import Processing from './Processing'
import { useDispatch, useSelector } from 'react-redux'
import WaitingLoader from './WaitingLoader'
import ProgressBar from './ProgressBar'
import FailedState from './FaildState'
import { resetOperationState } from '@/store/operationStateSlice'

function LoadingStateComponent() {
  let operationState = useSelector((state) => state.operationState.operationState)
  let progress = useSelector((state) => state.fileProgress.progress)
  let dispatch = useDispatch();
  function onRetry() {
    dispatch(resetOperationState())
  }
  if (operationState == 'processing') return <Processing />
  else if(operationState == "waiting") return <WaitingLoader/>
  else if(operationState == "uploading") return <ProgressBar progress={progress}/>
  else if(operationState == "faild") return <FailedState onRetry={onRetry}/>
}

export default LoadingStateComponent
