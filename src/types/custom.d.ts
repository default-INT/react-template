declare module '*.svg' {
  import * as React from 'react';

  const ReactComponent: React.VFC<React.SVGProps<SVGSVGElement>>;
  const svg: string;
  export { ReactComponent };
  export default svg;
}

declare module '*.png' {
  const png: string;
  export default png;
}

declare module '*.yml' {
  const yml: string;
  export default yml;
}

declare module '*.mp4' {
  const mp4: string;
  export default mp4;
}

declare module '*.obj' {
  const obj: string;
  export default obj;
}

declare module '*.styles.scss' {
  const styles: Record<string, string>;
  export default styles;
}

declare module '*/styles.scss' {
  const styles: Record<string, string>;
  export default styles;
}
