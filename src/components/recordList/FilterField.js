import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterField = () => {
  const [startDate, endDate] = [null, null];
  return (
    <div className="grid lg:grid-cols-4 2xl:grid-cols-5 md:grid-cols-3 gap-5 mt-5 mb-3 text-[12px]">
      <div className="z-30 w-full">
        <DatePicker
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => {
            // setInputData((prev) => {
            //   return {
            //     ...prev,
            //     date_range: update,
            //   };
            // });
          }}
          placeholderText="Select date range"
        />
      </div>
      <input
        className="outline-none border-[1px] border-[#E2E5EC] rounded-[10px] p-2 focus:border-blue-500"
        type="text"
        name="customer_phone"
        placeholder="Customer phone"
      />
      <input
        className="outline-none border-[1px] border-[#E2E5EC] rounded-[10px] p-2 focus:border-blue-500"
        type="text"
        name="agent_name"
        placeholder="Agent name"
      />
      <button className="border-[1px] border-[#4b5c84] rounded-[10px] p-2 w-[115px] hover:text-white hover:bg-[#4b5c84]">
        Search
      </button>
    </div>
  );
};

export default FilterField;
