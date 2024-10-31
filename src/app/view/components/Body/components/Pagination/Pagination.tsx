"use client";

import { useRouter } from "next/navigation";
import { Pagination as AntPagination } from "antd";

import { PaginationType } from "@/types/app";
import setSearchParam from "@/lib/utils/setSearchParam";

export default function Pagination({ pagination }: { pagination: PaginationType }) {
  const router = useRouter();

  async function handleOnchange(page: number) {
    setSearchParam(router, { page }, { scroll: true });
  }

  if (pagination.total <= pagination.pageSize) return <></>;

  return (
    <AntPagination
      responsive={true}
      showSizeChanger={false}
      total={pagination.total}
      current={pagination.page}
      pageSize={pagination.pageSize}
      showTotal={(total) => `共${total}条`}
      onChange={handleOnchange}
    />
  );
}
