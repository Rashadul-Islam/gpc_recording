import React from "react";
import CustomTable from "../common/table/CustomTable";
import { Pagination } from "@mui/material";

const RecordListTable = ({ tableData, setPage, page, count }) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <CustomTable
        headers={[
          { key: "title", label: "Title" },
          { key: "agent_name", label: "Agent Name" },
          { key: "customer_name", label: "Customer Name" },
          { key: "customer_phone", label: "Customer Phone" },
          { key: "customer_type", label: "Customer Type" },
          { key: "startTime", label: "Start Time" },
          { key: "endTime", label: "End Time" },
          { key: "action", label: "Action" },
        ]}
        data={tableData}
        viewData={true}
        editData={true}
        deleteData={true}
        //   click={handleClick}
      />
      <div className="flex justify-center pt-5 pb-5">
        <Pagination
          count={count}
          page={page}
          shape={"rounded"}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default RecordListTable;
