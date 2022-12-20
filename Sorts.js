// type sortType = 'asc' | 'desc'
const content = document.getElementById('root')
const styles = 'border: 1px solid black; padding: 5px'

const insertResult = (name, array) => {
  const result = document.createElement('tr')

  const _name = document.createElement('td')

  _name.style = styles

  _name.textContent = name

  result?.appendChild(_name)

  if (array.length < 25)
    for (const num of array) {
      const _num = document.createElement('td')
      _num.style = styles
      _num.textContent = num
      result?.appendChild(_num)
    }
  else {
    const _num = document.createElement('td')
    _num.style = styles
    _num.textContent =
      name === 'Initial' ? array.length : array[array.length - 2]
    result?.appendChild(_num)
    const _time = document.createElement('td')
    _time.style = styles
    _time.textContent = name === 'Initial' ? 'Time' : array[array.length - 1]
    result?.appendChild(_time)
  }

  content?.appendChild(result)
}

class Node {
  constructor(value, left, right) {
    this.value = value
    this.left = left
    this.right = right
  }

  setValue = (value) => {
    this.value = value
  }

  Add = (value) => {
    const node = new Node(value)

    if (node.value < this.value) {
      if (this.left === undefined) {
        this.left = node
      } else {
        this.left.Add(value)
      }
    } else {
      if (this.right === undefined) {
        this.right = node
      } else {
        this.right.Add(value)
      }
    }
  }
}

class BinaryTree {
  constructor(root, count) {
    this.root = root
    this.count = count
  }

  Add = (value) => {
    if (this.root === undefined) {
      this.root = new Node(value)
      this.count = 1
    } else {
      this.root.Add(value)
      this.count++
    }
  }

  /**Префиксный обход - Элемент, Левое, Правое
   * (берем первый элемент, потом все левые, потом правые, если нету то наверх, смотрим правые)
   * - Копирование*/
  Preorder = (node) => {
    let list = []
    if (node === undefined && this.root === undefined) {
      return list
    }

    let current = node || this.root
    if (current !== undefined) {
      list.push(current.value)
      if (current.left !== undefined) {
        list = list.concat(this.Preorder(current.left))
      }
      if (current.right !== undefined) {
        list = list.concat(this.Preorder(current.right))
      }
    }

    return list
  }

  /**Постфиксный обход - Левое, Правое, Элемент
   * (сразу уходим влево, если нету то идем вправо, если и его нет, то берем элемент)
   * - Удаление*/
  Postorder = (node) => {
    let list = []
    if (node === undefined && this.root === undefined) {
      return list
    }

    let current = node || this.root
    if (current !== undefined) {
      if (current.left !== undefined) {
        list = list.concat(this.Postorder(current.left))
      }
      if (current.right !== undefined) {
        list = list.concat(this.Postorder(current.right))
      }
      list.push(current.value)
    }

    return list
  }

  /**Инфиксный обход - Левое, Элемент, Правое
   * (сразу уходим влево, если влево нет, то берем элемент, потом уходим вправо)
   * - Сортировка*/
  Inorder = (node) => {
    let list = []
    if (node === undefined && this.root === undefined) {
      return list
    }

    let current = node || this.root
    if (current !== undefined) {
      if (current.left !== undefined) {
        list = list.concat(this.Inorder(current.left))
      }
      list.push(current.value)
      if (current.right !== undefined) {
        list = list.concat(this.Inorder(current.right))
      }
    }

    return list
  }
}

class BinaryHeap {
  constructor() {
    this.items = []
    this.count = 0
  }

  /**Предок (i-1)/2, i - индекс текущего узла */
  GetParentIndex = (index) => (index ? Math.floor((index - 1) / 2) : index)

  Swap = (currentIndex, parentIndex) => {
    const temp = this.items[currentIndex]
    this.items[currentIndex] = this.items[parentIndex]
    this.items[parentIndex] = temp
  }

  Add = (value) => {
    this.items.push(value)
    this.count++

    let currentIndex = this.items.length - 1
    let parentIndex = this.GetParentIndex(currentIndex)

    while (
      currentIndex > 0 &&
      this.items[parentIndex] > this.items[currentIndex]
    ) {
      this.Swap(currentIndex, parentIndex)

      currentIndex = parentIndex
      parentIndex = this.GetParentIndex(currentIndex)
    }
  }

  GetCount = () => {
    return this.count
  }

  GetRoot = () => {
    const result = this.items[0]
    this.items[0] = this.items.pop()
    this.count--
    this.Rebalancing(0)
    return result
  }

