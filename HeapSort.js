/* -- Byimaan -- 

    --> with heap-sort solve following

    Example 1:

    Input: [12, 11, 13, 5, 6, 7]
    Expected Output: [5, 6, 7, 11, 12, 13]

*/

const MaxHeap = require('./Heap/MaxHeap');
const MinHeap = require('./Heap/MinHeap');

// ascending order...
function ascHeapSort(arr=[]){

    let heap = new MaxHeap(arr);
    /* 
       suppose if arr = [9, 6, 8, 2 ,1, 4, 3], then we will start the loop from arr[6] to arr[0]...
    */

    if (heap.heapSize === 0){return arr};   

    for(let i = arr.length-1; i >= 0; i--){
        let maxVal = heap.getRoot();
        heap.swapNodes(0,i);
        arr[i] = maxVal;
        heap = new MaxHeap(heap.heapArr.slice(0,i))
    };
    return arr

};

// descending order...
function descHeapSort(arr=[]){

    let heap = new MinHeap(arr);

    if (heap.heapSize === 0){return arr};   

    for(let i = arr.length-1; i >= 0; i--){
        let minVal = heap.getRoot();
        heap.swapNodes(0,i);
        arr[i] = minVal;
        heap = new MinHeap(heap.heapArr.slice(0,i))
    };
    return arr
};

module.exports = {ascHeapSort, descHeapSort};

if (require.main === module){
    const arr = [5, 6, 7, 11, 12, 13];
    console.log(descHeapSort(arr));
};