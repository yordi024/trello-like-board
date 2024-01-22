export interface Task {
  id: string
  columnId?: string
  order?: number
  title: string
  description?: string
  createdAt: string
}

export interface Column {
  id: string
  boardId?: string
  order?: number
  title: string
}

export interface Board {
  id: string
  title: string
  color: Color
}

export interface TransferData {
  type: string
  fromColumnIndex: number
  fromTaskIndex?: number
}

export type Color = 'gray' | 'red' | 'rose' | 'orange' | 'green' | 'blue' | 'yellow' | 'violet'

export type ColorObj = { [key in Color]: string }
