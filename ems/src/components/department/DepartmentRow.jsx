
const DepartmentRow = ({data}) => {
    return (
            <tr className="border-b border-gray-100 hover:bg-zinc-50 transition">
            <td className="p-4 text-zinc-600 text-sm font-mono"
            >DEPT-{data._id.slice(-4).toUpperCase()}</td>

            <td className="p-4 font-medium text-zinc-900 text-sm">{data.department_name}</td>

            <td className="p-4 text-zinc-600 text-sm">{data.department_head}</td>

            <td className="p-4 text-zinc-600 text-sm">₹{Number(data.budget).toLocaleString("en-IN")}</td>

            <td className="p-4 text-zinc-600 text-sm">{data.department_description}</td>

            <td>Actions</td>
        </tr>
    )
}

export default DepartmentRow