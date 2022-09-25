import "../../../index.css";

const TableAuto = ({ heading, body }) => {
  return (
    <div className="flex justify-center">
      <table className="shadow-xl  max-w-lg w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className=" text-xs text-black uppercase bg-[#e5e7eb] dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {heading &&
              heading.map((value, index) => (
                <th scope="col" className="py-3 px-6" key={index}>
                  {value}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {body &&
            body.map((data, index) => (
              <tr
                key={index}
                className=" border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="py-4 px-6">{data.address}</td>
                <td className="py-4 px-6">{data.zipCode}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableAuto;
