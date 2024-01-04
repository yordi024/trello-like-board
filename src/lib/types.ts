export interface Task {
  id: string
  title: string
  description: string
  createdAt: string
  columnId?: string
}

export interface Column {
  id: string
  title: string
  tasks: Task[]
}

export interface Board {
  id: string
  title: string
  columns: Column[]
}

export interface TransferData {
  type: string
  fromColumnIndex: number
  fromTaskIndex?: number
}
