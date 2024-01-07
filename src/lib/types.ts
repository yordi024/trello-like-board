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
  color: Color
  columns: Column[]
}

export interface TransferData {
  type: string
  fromColumnIndex: number
  fromTaskIndex?: number
}

export type Color = 'gray' | 'red' | 'rose' | 'orange' | 'green' | 'blue' | 'yellow' | 'violet'

export type ColorObj = { [key in Color]: string }
