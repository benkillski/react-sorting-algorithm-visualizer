import {
  AnimationSharp
} from "@mui/icons-material";

export function getBubbleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bubbleSortHelper(array, animations);
  return animations;
}

function bubbleSortHelper(array, animations) {
  for (let i = 0; i <= array.length - 1; i++) {
    // Last i elements are already in place
    for (let j = 0; j < (array.length - i - 1); j++) {

      // Comparing two adjacent numbers 
      // and see if first is greater than second
      if (array[j] > array[j + 1]) {
        animations.push([j, j + 1]);
        animations.push([j, j + 1]);

        // Swap them if the condition is true 
        swap(array, j, j + 1, animations);
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
  let i, j, min_idx;

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
    animations.push(-1);
    swap(array, min_idx, i, animations);
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
  for (i = 1; i < array.length; i++) {

    key = array[i];
    j = i - 1;

    /* Move elements of arr[0..i-1], that are 
    greater than key, to one position ahead 
    of their current position */
    while (j >= 0 && array[j] > key) {
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

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
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

function heapSortHelper(array, animations) {
  let N = array.length;

  // Build heap (rearrange array)
  for (let i = Math.floor(N / 2) - 1; i >= 0; i--)
    heapify(array, N, i, animations);

  // One by one extract an element from heap
  for (let i = N - 1; i > 0; i--) {
    // Move current root to end
    swap(array, 0, i, animations);

    // call max heapify on the reduced heap
    heapify(array, i, 0, animations);
  }
}

// To heapify a subtree rooted with node i which is
// an index in arr[]. n is size of heap
function heapify(array, N, i, animations) {
  let largest = i; // Initialize largest as root
  let l = 2 * i + 1; // left = 2*i + 1
  let r = 2 * i + 2; // right = 2*i + 2

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
    swap(array, i, largest, animations);

    // Recursively heapify the affected sub-tree
    heapify(array, N, largest, animations);
  }
}



export function getQuickSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  quickSortHelper(array, 0, array.length - 1, animations);
  return animations;
}

function quickSortHelper(array, low, high, animations) {
  if (low < high) {

    // pi is partitioning index, arr[p]
    // is now at right place 
    let pi = partition(array, low, high, animations);

    // Separately sort elements before
    // partition and after partition
    quickSortHelper(array, low, pi - 1, animations);
    quickSortHelper(array, pi + 1, high, animations);
  }
}

/* This function takes last element as pivot, places
  the pivot element at its correct position in sorted
  array, and places all smaller (smaller than pivot)
  to left of pivot and all greater elements to right
  of pivot */
function partition(array, low, high, animations) {

  // pivot
  let pivot = array[high];

  // Index of smaller element and
  // indicates the right position
  // of pivot found so far
  let i = (low - 1);

  for (let j = low; j <= high - 1; j++) {

    // If current element is smaller 
    // than the pivot
    if (array[j] < pivot) {
      animations.push([j, j, "compare"]);
      animations.push([j, j, "uncompare"]);

      // Increment index of 
      // smaller element
      i++;
      swap(array, i, j, animations);
    }
  }
  swap(array, i + 1, high, animations);
  return (i + 1);
}



//TODO: NEED TO FINISH
export function getRadixSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  radixSortHelper(array, array.length, animations);
  return animations;
}

function radixSortHelper(array, n, animations) {
  // Find the maximum number to know number of digits
  let m = getMax(array, n);

  // Do counting sort for every digit. Note that
  // instead of passing digit number, exp is passed.
  // exp is 10^i where i is current digit number
  for (let exp = 1; Math.floor(m / exp) > 0; exp *= 10)
    radixCountSort(array, n, exp, animations);
}

// A function to do counting sort of arr[] according to
// the digit represented by exp.
function radixCountSort(array, n, exp, animations) {
  let output = new Array(n); // output array
  let i;
  let count = new Array(10);
  for (let i = 0; i < 10; i++) {
    count[i] = 0;
  }

  // Store count of occurrences in count[]
  for (i = 0; i < n; i++) {
    count[Math.floor(array[i] / exp) % 10]++;
  }

  // Change count[i] so that count[i] now contains
  // actual position of this digit in output[]
  for (i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  // Build the output array
  for (i = n - 1; i >= 0; i--) {
    output[count[Math.floor(array[i] / exp) % 10] - 1] = array[i];
    count[Math.floor(array[i] / exp) % 10]--;
  }

  // Copy the output array to arr[], so that arr[] now
  // contains sorted numbers according to current digit
  for (i = 0; i < n; i++) {
    array[i] = output[i];
  }
}


//TODO: NEED TO FINISH
export function getCountingSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  countingSortHelper(array, animations);
  return animations;
}

function countingSortHelper(array, animations) {
  let n = array.length;

  // The output character array that will have sorted arr
  let output = Array.from({
    length: n
  }, (_, i) => 0);

  // Create a count array to store count of individual
  // characters and initialize count array as 0
  let count = Array.from({
    length: 256
  }, (_, i) => 0);

  // store count of each character
  for (let i = 0; i < n; ++i)
    ++count[array[i].charCodeAt(0)];
  // Change count[i] so that count[i] now contains actual
  // position of this character in output array
  for (let i = 1; i <= 255; ++i)
    count[i] += count[i - 1];

  // Build the output character array
  // To make it stable we are operating in reverse order.
  for (let i = n - 1; i >= 0; i--) {
    output[count[array[i].charCodeAt(0)] - 1] = array[i];
    --count[array[i].charCodeAt(0)];
  }

  // Copy the output array to arr, so that arr now
  // contains sorted characters
  for (let i = 0; i < n; ++i)
    array[i] = output[i];
  return array;
}



//TODO: NEED TO FINISH
export function getBucketSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  bucketSortHelper(array, animations);
  return animations;
}

function bucketSortHelper(array, animations) {
  
}



// A utility function to get maximum value in arr[]
function getMax(array, n, animations) {
  let mx = array[0];
  for (let i = 1; i < n; i++) {
    if (array[i] > mx) {
      animations.push([i, 0, "compare"]);
      animations.push([i, 0, "uncompare"]);
      mx = array[i];
    }
  }
  return mx;
}



// A utility function to swap two elements
function swap(array, i, j, animations) {
  let temp = array[i];
  animations.push([i, array[j], "swap"]);
  animations.push([j, temp, "swap"]);
  array[i] = array[j];
  array[j] = temp;
}