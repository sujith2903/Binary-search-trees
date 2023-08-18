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

    const preOrder = function (currentNode = root, preOrderArray = []) {
    
        if (currentNode == null) return

        preOrderArray.push(currentNode.data)
        preOrder(currentNode.leftNode, preOrderArray)
        preOrder(currentNode.rightNode, preOrderArray)

        return preOrderArray
    }

    const inOrder = function (currentNode = root, inOrderArray = []) {
        
        if (currentNode == null) return
        
        inOrder(currentNode.leftNode, inOrderArray)
        inOrderArray.push(currentNode.data)
        inOrder(currentNode.rightNode, inOrderArray)

        return inOrderArray
    }

    const postOrder = function (currentNode = root, postOrderArray = []) {
        
        if (currentNode == null) return
        
        postOrder(currentNode.leftNode, postOrderArray)
        postOrder(currentNode.rightNode, postOrderArray)
        postOrderArray.push(currentNode.data)

        return postOrderArray
    }

    const height = function (currentNode = root) {
        
        if (currentNode == null) return -1
        
        let leftHeight = height(currentNode.leftNode)
        let rightHeight = height(currentNode.rightNode)
        let result = Math.max(leftHeight,rightHeight) + 1 

        return result
    }

    const depth = function (value, currentNode = root, level = 0) {
        
        if (currentNode == null) {
            return 
        }

        if (value == currentNode.data) {
            return level
        }

        if (value < currentNode.data) {
            return depth(value, currentNode.leftNode, level += 1)
        } else {
            return depth(value, currentNode.rightNode, level += 1)
        }
    }

    const isBalanced = function (currentNode = root) {
        
        if (currentNode == null) return true

        let leftHeight = height(currentNode.leftNode)   
        let rightHeight = height(currentNode.rightNode)
            
        if (Math.abs(leftHeight - rightHeight) <= 1 && isBalanced(currentNode.leftNode) == true && isBalanced(currentNode.rightNode) == true) {
            return true
        } 
        return false       
    }

    const reBalance = function () {
        
        let newArray = inOrder()
        root = buildTree(newArray)
        return root
    }

    const getRoot = function () {
        return root
    }

    return {
        getRoot,
        buildTree,
        insert,
        deletion,
        find,
        levelOrder,
        preOrder,
        inOrder,
        postOrder,
        height,
        depth,
        isBalanced,
        reBalance
    }
}

export default tree




