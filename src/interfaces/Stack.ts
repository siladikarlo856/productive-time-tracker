export interface Stack {
  position?:
    | "top left"
    | "top right"
    | "bottom left"
    | "bottom right"
    | "top center"
    | "bottom center"
    | "left center"
    | "right center"
    | "center"
    | {
        top?: number;
        left?: number;
        bottom?: number;
        right?: number;
      };
  direction?:
    | "down-push"
    | "up-push"
    | "left-push"
    | "right-push"
    | "down-stack"
    | "up-stack"
    | "left-stack"
    | "right-stack";
}
