import tree from "./Binary-Search-Trees.js"

const generateRandomArray = function (size, max) {
    let randomArray = []
    while (randomArray.length < size) {
        let number = Math.floor(Math.random() * max)
        if (randomArray.indexOf(number) == -1) {
            randomArray.push(number)
        }
    }
    return randomArray.sort((a,b) => a-b)
}

let arr = generateRandomArray(10, 100)
let binaryTree = tree(arr)

//Check if tree is balanced and print the nodes in different methods
console.log('Is the tree balanced: ' + binaryTree.isBalanced())
console.log('Level order Traversal: ' + binaryTree.levelOrder())
console.log('Pre order Traversal: ' + binaryTree.preOrder())
console.log('In order Traversal: ' + binaryTree.inOrder())
console.log('Post order Traversal: ' + binaryTree.postOrder())


//Unbalance the tree
binaryTree.insert(101)
binaryTree.insert(118)
binaryTree.insert(114)
binaryTree.insert(105)
binaryTree.insert(125)

//Check balance again
console.log('Is the tree balanced: ' + binaryTree.isBalanced())

//Re-balance the tree and check for balance
binaryTree.reBalance()
console.log('Is the tree balanced: ' + binaryTree.isBalanced())

console.log('Level order Traversal: ' + binaryTree.levelOrder())
console.log('Pre order Traversal: ' + binaryTree.preOrder())
console.log('In order Traversal: ' + binaryTree.inOrder())
console.log('Post order Traversal: ' + binaryTree.postOrder())

