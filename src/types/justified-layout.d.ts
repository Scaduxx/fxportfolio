declare module "justified-layout" {
  type JustifiedLayoutOptions = {
    containerWidth: number
    targetRowHeight: number
    boxSpacing?: number | number[]
    containerPadding?: number | number[]
  }

  type Box = {
    width: number
    height: number
    top: number
    left: number
  }

  type JustifiedLayoutResult = {
    boxes: Box[]
    containerHeight: number
  }

  function justifiedLayout(
    aspectRatios: number[],
    options: JustifiedLayoutOptions
  ): JustifiedLayoutResult

  export = justifiedLayout
}
