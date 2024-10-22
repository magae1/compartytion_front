export default function Loading() {
  return (
    <div className={"flex w-full flex-col"}>
      <div className="label">
        <div className={"skeleton h-5 w-14"}></div>
      </div>
      <div className={"skeleton h-12 w-full rounded-lg"}></div>
      <div className="label"></div>
      <div className="label">
        <div className={"skeleton h-5 w-20"}></div>
      </div>
      <div className={"skeleton h-16 w-full rounded-lg"}></div>
      <div className="label">
        <div className={"skeleton h-4 w-full"}></div>
      </div>
      <div className="label">
        <div className="skeleton h-5 w-[70px]"></div>
        <div className="skeleton h-6 w-28"></div>
      </div>
      <div className="label justify-end">
        <div className="skeleton h-4 w-60"></div>
      </div>
      <div className="my-5">
        <div className="label">
          <div className="skeleton h-5 w-28"></div>
        </div>
        <div className="skeleton my-1 w-full h-12 rounded-lg"></div>
      </div>
    </div>
  );
}
