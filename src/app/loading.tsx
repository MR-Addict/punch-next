import { LoadingDots } from "@/components";

export default function Loading() {
  return (
    <main className='w-full flex-1 flex flex-col items-center justify-center gap-2'>
      <LoadingDots />
      <p>加载中</p>
    </main>
  );
}
