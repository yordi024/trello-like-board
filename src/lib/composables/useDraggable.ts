import type { TransferData } from '@/lib/types'
import { useBoard } from '.'

export const useDraggable = function (props: any) {
  const { moveColumn, moveTask } = useBoard()

  function onElementDrop(transferData: TransferData) {
    if (transferData?.fromColumnIndex === props.index) {
      return
    }

    if (transferData.fromColumnIndex >= 0 && transferData.type === 'column') {
      moveColumn(props.index, transferData.fromColumnIndex)
    }

    if (transferData.type === 'task') {
      console.log({
        fromColumn: transferData.fromColumnIndex,
        oldTaskIndex: transferData.fromTaskIndex,
        toColumn: props.columnIndex,
        newTaskIndex: props.index,
      })
      moveTask(
        transferData.fromColumnIndex,
        transferData.fromTaskIndex,
        props.columnIndex,
        props.index,
      )
    }

    console.log('onElementDragEnd', { currentIndex: props.index, transferData })
  }

  return {
    //currentIndex,
    //setDraggableIndex,
    onElementDrop,
  }
}