  Rebalancing = (currentIndex) => {
    let result = currentIndex
    /**Левый потомок 2*i+1 */
    let leftIndex
    /**Правый потомок 2*i+2 */
    let rightIndex

    while (currentIndex < this.items.length) {
      leftIndex = 2 * currentIndex + 1
      rightIndex = 2 * currentIndex + 2

      if (
        leftIndex < this.items.length &&
        this.items[result] > this.items[leftIndex]
      ) {
        result = leftIndex
      }

      if (
        rightIndex < this.items.length &&
        this.items[result] > this.items[rightIndex]
      ) {
        result = rightIndex
      }

      if (result === currentIndex) {
        break
      }

      this.Swap(currentIndex, result)
      currentIndex = result
    }
  }

  Sort = () => {
    const result = []
    while (this.count) {
      result.push(this.GetRoot())
    }
    return result
  }
}

class Sort {
  /**
   * **Пузырьковая сортировка**
   * - Вычисление min - `O(n)`, max - `O(n(n+1)/2)`, default - `O(n^2)`
   * - Память `O(n+2)`
   */
  static BubbleSort = (array) => {
    const start = new Date().getTime()
    const result = [...array]
    let isSorted = false
    let temp = 0

    let a = 0
    let b = 0

    for (let j = 0; j < result.length && !isSorted; j++) {
      a++
      isSorted = true
      for (let i = 0; i < result.length - 1 - j && result.length - 1 - j; i++) {
        b++
        if (result[i] > result[i + 1]) {
          isSorted = false
          temp = result[i]
          result[i] = result[i + 1]
          result[i + 1] = temp
        }
      }
    }

    result.push(`O(${a + b})`)
    const end = new Date().getTime()
    result.push(`${end - start}ms`)

    return result
  }

  /**
   * **Шейкерная сортировка**
   * - Вычисление min - `O(n-1)`, max - `O(n(n+1)/2 - n)`, default - `O(n^2)`
   * - Память `O(n+4)`
   */
  static CocktailSort = (array) => {
    const start = new Date().getTime()
    const result = [...array]
    let isSorted = false
    let temp = 0
    let left = 0
    let right = result.length - 1

    let a = 0
    let b = 0

    while (left < right && !isSorted) {
      isSorted = true
      for (let i = left; i < right; i++) {
        a++
        if (result[i] > result[i + 1]) {
          isSorted = false
          temp = result[i]
          result[i] = result[i + 1]
          result[i + 1] = temp
        }
      }
      right--
      if (isSorted) break
      isSorted = true
      for (let i = right; i > left; i--) {
        b++
        if (result[i] < result[i - 1]) {
          isSorted = false
          temp = result[i]
          result[i] = result[i - 1]
          result[i - 1] = temp
        }
      }
      left++
    }

    result.push(`O(${a + b})`)
    const end = new Date().getTime()
    result.push(`${end - start}ms`)

    return result
  }

  /**
   * **Cортировка вставками**
   * - Вычисление min - `O(n*2-2)`, max - `O(n(n+1)/2+n-2)`, default - `O(n*log(n))`
   * - Память `O(n)`
   */
  static InsertionSort = (array) => {
    const start = new Date().getTime()
    const result = []
    result.push(array[0])

    let a = 0
    let b = 0

    for (let i = 1; i < array.length; i++) {
      a++
      for (let j = result.length; j >= 0; j--) {
        b++
        if (result[j - 1] > array[i]) {
          result[j] = result[j - 1]
        } else {
          result[j] = array[i]
          break
        }
      }
    }

    result.push(`O(${a + b})`)
    const end = new Date().getTime()
    result.push(`${end - start}ms`)

    return result
  }

  /**
   * **Сортировка выбором**
   * - Вычисление min - `O(n(n+1)/2)`, max - `O(n(n+1)/2)`, default - O(n^2)
   * - Память `O(n+1)`
   */
  static SelectionSort = (array) => {
    const start = new Date().getTime()
    const result = [...array]
    let temp = 0

    let a = 0
    let b = 0

    for (let i = 0; i < result.length - 1; i++) {
      a++
      for (let j = i + 1; j < result.length; j++) {
        b++
        if (result[j] < result[i]) {
          temp = result[j]
          result[j] = result[i]
          result[i] = temp
        }
      }
    }

    result.push(`O(${a + b})`)
    const end = new Date().getTime()
    result.push(`${end - start}ms`)

    return result
  }

