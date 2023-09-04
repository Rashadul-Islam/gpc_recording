import Image from "next/image";
import React from "react";
import { AiFillDelete, AiFillEye } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";

const CustomTable = ({
  headers,
  data,
  click,
  settings,
  viewData,
  editData,
  deleteData,
}) => {
  const image =
    "https://cdn.pixabay.com/photo/2012/04/13/21/07/user-33638__340.png";
  return (
    <div className="mt-5 block overflow-auto">
      <table className="table-auto w-full text-left text-[13px] overflow-x-auto">
        <thead>
          <tr>
            {headers?.map((header, index) => (
              <th
                className="border whitespace-nowrap p-3 font-normal"
                key={index}
              >
                {header?.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((tableData, index) => (
            <tr
              key={index}
              className={`hover:bg-[#d9dade] ${
                index % 2 === 0 ? "bg-[#d9dade]" : ""
              }`}
            >
              {headers?.map((header, index) => (
                <td
                  className="border whitespace-nowrap p-3 h-[55px]"
                  key={index}
                >
                  {header?.key === "name" ? (
                    <div className="relative">
                      <Image
                        className="rounded-[50%] h-[40px] w-[40px] absolute top-[-10px]"
                        src={
                          tableData?.employee?.avatar
                            ? `${process.env.NEXT_PUBLIC_IMAGE}${tableData?.employee?.avatar}`
                            : image
                        }
                        alt=""
                      />
                      <p className="ml-[55px]">{tableData?.employee?.name}</p>
                    </div>
                  ) : (
                    <>{tableData[header?.key]}</>
                  )}
                  {header?.key === "action" && (
                    <div className="flex items-center gap-3">
                      {viewData && (
                        <p className="cursor-pointer">
                          <AiFillEye
                            size={20}
                            onClick={() => click("view", tableData)}
                          />
                        </p>
                      )}
                      {editData && (
                        <p className="cursor-pointer">
                          <TbEdit
                            size={20}
                            onClick={() => click("edit", tableData)}
                          />
                        </p>
                      )}
                      {deleteData && (
                        <p className="cursor-pointer">
                          <AiFillDelete
                            size={20}
                            onClick={() => click("delete", tableData)}
                          />
                        </p>
                      )}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;
