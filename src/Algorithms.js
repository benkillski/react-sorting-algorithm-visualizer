export function getBubbleSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    bubbleSortHelper(array, animations);
    return animations;
}

function bubbleSortHelper(array, animations) {
    for(var i = 0; i <= array.length-1; i++){
        // Last i elements are already in place
        for(var j = 0; j < ( array.length - i -1); j++){

            // Comparing two adjacent numbers 
            // and see if first is greater than second
            if(array[j] > array[j+1]){
                animations.push([j, j + 1]);
                animations.push([j, j + 1]);

            // Swap them if the condition is true 
            var temp = array[j];
            animations.push([j, array[j + 1]]);
            animations.push([j + 1, temp]);
            array[j] = array[j + 1];
            array[j+1] = temp;
            }
        }
    }
}



export function getSelectionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  selectionSortHelper(array, animations);
  return animations;
}

function selectionSortHelper(array, animations) {
  var i, j, min_idx;
 
  // One by one move boundary of unsorted subarray
  for (i = 0; i < array.length - 1; i++) {
      // Find the minimum element in unsorted array
      min_idx = i;
      for (j = i + 1; j < array.length; j++) {
        if (array[j] < array[min_idx]) {
          animations.push([j, min_idx]);
          animations.push([j, min_idx]);

          min_idx = j;
        }
      }

      // Swap the found minimum element with the first element
      var temp = array[min_idx];
      animations.push(-1);
      animations.push([min_idx, array[i]]);
      animations.push([i, temp]);
      array[min_idx] = array[i];
      array[i] = temp;
  }
}



export function getInsertionSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  insertionSortHelper(array, animations);
  return animations;
}

function insertionSortHelper(array, animations) {
  let i, key, j; 
  for (i = 1; i < array.length; i++)
  { 
    
    key = array[i]; 
    j = i - 1; 

    /* Move elements of arr[0..i-1], that are 
    greater than key, to one position ahead 
    of their current position */
    while (j >= 0 && array[j] > key)
    { 
      animations.push([j, j, "compare"]);
      animations.push([j, j, "compare"]);

      animations.push([j + 1, array[j], "swap"]);
      array[j + 1] = array[j]; 
      j = j - 1; 
    } 
    animations.push([j + 1, key, "swap"]);
    array[j + 1] = key; 
  }
}



export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations,
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}



export function getHeapSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  heapSortHelper(array, animations);
  return animations;
}

function heapSortHelper(array, animations)
{
  var N = array.length;

  // Build heap (rearrange array)
  for (var i = Math.floor(N / 2) - 1; i >= 0; i--)
    heapify(array, N, i, animations);

  // One by one extract an element from heap
  for (var i = N - 1; i > 0; i--) {
    // Move current root to end
    var temp = array[0];
    animations.push([0, array[i], "swap"]);
    animations.push([i, temp, "swap"]);
    array[0] = array[i];
    array[i] = temp;

    // call max heapify on the reduced heap
    heapify(array, i, 0, animations);
  }
}

 // To heapify a subtree rooted with node i which is
// an index in arr[]. n is size of heap
function heapify(array, N, i, animations)
{
  var largest = i; // Initialize largest as root
  var l = 2 * i + 1; // left = 2*i + 1
  var r = 2 * i + 2; // right = 2*i + 2

  // If left child is larger than root
  if (l < N && array[l] > array[largest]) {
    animations.push([l, largest, "compare"]);
    animations.push([l, largest, "uncompare"]);

    largest = l;
  }

  // If right child is larger than largest so far
  if (r < N && array[r] > array[largest]) {
    animations.push([r, largest, "compare"]);
    animations.push([r, largest, "uncompare"]);

    largest = r;
  }

  // If largest is not root
  if (largest !== i) {
      var swap = array[i];
      animations.push([i, array[largest], "swap"]);
      animations.push([largest, swap, "swap"]);
      array[i] = array[largest];
      array[largest] = swap;

      // Recursively heapify the affected sub-tree
      heapify(array, N, largest, animations);
  }
}