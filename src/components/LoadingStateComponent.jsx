import React from 'react'
import Processing from './Processing'
import { useSelector } from 'react-redux'
import WaitingLoader from './WaitingLoader'
import ProgressBar from './ProgressBar'

function LoadingStateComponent() {
  let operationState = useSelector((state) => state.operationState.operationState)
  let progress = useSelector((state) => state.fileProgress.progress)
  if (operationState == 'processing') return <Processing />
  else if(operationState == "waiting") return <WaitingLoader/>
  else if(operationState == "uploading") return <ProgressBar progress={progress}/>
  else if(operationState == "faild") return <p className='mt-24'>something went wrong please try again later</p>
}

export default LoadingStateComponent
