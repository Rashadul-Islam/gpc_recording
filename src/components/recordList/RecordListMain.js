import React from "react";
import { recordData } from "@/assets/recodlist";
import RecordListTable from "./RecordListTable";
import { useState } from "react";
import FilterField from "./FilterField";

const RecordListMain = () => {
  const [page, setPage] = useState(1);

  const offset = (page - 1) * 7;
  const paginatedItems = recordData?.slice(offset).slice(0, 7);

  return (
    <div className="w-[90%] mx-auto">
      <FilterField />
      <RecordListTable
        tableData={paginatedItems}
        setPage={setPage}
        page={page} 
        count={Math.ceil(recordData?.length / 7)}
      />
    </div>
  );
};

export default RecordListMain;
