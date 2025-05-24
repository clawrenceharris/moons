declare module "*.png" {
  const value: string;
  export default value;
}
declare module "*.jpg" {
  const value: string;
  export default value;
}
declare module "*.jpeg" {
  const value: string;
  export default value;
}
declare module "*.gif" {
  const value: string;
  export default value;
}
declare module "*.svg" {
  const value: string;
  export default value;
}
declare module "*.webp" {
  const value: string;
  export default value;
}

// CSS Modules
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
declare module "*.module.scss";
declare module "*.module.sass";

// Fonts
declare module "*.woff";
declare module "*.woff2";
declare module "*.ttf";
declare module "*.eot";

// Audio / Video
declare module "*.mp3";
declare module "*.mp4";
declare module "*.wav";
declare module "*.webm";

// JSON
declare module "*.json" {
  const value: any;
  export default value;
}
