/* -- Byimaan -- */

const Heap = require('./Heap');

class MaxHeap extends Heap{
    constructor(heapArr=[]){
        super(heapArr);
        this.heapify();
    };

    heapifyNode(index, needSwapedIndex=false){
        if ( !super.nodeExists(index) || this.isHeapifiedNode(index) ) return index;
        
        const childs = super.getChildsIndex(index);
        const swapableIndex = (childs.length === 1 || this.heapArr[childs[0]] > this.heapArr[childs[1]]) ? childs[0] : childs[1];
        super.swapNodes(index,swapableIndex);
        if (needSwapedIndex) return swapableIndex; 
    };

    isHeapifiedNode(index=1){
        if (super.isLeafNode(index)) return true;
        // it checks that node at heapArr[index] is valid parent...
        return super.nodeExists(index) ? !! (this.heapArr[index] >= Math.max(...super.getChilds(index))) : false;
    };

    heapify(needArr=false){

        const nonLeafRange = super.getNonLeafRange();
        /* ---
        suppose, arr = [3, 6, 5, 0, 8, 2, 1, 9]. then, nonLeafRange = [0, 3] nodes who lies in this range are internal nodes (non-leaf)...
        then, we will start heapifying from the bottom means from arr[3] to the (arr[0])root...
        */
        for(var i = nonLeafRange[1]; i >= nonLeafRange[0]; i--){
            
            if (! this.isHeapifiedNode(i)){
                const newIndexOfI = this.heapifyNode(i,true);

                if (!this.isHeapifiedNode(newIndexOfI)){
                    this.heapify()
                };
            };
        };
        if (needArr) return this.heapArr;
    };

    push(val){
        super.push(val);
        if (this.heapSize > 2){
            let i = this.heapSize - 1;
            while(i > 0 && super.getParent(i) < val){
                let parentIndex = Math.ceil(i/2) - 1;
                super.swapNodes(parentIndex, i);
                i = parentIndex;
            };
        };
    };

};

module.exports = MaxHeap;

if (require.main === module){
    const arr = [1,3,5,6,7,8,9,13];
    const heap = new MaxHeap(arr);
    // console.log(heap.heapify());
    console.log(heap.heapArr);
    heap.push(14);
    console.log(heap.heapArr)

};