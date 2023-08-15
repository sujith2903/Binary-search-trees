const node = function (data = null, leftNode = null, rightNode = null) {
    return{data, leftNode, rightNode}
}

const tree = function (array) {

    const buildTree = function (array) {
        
        if (array.length == 0) {
            return null
        } 

        let mid = Math.floor(array.length / 2)
        let root = node(array[mid])
        let leftArray = array.slice(0, mid)
        let rightArray = array.slice(mid + 1, array.length)
        
        root.leftNode = buildTree(leftArray)
        root.rightNode = buildTree(rightArray)

        return root
    }

    let root = buildTree(array)

    const insert = function (value,currentNode  = root ) {
        
        if (currentNode == null) {
            let currentNode = node(value)
            return currentNode
        }
        
        if (value < currentNode.data) {
            currentNode.leftNode = insert(value, currentNode.leftNode)
        } else {
            currentNode.rightNode = insert(value, currentNode.rightNode)
        }

        return currentNode
    }

    const deletion = function (value, currentNode = root) {

        if (value < currentNode.data) {
            currentNode.leftNode = deletion(value, currentNode.leftNode)
        } else if (value > currentNode.data) {
            currentNode.rightNode = deletion(value, currentNode.rightNode)
        } else {
            if (currentNode.leftNode == null && currentNode.rightNode == null) {
                currentNode = null
                return currentNode
            } else if (currentNode.leftNode == null && currentNode.rightNode != null) {
                currentNode = currentNode.rightNode
                return currentNode
            } else if (currentNode.leftNode != null && currentNode.rightNode == null) {
                currentNode = currentNode.leftNode
                return currentNode
            } else {
                let newNode = currentNode.rightNode
                while (newNode.leftNode != null) {
                    newNode = newNode.leftNode
                }
                currentNode.data = newNode.data
                currentNode.rightNode = deletion(newNode.data , currentNode.rightNode)
                return currentNode
            }
        }
        return currentNode
    }

    const find = function (value, currentNode = root) {

        if (currentNode.data == value) {
            return currentNode
        }

        if (value < currentNode.data) {
            return find(value,currentNode.leftNode)
        } else {
            return find(value,currentNode.rightNode)
        }
    }

    const levelOrder = function (currentNode = root){
        
        let queue = [currentNode]
        let levelOrderArray = []

        while (queue.length > 0) {
            levelOrderArray.push(queue[0].data)
            if (queue[0].leftNode != null) {
                queue.push(queue[0].leftNode)
            }
            if (queue[0].rightNode != null) {
                queue.push(queue[0].rightNode)
            }
            queue.shift()
        }
        return levelOrderArray
    }

    return {
        root,
        buildTree,
        insert,
        deletion,
        find,
        levelOrder
    }
}

let test = tree([1, 2, 3, 4, 5, 6, 7])

