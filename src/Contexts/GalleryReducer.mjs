import splitIntoParts from "../components/splitIntoParts.mjs";

export default function galleryReducer(gallery, action) {
  switch (action.type) {
    case "newImages": {
      console.log("new Images")
      return {
        ...gallery,
        images: [...action.payload],
      };
    }
    case "setBreakPoints": {
      console.log("setBreakPoints")
      return {
        ...gallery,
        breakPoints: [...action.payload].sort((l, r) => r[0] - l[0]),
      }
    }
    case "break": {
      console.log("break")
      const newBreak = findMatchingBreakPoint(gallery.breakPoints, gallery.size.width);

      if(newBreak !== gallery.breakAt)
        return {
          ...gallery,
          breakAt: newBreak,
        }

      return gallery;
    }

    case "setSize": {
      console.log("setSize")
        return {
          ...gallery,
          size: action.payload,
        }
    }

    case "setColumns": {
      console.log("setColumns")
      const { 1: columnsAmount } = gallery.breakPoints[gallery.breakAt];
      const {images} = gallery;
      // console.log(gallery)

      const columns = splitIntoParts(
        images,
        columnsAmount
      );

      return {
        ...gallery,
        columns
      }
    }
  }
}

function findMatchingBreakPoint(breakPoints,width) {
  let i = 0;
    for (i; i < breakPoints.length; ++i) {
      if (breakPoints[i][0] <= width) {
        break;
      }
    }
    return Math.min(i, breakPoints.length - 1);
}
