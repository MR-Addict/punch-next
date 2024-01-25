import style from "./LoadingDots.module.css";

export default function LoadingDots({ color = "black", size = 4 }: { color?: string; size?: number }) {
  return (
    <div className={style.loading}>
      <div style={{ background: color, width: size, height: size }} className={style.dot}></div>
      <div style={{ background: color, width: size, height: size }} className={style.dot}></div>
      <div style={{ background: color, width: size, height: size }} className={style.dot}></div>
    </div>
  );
}
