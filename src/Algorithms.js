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
  bucketSortHelper(array, array.length, animations);
  return animations;
}

function bucketSortHelper(array, n, animations) {
  if (n <= 0)
    return;

  // 1) Create n empty buckets       
  let buckets = new Array(n);

  for (let i = 0; i < n; i++) {
    buckets[i] = [];
  }

  // 2) Put array elements in different buckets
  for (let i = 0; i < n; i++) {
    let idx = array[i] * n;
    buckets[Math.floor(idx)].push(array[i]);
  }

  // 3) Sort individual buckets
  for (let i = 0; i < n; i++) {
    buckets[i].sort(function (a, b) {
      return a - b;
    });
  }

  // 4) Concatenate all buckets into arr[]
  let index = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < buckets[i].length; j++) {
      array[index++] = buckets[i][j];
    }
  }
}



//TODO: NEED TO FINISH
export function getShellSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  shellSortHelper(array, animations);
  return animations;
}

function shellSortHelper(array, animations) {
  let n = array.length;

  // Start with a big gap, then reduce the gap
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {

    // Do a gapped insertion sort for this gap size.
    // The first gap elements a[0..gap-1] are already
    // in gapped order keep adding one more element
    // until the entire array is gap sorted
    for (let i = gap; i < n; i += 1) {

      // add a[i] to the elements that have been gap
      // sorted save a[i] in temp and make a hole at
      // position i
      let temp = array[i];

      // shift earlier gap-sorted elements up until
      // the correct location for a[i] is found
      let j;
      for (j = i; j >= gap && array[j - gap] > temp; j -= gap)
        array[j] = array[j - gap];

      // put temp (the original a[i]) in its correct
      // location
      array[j] = temp;
    }
  }
  return array;
}



//TODO: NEED TO FINISH
export function getCombSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  combSortHelper(array, animations);
  return animations;
}

function combSortHelper(array, animations) {
  let n = array.length;

  // initialize gap
  let gap = n;

  // Initialize swapped as true to
  // make sure that loop runs
  let swapped = true;

  // Keep running while gap is more than
  // 1 and last iteration caused a swap
  while (gap != 1 || swapped == true) {
    // Find next gap
    gap = getNextGap(gap);

    // Initialize swapped as false so that we can
    // check if swap happened or not
    swapped = false;

    // Compare all elements with current gap
    for (let i = 0; i < n - gap; i++) {
      if (array[i] > array[i + gap]) {
        // Swap arr[i] and arr[i+gap]
        swap(array, i, i + gap, animations);

        // Set swapped
        swapped = true;
      }
    }
  }
}

// To find gap between elements
function getNextGap(gap) {
  // Shrink gap by Shrink factor
  gap = parseInt((gap * 10) / 13, 10);
  if (gap < 1)
    return 1;
  return gap;
}



//TODO: NEED TO FINISH
export function getPigeonholeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  pigeonholeSortHelper(array, array.length, animations);
  return animations;
}

function pigeonholeSortHelper(array, n, animations) {
  let min = array[0];
  let max = array[0];
  let range, i, j, index;

  for (let a = 0; a < n; a++) {
    if (array[a] > max)
      max = array[a];
    if (array[a] < min)
      min = array[a];
  }

  range = max - min + 1;
  let phole = [];

  for (i = 0; i < n; i++)
    phole[i] = 0;

  for (i = 0; i < n; i++)
    phole[array[i] - min]++;


  index = 0;

  for (j = 0; j < range; j++)
    while (phole[j]-- > 0)
      array[index++] = j + min;
}



//TODO: NEED TO FINISH
export function getCycleSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  cycleSortHelper(array, array.length, animations);
  return animations;
}

function cycleSortHelper(array, n, animations) {
  // count number of memory writes
  let writes = 0;

  // traverse array elements and put it to on
  // the right place
  for (let cycle_start = 0; cycle_start <= n - 2; cycle_start++) {

    // initialize item as starting point
    let item = array[cycle_start];

    // Find position where we put the item. We basically
    // count all smaller elements on right side of item.
    let pos = cycle_start;
    for (let i = cycle_start + 1; i < n; i++)
      if (array[i] < item)
        pos++;

    // If item is already in correct position
    if (pos == cycle_start)
      continue;

    // ignore all duplicate elements
    while (item == array[pos])
      pos += 1;

    // put the item to it's right position
    if (pos != cycle_start) {
      let temp = item;
      item = array[pos];
      array[pos] = temp;
      writes++;
    }

    // Rotate rest of the cycle
    while (pos != cycle_start) {
      pos = cycle_start;

      // Find position where we put the element
      for (let i = cycle_start + 1; i < n; i++)
        if (array[i] < item)
          pos += 1;

      // ignore all duplicate elements
      while (item == array[pos])
        pos += 1;

      // put the item to it's right position
      if (item != array[pos]) {
        let temp = item;
        item = array[pos];
        array[pos] = temp;
        writes++;
      }
    }
  }
}



