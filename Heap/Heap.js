/* -- Byimaan -- */

class Node{

    // not yet implemented...
    constructor(val, leftNode=null, rightNode=null){
        this.val = val;
        this.leftNode = leftNode 
        this.rightNode = rightNode
    }

    isFull(){
        return !! (this.leftNode && this.rightNode)
    }
};

class Heap{
    constructor(arr=[]){
        this.heapArr = arr;
        this.heapSize = arr.length;
    }

    getLeftChild(i=0,needIndex=false){
        const childIndex = 2*i + 1;
        if (needIndex){
            return this.nodeExists(childIndex) ? childIndex : null;
        };
        return this.nodeExists(childIndex) ? this.heapArr[childIndex] : null;
    };

    getRightChild(i=0,needIndex=false){
        const childIndex = 2*i + 2;
        if (needIndex){
            return this.nodeExists(childIndex) ? childIndex : null;
        };
        return this.nodeExists(childIndex) ? this.heapArr[childIndex] : null;
    };

    getChilds(i=0){
        return [this.getLeftChild(i),this.getRightChild(i)].filter( val => val !== null)
    };

    getChildsIndex(i=0){
        return [this.getLeftChild(i,true),this.getRightChild(i,true)].filter( val => val !== null)
    }

    getParent(i=1){
        const parentIndex = Math.ceil(i/2) - 1;
        return this.nodeExists(parentIndex) ? this.heapArr[parentIndex] : null;
    };

    getLeafRange(){
        return [Math.floor(this.heapSize / 2), this.heapSize - 1]
    };

    getNonLeafRange(){
        return [0,Math.floor(this.heapSize / 2) - 1]
    };

    getRoot(){
        return !! (this.heapArr.length > 0) ? this.heapArr[0] : undefined;
    }

    nodeExists(index){
        if ( Array.isArray(index) ){
            // for checking multiple nodes... 
           return index.reduce( (acc,val) => acc && this.nodeExists(val),true)  
        };
        return !!( index >= 0 && index < this.heapSize )
    };

    isLeafNode(index){
        const leafRange = this.getLeafRange();
        return this.nodeExists(index) && ( index >= leafRange[0] && index <= leafRange[1]);
    };

    isInternalNode(index){
        return ! this.isLeafNode(index);
    };

    swapNodes(i,j){
        if (this.nodeExists([i,j])){
            const temp = this.heapArr[i];
            this.heapArr[i] = this.heapArr[j];
            this.heapArr[j] = temp;
        };
    };

    convertToMaxHeap(){
        const MaxHeap = require('./MaxHeap');
        return new MaxHeap(this.heapArr);
    };

    convertToMinHeap(){
        const MinHeap = require('./MinHeap');
        return new MinHeap(this.heapArr)
    };  

    push(val){
        this.heapArr.push(val);
        this.heapSize += 1;
    };

    pop(){
        if (this.heapSize > 0){
            this.heapArr.pop();
            this.heapSize -= 1;
        };
    };

};

module.exports = Heap;


if (require .main === module){
    const arr = [1,3,5,6,7,8,9,13];
    const heap = new Heap(arr);

    console.log(heap.getNonLeafRange())
};