  /**
   * **Сортировка Шелла**
   * - Вычисление min - `O(~n*(log(n)-1)+n/log(n))`, max - `O(~n*log(n)+n)`, default - `O(n*log(n))`
   * - Память `O(n+2)`
   */
  static ShellSort = (array) => {
    const start = new Date().getTime()
    const result = [...array]

    let step = Math.floor(array.length / 2)
    let temp = 0

    let a = 0
    let b = 0
    let c = 0

    while (step > 0) {
      a++
      for (let i = step; i < array.length; i++) {
        b++
        for (let j = i; j >= step && result[j - step] > result[j]; j -= step) {
          c++
          temp = result[j - step]
          result[j - step] = result[j]
          result[j] = temp
        }
      }

      step = Math.floor(step / 2)
    }

    result.push(`O(${a + b + c})`)
    const end = new Date().getTime()
    result.push(`${end - start}ms`)

    return result
  }

  /**
   * **Сортировка деревом**
   * - Вычисление O(n*log(n))
   */
  static TreeSort = (array) => {
    const start = new Date().getTime()
    const tree = new BinaryTree()

    array.forEach((el) => {
      tree.Add(el)
    })

    // console.log(tree)
    // console.log(tree.Preorder())
    // console.log(tree.Postorder())
    // console.log(tree.Inorder())

    const result = tree.Inorder()
    // result.push(`?O(${})`)
    const end = new Date().getTime()
    result.push(`?`)
    result.push(`${end - start}ms`)

    return result
  }

  /**
   * **Пирамидальная сортировка**
   * - Вычисление O(n*log(n))
   */
  static HeapSort = (array) => {
    const start = new Date().getTime()
    const heap = new BinaryHeap()

    array.forEach((el) => {
      heap.Add(el)
    })

    // console.log(heap)
    // console.log(heap.GetRoot())
    // console.log(heap.GetCount())

    const result = heap.Sort()
    // result.push(`?O(${})`)
    const end = new Date().getTime()
    result.push(`?`)
    result.push(`${end - start}ms`)

    return result
  }

  /**
   * **Гномья сортировка**
   * - Вычисление min - `O(n-1)`, max - `O(n^2-(n*2-1))`, default - O(n^2)
   * - Память `O()`
   */
  static GnomeSort = (array) => {
    const start = new Date().getTime()
    const result = [...array]
    let temp = 0
    let i = 0

    let a = 0

    while (i < result.length - 1) {
      a++
      if (result[i] <= result[i + 1] || i === 0) {
        i++
      } else {
        temp = result[i]
        result[i] = result[i + 1]
        result[i + 1] = temp
        i--
      }
    }
    const end = new Date().getTime()
    result.push(`O(${a})`)
    result.push(`${end - start}ms`)

    return result
  }

  /**
   * ** сортировка**
   * - Вычисление min - `O()`, max - `O()`, default - O()
   * - Память `O()`
   */
  // static Sort = (array) => {
  //   const result = [...array]

  //   return result
  // }
}

let testArray = []
// testArray = [
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
// ]
// testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// testArray = [20, 19, 18, 17, 16, 15, 14, 13, 12, 11]
testArray = [
  20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
]
// testArray = [
//   2, 3, 7, 4, 1, 5, 6, 9, 8, 10, 17, 13, 14, 12, 11, 16, 18, 15, 20, 19,
// ]
// testArray = [
//   20, 1, 15, 4, 17, 9, 10, 3, 12, 2, 19, 13, 5, 14, 6, 7, 18, 8, 11, 16,
// ]
// testArray = [6, 1, 9, 4, 2, 7, 5, 3, 8]

// for (let index = 0; index < 1000; index++) {
//   testArray.push(Math.round(Math.random() * 100)) //default
//   // testArray.push(index) //min
//   // testArray.reverse() //max
// }

if (content) {
  insertResult('Initial', testArray)
  insertResult('BubbleSort', Sort.BubbleSort(testArray))
  insertResult('ShakeSort', Sort.CocktailSort(testArray))
  insertResult('InsertionSort', Sort.InsertionSort(testArray))
  insertResult('SelectionSort', Sort.SelectionSort(testArray))
  insertResult('ShellSort', Sort.ShellSort(testArray))
  // insertResult('TreeSort', Sort.TreeSort(testArray))
  insertResult('HeapSort', Sort.HeapSort(testArray))
  insertResult('GnomeSort', Sort.GnomeSort(testArray))
  // insertResult(
  //   'Default',
  //   (function () {
  //     const start = new Date().getTime()
  //     const result = testArray.sort()
  //     const end = new Date().getTime()
  //     result.push('?')
  //     result.push(`${end - start}ms`)
  //     return result
  //   })()
  // )
}