//TODO: NEED TO FINISH
let MIN_MERGE = 32;

export function getTimSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  timSortHelper(array, array.length, animations);
  return animations;
}

function timSortHelper(array, n, animations) {
  let minRun = timSortMinRunLength(MIN_MERGE);

  // Sort individual subarrays of size RUN
  for (let i = 0; i < n; i += minRun) {
    timSortInsertionSort(array, i, Math.min(
      (i + MIN_MERGE - 1), (n - 1)), animations);
  }

  // Start merging from size
  // RUN (or 32). It will
  // merge to form size 64,
  // then 128, 256 and so on
  // ....
  for (let size = minRun; size < n; size = 2 * size) {

    // Pick starting point
    // of left sub array. We
    // are going to merge
    // arr[left..left+size-1]
    // and arr[left+size, left+2*size-1]
    // After every merge, we
    // increase left by 2*size
    for (let left = 0; left < n; left += 2 * size) {

      // Find ending point of left sub array
      // mid+1 is starting point of right sub
      // array
      let mid = left + size - 1;
      let right = Math.min((left + 2 * size - 1),
        (n - 1));

      // Merge sub array arr[left.....mid] &
      // arr[mid+1....right]
      if (mid < right)
        timSortMerge(array, left, mid, right, animations);
    }
  }
}

// Merge function merges the sorted runs
function timSortMerge(array, l, m, r, animations) {

  // Original array is broken in two parts
  // left and right array
  let len1 = m - l + 1,
    len2 = r - m;
  let left = new Array(len1);
  let right = new Array(len2);
  for (let x = 0; x < len1; x++) {
    left[x] = array[l + x];
  }
  for (let x = 0; x < len2; x++) {
    right[x] = array[m + 1 + x];
  }

  let i = 0;
  let j = 0;
  let k = l;

  // After comparing, we merge those two
  // array in larger sub array
  while (i < len1 && j < len2) {
    if (left[i] <= right[j]) {
      array[k] = left[i];
      i++;
    } else {
      array[k] = right[j];
      j++;
    }
    k++;
  }

  // Copy remaining elements
  // of left, if any
  while (i < len1) {
    array[k] = left[i];
    k++;
    i++;
  }

  // Copy remaining element
  // of right, if any
  while (j < len2) {
    array[k] = right[j];
    k++;
    j++;
  }
}

// This function sorts array from left index to
// to right index which is of size atmost RUN
function timSortInsertionSort(array, left, right, animations) {
  for (let i = left + 1; i <= right; i++) {
    let temp = array[i];
    let j = i - 1;

    while (j >= left && array[j] > temp) {
      array[j + 1] = array[j];
      j--;
    }
    array[j + 1] = temp;
  }
}

function timSortMinRunLength(n) {

  // Becomes 1 if any 1 bits are shifted off
  let r = 0;
  while (n >= MIN_MERGE) {
    r |= (n & 1);
    n >>= 1;
  }
  return n + r;
}



//TODO: NEED TO FINISH
export function getCocktailSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  cocktailSortHelper(array, animations);
  return animations;
}

function cocktailSortHelper(array, animations) {
  let swapped = true;
  let start = 0;
  let end = array.length;

  while (swapped == true) {

    // reset the swapped flag on entering the
    // loop, because it might be true from a
    // previous iteration.
    swapped = false;

    // loop from bottom to top same as
    // the bubble sort
    for (let i = start; i < end - 1; ++i) {
      if (array[i] > array[i + 1]) {
        let temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        swapped = true;
      }
    }

    // if nothing moved, then array is sorted.
    if (swapped == false)
      break;

    // otherwise, reset the swapped flag so that it
    // can be used in the next stage
    swapped = false;

    // move the end point back by one, because
    // item at the end is in its rightful spot
    end = end - 1;

    // from top to bottom, doing the
    // same comparison as in the previous stage
    for (let i = end - 1; i >= start; i--) {
      if (array[i] > array[i + 1]) {
        let temp = array[i];
        array[i] = array[i + 1];
        array[i + 1] = temp;
        swapped = true;
      }
    }

    // increase the starting point, because
    // the last stage would have moved the next
    // smallest number to its rightful spot.
    start = start + 1;
  }
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