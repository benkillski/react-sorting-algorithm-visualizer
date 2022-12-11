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