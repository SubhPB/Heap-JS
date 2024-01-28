/* -- Byimaan -- */


const Heap = require('./Heap');

class MinHeap extends Heap{
    constructor(heapArr){
        super(heapArr);
        this.heapify();
    }

    heapifyNode(index, needSwapedIndex=false){
        if ( !super.nodeExists(index) || this.isHeapifiedNode(index) ) return index;
        
        const childs = super.getChildsIndex(index);
        const swapableIndex = (childs.length === 1 || this.heapArr[childs[0]] < this.heapArr[childs[1]]) ? childs[0] : childs[1];
        super.swapNodes(index,swapableIndex);
        if (needSwapedIndex) return swapableIndex; 
    };

    isHeapifiedNode(index=0){
        if (super.isLeafNode(index)) return true;
        // it checks that node at heapArr[index] is valid parent...
        return super.nodeExists(index) ? !! (this.heapArr[index] <= Math.min(...super.getChilds(index))) : false;
    }; 

    heapify(needArr=false){

        const nonLeafRange = super.getNonLeafRange();

        for(let i = nonLeafRange[1]; i >= nonLeafRange[0]; i--){
            if (!this.isHeapifiedNode(i)){
                const newPositionOfI = this.heapifyNode(i);

                if (!this.isHeapifiedNode(newPositionOfI)){
                    this.heapify();
                };
            };
        };

        if (needArr) return this.heapArr;
    };

    push(val){
        super.push(val);
        if (this.heapSize > 2){
            let i = this.heapSize - 1;
            while(i > 0 && super.getParent(i) > val){
                let parentIndex = Math.ceil(i/2) - 1;
                super.swapNodes(parentIndex, i);
                i = parentIndex;
            };
        };
    };
};

module.exports = MinHeap;

if (require .main === module){
    const arr = [3,6,5,0,8,2,1,9];

    const heap = new MinHeap(arr);
    console.log(heap.heapArr);
    heap.push(-2); 
   // heap.pop();
    console.log(heap.heapArr);

}